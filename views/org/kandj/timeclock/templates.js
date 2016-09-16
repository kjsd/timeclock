define([
], function() {
  return {
    getRequestErrorHandler() {
      return function(err) {
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
    }
  };
});

