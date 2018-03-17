var router = require('express').Router();

var Event = require('./../models/Event');
var User = require('./../models/User');

router.get('/', (req, res) => {
    Event.find({}).then(events => {
        //console.log(events);
        res.render('Accueil/index.html', {events: events});
    });
});

router.get('/new', (req,res) => {
    var events = new Event();
    res.render('Events/edit.html', {events: events});
});

router.get('/:id', (req, res) => {
    Event.findById(req.params.id).then(events => {
            res.render('Events/show.html', {events: events});
        },
        err => res.status(500).send(err));
});

module.exports = router;