var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name: String,
    hour: String,
    street_number: Number,
    street_address: String,
    city: String,
    state: String,
    zip_code: String,
    country: String,
    date:String,
    description: String,
    picture: String,
    promonumber: Number,
    coordinates: String,
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;