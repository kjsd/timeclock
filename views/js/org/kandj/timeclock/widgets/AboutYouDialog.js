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
  'dijit/form/Select',
  'dijit/form/Button',
  'dijitkj/IntervalTextBox',
  'dijitkj/OKDialog',
  'timeclock/models/User',
  'timeclock/request'
], function(declare, lang, domConstruct, domAttr, Select, Button,
            IntervalTextBox, Dialog, User, request) {

  return declare(Dialog, {
    style: 'margin: 0; padding 0;',
    user: null,
    nameDom: null,
    breakTime: null,
    iconSelect: null,
    dirty: false,

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.set('title', 'About you');

      var main = domConstruct.create('div');
      var namepara = domConstruct.create('p', null, main);

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
        onChange: lang.hitch(this, function(v) {
          if (v == this.user.iconClass) return;

          request.autoRetryHelper.put('/res/me', {
            data: {
              iconClass: v
            }
          }, lang.hitch(this, function(data) {
            lang.mixin(this.user, data);
            this.emit('dirty', {});
          }));
        })
      });
      domConstruct.place(this.iconSelect.domNode, namepara);

      this.nameDom = domConstruct.create('span', {
        style: 'font-weight: bold; margin: 10px;'
      }, namepara);

      var tbl = domConstruct.create('table', null, main);
      var tr = domConstruct.create('tr', null, tbl);

      domConstruct.place('<td>A breaktime length of a day: </td>', tr);

      this.breakTime = new IntervalTextBox({
        onChange: lang.hitch(this, function(v) {
          var newVal = this.breakTime.get('interval');
          if (newVal == this.user.breakTime) return;

          request.autoRetryHelper.put('/res/me', {
            data: {
              breakTime: newVal
            }
          }, lang.hitch(this, function(data) {
            lang.mixin(this.user, data);
            this.emit('dirty', {});
          }));
        })
      });
      domConstruct.place(this.breakTime.domNode,
                         domConstruct.create('td', null, tr));

      this.set('content', main);
    },

    // @Override
    startup: function() {
      this.inherited(arguments);
    },

    // @Override
    destroy: function() {
      this.user = null;
      this.nameDom = null;
      this.breakTime = null;
      this.iconSelect = null;

      this.inherited(arguments);
    },

    // @Override
    onShow: function() {
      this.inherited(arguments);

      if (this.user) {
        this.setUserInfo();
      } else {
        this.user = new User();

        request.autoRetryHelper('/res/me', null,
                                lang.hitch(this, function(data) {
                                  lang.mixin(this.user, data);
                                  this.setUserInfo();
                                }));
      }
    },

    setUserInfo: function() {
      domAttr.set(this.nameDom, 'innerHTML', this.user.name);

      this.iconSelect.set('value', this.user.iconClass);
      this.breakTime.set('interval', this.user.breakTime);
    }
  });
});
