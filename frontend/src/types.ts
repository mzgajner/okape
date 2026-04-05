export enum GarbageType {
  Packaging = 'PACKAGING',
  Mixed = 'MIXED',
  Paper = 'PAPER',
  Glass = 'GLASS',
  Textile = 'TEXTILE',
  Electronics = 'ELECTRONICS',
  Organic = 'ORGANIC',
}

export type PickupEntry = {
  date: string
  type: GarbageType
}

export type BuildingType = 'hisa' | 'blok'

export enum Municipality {
  BistricaObSotli = 'Bistrica Ob Sotli',
  Kozje = 'Kozje',
  Podcetrtek = 'Podčetrtek',
  RogaskaSlatina = 'Rogaška Slatina',
  Rogatec = 'Rogatec',
  SmarjePriJelsah = 'Šmarje pri Jelšah',
}

export type Street = {
  value: number
  label: string
  municipality: Municipality
}

export type Location = {
  buildingType: BuildingType
  streetId: number
  houseNumber: string
}
