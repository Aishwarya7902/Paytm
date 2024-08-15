const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin:Helloworld123@cluster0.j1hw4n6.mongodb.net/Paytm');
// Create a Schema for Users
const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    firstName: String,
    lastName:String,
    password: String
});


const User = mongoose.model('User', UserSchema);

module.exports = {
    User
}