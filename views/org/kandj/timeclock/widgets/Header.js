define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/request',
  'dijit/Toolbar',
  'dijit/ToolbarSeparator',
  'dijit/form/DropDownButton',
  'timeclock/models/User',
  'timeclock/widgets/AboutMeDialog',
  'timeclock/widgets/UserMenu',
  'timeclock/templates'
], function(declare, lang, request, Toolbar, ToolbarSeparator,
            DropDownButton, User, AboutMeDialog, UserMenu, templates) {
  return declare(Toolbar, {
    style: 'margin: 0; padding: 0;',
    user: new User(),
    userBtn: null,

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      var menu = new UserMenu({ style: 'display: none;' });
      var userOkHdl = lang.hitch(this, this.setUserInfo);
      declare.safeMixin(menu, {
        onDirty: function() {
          this.inherited(arguments);

          request('/res/users/me', {
            handleAs: 'json'
          }).then(userOkHdl, templates.getRequestErrorHandler());
        }
      });

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
      this.userBtn = null;

      this.inherited(arguments);
    },

    setUserInfo: function(data) {
      lang.mixin(this.user, data);
      this.userBtn.set('label', this.user.name);
      this.userBtn.set('iconClass', this.user.iconClass);
      this.userBtn.set('disabled', !this.user.id);
    }
  });
});
