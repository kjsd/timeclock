/**
 * @file OKDialog.js
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
    // @Override
    buildRendering: function() {
      this.inherited(arguments);

      this.set('closable', false);
    },

    // @Override
    _setClosableAttr: function(val) {
      val = false;
      this.inherited(arguments);
    },

    // @Override
    _setContentAttr: function(cont) {
      // arguments are overwrited
      cont = this.createContent(cont);
      this.inherited(arguments);
    },

    createContent: function(cont) {
      var base = domConstruct.create('div');
      var main = domConstruct.create('div', {
        class: 'dijitDialogPaneContentArea'
      }, base);

      if (typeof(cont) == 'object') {
        domConstruct.place(cont, main);
      } else {
        domAttr.set(main, 'innerHTML', cont);
      }

      var footer = domConstruct.create('div', {
        class: 'dijitDialogPaneActionBar'
      }, base);

      var btn = new Button({
        label: 'OK',
        onClick: lang.hitch(this, function() {
          var hdl = this._get('onOKClick');
          if (hdl) hdl();
          this.hide();
        })
      });
      domConstruct.place(btn.domNode, footer);

      return base;
    }
  });
});
