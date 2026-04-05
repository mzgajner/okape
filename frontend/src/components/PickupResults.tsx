import { useMemo } from 'preact/hooks'
import type { PickupEntry } from '../types'
import { formatPickupDate } from '../date-format'

const typeLabels: Record<string, string> = {
  'rumena vreča': 'embalaža',
  'mešan komunalni odpad': 'mešani odpadki',
  'papir, časopisi, revije': 'papir',
  'steklena embalaža': 'steklo',
  'tekstil': 'tekstil',
  'bela tehnika in elektronska oprema': 'elektronika',
  'bioloških odpadkov': 'biološki odpadki',
}

interface Props {
  pickups: PickupEntry[]
  onReset: () => void
}

export function PickupResults({ pickups, onReset }: Props) {
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
      .map((p) => ({
        ...p,
        displayName: typeLabels[p.type] || p.type,
        formattedDate: formatPickupDate(p.date),
      }))
  }, [pickups])

  return (
    <div class="space-y-4">
      <ul class="space-y-3">
        {nextPickups.map((pickup) => (
          <li key={pickup.type} class="flex items-center gap-3">
            <span
              class="inline-block w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: pickup.color }}
            />
            <span class="font-medium">{pickup.displayName}</span>
            <span class="text-muted ml-auto whitespace-nowrap">{pickup.formattedDate}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onReset}
        class="w-full py-2 text-sm text-muted hover:text-inherit transition-colors cursor-pointer bg-transparent border-0"
      >
        Spremeni lokacijo
      </button>
    </div>
  )
}
