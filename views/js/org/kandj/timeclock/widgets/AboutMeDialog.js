/**
 * @file AboutMeDialog.js
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
  'dijit/TooltipDialog',
], function(declare, TooltipDialog) {
  return declare(TooltipDialog, {
    style: 'width: 400px;',
    content: '<div>'
      + '<p>TimeClock / v0.0.1</p>'
      + '<hr />'
      + '<p>'
      + '<div>Copyright (c) 2016 K&J Software Design Corp. '
      + 'All Rights Reserved.</div>'
      + '<a href="http://www.kandj.org">http://www.kandj.org</a>'
      + '</p>'
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
