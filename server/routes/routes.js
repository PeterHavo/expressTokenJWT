var express = require('express');
var router = express.Router();
var User   = require('../models/user'); // get our mongoose model
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens




router.get('/setup', (req, res) => {
    var nick = new User({ 
    name: 'Peter', 
    password: 'password',
    admin: false
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
})

   

module.exports = router