export type PickupEntry = {
  date: string
  type: string
  color: string
}

export type BuildingType = 'hisa' | 'blok'

export type Street = {
  value: string
  label: string
  municipality: string
}

export type SavedLocation = {
  buildingType: BuildingType
  streetId: string
  houseNumber: string
}
