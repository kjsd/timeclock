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
  'dijitkj/OKDialog',
  'dojo/text!./ErrorDialog.html'
], function(declare, Dialog, template) {
  return declare(Dialog, {
    style: 'width: 400px;',
    templateString: template
  });
});
