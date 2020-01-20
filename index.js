var express = require('express');
var cookie = require('cookie');
var app = express();
var device = require('express-device');
app.use(device.capture());
const dashboard = require('./modules/dashboard.js');
//var fetch = require('./modules/fetch.js');

app.set('view engine', 'ejs');

app.listen(80);

app.get('/', function (req, res) {
  dashboard.createBoard(req, res);

});