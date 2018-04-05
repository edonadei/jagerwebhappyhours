var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name: String,
    hour: Number,
    date:String,
    description: String,
    picture: String,
    promonumber: Number,
    coordinates: String,
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;