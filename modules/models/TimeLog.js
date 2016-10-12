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

var d_ = [];
var idx_ = 0;

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
  this.id = ++idx_;
};

TimeLog.prototype.save = function() {
  var me = this;
  d_[me.id] = {};
  Object.keys(scheme_).forEach(function(k) {
    if (!me.hasOwnProperty(k)) return;

    d_[me.id][k] = me[k];
  });
};

TimeLog.findOrCreate = function(args, hdl) {
  if (d_[args.id]) {
    hdl(false, new TimeLog(d_[args.id]));
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
