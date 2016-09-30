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
  'dojo/query',
  'dijit/registry',
  'dijit/Toolbar',
  'dijit/ToolbarSeparator',
  'dijit/form/DropDownButton',
  'dijit/form/Button',
  'timeclock/widgets/AboutMeDialog',
  'timeclock/widgets/UserMenu',
  'timeclock/models/User',
  'timeclock/request'
], function(declare, lang, domClass, query, registry, Toolbar,
            ToolbarSeparator, DropDownButton, Button, AboutMeDialog,
            UserMenu, User, request) {
  return declare(Toolbar, {
    style: 'margin: 0; padding: 0;',
    user: null,
    userBtn: null,

    // @Override
    buildRendering: function() {
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
      domClass.add(this.userBtn.domNode, 'tcLoginWidget');

      this.addChild(this.userBtn);
      this.addChild(new ToolbarSeparator());

      var btn = new Button({
        label: 'Home',
        iconClass: 'tcHomeIcon',
        showLabel: true,
        disabled: true,
        onClick: lang.hitch(this, function() {
          this.emit('requestclockcontent', {});
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
          this.emit('requesttimelogcontent', {});
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
    },

    // @Override
    startup: function() {
      this.inherited(arguments);

      request.autoRetryHelper(
        '/res/me', null, lang.hitch(this, function(data) {
          this.setUserInfo(data);
          query('.tcLoginWidget').forEach(function(n) {
            var w = registry.byNode(n);
            if (w) w.set('disabled', false);
          });
        })
      );

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
    }
  });
});
