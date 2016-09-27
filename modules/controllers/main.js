/**
 * @file main.js
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

router.get('/true', function(req, res) {
  res.sendStatus(200);
});
router.get('/false', function(req, res) {
  res.sendStatus(400);
});
router.get('/now', function(req, res) {
  res.send(new Date().toISOString());
});

router.use('/users', require('controllers/users'));


module.exports = router;
