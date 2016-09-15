define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/request',
  'dijit/Toolbar',
  'dijit/ToolbarSeparator',
  'dijit/form/DropDownButton',
  'timeclock/widgets/AboutMe',
  'timeclock/widgets/UserMenu',
], function(declare, lang, request, Toolbar, ToolbarSeparator,
            DropDownButton, AboutMe, UserMenu) {
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
        dropDown: new AboutMe({ style: 'display: none;' })
      }));
    },

    // @Override
    startup: function() {
      this.inherited(arguments);

      request('/res/me', {
        handleAs: 'json'
      }).then(lang.hitch(this, this.setUserInfo),
              lang.hitch(this, this.clearUserInfo));
    },

    // @Override
    destroy: function() {
      this.user_btn = null;

      this.inherited(arguments);
    },

    setUserInfo: function(data) {
      this.user = data;
      this.user_btn.set('label',
                        (this.user.name ?
                         this.user.name: this.label_anonymous));
      this.user_btn.set('iconClass',
                        (this.user.iconClass ?
                         this.user.iconClass: 'tcUserSilhouetteIcon'));
      this.user_btn.set('disabled', false);
    },

    clearUserInfo: function() {
        this.user = { id: '', name: '' };
        this.user_btn.set('label', this.label_anonymous);
        this.user_btn.set('iconClass', 'tcUserUnknownIcon');
        this.user_btn.set('disabled', true);
    }
  });
});
