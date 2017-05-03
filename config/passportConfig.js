var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');
require("dotenv").config();
//Can add Facebook in here if want to later

//What does the section below do?
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    db.user.findById(id).then(function(user) {
        cb(null, user);
    }).catch(cb);
});

//Please explain the significance of cb
//this finds the user in the db when the user logs-in
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, function(username, password, cb) {
    db.user.findOne({
        where: { username: username }
    }).then(function(user) {
        if (!user || !user.validPassword(password)) {
            cb(null, false);
        } else {
            cb(null, user);
        }
    }).catch(cb);
}));


module.exports = passport;
