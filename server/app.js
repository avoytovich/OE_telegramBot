const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes')(app);

module.exports = app;
