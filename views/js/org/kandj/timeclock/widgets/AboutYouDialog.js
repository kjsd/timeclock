/**
 * @file AboutYouDialog.js
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
  'dojo/date/stamp',
  'dojo/topic',
  'dijit/form/Select',
  'dijit/form/Button',
  'dijit/form/CheckBox',
  'dijit/form/TimeTextBox',
  'dojokj/IntervalTextBox',
  'dojokj/OKDialog',
  'timeclock/models/User',
  'timeclock/request'
], function(declare, lang, domConstruct, domAttr, domStyle, stamp,
            topic, Select, Button, CheckBox, TimeTextBox,
            IntervalTextBox, Dialog, User, request) {

  return declare(Dialog, {
    style: 'margin: 0; padding 0;',
    user: null,
    nameDom: null,
    clockStateDom: null,
    useHours: null,
    hoursStart: null,
    hoursEnd: null,
    breakTime: null,
    iconSelect: null,

    // @Override
    buildRendering: function() {
      this.inherited(arguments);

      this.set('title', 'About you');

      var userUpdater = lang.hitch(this, function(attr, formatter) {
        return lang.hitch(this, function(v) {
          var newVal = (typeof(formatter) == 'function') ? formatter(v): v;
          if (newVal == this.user[attr]) return;

          var opt = { data: {} };
          opt.data[attr] = newVal;
          request.autoRetryHelper.put(
            '/res/me', opt, lang.hitch(this, function(data) {
              lang.mixin(this.user, data);
              topic.publish('user/dirty', this.user);
            })
          );
        });
      });

      var main = domConstruct.create('div');
      var namepara = domConstruct.create('div', null, main);

      this.iconSelect = new Select({
        sortByLabel: false,
        options: [
          { value: 'tcUserSilhouetteIcon',
            label: '<div class="tcUserSilhouetteIcon" />' },
          { value: 'tcUserIcon',
            label: '<div class="tcUserIcon" />' },
          { value: 'tcUserFemaleIcon',
            label: '<div class="tcUserFemaleIcon" />' },
          { value: 'tcUserBlackIcon',
            label: '<div class="tcUserBlackIcon" />' },
          { value: 'tcUserBusinessIcon',
            label: '<div class="tcUserBusinessIcon" />' },
          { value: 'tcUserBusinessBossIcon',
            label: '<div class="tcUserBusinessBossIcon" />' },
          { value: 'tcUserGreenIcon',
            label: '<div class="tcUserGreenIcon" />' },
          { value: 'tcUserGreenFemaleIcon',
            label: '<div class="tcUserGreenFemaleIcon" />' },
          { value: 'tcUserNudeIcon',
            label: '<div class="tcUserNudeIcon" />' },
          { value: 'tcUserNudeFemaleIcon',
            label: '<div class="tcUserNudeFemaleIcon" />' },
          { value: 'tcUserOrangeIcon',
            label: '<div class="tcUserOrangeIcon" />' },
          { value: 'tcUserOrangeFemaleIcon',
            label: '<div class="tcUserOrangeFemaleIcon" />' },
          { value: 'tcUserThiefIcon',
            label: '<div class="tcUserThiefIcon" />' },
          { value: 'tcUserThiefBaldieIcon',
            label: '<div class="tcUserThiefBaldieIcon" />' },
          { value: 'tcUserWhiteIcon',
            label: '<div class="tcUserWhiteIcon" />' },
          { value: 'tcUserWhiteFemaleIcon',
            label: '<div class="tcUserWhiteFemaleIcon" />' },
        ],
        onChange: userUpdater('iconClass')
      });
      domConstruct.place(this.iconSelect.domNode, namepara);

      this.nameDom = domConstruct.create('span', {
        style: 'font-weight: bold; margin: 10px;'
      }, namepara);

      this.clockStateDom = domConstruct.create('div', {
        style: 'margin: 10px;'
      }, main);

      var tbl = domConstruct.create('table', null, main);

      var tr = domConstruct.create('tr', null, tbl);
      var td = domConstruct.create('td', null, tr);
      this.useHours = new CheckBox({
        name: 'useHours',
        checked: false,
        onChange: lang.hitch(this, function(v) {
          this.hoursStart.set('disabled', !v);
          this.hoursEnd.set('disabled', !v);
          userUpdater('useHours')(v);
        })
      });
      domConstruct.place(this.useHours.domNode, td);
      domConstruct.place('<label for="useHours">Your hours: </label>', td);

      this.hoursStart = new TimeTextBox({
        disabled: true,
        style: 'width: 100px',
        constraints: {
          timePattern: 'HH:mm'
        },
        onChange: userUpdater('hoursStart', function(v) {
          return stamp.toISOString(v, { selector: 'time' });
        })
      });
      this.hoursEnd = new TimeTextBox({
        disabled: true,
        style: 'width: 100px',
        constraints: {
          timePattern: 'HH:mm'
        },
        onChange: userUpdater('hoursEnd', function(v) {
          return stamp.toISOString(v, { selector: 'time' });
        })
      });

      td = domConstruct.create('td', null, tr);
      domConstruct.place(this.hoursStart.domNode, td);
      domConstruct.create('span', {
        innerHTML: '-',
        style: 'margin: 10px;'
      }, td);
      domConstruct.place(this.hoursEnd.domNode, td);

      tr = domConstruct.create('tr', null, tbl);
      domConstruct.place('<td>A breaktime length: </td>', tr);

      this.breakTime = new IntervalTextBox({
        style: 'width: 100px',
        constraints: {
          timePattern: 'HH:mm'
        },
        onChange: userUpdater(
          'breakTime', lang.hitch(this, function(v) {
            return this.breakTime.get('interval');
          }))
      });
      domConstruct.place(this.breakTime.domNode,
                         domConstruct.create('td', null, tr));

      this.set('content', main);
    },

    // @Override
    startup: function() {
      this.inherited(arguments);

      if (this.user) {
        this.setUserInfo();
      } else {
        this.user = new User();

        request.autoRetryHelper(
          '/res/me', null, lang.hitch(this, function(data) {
            this.setUserInfo(data);
          })
        );
      }
    },

    // @Override
    destroy: function() {
      this.user = null;
      this.nameDom = null;
      this.clockStateDom = null;
      this.hoursStart = null;
      this.hoursEnd = null;
      this.useHours = null;
      this.breakTime = null;
      this.iconSelect = null;

      this.inherited(arguments);
    },

    // @Override
    onShow: function() {
      this.inherited(arguments);
    },

    setUserInfo: function(user) {
      lang.mixin(this.user, user);

      domAttr.set(this.nameDom, 'innerHTML', this.user.name);

      this.iconSelect.set('value', this.user.iconClass);
      this.useHours.set('checked', this.user.useHours);
      this.hoursStart.set('disabled', !this.user.useHours);
      this.hoursStart.set('value', this.user.hoursStart);
      this.hoursEnd.set('disabled', !this.user.useHours);
      this.hoursEnd.set('value', this.user.hoursEnd);
      this.breakTime.set('interval', this.user.breakTime);

      request.autoRetryHelper(
        '/res/clock/incomplete', null,
        lang.hitch(this, function(data) {
          domAttr.set(this.clockStateDom, 'innerHTML', 'You now on the'
                      + ' clock.');
          domStyle.set(this.clockStateDom, 'color', 'red');
        }),
        lang.hitch(this, function(err) {
          domAttr.set(this.clockStateDom, 'innerHTML', '- Off the clock -');
          domStyle.set(this.clockStateDom, 'color', '#999');
        }));
    }
  });
});
