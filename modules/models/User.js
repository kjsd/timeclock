/**
 * @file User.js
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
  accessToken: '',
  refreshToken: '',
  name: '',
  breakTime: 0,
  iconClass: 'tcUserSilhouetteIcon',
  lastUpdated: ''
};

function User(args) {
  var me = this;
  Object.keys(scheme_).forEach(function(k) {
    if (!args.hasOwnProperty(k)) {
      me[k] = scheme_[k];
    } else {
      me[k] = args[k];
    }
  });
};

User.prototype.save = function() {
  var me = this;
  Object.keys(scheme_).forEach(function(k) {
    if (!me.hasOwnProperty(k)) return;

    u_[k] = me[k];
  });
  u_.lastUpdated = new Date();
};

User.findOrCreate = function(args, hdl) {
  if (args.id == u_.id) {
    hdl(false, new User(u_));
  } else {
    hdl(false, new User(args));
  }
};

User.findOne = function(args, hdl) {
  var err = false;
  Object.keys(args).forEach(function(k) {
    if (args[k] != u_[k]) {
      err = true;
    }
  });

  if (err) hdl(null, false);
  else hdl(false, new User(u_));
};

module.exports = User;
