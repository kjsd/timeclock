/**
 * @file ErrorDialog.js
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
  'dojo/dom-construct',
  'dojo/dom-attr',
  'dijitkj/NotifyDialog'
], function(declare, domConstruct, domAttr, NotifyDialog) {
  return declare(NotifyDialog, {
    style: 'width: 400px;',

    // @Override
    buildRendering: function() {
      this._set('title',
                '<span class="dijitIconError" style="float:'
                + ' left"></span>'
                + this._get('title'));

      this.inherited(arguments);
    }
  });
});
