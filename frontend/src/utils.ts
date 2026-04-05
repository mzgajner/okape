import { differenceInDays, formatDistance, formatRelative, startOfToday, parseISO } from 'date-fns'
import { sl } from 'date-fns/locale'
import { createEvents } from 'ics'
import type { EventAttributes } from 'ics'
import { garbageTypeConfig } from '@/metadata'
import type { PickupEntry } from '@/types'

export function formatPickupDate(isoDate: string): string {
  const date = parseISO(isoDate)
  const today = startOfToday()

  if (differenceInDays(date, today) <= 6) {
    return formatRelative(date, today, { locale: sl })
      .split(' ob ')[0]
      .replace(/naslednj[io]/, 'v')
  } else {
    return formatDistance(date, today, { locale: sl, addSuffix: true })
  }
}

export function downloadCalendar(pickups: PickupEntry[]) {
  const today = new Date().toISOString().split('T')[0]
  const endOfYear = `${new Date().getFullYear()}-12-31`

  const events: EventAttributes[] = pickups
    .filter((p) => p.date >= today && p.date <= endOfYear)
    .map((p) => {
      const [y, m, d] = p.date.split('-').map(Number)
      const config = garbageTypeConfig[p.type]
      const label = config?.label ?? p.type
      return {
        title: `Odvoz - ${label}`,
        start: [y, m, d] as [number, number, number],
        duration: { days: 1 },
        uid: `${p.date}-${p.type}@okape`,
        alarms: [
          {
            action: 'display' as const,
            trigger: { hours: 6, minutes: 0, before: true },
            description: `Jutri odvoz: ${label}`,
          },
        ],
      }
    })

  const { value } = createEvents(events, {
    calName: 'Odvoz odpadkov',
    productId: 'mzgajner/okape',
  })
  if (!value) return

  const blob = new Blob([value], { type: 'text/calendar' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'odvozi.ics'
  a.click()
  URL.revokeObjectURL(url)
}
