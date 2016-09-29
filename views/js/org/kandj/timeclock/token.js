/**
 * @file token.js
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
  'dojo/Deferred',
  'dojo/request',
  'dojox/storage',
], function(Deferred, request, storage) {
  var cache;

  function token() {
  };

  token.get = function() {
    if (!cache) {
      var storageProvider = dojox.storage.manager.getProvider();
      storageProvider.initialize();
      cache = storageProvider.get("token");
    }
    return cache;
  };

  token.set = function(v) {
    cache = null;
    var defer = new Deferred();

    var storageProvider = dojox.storage.manager.getProvider();
    storageProvider.initialize();
    storageProvider.put("token", v, function(status, keyName) {
      cache = v;
      defer.resolve(status);
    });

    return defer.promise;
  };

  token.retrieve = function() {
    var defer = new Deferred();

    request('/token', {
      handleAs: 'json',
      headers: {
        'Authorization': 'Bearer ' + token.get()
      }
    }).then(function(v) {
      console.log(v);
      token.set(v.token).then(function() {
        defer.resolve();
      });
    }, function(err) {
      defer.reject(err);
    });

    return defer.promise;
  };

  return token;
});
