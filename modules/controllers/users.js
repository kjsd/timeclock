/**
 * @file users.js
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

router.get('/me', function(req, res) {
  res.json(req.user);
});

router.put('/me', function(req, res) {
  Object.keys(req.user).forEach(function(k) {
    if (k == 'id') return;
    if (!req.body.hasOwnProperty(k)) return;

    req.user[k] = req.body[k];
  });
  req.user.save();
  res.json(req.user);
});

router.delete('/me', function(req, res) {
  res.sendStatus(403);
});

module.exports = router;
