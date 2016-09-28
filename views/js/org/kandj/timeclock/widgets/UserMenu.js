/**
 * @file UserMenu.js
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
  'dojo/_base/lang',
  'dojo/_base/declare',
  'dojo/Deferred',
  'dijit/DropDownMenu',
  'dijit/MenuItem',
  'dijit/MenuSeparator',
  'timeclock/request',
  'timeclock/widgets/AboutYouDialog'
], function(lang, declare, Deferred, DropDownMenu, MenuItem, MenuSeparator,
            request, AboutYouDialog) {
  return declare(DropDownMenu, {
    user: null,

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.addChild(new MenuItem({
        label: 'About you',
        iconClass: 'tcUserUnknownIcon',
        onClick: lang.hitch(this, function() {
          var userDialog = new AboutYouDialog({ user: this.user });
          userDialog.on('dirty', lang.hitch(this, function(data) {
            this.user = data;
            this.emit('dirty', data);
          }));

          userDialog.show();
        })
      }));

      this.addChild(new MenuSeparator());
      this.addChild(new MenuItem({
        label: 'Logout and Deactivate (dropped all data!)',
        iconClass: 'tcThumbIcon',
        onClick: function() {
          // tbd. confirm
          request.delete('/res/me').then(null, request.errback);
        }
      }));
      this.addChild(new MenuItem({
        label: 'Logout',
        iconClass: 'tcControlPowerIcon',
        onClick: function() {
          request.put('/res/me/logout').then(function(data) {
            window.location.href = '/empty';
          }, request.errback);
        }
      }));
    },

    // @Override
    startup: function() {
      this.inherited(arguments);
    },

    // @Override
    destroy: function() {
      this.inherited(arguments);
    }
  });
});
