"use strict";

var bodyparser = require('body-parser');
var popDB = require("../bin/pop_db.js").loremStorys;
var roleAuth = require("../bin/role_auth.js");
var eatAuth = require('../bin/eat_auth.js')(process.env.AUTH_SECRET);

module.exports = function(router){
  router.use(bodyparser.json());

  // populate the DB
  router.get('/populate/:number', eatAuth, roleAuth("admin"), function(req, res) {

    popDB(req.params.number, function(err, resIn) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: "Error populating database"});
      }
      res.status(200).json({success: true});
    });
  });
};
