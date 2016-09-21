/**
 * @file AutoDestroyDialog.js
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
