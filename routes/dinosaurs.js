var Dinosaur = require('../models/dinosaur');
var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var fs = require('fs')
var app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// define the home page route

router.get('/', function(req, res) {
    Dinosaur.find(function(err, dinos) {
      if (err) {
        res.send(err)
      }
      // res.render(view, locals)
      res.render('index.ejs', {dinosaurs: dinos})
  })
})

router.post('/', function(req, res) {
  var dinosaur = new Dinosaur(req.body);

  dinosaur.save(function(err) {
    if (err) {
      res.send(err)
    }
    Dinosaur.find(function(err, dinos) {
      res.render('index.ejs', {dinosaurs: dinos})
    })
  })
})

router.put('/:name', function(req,res){
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
      if (err) {
        res.send(err)
      }
      res.json({ message: 'Dinosaur updated!' });
    })
  })
})

router.get('/:name', function(req, res) {
  Dinosaur.findOne({ name: req.params.name}, function(err, dinosaur) {
    if (err) {
      res.status(404).send(err)
    }
    res.json(dinosaur)
  })
})

router.delete('/:name', function(req, res) {
  Dinosaur.remove({name: req.params.name}, function(err, dinosaur) {
    if (err) {
      res.send(err)
    } else if (!dinosaur) {
      res.send('Dino does not exist!')
    }
    res.json({ message: 'Dinosaur deleted' })
  })
})


module.exports = router
