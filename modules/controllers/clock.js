 /**
 * @file clock.js
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


var getIncompleteLog = function(req, res, found, notFound) {
  TimeLog.findOne({
    userId: req.user.id,
    clockOutTime: ''
  }, function(err, log) {
    if (err) {
      res.sendStatus(503);
      return;
    }

    if (log) found(log);
    else notFound();
  });
};

router.get('/incomplete', function(req, res) {
  getIncompleteLog(req, res,
                   function(log) { res.json(log); },
                   function() { res.sendStatus(404); });
});

router.put('/in', function(req, res) {
  var now = new Date();

  getIncompleteLog(
    req, res,
    function(log) { res.sendStatus(403); },
    function() {
      var newLog = new TimeLog({
        userId: req.user.id,
        clockInTime: now.toISOString(),
        clockOutTime: ''
      });
      newLog.save();

      res.json(newLog);
    });
});

router.put('/out', function(req, res) {
  var now = new Date();

  getIncompleteLog(
    req, res,
    function(log) {
      log.clockOutTime = now.toISOString();
      log.save();

      res.json(log);
    },
    function() {
      res.sendStatus(404);
    });
});

//tbd.
// router.use('/log', require('controllers/timelog'));

module.exports = router;
