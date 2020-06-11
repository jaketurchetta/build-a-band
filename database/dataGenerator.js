const faker = require('faker');
const cities = require('all-the-cities');
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '/users.csv');
const users = fs.createWriteStream(usersPath);

const usersHeader = `id|first_name|last_name|email|city|state|zip|latittude|longitude|abilities|seeking\n`;
users.write(usersHeader);

const usCities = cities.filter(c => c.country === 'US');

for (let i = 0; i < 10000; i++) {

  // Generate random users
  let first_name = faker.name.firstName();
  let last_name = faker.name.lastName();
  let email = faker.internet.email();
  let location = faker.random.arrayElement(usCities);
  let city = location.name;
  let state = location.adminCode;
  let zip = location.muni;
  if (zip === undefined) {
    zip = faker.address.zipCode('#####');
  }
  if (zip.length > 5) {
    zip = zip.slice(0,5)
  }
  let latitude = location.loc.coordinates[0];
  let longitude = location.loc.coordinates[1];
  let instruments = [ 'piano','vocals','guitar','drums','bass','saxophone','banjo','fiddle','violin','trumpet','flute','oboe','clarinet','trombone','french horn','xylophone','triangle','tambourine','cello' ];
  let expertise = [ 'beginner','intermediate','expert' ];

  // Generate random abilities and seeking preferences
  let abilitiesObj = {};
  let randomNumber = faker.random.number({
    'min': 1,
    'max': 3
  })


  // Abilities should look like: {vocals: 'intermidiate', piano: 'beginner'}
  for (let j = 0; j < randomNumber; j++) {
    let randomInstrument = faker.random.number({
      'min': 0,
      'max': instruments.length - 1
    })
    let instrument = instruments.splice(randomInstrument,1);
    let level = faker.random.number({
      'min': 0,
      'max': 2
    })
    abilitiesObj[instrument] = expertise[level];
  }

  // Seeking should look like: {'guitar','trianle','trombone'}
  let seekingArray = '{';
  let anotherRandomNumber = faker.random.number({
    'min': 1,
    'max': 3
  })

  for (let k = 0; k < anotherRandomNumber; k++) {
    let randomInstrument = faker.random.number({
      'min': 0,
      'max': instruments.length - 1
    })
    let instrument = instruments.splice(randomInstrument,1);
    seekingArray += instrument;
    if (k < anotherRandomNumber - 1) {
      seekingArray += ','
    }
  }

  seekingArray += '}';

  let data = `${i}|${first_name}|${last_name}|${email}|${city}|${state}|${zip}|${latitude}|${longitude}|${JSON.stringify(abilitiesObj)}|${seekingArray}\n`;
  users.write(data);
}

users.end();

const instrumentsPath = path.join(__dirname, '/instruments.csv');
const file = fs.createWriteStream(instrumentsPath);

const instrumentsHeader = `id,instruments\n`;
file.write(instrumentsHeader);

let instruments = [ 'piano','vocals','guitar','drums','bass','saxophone','banjo','fiddle','violin','trumpet','flute','oboe','clarinet','trombone','french horn','xylophone','triangle','tambourine','cello' ];

for (let i = 0; i < instruments.length; i++) {
  let data = `${i},${instruments[i]}\n`;
  file.write(data)
}

file.end();
