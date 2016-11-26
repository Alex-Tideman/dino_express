var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var dinosaurs = require('./routes/dinosaurs')

var app = express()

var dbName = 'dinosaurDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/api', dinosaurs)

module.exports = app

var port_number = process.env.PORT || 3000

app.listen(port_number, function () {
  console.log('RrrarrrrRrrrr server roars!')
})
