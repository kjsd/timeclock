/**
 * @file ClockContent.js
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
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/dom-construct',
  'dojo/dom-attr',
  'dojo/dom-style',
  'dojo/dom-geometry',
  'dojo/date',
  'dojo/date/stamp',
  'dojo/date/locale',
  'dijit/layout/ContentPane',
  'dijit/layout/BorderContainer',
  'dijit/form/Button',
  'dijit/form/TimeTextBox',
  'timeclock/request',
], function(declare, lang, domConstruct, domAttr, domStyle, domGeom,
            date, stamp, locale, ContentPane, BorderContainer, Button,
            TimeTextBox, request) {

  return declare(ContentPane, {
    style: 'width: 100%; height: 100%;',
    baseContainer: null,
    timeContent: null,
    leftContent: null,
    centerContent: null,
    rightContent: null,

    dateDom: null,
    timeDom: null,

    // @Override
    buildRendering: function() {
      this.inherited(arguments);

      this.baseContainer = new BorderContainer({
        design: 'headline',
        gutters: false
      });

      this.timeContent = new ContentPane({
        region: 'top',
        style: 'font-size: 3em; overflow: hidden;'
          + ' color: #999;'
      });
      var timeBase = domConstruct.create('div');
      this.dateDom = domConstruct.create('div', null, timeBase);
      this.timeDom = domConstruct.create('div', null, timeBase);
      this.timeContent.set('content', timeBase);

      this.baseContainer.addChild(this.timeContent);

      this.leftContent = new ContentPane({
        region: 'left'
      });
      this.baseContainer.addChild(this.leftContent);

      this.centerContent = new ContentPane({
        region: 'center'
      });
      this.baseContainer.addChild(this.centerContent);

      this.rightContent = new ContentPane({
        region: 'right'
      });
      this.baseContainer.addChild(this.rightContent);

      this.timeUpdate();

      this.set('content', this.baseContainer);
    },

    // @Override
    postCreate: function() {
      this.inherited(arguments);

/*
      this.centerContent.set('content',
                             this.getClockingContent('ClockIn'));
      this.baseContainer.layout();
*/
    },

    // @Override
    startup: function() {
      this.inherited(arguments);
    },

    // @Override
    onShow: function() {
      this.inherited(arguments);

      var pos = domGeom.position(this.domNode, true);
      var tcPos = domGeom.position(this.timeContent.domNode, true);
      console.log(domGeom.position(this.baseContainer.domNode, true));

      var centerY = pos.y - tcPos.y + (pos.h - tcPos.h);
      console.log(pos);
      console.log(tcPos);
      console.log(centerY);
      domStyle.set(this.timeContent.domNode, {
        left: '100px',
        top: '200px'
      });

      this.timeUpdater = setInterval(
        lang.hitch(this, this.timeUpdate), 1000);
    },

    // @Override
    destroy: function() {
      clearInterval(this.timeUpdater);

      this.dateDom = null;
      this.timeDom = null;
      this.rightContent = null;
      this.centerContent = null;
      this.leftContent = null;
      this.timeContent = null;
      this.baseContainer = null;

      this.inherited(arguments);
    },

    timeUpdate: function() {
      var now = new Date();
      domAttr.set(this.dateDom, 'innerHTML', locale.format(now, {
        formatLength: 'full',
        selector: 'date'
      }));
      domAttr.set(this.timeDom, 'innerHTML', locale.format(now, {
        selector: 'time',
        timePattern: 'HH:mm:ss'
      }));
    },

    getClockingContent: function(name) {
      var base = domConstruct.create('div');

      var timeForm = new TimeTextBox({
        disabled: true,
        class: 'tcLoginWidget',
        constraints: {
          timePattern: "HH:mm",
          clickableIncrement: "T00:15:00",
          visibleIncrement: "T00:15:00",
          visibleRange: "T01:00:00"
        }
      });
      domConstruct.place(timeForm.domNode, base);

      var clockingBtn = new Button({
        disabled: true,
        class: 'tcLoginWidget',
        label: name,
        onClick: function() {
          console.log('tbd.');
        }
      });
      domConstruct.place(clockingBtn.domNode, base);

      return base;
    }

  });
});
