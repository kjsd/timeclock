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
  'dojo/json',
  'dojo/Deferred',
  'dojokj/ErrorDialog',
  'timeclock/token',
], function(lang, xhr, JSON, Deferred, Dialog, token) {

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

  var showLogined = false;
  var showLoginDialog = function(title, msg) {
    if (showLogined) return;
    showLogined = true;

    new Dialog({
      title: title,
      content: msg,
      onOKClick: function() {
        window.location.href = '/auth/google';
      }
    }).show();
  };

  var getRetryBack = function(defer, useDefaultErrBack = true) {
    return function(err) {
      switch (err.response.status) {
      case 401:
        token.retrieve().then(function() {
          defer.progress('token updated. need retry');
        }, function(e) {
          showLoginDialog('Login',
                          'Authorization expired. Please login'
                          + ' again.');
        });
        break;

      default:
        defer.reject(err);
        if (useDefaultErrBack) giveUp(err);
      }
    };
  };

  function request(url, options, useDefaultErrBack = true) {
    var defer = new Deferred();

    if (!token.get()) {
      showLoginDialog('Welcome!',
                      '<h3>This site provides the Web-Based Timeclock'
                      + ' and recording time log for you the'
                      + ' worker.</h3>'
                      + 'You can start so easy! It just only a Google'
                      + ' account what you need. Please press'
                      + ' `OK\' to login and I will redirect you'
                      + ' to Google login page.');
      return defer.promise;
    }

    var defaultOptions = {
      handleAs: 'json'
    };
    lang.mixin(defaultOptions, options);
    options = defaultOptions;

    var defaultHeader = {
      'Authorization': 'Bearer ' + token.get()
    };

    if (typeof(options.data) == 'object') {
      defaultHeader['Content-Type'] = 'application/json';
      options.data = JSON.stringify(options.data);
    }

    lang.mixin(defaultHeader, options.headers);
    options.headers = defaultHeader;

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
