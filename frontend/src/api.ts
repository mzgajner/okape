import type { PickupEntry } from './types'

export async function fetchPickups(
  tipObjekta: string,
  ulicaId: string,
  hisnaStevilka: string,
): Promise<PickupEntry[]> {
  const params = new URLSearchParams({
    tipObjekta,
    ulica_idUlica: ulicaId,
    hisnaStevilka,
  })

  const response = await fetch(`/api/pickup?${params}`)

  if (!response.ok) {
    throw new Error('Napaka pri pridobivanju podatkov')
  }

  const data = await response.json()
  return data.pickups
}
