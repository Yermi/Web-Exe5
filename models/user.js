var mongo = require("mongoose");
var db = mongo.createConnection('mongodb://localhost:27017/exersice5');
db.once('open', function() { console.log("Connected to DB") });
db.on('error', function(err) {  console.log("Error connecting to DB:" + err) });
console.log('Pending DB connection');

var Schema = mongo.Schema;
var possibleRoles = ['manager','customer','employee'];
var possibleCustomers =  ['Private','Store'];

var userSchema = new Schema({ // create a schema
  role:  { 
    type:String,
    enum: possibleRoles,
    default: 'customer'
  },
  activeFlag: Boolean ,
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  userName:  { type: String, required: true, unique: true},
  password: { type: String, required: true },
  address :{ country: String, city: String , street: String, number: Number },
  customerType :  { 
    type:String,
    enum: possibleCustomers,
    default: 'Private'
  },
  StoreName : String
});

/*// custom method to add string to end of name…
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users 
userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 
  return this.name;
};

// on every save, add the date
userSchema.pre('save', function(next) { //callback
  // get the current date
  var currentDate = new Date();
  // change the updated_at field to current date
  this.updated_at = currentDate;
  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});*/

var User = db.model('User', userSchema);
module.exports = User;
