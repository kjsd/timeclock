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
  res.json({});
});
router.get('/false', function(req, res) {
  res.sendStatus(400);
});

router.use('/me', require('controllers/me'));


module.exports = router;
