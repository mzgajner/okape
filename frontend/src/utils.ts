import { differenceInDays, formatDistance, formatRelative, startOfToday, parseISO } from 'date-fns'
import { sl } from 'date-fns/locale'
import type { Location } from '@/types'

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

export function getCalendarUrl(location: Location): string {
  const buildingType = location.buildingType === 'hisa' ? '1' : '3'
  const params = new URLSearchParams({
    buildingType,
    streetId: location.streetId.toString(),
    houseNumber: location.houseNumber,
  })
  return `webcal://${window.location.host}/api/calendar.ics?${params}`
}
