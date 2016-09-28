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
  'dijit/form/Button',
  'timeclock/models/User',
  'timeclock/widgets/AboutMeDialog',
  'timeclock/widgets/UserMenu',
  'timeclock/request'
], function(declare, lang, Toolbar, ToolbarSeparator, DropDownButton,
            Button, User, AboutMeDialog, UserMenu, request) {
  return declare(Toolbar, {
    style: 'margin: 0; padding: 0;',
    user: null,
    userBtn: null,

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.user = new User();

      var menu = new UserMenu({
        style: 'display: none;',
        user: this.user
      });
      menu.on('dirty', lang.hitch(this, function() {
        this.setUserInfo(menu.get('user'));
      }));

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

      this.addChild(new Button({
        label: 'Home',
        iconClass: 'tcHomeIcon',
        showLabel: true,
        onClick: lang.hitch(this, function() {
          this.emit('requestclockcontent', {});
        })
      }));
      this.addChild(new Button({
        label: 'TimeLog',
        iconClass: 'tcTableIcon',
        showLabel: true,
        onClick: lang.hitch(this, function() {
          this.emit('requesttimelogcontent', {});
        })
      }));

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

      this.emit('requestclockcontent', {});
    },

    // @Override
    destroy: function() {
      this.user = null;
      this.userBtn = null;

      this.inherited(arguments);
    },

    setUserInfo: function(data) {
      lang.mixin(this.user, data);
      this.userBtn.set('label', this.user.name);
      this.userBtn.set('iconClass', this.user.iconClass);
      this.userBtn.set('disabled', false);
    }
  });
});
