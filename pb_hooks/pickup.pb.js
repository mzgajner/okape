/// <reference path="../pb_data/types.d.ts" />

routerAdd('GET', '/api/pickup', (e) => {
  try {
    const buildingType = Number(e.request.url.query().get('buildingType'))
    const streetId = Number(e.request.url.query().get('streetId'))
    const houseNumber = e.request.url.query().get('houseNumber').toLowerCase()

    if (!buildingType || !streetId || !houseNumber) {
      return e.json(400, {
        error: 'Missing required query parameters: buildingType, streetId, houseNumber',
      })
    }

    const getPickups = require(`${__hooks}/pickups.js`)
    const results = getPickups(buildingType, streetId, houseNumber)
    return e.json(200, { pickups: results })
  } catch (err) {
    return e.json(500, { error: 'Internal error: ' + err })
  }
})

routerAdd('GET', '/api/calendar/{buildingType}/{streetId}/{houseNumber}', (e) => {
  try {
    const buildingType = Number(e.request.pathValue('buildingType'))
    const streetId = Number(e.request.pathValue('streetId'))
    const houseNumber = e.request.pathValue('houseNumber').toLowerCase()

    if (!buildingType || !streetId || !houseNumber) {
      return e.json(400, {
        error: 'Missing required parameters: buildingType, streetId, houseNumber',
      })
    }

    var typeLabels = {
      PACKAGING: 'embalaža',
      MIXED: 'mešani odpadki',
      PAPER: 'papir',
      GLASS: 'steklo',
      TEXTILE: 'tekstil',
      ELECTRONICS: 'elektronika',
      ORGANIC: 'biološki odpadki',
    }

    const getPickups = require(`${__hooks}/pickups.js`)
    var raw = getPickups(buildingType, streetId, houseNumber)
    // PocketBase's Goja runtime returns JSON field values as string-like proxies
    var pickups = Array.isArray(raw) && raw.length > 0 && typeof raw[0] === 'number'
      ? JSON.parse(raw.toString())
      : raw

    var today = new Date().toISOString().split('T')[0]
    var endOfYear = new Date().getFullYear() + '-12-31'

    var lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//mzgajner/okape//NONSGML v1.0//EN',
      'X-WR-CALNAME:Odvoz odpadkov',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ]

    for (var i = 0; i < pickups.length; i++) {
      var p = pickups[i]
      if (!p || !p.date) continue
      if (p.date < today || p.date > endOfYear) continue

      var label = typeLabels[p.type] || p.type
      var dateStr = ('' + p.date).replace(/-/g, '')

      // Calculate next day for DTEND (all-day event)
      var parts = p.date.split('-')
      var nextDay = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]) + 1)
      var nextDayStr =
        nextDay.getFullYear().toString() +
        ('0' + (nextDay.getMonth() + 1)).slice(-2) +
        ('0' + nextDay.getDate()).slice(-2)

      lines.push('BEGIN:VEVENT')
      lines.push('UID:' + p.date + '-' + p.type + '@okape')
      lines.push('DTSTART;VALUE=DATE:' + dateStr)
      lines.push('DTEND;VALUE=DATE:' + nextDayStr)
      lines.push('SUMMARY:Odvoz - ' + label)
      lines.push('BEGIN:VALARM')
      lines.push('ACTION:DISPLAY')
      lines.push('DESCRIPTION:Jutri odvoz: ' + label)
      lines.push('TRIGGER:-PT6H')
      lines.push('END:VALARM')
      lines.push('END:VEVENT')
    }

    lines.push('END:VCALENDAR')

    var ics = lines.join('\r\n')

    e.response.header().set('Content-Type', 'text/calendar; charset=utf-8')
    e.response.header().set('Content-Disposition', 'attachment; filename="odvozi.ics"')
    return e.string(200, ics)
  } catch (err) {
    return e.json(500, { error: 'Internal error: ' + err })
  }
})
