 /**
 * @file timelog.js
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
var TimeLog = require('models/TimeLog');


router.get('/', function(req, res) {
  TimeLog.find({
    userId: req.user.id
  }, function(err, logs) {
    if (err) {
      res.sendStatus(503);
      return;
    }

    if (!logs) res.sendStatus(204);
    else res.json(logs);
  });

});


module.exports = router;
