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
    style: 'width: 300px;',

    // @Override
    createContent: function(cont) {
      var base = domConstruct.create('div');
      var icon = domConstruct.create('span', {
        class: 'dijitIconError',
        style: 'float: left; margin: 10px 10px;'
      }, base);
      var main = domConstruct.create('span', null, base);

      if (typeof(cont) == 'object') {
        domConstruct.place(cont, main);
      } else {
        domAttr.set(main, 'innerHTML', cont);
      }

      cont = base;
      return this.inherited(arguments);
    }
  });
});
