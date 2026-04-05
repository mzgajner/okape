import type { PickupEntry } from './types'

export async function fetchPickups(
  buildingType: string,
  streetId: string,
  houseNumber: string,
): Promise<PickupEntry[]> {
  const params = new URLSearchParams({ buildingType, streetId, houseNumber })
  const response = await fetch(`/api/pickup?${params}`)

  if (!response.ok) {
    throw new Error('Napaka pri iskanju terminov')
  }

  const data = await response.json()
  return data.pickups
}
