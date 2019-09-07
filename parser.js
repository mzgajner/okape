const parse = require('csv-parse/lib/sync')
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

// Parse CSV to get all lines in the file
const scheduleCsv = fs.readFileSync('schedule.csv', 'utf-8');
const scheduleLines = parse(scheduleCsv, {
  columns: true,
  skip_empty_lines: true
})

// Walk through the lines and build an object column value arrays keyed by day
const columns = scheduleLines.reduce((acc, line) => {
  DAYS.forEach(day => {
    const existingValues = acc[day];
    const newValue = line[day.toUpperCase()];
    if (newValue.trim() !== '') {
      acc[day] = existingValues ? existingValues.concat([newValue]) : [newValue];
    }
  })
  return acc;
}, {})

// Construct object of street arrays keyed by municipalities
let streetsByMunicipality = _.fromPairs(MUNICIPALITIES.map(m => [m, {}]));

DAYS.forEach(day => {
  let currentMunicipality = null;
  columns[day].forEach(value => {
    const municipality = checkMunicipality(value);
    if (municipality) {
      currentMunicipality = municipality;
    } else {
      const street = value;
      streetsByMunicipality[currentMunicipality][street] = day;
    }
  });
});

// streetsByMunicipality = _.mapValues(streetsByMunicipality, s => s.sort());

function checkMunicipality(string) {
  // Municipalities are uppercase in the input CSV
  if (string !== string.toUpperCase()) {
    return null
  }
  const lowerCaseMunicipalities = MUNICIPALITIES.map(m => m.toLowerCase())
  const position = lowerCaseMunicipalities.indexOf(string.toLowerCase());
  return MUNICIPALITIES[position];
}

console.log(streetsByMunicipality);
