var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var dinosaurSchema = new Schema({
  name: String,
  size: String,
  food: String
});

module.exports = mongoose.model('Dinosaur', dinosaurSchema);
