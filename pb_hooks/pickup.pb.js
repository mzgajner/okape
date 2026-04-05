/// <reference path="../pb_data/types.d.ts" />

routerAdd('GET', '/api/pickup', (e) => {
  try {
    const buildingType = e.request.url.query().get('buildingType')
    const streetId = e.request.url.query().get('streetId')
    const houseNumber = e.request.url.query().get('houseNumber')

    if (!buildingType || !streetId || !houseNumber) {
      return e.json(400, {
        error: 'Missing required query parameters: buildingType, streetId, houseNumber',
      })
    }

    const url =
      'https://odvoz.okp.si/iskalnik/index?' +
      `tipObjekta=${encodeURIComponent(buildingType)}&` +
      `ulica_idUlica=${encodeURIComponent(streetId)}&` +
      `&hisnaStevilka=${encodeURIComponent(houseNumber)}`

    const res = $http.send({
      url: url,
      method: 'GET',
      timeout: 30,
    })

    if (res.statusCode !== 200) {
      return e.json(502, {
        error: 'Failed to fetch data from odvoz.okp.si',
        status: res.statusCode,
      })
    }

    var html = toString(res.body)

    // Parse pickup entries from HTML
    var results = []
    var blocks = html.split('<div class="col-md-12">')

    var monthMap = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      Maj: '05',
      Jun: '06',
      Jul: '07',
      Avg: '08',
      Sep: '09',
      Okt: '10',
      Nov: '11',
      Dec: '12',
    }

    for (var j = 0; j < blocks.length; j++) {
      var block = blocks[j]
      if (block.indexOf('date-box') === -1) continue

      var dayMatch = block.match(/<div class="day">(\d+)<\/div>/)
      var monthMatch = block.match(/<div class="month">([^<]+)<\/div>/)
      var yearMatch = block.match(/<div class="year">(\d+)<\/div>/)
      if (!dayMatch || !monthMatch || !yearMatch) continue

      var day = dayMatch[1].replace(/^\s+|\s+$/g, '')
      var monthStr = monthMatch[1].replace(/^\s+|\s+$/g, '')
      var year = yearMatch[1].replace(/^\s+|\s+$/g, '')
      var month = monthMap[monthStr] || '01'
      while (day.length < 2) day = '0' + day

      var typeMatch = block.match(/Odvoz\s+([^<]+)/)
      if (!typeMatch) continue
      var rawType = typeMatch[1].replace(/^\s+|\s+$/g, '')

      var typeMap = {
        'rumena vreča': 'PACKAGING',
        'mešan komunalni odpad': 'MIXED',
        'papir, časopisi, revije': 'PAPER',
        'steklena embalaža': 'GLASS',
        'tekstil': 'TEXTILE',
        'bela tehnika in elektronska oprema': 'ELECTRONICS',
        'bioloških odpadkov': 'ORGANIC',
      }

      var type = typeMap[rawType]
      if (!type) continue

      results.push({
        date: `${year}-${month}-${day}`,
        type: type,
      })
    }

    return e.json(200, { pickups: results })
  } catch (err) {
    return e.json(500, { error: 'Internal error: ' + err })
  }
})
