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
  id: 0,
  userId: '',
  date: '',
  clockInTime: '',
  clockOutTime: '',
  incomplete: false
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
};

TimeLog.prototype.save = function() {
  if (!this.id) this.id = idx_++;

  d_[this.id] = Object.assign({}, this);
};

TimeLog.findOrCreate = function(args, hdl) {
  // tbd.
  hdl(false, new TimeLog(args));
};

TimeLog.findOne = function(args, hdl) {
  var found = null;

  for (var i = 0; i < d_.length; i++) {
    var dismiss = false;
    Object.keys(args).forEach(function(k) {
      if (args[k] != d_[i][k]) {
        dismiss = true;
      }
    });
    if (!dismiss) {
      found = d_[i];
      break;
    }
  }

  if (found) hdl(false, new TimeLog(found));
  else hdl(false, null);
};

module.exports = TimeLog;
