const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Controller = require('./controller.js');

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());

// ROUTES
app.post('/musicians')
app.get('/musicians')


app.listen(PORT, console.log(`Build-A-Band listening on port ${PORT}`))