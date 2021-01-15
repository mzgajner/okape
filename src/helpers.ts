import {
  addDays,
  differenceInDays,
  formatDistance,
  formatRelative,
  getDay,
  getWeek,
  startOfToday,
} from 'date-fns'
import sl from 'date-fns/locale/sl'

import { Weekday, Color, Schedule } from './types'
import scheduleRaw from './schedule.json'

export const schedule = scheduleRaw as Schedule

type GarbageType = {
  label: string
  color: Color
  validate(date: Date): boolean
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

const allGarbageTypes: GarbageType[] = [
  packaging,
  mixed,
  paper,
  glass,
  textile,
  electronics,
]

function checkDate(date: Date, day: number, garbageType: GarbageType) {
  return getDay(date) === day && garbageType.validate(date)
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

export function generatePickups(weekdayName: string): Pickup[] {
  const weekdayNumber = Object.values(Weekday).indexOf(weekdayName as Weekday)

  return allGarbageTypes
    .map((type) => {
      let date = new Date()

      while (checkDate(date, weekdayNumber, type) !== true) {
        date = addDays(date, 1)
      }

      return { type: type.label, color: type.color, time: date }
    })
    .sort((a, b) => Number(a.time) - Number(b.time))
    .map((day) => ({ ...day, time: formatDate(day.time) }))
}
