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
  'dojox/storage',
  'dijit/layout/BorderContainer',
  'dijit/layout/TabContainer',
  'timeclock/widgets/Header',
  'timeclock/widgets/ClockContent',
  'timeclock/widgets/TimeLogContent',
], function(lang, array, storage, BorderContainer, TabContainer, Header,
            ClockContent, TimeLogContent) {
  return {
    base: null,

    startup: function() {
      this.base = new BorderContainer({
        style: 'width: 100%; height: 100%; margin: 0; padding: 0;'
      });

      this.base.addChild(new Header({
        region: 'top'
      }));

      var main = new TabContainer({
        region: 'center'
      });
      main.addChild(new ClockContent({
        title: '<span class="tcClockIcon"></span>TimeClock'
      }));
      main.addChild(new TimeLogContent({
        title: '<span class="tcTableIcon"></span>TimeLog'
      }));
      this.base.addChild(main);

      this.base.placeAt(document.body);
      this.base.startup();
    }
  };
});
