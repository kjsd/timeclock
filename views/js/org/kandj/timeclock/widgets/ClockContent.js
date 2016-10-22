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
  'dojo/query',
  'dojo/topic',
  'dojo/date',
  'dojo/date/stamp',
  'dojo/date/locale',
  'dijit/registry',
  'dijit/layout/ContentPane',
  'dijit/layout/BorderContainer',
  'dijit/form/Button',
  'dijit/form/TimeTextBox',
  'timeclock/request',
], function(declare, lang, domConstruct, domAttr, query, topic,
            date, stamp, locale, registry, ContentPane,
            BorderContainer, Button, TimeTextBox, request) {

  return declare(ContentPane, {
    style: 'width: 100%; height: 100%;',

    user: null,

    baseContainer: null,
    timeContent: null,
    centerContent: null,

    dateDom: null,
    timeDom: null,

    userLoginHdl: null,
    userLogoutHdl: null,

    // @Override
    buildRendering: function() {
      this.inherited(arguments);

      this.baseContainer = new BorderContainer({
        design: 'headline',
        gutters: false
      });

      this.timeContent = new ContentPane({
        region: 'top',
        style: 'text-align: center; font-size: 3em; overflow: hidden;'
          + ' color: #999; margin: 30px;'
      });
      var timeBase = domConstruct.create('div');
      this.dateDom = domConstruct.create('div', null, timeBase);
      this.timeDom = domConstruct.create('div', null, timeBase);
      this.timeContent.set('content', timeBase);

      this.baseContainer.addChild(this.timeContent);

      this.centerContent = new ContentPane({
        region: 'center',
        style: 'text-align: center;'
      });
      this.baseContainer.addChild(this.centerContent);

      this.timeUpdate();

      this.set('content', this.baseContainer);
    },

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.userLoginHdl = topic.subscribe(
        'user/login', lang.hitch(this, function(data) {
          this.user = data;
          this.showClockContent();
          query('.tcLoginWidget').forEach(function(n) {
            var w = registry.byNode(n);
            if (w) w.set('disabled', false);
          });
        }));
      this.userLogoutHdl = topic.subscribe(
        'user/logout', lang.hitch(this, function() {
          this.user = null;
          query('.tcLoginWidget').forEach(function(n) {
            var w = registry.byNode(n);
            if (w) w.set('disabled', true);
          });
        }));
    },

    // @Override
    startup: function() {
      this.inherited(arguments);

      this.timeUpdater = setInterval(
        lang.hitch(this, this.timeUpdate), 1000);
    },

    // @Override
    onShow: function() {
      this.inherited(arguments);

      this.showClockContent();
    },

    // @Override
    destroy: function() {
      clearInterval(this.timeUpdater);

      if (this.userLoginHdl) this.userLoginHdl.remove();
      if (this.userLogoutHdl) this.userLogoutHdl.remove();

      this.dateDom = null;
      this.timeDom = null;
      this.centerContent = null;
      this.timeContent = null;
      this.baseContainer = null;

      this.user = null;

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

    showClockContent: function() {
      request.autoRetryHelper(
        '/res/clock/incomplete', null,
        lang.hitch(this, function(data) {
          this.showClockOutContent(data.clockInTime);
        }),
        lang.hitch(this, function(err) {
          if (err.response.status != 404) return;

          this.showClockInContent();
        }));
    },

    showClockInContent: function() {
      this.centerContent.set(
        'content', this.getClockBtn(
          'ClockIn', lang.hitch(this, function() {
            request.autoRetryHelper.put(
              '/res/clock/in', null, lang.hitch(this, function(data) {
                this.showClockOutContent(data.clockInTime);
              }));
          })));
    },

    showClockOutContent: function(clockInTimeStr) {
      var main = domConstruct.create('div');
      domConstruct.create('span', {
        innerHTML: clockInTimeStr
      }, main);
      domConstruct.create('span', {
        class: 'tcArrowIcon'
      }, main);

      var btn = this.getClockBtn(
        'ClockOut', lang.hitch(this, function() {
          request.autoRetryHelper.put(
            '/res/clock/out', null, lang.hitch(this, function(data) {
            }));
        }));
      domConstruct.place(btn.domNode, main);

      this.centerContent.set('content', main);
    },

    getClockBtn: function(label, onClick) {
      var btn = new Button({
        disabled: !this.user,
        class: 'tcLoginWidget',
        style: 'font-size: 3em;',
        label: label,
        onClick: onClick
      });

      return btn;
    }
  });
});
