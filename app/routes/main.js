var express = require('express');
var router = require('express').Router();
var Event = require('./../models/Event');
var User = require('./../models/User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
	req.checkBody('password', 'Le mot de passe est requis').notEmpty();
	req.checkBody('password2', 'Les mots de passe ne correspondent pas').equals(req.body.password);

	var errors = req.validationErrors();

    if(errors){

        Event.find({}).then(events => {
            res.render('Accueil/index.html', {events: events, errors:errors});
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

    req.flash('success_msg', 'Vous êtes enregistré sur Jagër ! Connectez vous !');
    res.redirect('/');
    
}
    
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function(email, password, done) {
     User.getUserByEmail(email, function(err, user){
         if(err) throw err;
         if(!email){
             return done(null, false, {message: 'Utilisateur inconnu'});
         }
  
         User.comparePassword(password, user.password, function(err, isMatch){
             if(err) throw err;
             if(isMatch){
                 return done(null, user);
             } else {
                 return done(null, false, {message: 'Mot de passe invalide'});
             }
         });
     });
    }));
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id,done){
      User.getUserById(id, function(err,user){
          done(err,user);
      });
  });
  
  router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'Vous êtes déconnecté');
	res.redirect('/');
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

function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('error_msg',"Vous n'êtes pas connecté");
        res.redirect('/');
    }
}


module.exports = router;