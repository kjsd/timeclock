define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/request',
  'dojo/dom-style',
  'dijit/Toolbar',
  'dijit/ToolbarSeparator',
  'dijit/TooltipDialog',
  'dijit/form/DropDownButton',
  'dijit/DropDownMenu',
  'dijit/MenuItem',
  'dijit/MenuSeparator',
], function(declare, lang, request, domStyle, Toolbar, ToolbarSeparator,
            TooltipDialog, DropDownButton, DropDownMenu, MenuItem,
            MenuSeparator) {
  return declare(Toolbar, {
    style: "margin: 0; padding: 0;",
    user: null,
    user_btn: null,
    label_anonymous: 'Anything else, noble sir?',

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.user_btn = this.getUserWidget();
      this.addChild(this.user_btn);
      this.addChild(new ToolbarSeparator());
      this.addChild(this.getAboutWidget());

      request('/res/me', {
        handleAs: 'json'
      }).then(lang.hitch(this, function(data) {
        this.user = data;
        this.user_btn.set('label', this.user.name);
        this.user_btn.set('iconClass',
                          (this.user.iconClass ?
                           this.user.iconClass: 'tcUserSilhouetteIcon'));
        this.user_btn.set('disabled', false);

      }), lang.hitch(this, function(err) {
        this.user = null;
        this.user_btn.set('label', this.label_anonymous);
        this.user_btn.set('iconClass', 'tcUserUnknownIcon');
        this.user_btn.set('disabled', true);
      }));
    },

    // @Override
    startup: function() {
      this.inherited(arguments);
    },

    // @Override
    destroyRecursive: function() {
      this.user_btn = null;

      this.inherited(arguments);
    },

    getUserWidget: function() {
      var menu = new DropDownMenu({ style: 'display: none;' });
      menu.addChild(new MenuItem({
        label: 'About you',
        iconClass: 'tcUserUnknownIcon'
      }));
      menu.addChild(new MenuSeparator());
      menu.addChild(new MenuItem({
        label: 'Logout and Deactivate (dropped all data!)',
        iconClass: 'tcThumbIcon'
      }));
      menu.addChild(new MenuItem({
        label: 'Logout',
        iconClass: 'tcControlPowerIcon'
      }));

      return new DropDownButton({
        label: this.label_anonymous,
        style: "font-weight: bold;",
        iconClass: "tcUserUnknownIcon",
        showLabel: true,
        dropDown: menu,
        disabled: true
      });
    },

    getAboutWidget: function() {
      var about = new TooltipDialog({
        style: 'width: 400px;',
        content: '<div>'
          + '<p>TimeClock / v0.0.1</p>'
          + '<hr />'
          + '<p>Copyright (c) 2016 K&J Software Design Corp. '
          + 'All Rights Reserved.</p>'
          + '</div>'
      });
      domStyle.set(about.domNode, "visibility", "hidden");

      return new DropDownButton({
        label: "About Timeclock",
        iconClass: "tcInfoIcon",
        style: "float: right;",
        showLabel: false,
        dropDown: about
      });
    }
  });
});
