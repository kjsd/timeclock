define([
  'dojo/_base/declare',
  'dijit/TooltipDialog',
], function(declare, TooltipDialog) {
  return declare(TooltipDialog, {
    style: 'width: 400px;',
    content: '<div>'
      + '<p>TimeClock / v0.0.1</p>'
      + '<hr />'
      + '<p>Copyright (c) 2016 K&J Software Design Corp. '
      + 'All Rights Reserved.</p>'
      + '</div>',

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
    }
  });
});
