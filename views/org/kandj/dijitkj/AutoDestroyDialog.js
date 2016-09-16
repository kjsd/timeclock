define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dijit/Dialog',
], function(declare, lang, Dialog) {
  return declare(Dialog, {

    // @Override
    postCreate: function() {
      this.inherited(arguments);
    },

    // @Override
    startup: function() {
      this.inherited(arguments);
    },

    // @Override
    destroy: function() {
      this.inherited(arguments);
    },

    // @Override
    hide: function() {
      this.inherited(arguments).then(lang.hitch(this, function() {
        this.destroyRecursive();
      }));
    }
  });
});
