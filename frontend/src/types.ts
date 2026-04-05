export type PickupEntry = {
  date: string
  type: string
  color: string
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

export type SavedLocation = {
  buildingType: BuildingType
  streetId: number
  houseNumber: string
}
