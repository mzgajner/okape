import {
  addDays,
  differenceInDays,
  formatDistance,
  formatRelative,
  getDay,
  getISOWeek,
  startOfToday,
} from 'date-fns'
import sl from 'date-fns/locale/sl'

import { Weekday, Color, Schedule, Building, BuildingSchedule } from './types'
import scheduleRaw from './schedule.json'
import { isEqual, isEmpty } from 'lodash-es'

export const schedule = scheduleRaw as Schedule

type GarbageType = {
  label: string
  color: Color
  validate(date: Date, building?: Building): boolean
}

export type Pickup = {
  type: string
  color: Color
  time: string
}

const packaging: GarbageType = {
  label: 'embalaža',
  color: Color.Yellow,
  validate: (date: Date) => getISOWeek(date) % 2 === 1,
}

const mixed: GarbageType = {
  label: 'mešani odpadki',
  color: Color.Green,
  validate: (date: Date) => getISOWeek(date) % 2 === 0,
}

const paper: GarbageType = {
  label: 'papir',
  color: Color.Blue,
  validate: (date: Date) => [4, 12, 20, 30, 38, 46].includes(getISOWeek(date)),
}

const glass: GarbageType = {
  label: 'steklo',
  color: Color.Red,
  validate: (date: Date) => [8, 16, 24, 34, 42, 50].includes(getISOWeek(date)),
}

const textile: GarbageType = {
  label: 'tekstil',
  color: Color.Greenish,
  validate: (date: Date) => [10, 40].includes(getISOWeek(date)),
}

const electronics: GarbageType = {
  label: 'elektronika',
  color: Color.Purple,
  validate: (date: Date) => [18, 48].includes(getISOWeek(date)),
}

const organic: GarbageType = {
  label: 'biološki odpadki',
  color: Color.Brown,
  validate: (date: Date, building: Building) =>
    building === Building.ApartmentBuilding
      ? true
      : ![1, 3, 5, 7, 9, 46, 48, 50, 52].includes(getISOWeek(date)),
}

const allGarbageTypes: GarbageType[] = [
  packaging,
  mixed,
  paper,
  glass,
  textile,
  electronics,
  organic,
]

function checkDate(
  date: Date,
  day: number,
  garbageType: GarbageType,
  building: Building
) {
  return getDay(date) === day && garbageType.validate(date, building)
}

function formatDate(date: Date) {
  const today = startOfToday()

  if (differenceInDays(date, today) <= 6) {
    return formatRelative(date, today, { locale: sl })
      .split(' ob ')[0]
      .replace('naslednji', 'v')
  } else {
    return formatDistance(date, today, { locale: sl, addSuffix: true })
  }
}

export function generatePickups(
  regularDay: string,
  organicDay: string,
  building: Building
): Pickup[] {
  let garbageTypes = allGarbageTypes
  const regularDayNumber = Object.values(Weekday).indexOf(regularDay as Weekday)
  const organicDayNumber = Object.values(Weekday).indexOf(organicDay as Weekday)

  if (organicDay === 'null') {
    garbageTypes = garbageTypes.slice(0, garbageTypes.length - 1)
  }

  return garbageTypes
    .map((type) => {
      let date = startOfToday()
      const dayNumber = type === organic ? organicDayNumber : regularDayNumber

      while (checkDate(date, dayNumber, type, building) !== true) {
        date = addDays(date, 1)
      }

      return { type: type.label, color: type.color, time: date }
    })
    .sort((a, b) => Number(a.time) - Number(b.time))
    .map((day) => ({ ...day, time: formatDate(day.time) }))
}

export const maybeGetBuildingType = (municipality: string, street: string) => {
  // Get apartment building schedule for current municipality/street combination
  const apartmentBuilding = schedule[municipality][street].apartmentBuilding

  const emptyApartmentBuildingSchedule =
    isEmpty(apartmentBuilding.regular) && isEmpty(apartmentBuilding.organic)

  // If apartment building schedule is empty, auto-select single home as
  // building type.
  if (emptyApartmentBuildingSchedule) {
    return Building.SingleHome
  }
}

export const generateCombinations = (
  buildingSchedule: BuildingSchedule
): string[] => {
  let { regular, organic } = buildingSchedule

  if (regular.length === 0) return organic.map((d: Weekday) => `null+${d}`)
  if (organic.length === 0) return regular.map((d: Weekday) => `${d}+null`)

  const combinations = [] as string[]

  regular.forEach((regularDay: Weekday) => {
    organic.forEach((organicDay: Weekday) => {
      combinations.push(`${regularDay}+${organicDay}`)
    })
  })

  return combinations
}

export const maybeGetPickupDays = (
  municipality: string,
  street: string,
  buildingType: Building
) => {
  // Get schedule for current municipality/street/buildingType combination
  const mySchedule = schedule[municipality][street][buildingType]

  // If there's only one option for a pickup day, just take that as street part.
  if (mySchedule.regular.length <= 1 && mySchedule.organic.length <= 1) {
    return generateCombinations(mySchedule)[0]
  }
}
