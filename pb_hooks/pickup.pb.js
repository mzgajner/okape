/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/api/pickup", (e) => {
  try {
    const tipObjekta = e.request.url.query().get("tipObjekta")
    const ulicaId = e.request.url.query().get("ulica_idUlica")
    const hisnaStevilka = e.request.url.query().get("hisnaStevilka")

    if (!tipObjekta || !ulicaId || !hisnaStevilka) {
      return e.json(400, { error: "Missing required parameters: tipObjekta, ulica_idUlica, hisnaStevilka" })
    }

    const url = "https://odvoz.okp.si/iskalnik/index?tipObjekta=" + encodeURIComponent(tipObjekta) + "&ulica_idUlica=" + encodeURIComponent(ulicaId) + "&hisnaStevilka=" + encodeURIComponent(hisnaStevilka)

    const res = $http.send({
      url: url,
      method: "GET",
      timeout: 30,
    })

    if (res.statusCode !== 200) {
      return e.json(502, { error: "Failed to fetch data from odvoz.okp.si", status: res.statusCode })
    }

    // Convert Go byte slice (UTF-8) to JS string
    var rawBody = String(res.body)
    var codes = rawBody.split(",")
    var bytes = new Array(codes.length)
    for (var i = 0; i < codes.length; i++) {
      bytes[i] = +codes[i]
    }
    // Decode UTF-8 bytes to Unicode string
    var html = ""
    var pos = 0
    while (pos < bytes.length) {
      var b = bytes[pos]
      var cp
      if (b < 0x80) {
        cp = b
        pos++
      } else if ((b & 0xE0) === 0xC0) {
        cp = ((b & 0x1F) << 6) | (bytes[pos + 1] & 0x3F)
        pos += 2
      } else if ((b & 0xF0) === 0xE0) {
        cp = ((b & 0x0F) << 12) | ((bytes[pos + 1] & 0x3F) << 6) | (bytes[pos + 2] & 0x3F)
        pos += 3
      } else {
        cp = ((b & 0x07) << 18) | ((bytes[pos + 1] & 0x3F) << 12) | ((bytes[pos + 2] & 0x3F) << 6) | (bytes[pos + 3] & 0x3F)
        pos += 4
      }
      html += String.fromCodePoint(cp)
    }

    // Parse pickup entries from HTML
    var results = []
    var blocks = html.split('<div class="col-md-12">')

    var monthMap = {
      "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
      "Maj": "05", "Jun": "06", "Jul": "07", "Avg": "08",
      "Sep": "09", "Okt": "10", "Nov": "11", "Dec": "12",
    }

    for (var j = 0; j < blocks.length; j++) {
      var block = blocks[j]
      if (block.indexOf("date-box") === -1) continue

      var colorMatch = block.match(/background-color:\s*(#[a-fA-F0-9]+)/)
      if (!colorMatch) continue

      var dayMatch = block.match(/<div class="day">(\d+)<\/div>/)
      var monthMatch = block.match(/<div class="month">([^<]+)<\/div>/)
      var yearMatch = block.match(/<div class="year">(\d+)<\/div>/)
      if (!dayMatch || !monthMatch || !yearMatch) continue

      var day = dayMatch[1].replace(/^\s+|\s+$/g, "")
      var monthStr = monthMatch[1].replace(/^\s+|\s+$/g, "")
      var year = yearMatch[1].replace(/^\s+|\s+$/g, "")
      var month = monthMap[monthStr] || "01"
      while (day.length < 2) day = "0" + day

      var typeMatch = block.match(/Odvoz\s+([^<]+)/)
      if (!typeMatch) continue
      var type = typeMatch[1].replace(/^\s+|\s+$/g, "")

      results.push({
        date: year + "-" + month + "-" + day,
        type: type,
        color: colorMatch[1],
      })
    }

    return e.json(200, { pickups: results })

  } catch (err) {
    return e.json(500, { error: "Internal error: " + err })
  }
})
