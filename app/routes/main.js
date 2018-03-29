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

router.get('/edit/:id', (req,res) => {
    Event.findById(req.params.id).then(events => {
        res.render('Events/edit.html', {events:events});
    })

})

router.get('/:id', (req, res) => {
    Event.findById(req.params.id).then(events => {
            res.render('Events/show.html', {events: events});
        },
        err => res.status(500).send(err));
});


router.post('id?', (req,res) => {
    new Promise((resolve,reject) => {
        if (req.params.id) {
            Event.findById(req.params.id).then(resolve.reject);
        }
        else {
            resolve (new Event())
        }
    }).then(events => {
        events.name = req.body.name;
        events.hour = req.body.hour;
        events.date = req.body.number;
        events.description = req.body.description;
        if (req.file) events.picture = req.file.filename;
        events.promonumber = req.file.promonumber;
        events.coordinates = req.file.coordinates;

        return pokemon.save();

    }).then(() => {
        res.redirect('/');
    },err => console.log(err));
});

module.exports = router;