/**
 * @file IntervalTextBox.js
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
  'dojo/_base/declare',
  'dojo/date',
  'dojo/date/locale',
  'dijit/form/TimeTextBox',
], function(declare, date, locale, TimeTextBox) {
  return declare(TimeTextBox, {

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
    _getIntervalAttr: function() {
      var val = this._get('value');
      var base = new Date(1970, 0, 1, 0, 0, 0);

      return date.difference(base, val, 'second');
    },

    // @Override
    _setIntervalAttr: function(sec) {
      var base = new Date(1970, 0, 1, 0, 0, 0);
      var newval = date.add(base, 'second', sec);

      this.set('value', locale.format(newval, {
        timePattern: '\'T\'HH:mm:ss',
        selector: 'time'
      }));
    }
  });
});
