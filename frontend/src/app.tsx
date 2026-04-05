import { useState, useEffect } from 'preact/hooks'
import { LocationForm } from './components/LocationForm'
import { PickupResults } from './components/PickupResults'
import { fetchPickups } from './api'
import { AutoLoadingState } from './components/AutoLoadingState'
import type { PickupEntry, SavedLocation } from './types'
import garbageTruck from './assets/garbage_truck.svg'

const STORAGE_KEY = 'okape-location'

function loadSavedLocation(): SavedLocation | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    return JSON.parse(raw)
  } catch {
    return undefined
  }
}

export function App() {
  const [pickups, setPickups] = useState<PickupEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedLocation] = useState(loadSavedLocation)
  const [autoLoading, setAutoLoading] = useState(!!savedLocation)

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
    if (savedLocation) {
      handleSubmit(savedLocation)
    }
  }, [])

  return (
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full px-4 py-8">
        <div class="text-center mb-8">
          <img src={garbageTruck} alt="O Ka Pe" class="w-20 h-20 mx-auto mb-3" />
        </div>

        {pickups.length > 0 ? (
          <PickupResults pickups={pickups} onReset={resetLocation} />
        ) : autoLoading ? (
          <AutoLoadingState location={savedLocation!} />
        ) : (
          <LocationForm loading={loading} error={error} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  )
}
