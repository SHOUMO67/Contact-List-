//require the library
const mongoose = require('mongoose');

//connect to the database (insteade of localhost i used {127.0.0.1:27017} or {0.0.0.0:27017}) cause localhost gets terminal erroe
// mongoose.connect('mongodb://127.0.0.1:27017/contact_db');
mongoose.connect('mongodb+srv://shoumodip:shoumo@cluster0.scxf24d.mongodb.net/?retryWrites=true&w=majority');


//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});