import { useMemo } from 'preact/hooks'
import type { Location } from '@/types'

interface Props {
  location: Location
  class?: string
}

function getCalendarUrl(location: Location): string {
  const buildingType = location.buildingType === 'hisa' ? '1' : '3'
  const host = window.location.host
  const icsPath = `/api/calendar/${buildingType}/${location.streetId}/${location.houseNumber}/calendar.ics`
  const ua = navigator.userAgent

  if (/iPhone|iPad|Macintosh/.test(ua)) {
    return `webcal://${host}${icsPath}`
  }

  if (/Android/.test(ua)) {
    return `https://calendar.google.com/calendar/r?cid=webcal://${host}${icsPath}`
  }

  return `https://${host}${icsPath}`
}

export function AddToCalendarButton({ location, class: className }: Props) {
  const calendarUrl = useMemo(() => getCalendarUrl(location), [location])

  return (
    <a
      href={calendarUrl}
      class={`inline-flex items-center justify-center rounded-lg text-base font-medium border transition-colors cursor-pointer bg-primary text-primary-fg border-primary ${className ?? ''}`}
    >
      Dodaj na koledar
    </a>
  )
}
