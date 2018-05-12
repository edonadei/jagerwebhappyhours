var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    name: String,
    hour: String,
    street_number: Number,
    route: String,
    city: String,
    state: String,
    zip_code: String,
    country: String,
    date:String,
    description: String,
    picture: String,
    promonumber: Number,
    coordinates: String,
    number_avalaible: Number,
});

// Relation many to many
eventSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: 'users'
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;