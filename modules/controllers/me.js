/**
 * @file me.js
 *
 * @version $Id:$
 *
 * @brief
 *
 * @author Kenji MINOURA / kenji@kandj.org
 *
 * Copyright (c) 2016 K&J Software Design, Corp. All rights reserved.
 *
 * @see <related_items>
 ***********************************************************************/
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('models/User');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

var strip = function(user) {
  delete user.id;
  delete user.accessToken;
  delete user.refreshToken;
  delete user.lastAccess;
  delete user.lastLogin;
  return user;
};

router.get('/', function(req, res) {
  res.json(strip(req.user));
});

router.put('/', function(req, res) {
  console.log(typeof(req.body.useHours));

  Object.keys(req.user).forEach(function(k) {
    if (k == 'id') return;
    if (!req.body.hasOwnProperty(k)) return;

    req.user[k] = req.body[k];
  });
  req.user.save();
  res.json(strip(req.user));
});

router.delete('/', function(req, res) {
  // tbd.
  res.sendStatus(403);
});

router.put('/logout', function(req, res) {
  req.user.accessToken = '';
  req.user.refreshToken = '';
  req.user.save();
  res.json(strip(req.user));
});


module.exports = router;
