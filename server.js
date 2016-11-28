var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
var dinosaurs = require('./routes/dinosaurs')

var app = express()
app.set('view engine', 'ejs')

var dbName = 'dinosaurDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/', dinosaurs)


var port_number = process.env.PORT || 3000


app.listen(port_number, () => {
  console.log('RrrarrrrRrrrr listening on 3000')
})

module.exports = app
