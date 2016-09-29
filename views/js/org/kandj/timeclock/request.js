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
  'dojo/Deferred',
  'dijitkj/ErrorDialog',
  'timeclock/token',
], function(lang, xhr, Deferred, Dialog, token) {

  var giveUp = function(err) {
    var msg = 'Error: ';

    if (!err.response.status) {
      msg += '\n';
    } else {
      msg += err.response.status + '\n';
    }
    msg += 'Request URL: ' + err.response.url + '\n\n';
    msg += err.message + '\n';

    window.alert(msg);
  };

  var getRetryBack = function(defer, useDefaultErrBack = true) {
    return function(err) {
      switch (err.response.status) {
      case 401:
        token.retrieve().then(function() {
          defer.progress();
        }, function(e) {
          defer.reject(e);
          new Dialog({
            title: 'Login',
            content: 'Please login your Google account. Press `OK\' to'
              + ' redirect Google login page',
            onOKClick: function() {
              window.location.href = '/auth/google';
            }
          }).show();
        });
        break;

      default:
        defer.reject(err);
        if (useDefaultErrBack) giveUp(err);
        break;
      }
    };
  };

  function request(url, options, useDefaultErrBack = true) {
    var defaultOptions = {
      handleAs: 'json'
    };
    lang.mixin(defaultOptions, options);
    options = defaultOptions;

    var defaultHeader = {
      'Authorization': 'Bearer ' + token.get()
    };
    lang.mixin(defaultHeader, options.headers);
    options.headers = defaultHeader;

    var defer = new Deferred();
    xhr(url, options).then(function(v) {
      defer.resolve(v);
    }, getRetryBack(defer, useDefaultErrBack));

    return defer.promise;
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

  request.autoRetryHelper = function(url, options, okBack, errBack) {
    request(url, options, !errBack).then(okBack, errBack, function() {
      request(url, options).then(okBack, errBack);
    });
  };
  request.autoRetryHelper.get = function(url, options, okBack,
                                         errBack) {
    var newOp = options ? options: {};
    newOp.method = 'GET';
    return request.autoRetryHelper(url, newOp, okBack, errBack);
  };
  request.autoRetryHelper.post = function(url, options, okBack,
                                          errBack) {
    var newOp = options ? options: {};
    newOp.method = 'POST';
    return request.autoRetryHelper(url, newOp, okBack, errBack);
  };
  request.autoRetryHelper.put = function(url, options, okBack,
                                         errBack) {
    var newOp = options ? options: {};
    newOp.method = 'PUT';
    return request.autoRetryHelper(url, newOp, okBack, errBack);
  };
  request.autoRetryHelper.delete = function(url, options, okBack,
                                            errBack) {
    var newOp = options ? options: {};
    newOp.method = 'DELETE';
    return request.autoRetryHelper(url, newOp, okBack, errBack);
  };

  return request;
});
