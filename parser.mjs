import cheerio from 'cheerio';
import https from 'https';
import fs from 'fs';
import _ from 'lodash-es';

const MUNICIPALITIES = [
  'Bistrica ob Sotli',
  'Kozje',
  'Podčetrtek',
  'Rogaška Slatina',
  'Rogatec',
  'Šmarje pri Jelšah',
]

// Manually corrected typos and inconsistencies
const STREET_NAME_FIXES = {
  'Dol/Mestinje': ['Dol pri Pristavi'],
  'Brezovec/Rogatec': ['Brezovec pri Rogatcu'],
  'Brezovec/Polje': ['Brezovec pri Polju'],
  'Pristava/Lesično': ['Pristava pri Lesičnem'],
  'Pristava/Mestinje': ['Pristava pri Mestinju'],
  'Pristava pri mestinju': ['Pristava pri Mestinju'],
  'Pristava': ['Pristava pri Mestinju'],
  'Cerovec/Šmarje': ['Cerovec pri Šmarju'],
  'Male rodne': ['Male Rodne'],
  'Ulica Kozare': ['Ulica Kozara'],
  'Ulica Talcev': ['Ulica talcev'],
  'Cvetlična ulica': ['Cvetlična'],
  'Bukovje v Babni gori': ['Bukovje v Babni Gori'],
  'Kozjanskega odr.': ['Kozjanskega odreda'],
  'Zagaj': ['Zagaj pod Bočem'],
  'Spodnje Negonje': ['Sp. Negonje'],
  'Cmereška gorca': ['Cmereška Gorca'],
  'Imenska gorca': ['Imenska Gorca'],
  'Vrh pri Šmarju': ['Vrh'],
  'Mala pristava': ['Mala Pristava'],
  'Šentvid': ['Šentvid pri Grobelnem'],
  'Završe': ['Završe pri Grobelnem'],
  'Spodnje selce': ['Sp. Selce'],
  'Ulica XIV. Divizije': ['Ulica XIV. divizije'],
  'Cesta padlih aktivistov NOB': ['Cesta padlih aktivistov NOV'],
  'Padlih aktivistov': ['Cesta padlih aktivistov NOV'],
  'Cerovec': ['Cerovec pod Bočem'],
  'Ločendol': ['Ločen Dol'],
  'Ločen dol': ['Ločen Dol'],
  'Sv. Florjan': ['Sv. Florijan'],
  'Pod Bellevuem': ['Pod Bellevuejem'],
  'Dobovec': ['Dobovec pri Rogatcu'],
  'Sotelska': ['Sotelska cesta'],
  'Celjska': ['Celjska cesta'],
  'Sečovo': ['Sp. Sečovo', 'Zg. Sečovo'],
};

const cleanStreetName = street => {
  const cleanName = street
    .replace(/\s?-\s?del/, '')              // Replace "- del" in streets that span several days
    .replace(/\.(\S)/g, '. $1')             // Add a single space after fullstop
    .replace(/U[l|L]\./, 'Ulica')           // Expand "Ul." to "Ulica"
    .replace(/(?:\d+[a-d]?(?:(?:, ?)|-)?)+/, '')  // Remove house numbers (both comma and dash separated)
    .trim()

  return STREET_NAME_FIXES[cleanName] || [cleanName];
}

function sortKeys(object) {
  return Object.keys(object)
    .sort((a, b) => a.localeCompare(b))
    .reduce(function (result, key) {
      result[key] = object[key];
      return result;
    }, {});
}

const getScheduleForURL = url => {
  const DAYS = [
    'ponedeljek',
    'torek',
    'sreda',
    'četrtek',
    'petek',
  ];

  return new Promise((resolve, reject) => {
    https.get(url, response => {
      response.setEncoding("utf8");
      let body = "";
      response.on("data", data => {
        body += data;
      });
      response.on("end", () => {
        // Parse HTML to get an array of lines
        const $ = cheerio.load(body)
        const tableRows = $('body table:last-of-type tr');
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
        const result = scheduleLines.reduce((acc, line) => {
          DAYS.forEach((day, index) => {
            const existingValues = acc[day];
            const newValue = line[index];
            if (newValue && newValue.trim() !== '') {
              acc[day] = existingValues ? existingValues.concat([newValue]) : [newValue];
            }
          })
          return acc;
        }, {});

        resolve(result);
      });
    });
  })
}

const getMunicipality = string => {
  const lowerCaseMunicipalities = MUNICIPALITIES.map(m => m.toLowerCase())
  const position = lowerCaseMunicipalities.indexOf(string.toLowerCase());

  return position > -1 ? MUNICIPALITIES[position] : null;
}

