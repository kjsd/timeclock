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
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/query',
  'dojo/topic',
  'dijit/registry',
  'dijit/Toolbar',
  'dijit/ToolbarSeparator',
  'dijit/form/DropDownButton',
  'dijit/form/Button',
  'timeclock/widgets/AboutMeDialog',
  'timeclock/widgets/UserMenu',
  'timeclock/models/User',
  'timeclock/request'
], function(declare, lang, domClass, domStyle, query, topic, registry,
            Toolbar, ToolbarSeparator, DropDownButton, Button,
            AboutMeDialog, UserMenu, User, request) {
  return declare(Toolbar, {
    style: 'margin: 0; padding: 0;',
    user: null,
    userBtn: null,
    userDirtyHdl: null,
    userLogoutHdl: null,
    clockInHdl: null,
    clockOutHdl: null,

    // @Override
    buildRendering: function() {
      this.inherited(arguments);

      this.user = new User();

      var menu = new UserMenu({
        style: 'display: none;'
      });

      this.userBtn = new DropDownButton({
        style: 'font-weight: bold;',
        label: this.user.name,
        iconClass: this.user.iconClass,
        showLabel: true,
        dropDown: menu,
        disabled: true
      });
      domClass.add(this.userBtn.domNode, 'tcLoginWidget');

      this.addChild(this.userBtn);
      this.addChild(new ToolbarSeparator());

      var btn = new Button({
        label: 'Home',
        iconClass: 'tcHomeIcon',
        showLabel: true,
        disabled: true,
        onClick: lang.hitch(this, function() {
          topic.publish('content/requestToShow', 'clock');
        })
      });
      domClass.add(btn.domNode, 'tcLoginWidget');
      this.addChild(btn);

      btn = new Button({
        label: 'TimeLog',
        iconClass: 'tcTableIcon',
        showLabel: true,
        disabled: true,
        onClick: lang.hitch(this, function() {
          topic.publish('content/requestToShow', 'timelog');
        })
      });
      domClass.add(btn.domNode, 'tcLoginWidget');
      this.addChild(btn);

      this.addChild(new DropDownButton({
        label: 'About TimeClock',
        iconClass: 'tcInfoIcon',
        style: 'float: right;',
        showLabel: false,
        dropDown: new AboutMeDialog({ style: 'display: none;' })
      }));

      btn = new Button({
        label: 'On the clock',
        iconClass: 'tcClockIcon',
        style: 'float: right; display: none;',
        disabled: true,
        showLabel: false
      });
      domClass.add(btn.domNode, 'tcClockWidget');
      this.addChild(btn);
    },

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.userDirtyHdl = topic.subscribe(
        'user/dirty', lang.hitch(this, function(user) {
          this.setUserInfo(user);
        }));
      this.userLogoutHdl = topic.subscribe(
        'user/logout', lang.hitch(this, function() {
          this.setUserInfo(new User());
          query('.tcLoginWidget').forEach(function(n) {
            var w = registry.byNode(n);
            if (w) w.set('disabled', true);
          });
        }));

      this.clockInHdl = topic.subscribe('clock/in', function() {
        query('.tcClockWidget').forEach(function(n) {
	      domStyle.set(n, 'display', 'block');
        });
      });
      this.clockOutHdl = topic.subscribe('clock/out', function() {
        query('.tcClockWidget').forEach(function(n) {
	      domStyle.set(n, 'display', 'none');
        });
      });
    },

    // @Override
    startup: function() {
      this.inherited(arguments);

      request.autoRetryHelper(
        '/res/me', null, lang.hitch(this, function(data) {
          topic.publish('user/login', data);

          this.setUserInfo(data);
          query('.tcLoginWidget').forEach(function(n) {
            var w = registry.byNode(n);
            if (w) w.set('disabled', false);
          });
        }));
    },

    // @Override
    destroy: function() {
      if (this.clockInHdl) this.clockInHdl.remove();
      if (this.clockOutHdl) this.clockOutHdl.remove();
      if (this.userLogoutHdl) this.userLogoutHdl.remove();
      if (this.userDirtyHdl) this.userDirtyHdl.remove();
      if (this.userLogoutHdl) this.userLogoutHdl.remove();

      this.user = null;
      this.userBtn = null;

      this.inherited(arguments);
    },

    setUserInfo: function(data) {
      lang.mixin(this.user, data);
      this.userBtn.set('label', this.user.name);
      this.userBtn.set('iconClass', this.user.iconClass);
    }
  });
});
