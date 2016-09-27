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
  // cache
  var token;

  function request(url, options) {
    if (!token) {
      var storageProvider = dojox.storage.manager.getProvider();
      storageProvider.initialize();
      token = storageProvider.get("token");
    }

    var defaultOptions = {
      handleAs: 'json'
    };
    lang.mixin(defaultOptions, options);
    options = defaultOptions;

    var defaultHeader = {
      'Authorization': 'Bearer ' + token
    };
    lang.mixin(defaultHeader, options.headers);
    options.headers = defaultHeader;

    return xhr(url, options);
  };

  request.get = function(url, options) {
    return request(url, options);
  };
  request.post = function(url, options) {
    var newOp = options ? options: {};
    newOp.method = 'POST';
    return request(url, newOp);
  };
  request.put = function(url, options) {
    var newOp = options ? options: {};
    newOp.method = 'PUT';
    return request(url, newOp);
  };
  request.delete = function(url, options) {
    var newOp = options ? options: {};
    newOp.method = 'DELETE';
    return request(url, newOp);
  };

  request.errback = function(err) {
    switch (err.response.status) {
    case 401:
      window.location.href = '/token';
      break;

    default:
      var msg = 'Error: ';

      if (!err.response.status) {
        msg += '\n';
      } else {
        msg += err.response.status + '\n';
      }
      msg += 'Request URL: ' + err.response.url + '\n\n';
      msg += err.message + '\n';

      window.alert(msg);
      break;
    }
  };

  return request;
});
