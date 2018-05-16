var express = require('express');
var router = require('express').Router();
var Event = require('./../models/Event');
var User = require('./../models/User');
var Type = require('./../models/Type');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require ('passport-facebook').Strategy;


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
    Type.find({}).then(types => {
        Event.findById(req.params.id).then(events => {
            res.render('Events/edit.html', {events:events, types:types, endpoint: '/' + events._id.toString()});
        });
    });
});

// Permet de s'enregistrer
router.post('/register', function(req, res){

	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', "L'identifiant est requis").notEmpty();
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

// local login

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
                 return done(null, user); // Log si tout est ok
             } else {
                 return done(null, false, {message: 'Mot de passe invalide'});
             }
         });
     });
    }));
  
// Login with Facebook
    
    passport.use(new FacebookStrategy({
        clientID :'2001276410122261',
        clientSecret :'7082b98f4dfd68555e97ebe5',
        callbackURL: 'https://jagerhours.fr/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            User.findOne({'facebook.id': profile.id}, function(err, user){
                if(err)
                    return done(err);
                if(user)
                    return done(null, user);
                else {
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;

                    newUser.save(function(err){
                        if(err)
                            throw err;
                        return done(null, newUser);
                    })
                    console.log(profile);
                }
            });
        });
    }
    ));

    router.get('/auth/facebook', passport.authenticate('facebook'));

    router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/',  failureRedirect: '/' 
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

// Incrémentation du compteur d'annonce et ajout d'annonce à l'utilisateur
router.get('/:id/registerevent', (req,res) =>{
        Event.update({ _id: req.params.id}, { $inc: { number_avalaible: -1 }}, () => {
            Event.findById(req.params.id).then((event) => {
                // Autre manière d'accéder à l'user
                //console.log(req.user._id);
                User.update({_id:req.session.passport.user},{$push: {events:event}}, (error,document) => {
                    res.redirect("/"+req.params.id);
                })
            })
    })
})

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
        
        // Addresse
        events.street_number = req.body.street_number;
        events.route = req.body.route;
        events.city = req.body.locality;
        events.state = req.body.administrative_area_level_1;
        events.zip_code = req.body.postal_code;
        events.country = req.body.country;
        events.latitude = req.body.latitude;
        events.longitude = req.body.longitude;

        // Autres informations
        events.description = req.body.description;
        events.promonumber = req.body.promonumber;
        events.number_avalaible = req.body.number_avalaible;
        events.types = req.body.types;
        events.datedebut = req.body.datedebut;
        events.datefin = req.body.datefin;
        
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

// login with Google +

var GOOGLE_CLIENT_ID= "858473261540-s4iu68nnk2qe6adtstuter5d8v8vnme7.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET = "6XUM3bfSXDILlaMlXBz66JH_";

module.exports = router;