var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var fs = require('fs')
var app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var dino = {
   "dino4" : {
      "name" : "Deinonychus",
      "size" : "medium",
      "id": 4
   }
}

// middleware that is specific to this router
// define the home page route
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

// define the about route
router.get('/about', function (req, res) {
  res.send('About dinosaurs')
})

router.get('/list', function (req, res) {
   fs.readFile( __dirname + "/dinos.json", 'utf8', function (err, data) {
       res.send( data );
   });
})

router.get('/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "dinos.json", 'utf8', function (err, data) {
    let dinos = JSON.parse( data );
    var dino = dinos["dino" + req.params.id]
    res.end( JSON.stringify(dino));
  });
})

// router.post('/', function (req, res) {
//   fs.readFile( __dirname + "/" + "dinos.json", 'utf8', function (err, data) {
//     let dinos = JSON.parse( data );
//     let { name, size } = req.params
//     let json = { id: 4, name, size}
//     fs.writeFile( __dirname + "/" + "dinos.json", JSON.stringify(json), function (err, data) {
//       res.sendFile(__dirname + '/index.html')
//     });
//   });
// })

var cb1 = function (req, res, next) {
  console.log('I must find foooooood')
  next()
}

var cb2 = function (req, res, next) {
  console.log('There is a tasty looking fella...')
  next()
}

var cb3 = function (req, res) {
  res.send(`Eating ${req.params.food}`)
}

router.get('/eating/:food', [cb1, cb2, cb3])

module.exports = router
