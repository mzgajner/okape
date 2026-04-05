import { Spinner } from './Spinner'
import { streets } from '../streets'
import type { SavedLocation } from '../types'

interface Props {
  location: SavedLocation
}

function getLocationLabel(location: SavedLocation): string {
  const street = streets.find((s) => s.value === location.streetId)
  if (!street) return ''
  return `${street.label} ${location.houseNumber}, ${street.municipality}`
}

export function AutoLoadingState({ location }: Props) {
  return (
    <div class="flex flex-col items-center gap-3 py-4">
      <Spinner class="h-6 w-6 text-muted" />
      <p class="text-base text-muted">Nalagam termine odvoza za {getLocationLabel(location)}</p>
    </div>
  )
}
