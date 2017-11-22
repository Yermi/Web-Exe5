var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/exersice5');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function(err) {  console.log("Error connecting to DB:" + err) });
console.log('Pending DB connection');

var Schema = mongo.Schema;

var branchSchema = new Schema({ // create a schema
  activeFlag: Boolean ,
  name: { type: String, required: true, unique: true },
  address :{ country: String, city: String , street: String, number: Number }
});


var User = db.model('Branch', branchSchema);
module.exports = User;

