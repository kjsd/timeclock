/**
 * @file desktop.js
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
  'dojo/_base/array',
  'dijit/layout/BorderContainer',
  'timeclock/widgets/Header'
], function(lang, array, BorderContainer, Header) {

  return {
    startup: function() {
      var base = new BorderContainer({
        style: 'width: 100%; height: 100%; margin: 0; padding: 0;',
        gutters: false
      });

      var currentContent;
      var showBody = function(contentName) {
        if (currentContent == contentName) return;

        array.forEach(base.getChildren(), function(child) {
          if (child.region == 'center') {
            base.removeChild(child);
            child.destroyRecursive();
          }
        });
        require([contentName], function(cont) {
          base.addChild(new cont({ region: 'center' }));
          currentContent = contentName;
        });
      };

      var h = new Header({
        region: 'top'
      });
      h.on('requestclockcontent', function() {
        showBody('timeclock/widgets/ClockContent');
      });
      h.on('requesttimelogcontent', function() {
        showBody('timeclock/widgets/TimeLogContent');
      });

      base.addChild(h);

      base.placeAt(document.body);
      base.startup();
    }
  };
});
