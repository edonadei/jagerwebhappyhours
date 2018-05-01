// Requires
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb');
var FacebookStrategy = require ('passport-facebook');

var upload = multer({
    dest: __dirname + '/uploads'
});

// Fichier config prod/dev
var config = require('./config/config');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+config.IP_MONGO+'/jagerddb');

require('./models/User'); // Utilisateur ou boutique, peut être besoin de mettre en place l'héritage
require('./models/Event'); //j'aodre les endives #creation d'event 

// Initialiser l'app
var app = express();

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.single('file'));

// Ressources statiques
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use(express.static('public'));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// require routes
app.use('/', require('./routes/main'));

// Images
app.use('/upload', express.static(__dirname + '/uploads'));

// Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

console.log('Jäger lancé sur le port 8080!')
app.listen(8080);

//console.log('Jäger lancé sur le port '+config.PORT_TO_USE+'!');
//app.listen(config.PORT_TO_USE);