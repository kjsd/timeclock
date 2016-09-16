define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/request',
  'dijit/Toolbar',
  'dijit/ToolbarSeparator',
  'dijit/form/DropDownButton',
  'timeclock/widgets/AboutMeDialog',
  'timeclock/widgets/UserMenu',
  'timeclock/templates'
], function(declare, lang, request, Toolbar, ToolbarSeparator,
            DropDownButton, AboutMeDialog, UserMenu, templates) {
  return declare(Toolbar, {
    style: 'margin: 0; padding: 0;',
    user: { id: '', name: '' },
    user_btn: null,
    label_anonymous: 'Anything else, noble sir?',

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.user_btn = new DropDownButton({
        label: this.label_anonymous,
        style: "font-weight: bold;",
        iconClass: "tcUserUnknownIcon",
        showLabel: true,
        dropDown: new UserMenu({ style: 'display: none;' }),
        disabled: true
      });

      this.addChild(this.user_btn);
      this.addChild(new ToolbarSeparator());
      this.addChild(new DropDownButton({
        label: "About TimeClock",
        iconClass: "tcInfoIcon",
        style: "float: right;",
        showLabel: false,
        dropDown: new AboutMeDialog({ style: 'display: none;' })
      }));
    },

    // @Override
    startup: function() {
      this.inherited(arguments);

      request('/res/users/me', {
        handleAs: 'json'
      }).then(lang.hitch(this, this.setUserInfo),
              templates.getRequestErrorHandler());
    },

    // @Override
    destroy: function() {
      this.user_btn = null;

      this.inherited(arguments);
    },

    setUserInfo: function(data) {
      this.user = data;
      this.user_btn.set('label', this.user['name']);
      this.user_btn.set('iconClass', this.user['iconClass']);
      this.user_btn.set('disabled', !this.user.hasOwnProperty('id'));
    }
  });
});
