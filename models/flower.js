var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/exersice5');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function(err) {  console.log("Error connecting to DB:" + err) });
console.log('Pending DB connection');

var Schema = mongo.Schema;

var flowerSchema = new Schema({ // create a schema
  inInventory: Boolean ,
  flowerName:  { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },
  cost:  { type: String, required: true },
});


var User = db.model('Flower', flowerSchema);
module.exports = User;
