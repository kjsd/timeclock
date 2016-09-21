define([
  'dojo/_base/lang',
  'dojo/_base/declare',
  'dijit/DropDownMenu',
  'dijit/MenuItem',
  'dijit/MenuSeparator',
  'timeclock/widgets/AboutYouDialog'
], function(lang, declare, DropDownMenu, MenuItem, MenuSeparator,
            AboutYouDialog) {
  return declare(DropDownMenu, {

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.addChild(new MenuItem({
        label: 'About you',
        iconClass: 'tcUserUnknownIcon',
        onClick: lang.hitch(this, function() {
          var userDialog = new AboutYouDialog();
          var dirtyHdl = lang.hitch(this, this.onDirty);
          declare.safeMixin(userDialog, {
            onDirty: function() {
              this.inherited(arguments);
              dirtyHdl();
            }
          });
          userDialog.show();
        })
      }));

      this.addChild(new MenuSeparator());
      this.addChild(new MenuItem({
        label: 'Logout and Deactivate (dropped all data!)',
        iconClass: 'tcThumbIcon'
      }));
      this.addChild(new MenuItem({
        label: 'Logout',
        iconClass: 'tcControlPowerIcon'
      }));
    },

    // @Override
    startup: function() {
      this.inherited(arguments);
    },

    // @Override
    destroy: function() {
      this.inherited(arguments);
    },

    onDirty: function() {
      // nop.
    }
  });
});
