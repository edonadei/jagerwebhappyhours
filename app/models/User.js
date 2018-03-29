var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    phonenumber: Number,
    email: String,
    shop: Boolean,
    password: String,
    picture: String,
    lastcoordinates: String,
    // Préférences à rajouter
});
User = mongoose.model('User', userSchema);

module.exports = User;