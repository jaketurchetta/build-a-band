const model = require('../database/model.js');

module.exports = {

  getInstruments: (req, res) => {
    model.getInstruments((err, results) => {
        if (err) {
          console.log(err);
          res.status(500).end();
        } else {
          res.status(200).json(results);
        }
    })
  },

  getMusicians: (req, res) => {
    model.getMusicians(req.query.lat, req.query.lng, req.query.seeking, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).end();
        } else {
          res.status(200).json(results);
        }
    })
  },

  postMusician: (req, res) => {
    model.postMusician(req.body, (err, results) => {
        console.log(req.body)
        if (err) {
          console.log(err);
          res.status(500).end();
        } else {
          console.log(results)
          res.status(201).json(results);
        }
    })
  }

}