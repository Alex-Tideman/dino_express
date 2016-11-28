var express = require('express')
var app = express()
var dinosaurs = require('./public/dinosaurs')

app.use('/dinosaurs', dinosaurs)

app.listen(3000, function () {
  console.log('RrrarrrrRrrrr server alive on port 3000')
})
