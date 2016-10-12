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
var dateFormat = require('dateformat');
var TimeLog = require('models/TimeLog');

router.get('/', function(req, res) {
  TimeLog.findOne({
    userId: req.user.id,
    date: dateFormat(new Date(), 'isoDate')
  }, function(err, log) {
    if (err) {
      res.sendStatus(503);
      return;
    }
    if (!log) {
      res.sendStatus(404);
      return;
    }

    res.json(log);
  });
});

router.put('/in', function(req, res) {
  var now = new Date();

  TimeLog.findOne({
    userId: req.user.id,
    date: dateFormat(now, 'isoDate')
  }, function(err, log) {
    if (err) {
      res.sendStatus(503);
      return;
    }
    if (log) {
      // already clockin
      res.sendStatus(403);
      return;
    }

    var newLog = new TimeLog({
      userId: req.user.id,
      date: dateFormat(now, 'isoDate'),
      clockInTime: dateFormat(now, 'isoTime')
    });
    newLog.save();

    res.json(newLog);
  });
});

router.put('/out', function(req, res) {
  var now = new Date();

  TimeLog.findOrCreate({
    date: dateFormat(now, 'isoDate')
  }, function(err, log) {
    if (err) {
      res.sendStatus(503);
      return;
    }
    if (log.clockOutTime) {
      // already clockout
      res.sendStatus(403);
      return;
    }

    log.clockOutTime = dateFormat(now, 'isoTime');
    log.save();

    res.json(log);
  });
});

//tbd.
// router.use('/log', require('controllers/timelog'));

module.exports = router;
