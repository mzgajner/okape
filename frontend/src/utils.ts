import { differenceInDays, formatDistance, formatRelative, startOfToday, parseISO } from 'date-fns'
import { sl } from 'date-fns/locale'

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
