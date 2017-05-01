var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var reload = require('reload');

var app = express();

//Set and Use Statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(require('morgan')('dev')); //who is morgan?

//Define Routes
app.get('/', function(req, res) {
    res.render('opening');
})
app.get('/login', function(req, res) {
    res.render('login');
})
app.get('/signup', function(req, res) {
    res.render('signup')
})

//Controllers

//Listen - tells which port to listen on
app.listen(3000);
