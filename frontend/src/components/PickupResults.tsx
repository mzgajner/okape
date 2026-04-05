import { useMemo, useState, useEffect } from 'preact/hooks'
import { Button } from './Button'
import { PickupLoadingState } from './PickupLoadingState'
import { fetchPickups } from '../api'
import { formatPickupDate } from '../date-format'
import { GarbageType } from '../types'
import type { PickupEntry, Location } from '../types'

const garbageTypeConfig: Record<GarbageType, { label: string; color: string }> = {
  [GarbageType.Packaging]: { label: 'embalaža', color: '#fde047' },
  [GarbageType.Mixed]: { label: 'mešani odpadki', color: '#92d050' },
  [GarbageType.Paper]: { label: 'papir', color: '#60a5fa' },
  [GarbageType.Glass]: { label: 'steklo', color: '#f86666' },
  [GarbageType.Textile]: { label: 'tekstil', color: '#c4bd97' },
  [GarbageType.Electronics]: { label: 'elektronika', color: '#8064a2' },
  [GarbageType.Organic]: { label: 'biološki odpadki', color: '#ffa200' },
}

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
        <Button variant="outline" onClick={onReset} class="w-full py-2">
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

      <Button variant="outline" onClick={onReset} class="w-full py-2 mt-4">
        Spremeni lokacijo
      </Button>
    </div>
  )
}
