var express = require('express');
var db = require('./models');
var router = express.Router(); //what is this??

//Routes

//create a new user
router.post('/signup', function(req, res) {
    console.log('this is the /signup route');
    db.family.findOrCreate({
        where: { email: req.body.email },
        defaults: {
            'familyname': req.body.familyname,
            'city': req.body.city,
            'state': req.body.state,
        }
    }).spread(function(family, wasCreated) {
        if (wasCreated) {
            //excellent family was created
            successRedirect: '/familyprofile',
            successFlash: 'Account created and logged in!',
            failureFlash: 'Unknown error occured, please re-login.'
        }
    })
})
