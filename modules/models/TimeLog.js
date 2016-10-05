/**
 * @file TimeLog.js
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
// stub

var u_ = {
};

var scheme_ = {
  id: '',
  userId: '',
  date: '',
  clockInTime: '',
  clockOutTime: ''
};

function TimeLog(args) {
  var me = this;
  Object.keys(scheme_).forEach(function(k) {
    if (!args.hasOwnProperty(k)) {
      me[k] = scheme_[k];
    } else {
      me[k] = args[k];
    }
  });
  this.id = 1;
};

TimeLog.prototype.save = function() {
  var me = this;
  Object.keys(scheme_).forEach(function(k) {
    if (!me.hasOwnProperty(k)) return;

    u_[k] = me[k];
  });
};

TimeLog.findOrCreate = function(args, hdl) {
  if (args.id == u_.id) {
    hdl(false, new TimeLog(u_));
  } else {
    hdl(false, new TimeLog(args));
  }
};

TimeLog.findOne = function(args, hdl) {
  var err = false;
  Object.keys(args).forEach(function(k) {
    if (args[k] != u_[k]) {
      err = true;
    }
  });

  if (err) hdl(false, null);
  else hdl(false, new TimeLog(u_));
};

module.exports = TimeLog;
