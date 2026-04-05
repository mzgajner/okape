import { useState, useEffect } from 'preact/hooks'
import { LocationForm } from './components/LocationForm'
import { PickupResults } from './components/PickupResults'
import { fetchPickups } from './api'
import { streets } from './streets'
import type { PickupEntry, SavedLocation } from './types'
import garbageTruck from './assets/garbage_truck.svg'

const STORAGE_KEY = 'okape-location'

function loadSavedLocation(): SavedLocation | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function getLocationLabel(location: SavedLocation): string {
  const street = streets.find((s) => s.value === location.streetId)
  if (!street) return ''
  return `${street.label}, ${street.municipality}`
}

export function App() {
  const [pickups, setPickups] = useState<PickupEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [autoLoading, setAutoLoading] = useState(false)
  const [autoLoadingLabel, setAutoLoadingLabel] = useState('')

  async function handleSubmit(location: SavedLocation) {
    setLoading(true)
    setError('')

    const tipObjekta = location.buildingType === 'hisa' ? '1' : '3'

    try {
      const result = await fetchPickups(
        tipObjekta,
        location.streetId.toString(),
        location.houseNumber,
      )
      if (result.length === 0) {
        setError('Za izbrano lokacijo ni najdenih odvozov.')
        return
      }
      setPickups(result)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
    } catch {
      setError('Napaka pri pridobivanju podatkov. Poskusite znova.')
    } finally {
      setLoading(false)
      setAutoLoading(false)
    }
  }

  function resetLocation() {
    setPickups([])
    localStorage.removeItem(STORAGE_KEY)
  }

  useEffect(() => {
    const location = loadSavedLocation()
    if (location) {
      setAutoLoading(true)
      setAutoLoadingLabel(`Nalagam termine odvoza za ${getLocationLabel(location)}`)
      handleSubmit(location)
    }
  }, [])

  return (
    <div class="min-h-screen">
      <div class="max-w-md mx-auto px-4 py-8">
        <div class="text-center mb-8">
          <img src={garbageTruck} alt="O Ka Pe" class="w-20 h-20 mx-auto mb-3" />
          <h1 class="text-2xl font-bold text-primary">O Ka Pe</h1>
        </div>

        <div class="bg-card-bg rounded-xl border border-border p-6 shadow-sm">
          {pickups.length > 0 ? (
            <PickupResults pickups={pickups} onReset={resetLocation} />
          ) : autoLoading ? (
            <div class="flex flex-col items-center gap-3 py-4">
              <svg
                class="h-6 w-6 animate-spin text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <p class="text-sm text-muted">{autoLoadingLabel}</p>
            </div>
          ) : (
            <LocationForm loading={loading} error={error} onSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  )
}
