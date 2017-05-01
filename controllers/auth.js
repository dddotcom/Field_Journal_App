//Requires and global variables
var express = require('express');
var db = require('../models');
var router = express.Router();

//Routes
router.get('/login', function(req, res) {
    res.render('loginsignup')

})
