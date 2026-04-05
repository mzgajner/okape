import { useState } from 'preact/hooks'
import { LocationSelection } from './components/LocationSelection'
import { PickupResults } from './components/PickupResults'
import type { Location } from './types'
import garbageTruck from './assets/garbage_truck.svg'

const STORAGE_KEY = 'okape-location'

function loadSavedLocation(): Location | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    return JSON.parse(raw)
  } catch {
    return undefined
  }
}

export function App() {
  const [location, setLocation] = useState(loadSavedLocation)

  function handleSubmit(loc: Location) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loc))
    setLocation(loc)
  }

  function resetLocation() {
    localStorage.removeItem(STORAGE_KEY)
    setLocation(undefined)
  }

  return (
    <div class="min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full px-4 py-8">
        <div class="text-center mb-8">
          <img src={garbageTruck} alt="O Ka Pe" class="w-20 h-20 mx-auto mb-3" />
        </div>

        {location ? (
          <PickupResults location={location} onReset={resetLocation} />
        ) : (
          <LocationSelection onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  )
}
