var router = require('express').Router();

var Event = require('./../models/Event');
var User = require('./../models/User');

router.get('/', (req, res) => {
    Event.find({}).then(events => {
        console.log(events);
        res.render('Accueil/index.html', {events: events});
    });
});

module.exports = router;