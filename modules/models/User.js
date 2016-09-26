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
  googleId: '',
  googleAccessToken: '',
  name: '',
  breakTime: 0,
  iconClass: ''
};

function User(args) {
  this.googleId = args.googleId;
  this.googleAccessToken = args.googleAccessToken;
  this.name = args.name;
  this.breakTime = args.breakTime;
  this.iconClass = args.iconClass;
};

User.prototype.save = function() {
  u_.googleId = this.googleId;
  u_.googleAccessToken = this.googleAccessToken;
  u_.name = this.name;
  u_.breakTime = this.breakTime;
  u_.iconClass = this.iconClass; 
};

User.findOrCreate = function(keys, hdl) {
  if (keys.googleId == u_.googleId) {
    hdl(false, new User(u_));
  } else {
    hdl(false, new User(keys));
  }
};

module.exports = User;
