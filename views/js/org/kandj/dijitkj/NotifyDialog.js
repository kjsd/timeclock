/**
 * @file NotifyDialog.js
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
  'dojo/dom-construct',
  'dojo/dom-attr',
  'dijit/form/Button',
  'dijitkj/AutoDestroyDialog'
], function(declare, lang, domConstruct, domAttr, Button,
            AutoDestroyDialog) {
  return declare(AutoDestroyDialog, {
    style: 'margin: 0; padding 0;',
    mainDom: null,

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.set('closable', false);

      var base = domConstruct.create('div');
      this.mainDom = domConstruct.create('div', {
        class: 'dijitDialogPaneContentArea'
      }, base);

      var footer = domConstruct.create('div', {
        class: 'dijitDialogPaneActionBar'
      }, base);

      var btn = new Button({
        label: 'OK',
        onClick: lang.hitch(this, function() {
          this.hide();
        })
      });
      domConstruct.place(btn.domNode, footer);

      this.set('content', base);
    },

    // @Override
    _setContentAttr: function(cont) {
      domConstruct.place(cont, this.mainDom);
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