const generateEntries = (schedule, garbageType, houseType) => {
  const days = Object.keys(schedule);
  const entries = []

  // Loop through all columns (days) in the schedule
  days.forEach(day => {
    let currentMunicipality = null;
    const column = schedule[day];

    // Loop through all cells (streets) in the column
    for (let i = 0; i < column.length; i++) {
      let value = column[i];

      // A cell might sometimes hold a municipality
      const municipality = getMunicipality(value);

      // If that's the case and it's not the current municipality, we've hit
      // a new municipality, so change the current municipality and move to
      // the next cell.
      if (municipality && municipality !== currentMunicipality) {
        currentMunicipality = municipality;
        continue;
      }

      // If the value is a municipality that's same as the current one, it's a
      // fallback, so we use it as the street name.
      if (municipality) {
        value = municipality;
      }

      cleanStreetName(value).forEach(street => {
        entries.push({
          garbageType,
          day,
          municipality: currentMunicipality,
          street,
          houseType,
        });
      })
    };
  });

  return entries;
}

const main = async () => {
  const URLS = [
    'https://okp.si/jsnaga_urniki_odvoza_gospodinjstvo_2020.php',
    'https://okp.si/jsnaga_urniki_odvoza_BIOgospodinjstva_2020.php',
    'https://okp.si/jsnaga_urniki_odvoza_vecstanovanjski_2020.php',
    'https://okp.si/jsnaga_urniki_odvoza_BIOvecstanovanjski_2020.php',
  ];

  const schedules = await Promise.all(URLS.map(getScheduleForURL));

  const entries = [

    // This is missing from the website but confirmed by personal experience
    { garbageType: 'organic', day: 'četrtek', municipality: 'Rogaška Slatina', street: 'Kamence', houseType: 'singleHome' },

    // These are fallbacks present on website but hardcoded for convenience

    // Single home organic
    { garbageType: 'organic', day: 'torek', municipality: 'Bistrica ob Sotli', street: 'Bistrica ob Sotli', houseType: 'singleHome' },
    { garbageType: 'organic', day: 'torek', municipality: 'Kozje', street: 'Kozje', houseType: 'singleHome' },
    { garbageType: 'organic', day: 'torek', municipality: 'Podčetrtek', street: 'Podčetrtek', houseType: 'singleHome' },
    { garbageType: 'organic', day: 'petek', municipality: 'Rogatec', street: 'Rogatec', houseType: 'singleHome' },

    // Apartment building organic
    { garbageType: 'organic', day: 'torek', municipality: 'Bistrica ob Sotli', street: 'Bistrica ob Sotli', houseType: 'apartmentBuilding' },
    { garbageType: 'organic', day: 'torek', municipality: 'Kozje', street: 'Kozje', houseType: 'apartmentBuilding' },
    { garbageType: 'organic', day: 'torek', municipality: 'Podčetrtek', street: 'Podčetrtek', houseType: 'apartmentBuilding' },
    { garbageType: 'organic', day: 'sreda', municipality: 'Rogatec', street: 'Rogatec', houseType: 'apartmentBuilding' },

    // Apartment building regular
    { garbageType: 'regular', day: 'torek', municipality: 'Bistrica ob Sotli', street: 'Bistrica ob Sotli', houseType: 'apartmentBuilding' },
    { garbageType: 'regular', day: 'torek', municipality: 'Kozje', street: 'Kozje', houseType: 'apartmentBuilding' },
    { garbageType: 'regular', day: 'ponedeljek', municipality: 'Podčetrtek', street: 'Podčetrtek', houseType: 'apartmentBuilding' },
    { garbageType: 'regular', day: 'četrtek', municipality: 'Rogaška Slatina', street: 'Rogaška Slatina', houseType: 'apartmentBuilding' },
    { garbageType: 'regular', day: 'petek', municipality: 'Rogatec', street: 'Rogatec', houseType: 'apartmentBuilding' },
    { garbageType: 'regular', day: 'sreda', municipality: 'Šmarje pri Jelšah', street: 'Šmarje pri Jelšah', houseType: 'apartmentBuilding' },

    // These are parsed directly from the website
    ...generateEntries(schedules[0], 'regular', 'singleHome'),
    ...generateEntries(schedules[1], 'organic', 'singleHome'),
    ...generateEntries(schedules[2], 'regular', 'apartmentBuilding'),
    ...generateEntries(schedules[3], 'organic', 'apartmentBuilding'),
  ]

  let streetsByMunicipality = _.fromPairs(MUNICIPALITIES.map(m => [m, {}]));

  // Generate empty schedules for all streets.
  entries.forEach(e => {
    streetsByMunicipality[e.municipality][e.street] = {
      singleHome: { regular: [], organic: [] },
      apartmentBuilding: { regular: [], organic: [] },
    }
  });

  // Populate schedules with specific street data
  entries.forEach(e => {
    const currentSelection = streetsByMunicipality[e.municipality][e.street][e.houseType];
    currentSelection[e.garbageType] = _.uniq(currentSelection[e.garbageType].concat([e.day]));
  });

  // Create a nested schedule object
  streetsByMunicipality = sortKeys(streetsByMunicipality);
  streetsByMunicipality = _.mapValues(streetsByMunicipality, sortKeys);

  fs.writeFileSync(
    'src/schedule.json',
    JSON.stringify(streetsByMunicipality)
  );

  fs.writeFileSync(
    'src/schedule-dev.json',
    JSON.stringify(streetsByMunicipality, null, 2)
  );
}

main();
