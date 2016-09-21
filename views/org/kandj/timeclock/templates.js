/**
 * @file templates.js
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

