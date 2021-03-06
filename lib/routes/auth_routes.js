'use strict';

var bodyparser = require('body-parser');

var eatAuth = require('../bin/eat_auth.js')(process.env.AUTH_SECRET);
var User = require('../models/User.js');


module.exports = function(router, passport) {
  router.use(bodyparser.json());

  // Existing user login
  router.get('/login', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(process.env.AUTH_SECRET, function(err, eat) {  // passport_strategy adds req.user
      if (err) {
        console.log('Error signin user in. Error: ', err);
        return res.status(500).json({success: false, eat: null, msg: 'error logging in'});
      }
      res.json({success: true, eat: eat, username: req.user.username, email: req.user.basic.email });
    });
  });

  // Test tokens from cookies for freshness
  router.post('/token', eatAuth, function( req, res ) {
    res.status(200).json({ msg: 'token is fresh' });
  });
};
