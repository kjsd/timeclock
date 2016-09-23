/**
 * @file TimeLogContent.js
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
  'dijit/layout/ContentPane',
  'dijit/layout/BorderContainer'
], function(declare, lang, ContentPane, BorderContainer) {
  return declare(ContentPane, {
    
    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.set('content', 'timeLog');
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
