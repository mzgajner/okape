import { useMemo } from 'preact/hooks'
import type { Location } from '@/types'
import { Button } from '@/components/Button'
import { IconCalendar } from '@/components/IconCalendar'
import { IconDownload } from '@/components/IconDownload'

interface Props {
  location: Location
  class?: string
}

function getIcsPath(location: Location): string {
  const buildingType = location.buildingType === 'hisa' ? '1' : '3'
  return `/api/calendar/${buildingType}/${location.streetId}/${location.houseNumber}/calendar.ics`
}

function getCalendarUrl(icsPath: string): string {
  const host = window.location.host
  const ua = navigator.userAgent

  if (/iPhone|iPad|Macintosh/.test(ua)) {
    return `webcal://${host}${icsPath}`
  }

  return `https://calendar.google.com/calendar/r?cid=webcal://${host}${icsPath}`
}

function getIcsDownloadUrl(icsPath: string): string {
  return `https://${window.location.host}${icsPath}`
}

export function AddToCalendarButton({ location, class: className }: Props) {
  const icsPath = useMemo(() => getIcsPath(location), [location])
  const calendarUrl = useMemo(() => getCalendarUrl(icsPath), [icsPath])
  const icsDownloadUrl = useMemo(() => getIcsDownloadUrl(icsPath), [icsPath])

  return (
    <div class={className}>
      <Button href={calendarUrl} class="w-full">
        <IconCalendar class="w-5 h-5 mr-2" />
        Dodaj na koledar
      </Button>
      <Button href={icsDownloadUrl} class="w-full mt-4">
        <IconDownload class="w-5 h-5 mr-2" />
        Prenesi datoteko .ics
      </Button>
    </div>
  )
}
