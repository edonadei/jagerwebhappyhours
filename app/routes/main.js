var router = require('express').Router();

var Event = require('./../models/Event');
var User = require('./../models/User');

router.get('/', (req, res) => {
    Event.find({}).then(events => {
        res.render('Accueil/index.html', {events: events});
    });
});

router.get('/new', (req,res) => {
    var events = new Event();
    res.render('Events/edit.html', {events: events, endpoint: '/'});
});

router.get('/edit/:id', (req,res) => {
    Event.findById(req.params.id).then(events => {
        res.render('Events/edit.html', {events:events, endpoint: '/' + events._id.toString()});
    })

})

router.get('/:id', (req, res) => {
    Event.findById(req.params.id).then(events => {
            res.render('Events/show.html', {events: events});
        },
        err => res.status(500).send(err));
});

router.get('/delete/:id', (req, res) => {
    Event.findOneAndRemove({_id: req.params.id}).then(() => {
        res.redirect('/');
    })
});

router.post('/:id?', (req,res) => {
    new Promise((resolve,reject) => {
        if (req.params.id) {
            Event.findById(req.params.id).then(resolve, reject);
        }
        else {
            resolve (new Event())
        }
    }).then(events => {
        events.name = req.body.name;
        events.hour = req.body.hour;
        
        events.street_number = req.body.street_number;
        events.street_adress = req.body.street_adress;
        events.city = req.body.city;
        events.state = req.body.state;
        events.zip_code = req.body.zip_code;
        events.country = req.body.country;
        
       events.date = req.body.date;
       events.description = req.body.description;
       events.promonumber = req.body.promonumber;
        //events.coordinates = req.file.coordinates;
        if (req.file) events.picture = req.file.filename;

        return events.save();

    }).then(() => {
        res.redirect('/');
    },err => console.log(err));
});

module.exports = router;