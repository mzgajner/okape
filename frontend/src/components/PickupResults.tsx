import { useMemo, useState, useEffect } from 'preact/hooks'
import { Button } from '@/components/Button'
import { AddToCalendarButton } from '@/components/AddToCalendarButton'
import { PickupLoadingState } from '@/components/PickupLoadingState'
import { fetchPickups } from '@/api'
import { garbageTypeConfig } from '@/metadata'
import { formatPickupDate } from '@/utils'
import type { PickupEntry, Location } from '@/types'

interface Props {
  location: Location
  onReset: () => void
}

export function PickupResults({ location, onReset }: Props) {
  const [pickups, setPickups] = useState<PickupEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    const buildingType = location.buildingType === 'hisa' ? '1' : '3'
    try {
      const result = await fetchPickups(
        buildingType,
        location.streetId.toString(),
        location.houseNumber,
      )
      if (result.length === 0) {
        setError('Za izbrano lokacijo ni najdenih odvozov.')
      } else {
        setPickups(result)
      }
    } catch {
      setError('Napaka pri pridobivanju podatkov. Poskusite znova.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const nextPickups = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]
    const byType = new Map<string, PickupEntry>()

    for (const pickup of pickups) {
      if (pickup.date < today) continue
      const existing = byType.get(pickup.type)
      if (!existing || pickup.date < existing.date) {
        byType.set(pickup.type, pickup)
      }
    }

    return [...byType.values()]
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((p) => {
        const config = garbageTypeConfig[p.type]
        return {
          ...p,
          displayName: config?.label ?? p.type,
          color: config?.color ?? '#888',
          formattedDate: formatPickupDate(p.date),
        }
      })
  }, [pickups])

  if (loading) return <PickupLoadingState location={location} />

  if (error)
    return (
      <div class="space-y-4">
        <p class="text-destructive text-base text-center">{error}</p>
        <Button variant="outline" onClick={onReset} class="w-full">
          Spremeni lokacijo
        </Button>
      </div>
    )

  return (
    <div class="space-y-4">
      <ul class="space-y-3">
        {nextPickups.map((pickup) => (
          <li key={pickup.type} class="flex items-center gap-3">
            <span
              class="inline-block w-5 h-5 rounded-full shrink-0"
              style={{ backgroundColor: pickup.color }}
            />
            <span class="font-medium">{pickup.displayName}</span>
            <span class="text-muted ml-auto whitespace-nowrap">{pickup.formattedDate}</span>
          </li>
        ))}
      </ul>

      <AddToCalendarButton location={location} class="mt-8" />
      <Button variant="outline" onClick={onReset} class="w-full">
        Spremeni lokacijo
      </Button>
    </div>
  )
}
