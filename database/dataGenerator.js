const faker = require('faker');
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '/users.csv');
const users = fs.createWriteStream(usersPath);

const usersHeader = `id|first_name|last_name|email|city|state|zip|latittude|longitude|abilities|seeking\n`;
users.write(usersHeader);

for (let i = 0; i < 10000; i++) {

  // Generate random users
  let first_name = faker.name.firstName();
  let last_name = faker.name.lastName();
  let email = faker.internet.email();
  let city = faker.address.city();
  let state = faker.address.stateAbbr();
  let zip = faker.address.zipCode('#####');
  let latitude = faker.address.latitude();
  let longitude = faker.address.longitude();
  let instruments = [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18 ];

  // Generate random abilities and seeking preferences
  let abilitiesArray = '{';
  let randomNumber = faker.random.number({
    'min': 1,
    'max': 3
  })


  // Abilities should look like: [['vocals',2],['piano',1]]
  for (let j = 0; j < randomNumber; j++) {
    let instrumentArray = '{';
    let randomInstrument = faker.random.number({
      'min': 0,
      'max': instruments.length - 1
    })
    let instrument = instruments.splice(randomInstrument,1);
    let expertise = faker.random.number({
      'min': 1,
      'max': 3
    })
    instrumentArray += instrument + ',' + expertise + '}';
    abilitiesArray += instrumentArray;
    if (j < randomNumber - 1) {
      abilitiesArray += ',';
    }
  }

  abilitiesArray += '}';

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

  let data = `${i}|${first_name}|${last_name}|${email}|${city}|${state}|${zip}|${latitude}|${longitude}|${abilitiesArray}|${seekingArray}\n`;
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
