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
  'dojo/topic',
  'dijit/layout/BorderContainer',
  'timeclock/widgets/Header'
], function(lang, array, topic, BorderContainer, Header) {

  var user;
  var currentContent;

  var base = new BorderContainer({
    style: 'width: 100%; height: 100%;',
    gutters: false
  });

  var showBody = function(contentName) {
    if (currentContent == contentName) return;

    array.forEach(base.getChildren(), function(child) {
      if (child.region == 'center') {
        base.removeChild(child);
        child.destroyRecursive();
      }
    });
    require([contentName], function(cont) {
      base.addChild(new cont({
        region: 'center',
        user: user
      }));
      currentContent = contentName;
    });
  };

  return {
    startup: function() {
      topic.subscribe('user/login', function(data) {
        user = data;
      });

      topic.subscribe('content/requestToShow', function(contName) {
        switch (contName) {
        case 'clock':
          showBody('timeclock/widgets/ClockContent');
          break;
        case 'timelog':
          showBody('timeclock/widgets/TimeLogContent');
          break;
        default:
          break;
        }
      });

      base.addChild(new Header({
        region: 'top'
      }));
      showBody('timeclock/widgets/ClockContent');

      base.placeAt(document.body);
      base.startup();
    }
  };
});
