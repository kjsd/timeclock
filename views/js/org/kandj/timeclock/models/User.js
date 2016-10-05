/**
 * @file User.js
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
  'dojo/_base/lang',
], function(declare, lang) {
  return declare(null, {
    id: null,
    name: 'Anything else, noble sir?',
    iconClass: 'tcUserUnknownIcon',
    breakTime: 3600, // 1 hour
    hoursStart: '',
    hoursEnd: '',
    lastClockIn: '',

    constructor: function(args) {
      lang.mixin(this, args);
    }
  });
});
