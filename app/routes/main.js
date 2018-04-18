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

// Permet de s'enregistrer
router.post('/', function(req, res){

	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('username', "L'identifiant est requis").notEmpty();
	req.checkBody('email', "L'email est requis").notEmpty();
	req.checkBody('email', "L'email n'est pas valide").isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

    if(errors){
		res.render('Accueil/index.html',{
			errors:errors
		});
	} else {

       var newUser = new User({
        name: name,
        email:email,
        username: username,
        password: password
    });

    User.createUser(newUser, function(err, user){
        if(err) throw err;
    });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/');
}
    
});


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