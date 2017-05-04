var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var passport = require('./config/passportConfig');
var session = require('express-session');
var request = require("request"); //what is this?
var flash = require('connect-flash');
require("dotenv").config();
var logger = require('morgan');
var reload = require('reload');
var db = require('./models');
var isLoggedIn = require('./middleware/isLoggedIn');
var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var app = express();

//Set and Use Statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(require('morgan')('dev')); //who is morgan?
app.use(session({
    secret: 'mynotsosecretkey',
    resave: false,
    saveUnintialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
})


//Define Routes (GETS)
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
app.get('/newuser', function(req, res) {
    res.render('newuser');
})
app.get('/userjournal', isLoggedIn, function(req, res) {
        res.render('userjournal')
        console.log(req.user.dataValues.username)
    })
    // app.get('/groupjournals', isLoggedIn, function(req, res) {
    //     res.render('groupjournals')
    // })

//POST Route for login page

app.post('/login', passport.authenticate('local', {
    successRedirect: '/userjournal',
    successFlash: 'You are now logged in',
    failureFlash: 'Try again, please',
    failureRedirect: '/login'
}));

//Post Route for the New User Page
app.post('/newuser', function(req, res) {
    console.log('user', req.body);
    db.user.create({
        'username': req.body.username,
        'isAdmin': true,
        'password': req.body.password
    }).then(function(user) {
        res.redirect('/groupjournals');
    })
});

//Routes Post for the New Group Page

app.post('/newgroup', function(req, res) {
    db.group.findOrCreate({
        where: { groupname: req.body.groupname }, //checks the groupname in the table. req.body usese body parser to bring data in to the form.
        defaults: {
            'city': req.body.city,
            'state': req.body.state
        }
    }).spread(function(group, wasCreated) {
        //this finds or creates the group(.spread is for findorcreate- similar to then)
        if (wasCreated) {
            db.user.create({
                    'username': req.body.username,
                    'isAdmin': true,
                    'password': req.body.password,
                    'groupId': group.id

                }).then(function(user) {
                    res.redirect('/login')
                })
                //if the group was new
        } else {
            res.redirect('/login')
                //group was found
        }
    })
});
app.post('/userjournal', upload.single('myFile'), function(req, res) {
        cloudinary.uploader.upload(req.file.path, function(result) {
            res.send(result);
            //instead of sending result we want JSON object to send url to post to plant db along with username, title of plant and description
        })
    })
    //set up ajax to pull the image you have uploaded to present on the page
    // // $.ajax({
    // //     type: "GET",
    // //     url: "https://cloudinary.com/?",
    // //     data: {
    // //         url: res.body.url
    // //     },
    // //     success: function(response) {
    // //         $('').html
    // //     },
    // //     error: function() {
    // //         alert("There was an error retrieving your image")
    // //     }
    // });
    // //this posts the journal entries (plant name, description & image url to the journal db)

app.post('/userjournal', function(req, res) {
    db.journal.create({
        where: { username: username },
        // 'username' :
        'plantName': req.body.plantName,
        'description': req.body.description
            // 'imageURL': //the url for the image that the user uploaded to cloudinary
    }).then(function(journal) {
        res.redirect('/userjournal');
    })
});
//Controllers
//Insert MiddleWare here for IsLoggedIn
app.use('/journal', isLoggedIn, require('./middleware/isLoggedIn')); //anything that hits this route refer to the controllers route
app.use('/groupjournals', isLoggedIn, require('./middleware/isLoggedIn'));
//Listen - tells which port to listen on
app.listen(3000);
