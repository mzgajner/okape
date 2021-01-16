export enum Weekday {
  Sunday = 'nedelja',
  Monday = 'ponedeljek',
  Tuesday = 'torek',
  Wednesday = 'sreda',
  Thursday = 'četrtek',
  Friday = 'petek',
  Saturday = 'sobota',
}

export enum Building {
  SingleHome = 'singleHome',
  ApartmentBuilding = 'apartmentBuilding',
}

enum Pickup {
  Regular = 'regular',
  Organic = 'organic',
}

export enum Color {
  Red = 'bg-red-400',
  Yellow = 'bg-yellow-300',
  Blue = 'bg-blue-400',
  Green = 'bg-green-400',
  Purple = 'bg-purple-300',
  Brown = 'bg-yellow-900 bg-opacity-50',
  Greenish = 'bg-green-900 bg-opacity-50',
}

export type BuildingSchedule = {
  [pickup in Pickup]: Weekday[]
}

export type StreetSchedule = {
  [building in Building]: BuildingSchedule
}

export type MunicipalitySchedule = {
  [street: string]: StreetSchedule
}

export type Schedule = {
  [municipality: string]: MunicipalitySchedule
}
