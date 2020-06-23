const pool = require('./index.js');

const arrayConverter = (array) => {
  let result = '{';
  if (Array.isArray(array[0])) {
    for (let i = 0; i < array.length; i++) {
      result += '{' + array[i].join(',') + '}';
    }
  } else {
    result += array.join(',');
  }
  result += '}';
  return result;
  }


module.exports = {

  getInstruments: (callback) => {
    pool.query('SELECT * FROM instruments')
      .then(res => { callback(null, res.rows) })
      .catch(err => console.error('Error executing query', err.stack))
  },

  getMusicians: (lat, lng, seeking, callback) => {
    let seekingArray = JSON.parse(seeking);
    console.log(seekingArray);
    pool.query(`SELECT *, SQRT(
                  POW(69.1 * (latitude - ${lat}), 2) +
                  POW(69.1 * (${lng} - longitude) * COS(latitude / 57.3), 2)) AS distance
                  FROM users
                  WHERE seeking = ${seeking}
                  ORDER BY distance
                  LIMIT 15`)
      .then(res => {
        callback(null, res.rows)
      })
      .catch(err => console.error('Error executing query', err.stack))
  },

  postMusician: (data, callback) => {
    let abilities = arrayConverter(data.myInstruments);
    let seeking = arrayConverter(data.seeking);
    pool.query(`INSERT INTO users (first_name,last_name,email,city,state,zip,latitude,longitude,abilities,seeking)
                  VALUES ('${data.firstName}','${data.lastName}','${data.email}','${data.city}','${data.state}','${data.zip}',${data.latitude},${data.longitude},'${abilities}','${seeking})'`)
      .then(res => {
        console.log('Queried the database!')
        callback(null, res)
      })
      .catch(err => console.error('Error executing POST query', err.stack))
  }

}
