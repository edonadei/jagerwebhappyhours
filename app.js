var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({
    dest: __dirname + '/uploads'
});

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://127.0.0.1/jagerddb');

//var MongoClient = require('mongodb').MongoClient;

//var uri = 'mongodb://Goqedu:Jetadore5432.@cluster0-shard-00-00-dosgr.mongodb.net:27017,cluster0-shard-00-01-dosgr.mongodb.net:27017,cluster0-shard-00-02-dosgr.mongodb.net:27017/admin?replicaSet=Cluster0-shard-0&ssl=true';
var uri = 'mongodb://Goqedu:Jetadore5432.@cluster0-shard-00-00-dosgr.mongodb.net:27017,'+
'cluster0-shard-00-01-dosgr.mongodb.net:27017,'+
'cluster0-shard-00-02-dosgr.mongodb.net:27017/admin?'+
'replicaSet=Cluster0-shard-0&ssl=true';
mongoose.connect(uri);
var db = mongoose.connection;


require('./models/User'); // Utilisateur ou boutique, peut être besoin de mettre en place l'héritage
//require('./models/Boutique');
require('./models/Event'); //j'aodre les endives #creation d'event 

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.single('file'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use(express.static('public'));

app.use('/', require('./routes/main'));
//app.use('/boutiques', require('./routes/boutique')); // Pas sur d'avoir besoin encore
app.use('/annonce', require('./routes/browse'));

app.use('/upload', express.static(__dirname + '/uploads'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

console.log('Jäger lancé sur le port 8080!')
app.listen(8080);