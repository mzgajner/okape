import { addDays, differenceInDays, formatDistance, formatRelative, getDay, getWeek, startOfToday } from 'date-fns'
import { sl } from 'date-fns/locale'

type GarbageType = {
  label: string,
  validate(date: Date): boolean,
}

const packaging:GarbageType = {
  label: 'embalažo',
  validate: (date: Date) => getWeek(date) % 2 === 0,
}

const mixed:GarbageType = {
  label: 'mešane odpadke',
  validate: (date: Date) => getWeek(date) % 2 === 1,
}

const paper:GarbageType = {
  label: 'papir',
  validate: (date: Date) => [3, 13, 21, 29, 39, 47].includes(getWeek(date)),
}

const glass:GarbageType = {
  label: 'steklo',
  validate: (date: Date) => [7, 17, 25, 35, 43, 51].includes(getWeek(date)),
}

const textile:GarbageType = {
  label: 'tekstil',
  validate: (date: Date) => [11, 41].includes(getWeek(date)),
}

const electronics:GarbageType = {
  label: 'elektroniko',
  validate: (date: Date) => [19, 49].includes(getWeek(date)),
}

const allGarbageTypes:GarbageType[] = [packaging, mixed, paper, glass, textile, electronics];

const WEEKDAYS = ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota'];

function checkDate(date: Date, day: number, garbageType: GarbageType) {
  return getDay(date) === day && garbageType.validate(date);
};

function formatDate(date: Date) {
  const today = startOfToday();
  let formattingFunction;

  if (differenceInDays(date, today) <= 6) {
    return formatRelative(date, today, { locale: sl })
      .split(' ob ')[0]
      .replace('naslednji', 'v');
  } else {
    return formatDistance(date, today, { locale: sl, addSuffix: true });
  }
};

export function generateDates(weekdayName: string) {
  const weekdayNumber = WEEKDAYS.indexOf(weekdayName);

  return allGarbageTypes.map(type => {
    let date = new Date();

    while (checkDate(date, weekdayNumber, type) !== true) {
      date = addDays(date, 1);
    }

    return `Po ${type.label} pridejo ${formatDate(date)}.`;
  }).join('<br>');
}
