var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    // Informations de base
    name: String,
    hour: String,
    description: String,
    promonumber: Number,
    number_avalaible: Number,

    //Gmap auto feed
    street_number: Number,
    route: String,
    city: String,
    state: String,
    zip_code: String,
    country: String,
    latitude: String,
    longitude: String,

    // Dates
    datedebut:String,
    datefin:String,

    // Images
    picture: String,
    qrcode: String,


    types: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Type'
        }
    ]
});

// Relation many to many
eventSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: 'users'
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;