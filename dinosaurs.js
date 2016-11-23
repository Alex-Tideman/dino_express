var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Dinosaurs home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About dinosaurs')
})

router.get('/dinosaurs/:name', function (req, res) {
  res.send(req.params)
})

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
