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
  'dijit/layout/BorderContainer',
  'timeclock/widgets/Header',
], function(BorderContainer, Header) {
  return {
    startup: function() {
      var base = new BorderContainer({
        style: 'width: 100%; height: 100%; margin: 0; padding: 0;'
      });

      base.addChild(new Header({ region: 'top' }));

      base.placeAt(document.body);
      base.startup();
    }
  };
});