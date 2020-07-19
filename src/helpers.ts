import { addDays, differenceInDays, formatDistance, formatRelative, getDay, getWeek, startOfToday } from 'date-fns'
import { sl } from 'date-fns/locale'

import { Weekday, Color, Schedule } from './types'
import scheduleRaw from './schedule.json';

export const schedule = scheduleRaw as Schedule;

type GarbageType = {
  label: string,
  color: Color,
  validate(date: Date): boolean,
}

export type Pickup = {
  type: string,
  color: Color,
  time: string,
}

const packaging:GarbageType = {
  label: 'embalaža',
  color: Color.Yellow,
  validate: (date: Date) => getWeek(date) % 2 === 0,
}

const mixed:GarbageType = {
  label: 'mešani odpadki',
  color: Color.Green,
  validate: (date: Date) => getWeek(date) % 2 === 1,
}

const paper:GarbageType = {
  label: 'papir',
  color: Color.Blue,
  validate: (date: Date) => [3, 13, 21, 29, 39, 47].includes(getWeek(date)),
}

const glass:GarbageType = {
  label: 'steklo',
  color: Color.Red,
  validate: (date: Date) => [7, 17, 25, 35, 43, 51].includes(getWeek(date)),
}

const textile:GarbageType = {
  label: 'tekstil',
  color: Color.Greenish,
  validate: (date: Date) => [11, 41].includes(getWeek(date)),
}

const electronics:GarbageType = {
  label: 'elektronika',
  color: Color.Purple,
  validate: (date: Date) => [19, 49].includes(getWeek(date)),
}

const allGarbageTypes:GarbageType[] = [packaging, mixed, paper, glass, textile, electronics];

function checkDate(date: Date, day: number, garbageType: GarbageType) {
  return getDay(date) === day && garbageType.validate(date);
};

function formatDate(date: Date) {
  const today = startOfToday();

  if (differenceInDays(date, today) <= 6) {
    return formatRelative(date, today, { locale: sl })
      .split(' ob ')[0]
      .replace('naslednji', 'v');
  } else {
    return formatDistance(date, today, { locale: sl, addSuffix: true });
  }
};

export function generatePickups(weekdayName: string): Pickup[] {
  const weekdayNumber = Object.values(Weekday).indexOf(weekdayName as Weekday);

  return allGarbageTypes
    .map(type => {
      let date = new Date();

      while (checkDate(date, weekdayNumber, type) !== true) {
        date = addDays(date, 1);
      }

      return { type: type.label, color: type.color, time: date };
    })
    .sort((a, b) => Number(a.time) - Number(b.time))
    .map(day => ({...day, time: formatDate(day.time)}));
}
