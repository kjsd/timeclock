define([
  'dojo/_base/declare',
  'dojo/_base/lang',
], function(declare, lang) {
  return declare(null, {
    id: null,
    name: 'Anything else, noble sir?',
    iconClass: 'tcUserUnknownIcon',
    breakTime: 3600, // 1 hour

    constructor: function(args) {
      lang.mixin(this, args);
    }
  });
});
