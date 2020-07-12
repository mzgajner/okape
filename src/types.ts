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

export type BuildingSchedule = {
  [pickup in Pickup]: Weekday[]
}

export type StreetSchedule = {
  [building in Building]: BuildingSchedule
}

export type MunicipalitySchedule = {
  [street:string]: StreetSchedule
}

export type Schedule = {
  [municipality:string]: MunicipalitySchedule
}
