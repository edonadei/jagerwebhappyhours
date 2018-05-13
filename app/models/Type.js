var mongoose = require('mongoose');

var typeSchema = mongoose.Schema({
    name: String,
    color: {
        type: String,
        default: 'red'
    }
});

// Relation many to many
typeSchema.virtual('event', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'events'
});

var Type = mongoose.model('Type', typeSchema);

module.exports = Type;