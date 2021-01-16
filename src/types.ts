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
  Red = '#FE7568',
  Yellow = '#FEE760',
  Blue = '#5FA1E8',
  Green = '#5CCC54',
  Purple = '#C763F2',
  Brown = '#D09C7D',
  Greenish = '#AAAD3E',
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
