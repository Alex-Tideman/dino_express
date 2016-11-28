var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var fs = require('fs')
var app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

module.exports = router
