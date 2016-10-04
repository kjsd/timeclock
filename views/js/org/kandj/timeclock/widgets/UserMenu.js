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
  'dojo/topic',
  'dojo/Deferred',
  'dijit/DropDownMenu',
  'dijit/MenuItem',
  'dijit/MenuSeparator',
  'dojokj/AutoDestroyDialog',
  'timeclock/request',
  'timeclock/token',
  'timeclock/widgets/AboutYouDialog'
], function(lang, declare, topic, Deferred, DropDownMenu, MenuItem,
            MenuSeparator, Dialog, request, token, AboutYouDialog) {
  return declare(DropDownMenu, {

    // @Override
    buildRendering: function() {
      this.inherited(arguments);

      this.addChild(new MenuItem({
        label: 'About you',
        iconClass: 'tcUserUnknownIcon',
        onClick: lang.hitch(this, function() {
          new AboutYouDialog().show();
        })
      }));

      this.addChild(new MenuSeparator());

      var showGoodbyeDialog = function() {
        new Dialog({
          closable: false,
          title: 'See you',
          href: '/bye',
          onLoad: function() {
            topic.publish('user/logout');

            require([
              'dojo/dom-style',
              'dojo/_base/fx'
            ], function(domStyle, fx) {
              fx.fadeIn({
                node: 'msg',
                onEnd: function(node) {
                  setTimeout(function() {
                    fx.fadeOut({
	                  node: node,
	                  onEnd: function(node){
	                    domStyle.set(node, 'display', 'none');
	                    domStyle.set('link', 'display', 'block');
	                  }
	                }).play();
                  }, 1000);
                }
              }).play();
            });
          }
        }).show();
      };

      this.addChild(new MenuItem({
        label: 'Logout and Deactivate (dropped all data!)',
        iconClass: 'tcThumbIcon',
        onClick: function() {
          // tbd. confirm
          request.autoRetryHelper.delete('/res/me');
          showGoodbyeDialog();
        }
      }));
      this.addChild(new MenuItem({
        label: 'Logout',
        iconClass: 'tcControlPowerIcon',
        onClick: function() {
          request.autoRetryHelper.put('/res/me/logout');
          token.clear();
          showGoodbyeDialog();
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
