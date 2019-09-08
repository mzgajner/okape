const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const _ = require('lodash');

const DAYS = [
  'ponedeljek',
  'torek',
  'sreda',
  'četrtek',
  'petek',
];
const MUNICIPALITIES = [
  'Bistrica ob Sotli',
  'Kozje',
  'Podčetrtek',
  'Rogaška Slatina',
  'Rogatec',
  'Šmarje pri Jelšah',
]
const OKP_URL = 'http://okp.si/jsnaga_urniki_odvoza_gospodinjstvo_2019.php';

axios.get(OKP_URL).then((response) => {
  // Parse HTML to get an array of lines
  const $ = cheerio.load(response.data)
  const tableRows = $('body table tr');
  const scheduleLines = [];

  tableRows.each((i, row) => {
    const rowText = $(row)
      .text()
      .split('\n')
      .map(text => text.replace(/ +(?= )/g,'').trim())
      .slice(1, 6)
    scheduleLines.push(rowText);
  });

  // Remove the first line with day names
  scheduleLines.shift();

  // Walk through the lines and build an object of column value arrays keyed by day
  const columns = scheduleLines.reduce((acc, line) => {
    DAYS.forEach((day, index) => {
      const existingValues = acc[day];
      const newValue = line[index];
      if (newValue.trim() !== '') {
        acc[day] = existingValues ? existingValues.concat([newValue]) : [newValue];
      }
    })
    return acc;
  }, {});

  // Construct object of street arrays keyed by municipalities
  let streetsByMunicipality = _.fromPairs(MUNICIPALITIES.map(m => [m, {}]));

  DAYS.forEach(day => {
    let currentMunicipality = null;
    columns[day].forEach(value => {
      const municipality = checkMunicipality(value);
      if (municipality) {
        currentMunicipality = municipality;
      } else {
        const existingStreets = streetsByMunicipality[currentMunicipality];
        const streetName = checkPartialStreet(value, existingStreets);
        existingStreets[streetName] = day;
      }
    });
  });

  streetsByMunicipality = sortKeys(streetsByMunicipality);
  streetsByMunicipality = _.mapValues(streetsByMunicipality, sortKeys);

  fs.writeFileSync(
    'src/schedule.json',
    JSON.stringify(streetsByMunicipality, null, 4)
  );
});


function checkMunicipality(string) {
  // Municipalities are uppercase in the input data
  if (string !== string.toUpperCase()) {
    return null
  }
  const lowerCaseMunicipalities = MUNICIPALITIES.map(m => m.toLowerCase())
  const position = lowerCaseMunicipalities.indexOf(string.toLowerCase());
  return MUNICIPALITIES[position];
}

function checkPartialStreet(streetName, existingStreets) {
  const partial = streetName.match(/\s?-\s?del/);
  let newName = cleanUp(streetName);

  if (partial) {
    let partCount = 1;
    do {
      newName = streetName.replace(partial[0], ` - ${partCount}. del`);
      partCount++;
    } while(existingStreets[newName])
  }

  return newName;
}

const STREET_NAME_FIXES = {
  'Dol/Mestinje': 'Dol pri Pristavi',
  'Brezovec/Rogatec': 'Brezovec pri Rogatcu',
  'Brezovec/Polje': 'Brezovec pri Polju',
  'Pristava/Lesično': 'Pristava pri Lesičnem',
  'Pristava/Mestinje': 'Pristava pri Mestinju',
  'Cerovec/Šmarje': 'Cerovec pri Šmarju',
  'Zg.Sečovo': 'Zg. Sečovo'
};

function cleanUp(streetName) {
  return STREET_NAME_FIXES[streetName] || streetName;
}

function sortKeys(object) {
  return Object.keys(object)
    .sort((a, b) => a.localeCompare(b))
    .reduce(function (result, key) {
      result[key] = object[key];
      return result;
    }, {});
}
