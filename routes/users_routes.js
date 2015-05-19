'user strict';

var bodyparser = require('body-parser');
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var User       = require('../models/User.js');
var _          = require("lodash");


module.exports = function loadUserRoutes(router) {
  router.use(bodyparser.json());

  // Create new user
  router.post('/users', function(req, res) {
    // populate new user data
    var userData = JSON.parse(JSON.stringify(req.body));  // copy user post data
    delete userData.password;
    delete userData.email;
    userData.basic = { email: req.body.email };
    var newUser = new User(userData);

    // generate hash & save user
    newUser.generateHash(req.body.password, function(hash) {
      newUser.basic.password = hash;
      newUser.save(function(err, user) {
         if (err && _.contains(err.errmsg, "$user")) {

          // TODO: Wire up for password validation
          return res.status(500).json({success: false, usernamePass: false, emailPass: null, passwordPass: null});
        }

        if (err && _.contains(err.errmsg, ".email")) {
          return res.status(500).json({success: false, usernamePass: true, emailPass: false, passwordPass: null});
        }

        res.json({success: true, usernamePass: true, emailPass: true, passwordPass: null});
      });
    });
  });

  // Update user - CURRENTLY UNUSED
  router.patch('/users/:username', eatAuth, function(req, res) {
    console.log('HERE"S THE REQ.BODY FOR UPDATE: ', req.body);
    var updatedUserInfo = req.body;
    delete updatedUserInfo._id;
    delete updatedUserInfo.eat;     // delete encoded token

    if (username !== req.user.username) {  // verify ownership
      console.log('User tried to delete another user.');
      return res.status(401).json({msg: 'Unauthorized.'});
    }

    User.update({'username': req.params.username}, function() {
      switch(true) {
        case !!(err && err.code === 11000):
          return res.json({msg: 'username already exists - please try a different username'});
        case !!(err && err.username):
          return res.json({msg: err.username.message.replace('Path', '')});
        case !!err:
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'user updated'});
    });
  });

  // Destroy user - CURRENTLY UNUSED
  router.delete('/users/:username', eatAuth, function(req, res) {
    var username = req.params.username;
    if (username !== req.user.username) {  // verify ownership
      console.log('User tried to delete another user.');
      return res.status(401).json({msg: 'Unauthorized.'});
    }

    User.findOneAndRemove({'username': username}, function(err, data) {
      if (err) {
        console.log('Error deleting user. Error: ', err);
        return res.status(500). json({msg: 'internal server error'});
      }

      res.json({msg: (data && data.result && data.result.n ? 'user removed' : 'user could not be removed') || 'probably success' });
    });
  });
};















