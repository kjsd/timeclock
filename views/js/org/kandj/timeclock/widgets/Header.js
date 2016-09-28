/**
 * @file Header.js
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
define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dijit/Toolbar',
  'dijit/ToolbarSeparator',
  'dijit/form/DropDownButton',
  'timeclock/models/User',
  'timeclock/widgets/AboutMeDialog',
  'timeclock/widgets/UserMenu',
  'timeclock/request'
], function(declare, lang, Toolbar, ToolbarSeparator,
            DropDownButton, User, AboutMeDialog, UserMenu, request) {
  return declare(Toolbar, {
    style: 'margin: 0; padding: 0;',
    user: null,
    userBtn: null,
    showBody: null,

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.user = new User();

      var menu = new UserMenu({
        style: 'display: none;',
        user: this.user
      });
      menu.on('dirty', lang.hitch(this, this.setUserInfo));

      this.userBtn = new DropDownButton({
        style: 'font-weight: bold;',
        label: this.user.name,
        iconClass: this.user.iconClass,
        showLabel: true,
        dropDown: menu,
        disabled: true
      });

      this.addChild(this.userBtn);
      this.addChild(new ToolbarSeparator());

      this.addChild(new DropDownButton({
        label: 'About TimeClock',
        iconClass: 'tcInfoIcon',
        style: 'float: right;',
        showLabel: false,
        dropDown: new AboutMeDialog({ style: 'display: none;' })
      }));

      request('/res/me').then(lang.hitch(this, this.setUserInfo),
                              request.errback);
    },

    // @Override
    startup: function() {
      this.inherited(arguments);
    },

    // @Override
    destroy: function() {
      this.userBtn = null;

      this.inherited(arguments);
    },

    setUserInfo: function(data) {
      console.log('header.onDirty');

      lang.mixin(this.user, data);
      this.userBtn.set('label', this.user.name);
      this.userBtn.set('iconClass', this.user.iconClass);
      this.userBtn.set('disabled', false);
    }
  });
});
