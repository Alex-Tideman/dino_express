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
      if (err) {
        return res.send(err);
      }

      res.json(dinos);
  });
});

router.route('/dinosaurs').post(function(req, res) {
  var dinosaur = new Dinosaur(req.body);

  dinosaur.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Dinosaur Added' });
  });
});

router.route('/dinosaurs/:id').put(function(req,res){
  Dinosaur.findOne({ _id: req.params.id }, function(err, dinosaur) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      dinosaur[prop] = req.body[prop];
    }

    // save the dinosaur
    dinosaur.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Dinosaur updated!' });
    });
  });
});

router.route('/dinosaurs/:id').get(function(req, res) {
  Dinosaur.findOne({ _id: req.params.id}, function(err, dinosaur) {
    if (err) {
      return res.send(err);
    }

    res.json(dinosaur);
  });
});

router.route('/dinosaurs/:id').delete(function(req, res) {
  Dinosaur.remove({
    _id: req.params.id
  }, function(err, dinosaur) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Dinosaur deleted' });
  });
});


module.exports = router
