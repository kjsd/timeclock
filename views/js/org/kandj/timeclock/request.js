/**
 * @file request.js
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
  'dojo/_base/lang',
  'dojo/request/xhr',
  'dojox/storage',
], function(lang, xhr, storage) {
  return function(url, options) {
    var storageProvider = dojox.storage.manager.getProvider();
    storageProvider.initialize();
    var token = storageProvider.get("token");

    var authHeader = {
      'Authorization': 'Bearer ' + token
    };
    lang.mixin(authHeader, options.headers);
    options.headers = authHeader;

    console.log(options);
    return xhr(url, options);
  };
});

