import { Spinner } from '@/components/Spinner'
import { streets } from '@/metadata'
import type { Location } from '@/types'

interface Props {
  location: Location
}

function getLocationLabel(location: Location): string {
  const street = streets.find((s) => s.value === location.streetId)
  if (!street) return ''
  return `${street.label} ${location.houseNumber}, ${street.municipality}`
}

export function PickupLoadingState({ location }: Props) {
  return (
    <div class="flex flex-col items-center gap-3 py-4">
      <Spinner class="h-6 w-6 text-muted" />
      <p class="text-base text-center text-muted">
        Nalagam termine za
        <br />
        {getLocationLabel(location)}
      </p>
    </div>
  )
}
