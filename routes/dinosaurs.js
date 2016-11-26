var Dinosaur = require('../models/dinosaur');
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var fs = require('fs')
var app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// define the home page route

router.route('/dinosaurs').get(function(req, res) {
    Dinosaur.find(function(err, dinos) {
      (err) ? res.send(err) : res.json(dinos)
  })
})

router.route('/about').get(function(req, res) {
  res.send('About the dinosaurs API. Add, edit and delete dinosaurs.')
})


router.route('/dinosaurs').post(function(req, res) {
  var dinosaur = new Dinosaur(req.body);

  dinosaur.save(function(err) {
    (err) ? res.send(err) : res.send({ message: 'Dinosaur Added' })
  })
})

router.route('/dinosaurs/:name').put(function(req,res){
  Dinosaur.findOne({ name: req.params.name }, function(err, dinosaur) {
    if (err) {
     res.send(err)
    }
    // Update the params sent
    for (prop in req.body) {
      dinosaur[prop] = req.body[prop]
    }

    // Save the dinosaur
    dinosaur.save(function(err) {
      (err) ? res.send(err) : res.json({ message: 'Dinosaur updated!' });
    })
  })
})

router.route('/dinosaurs/:name').get(function(req, res) {
  Dinosaur.findOne({ name: req.params.name}, function(err, dinosaur) {
    (err) ? res.status(404).send(err) : res.json(dinosaur)
  })
})

router.route('/dinosaurs/:name').delete(function(req, res) {
  Dinosaur.remove({name: req.params.name}, function(err, dinosaur) {
    (err) ? res.send(err) : res.json({ message: 'Dinosaur deleted' })
  })
})


module.exports = router
