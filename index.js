var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var reload = require('reload');
var db = require('./models');
// var isLoggedIn = require('./middleware/isLoggedIn');

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
app.get('/opening', function(req, res) {
    res.render('opening');
})
app.get('/login', function(req, res) {
    res.render('login');
})
app.get('/newgroup', function(req, res) {
    res.render('newgroup');
})

app.post('/newgroup', function(req, res) {
    db.group.findOrCreate({
        where: { groupname: req.body.groupname }, //checks the groupname in the table. req.body usese body parser to bring data in to the form.
        defaults: {
            'city': req.body.city,
            'state': req.body.state
        }
    }).spread(function(group, wasCreated) {
        //this finds or creates the family(.spread is for findorcreate- similar to then)
        if (wasCreated) {
            db.user.create({
                    'username': req.body.username,
                    'isAdmin': true,
                    'password': req.body.password,
                    'groupId': group.id

                }).then(function(user) {
                    //TO DO put passport login here
                    res.redirect('/login')
                })
                //if the family was new
        } else {
            res.redirect('/login')
                //family was found
        }
    })
});


//Controllers
//Insert MiddleWare here for IsLoggedIn

app.use('/journal', require('./controllers/journal')) //anything that hits this route refer to the controllers route
    //Listen - tells which port to listen on
app.listen(3000);
