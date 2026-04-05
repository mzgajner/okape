/// <reference path="../pb_data/types.d.ts" />

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

var typeMap = {
  'rumena vreča': 'PACKAGING',
  'mešan komunalni odpad': 'MIXED',
  'papir, časopisi, revije': 'PAPER',
  'steklena embalaža': 'GLASS',
  'tekstil': 'TEXTILE',
  'bela tehnika in elektronska oprema': 'ELECTRONICS',
  'bioloških odpadkov': 'ORGANIC',
}

module.exports = function getPickups(buildingType, streetId, houseNumber) {
  // Check cache: find a matching record less than 1 day old
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().replace('T', ' ')
  try {
    const cached = $app.findFirstRecordByFilter(
      'pickup_results',
      'buildingType={:buildingType} && streetId={:streetId} && houseNumber={:houseNumber} && fetchedAt>={:oneDayAgo}',
      { buildingType: buildingType, streetId: streetId, houseNumber: houseNumber, oneDayAgo: oneDayAgo }
    )
    if (cached) {
      return cached.get('results')
    }
  } catch (e1) {
    // No cached record found, proceed with fetch
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
    throw new Error('Failed to fetch data from odvoz.okp.si (status ' + res.statusCode + ')')
  }

  var html = toString(res.body)

  // Parse pickup entries from HTML
  var results = []
  var blocks = html.split('<div class="col-md-12">')

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

    var type = typeMap[rawType]
    if (!type) continue

    results.push({
      date: `${year}-${month}-${day}`,
      type: type,
    })
  }

  // Store results in cache (upsert: update existing or create new)
  try {
    var record
    try {
      record = $app.findFirstRecordByFilter(
        'pickup_results',
        'buildingType={:buildingType} && streetId={:streetId} && houseNumber={:houseNumber}',
        { buildingType: buildingType, streetId: streetId, houseNumber: houseNumber }
      )
    } catch (e2) {
      // No existing record, create a new one
      const collection = $app.findCollectionByNameOrId('pickup_results')
      record = new Record(collection)
      record.set('buildingType', buildingType)
      record.set('streetId', streetId)
      record.set('houseNumber', houseNumber)
    }
    record.set('results', results)
    $app.save(record)
  } catch (cacheErr) {
    console.log('Failed to cache pickup results:', cacheErr)
  }

  return results
}
