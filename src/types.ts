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

export enum Municipality {
  Bistrica = 'Bistrica ob Sotli',
  Kozje = 'Kozje',
  Podcetrtek = 'Podčetrtek',
  Rogaska = 'Rogaška Slatina',
  Rogatec = 'Rogatec',
  Smarje = 'Šmarje pri Jelšah',
}

export enum Color {
  Red = 'bg-red-400',
  Yellow = 'bg-yellow-300',
  Blue = 'bg-blue-400',
  Green = 'bg-green-400',
  Purple = 'bg-purple-300',
  Brown = 'bg-yellow-900 text-white',
  Greenish = 'bg-green-900 text-white',
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
