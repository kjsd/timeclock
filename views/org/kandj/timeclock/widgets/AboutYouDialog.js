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
  'dojo/request',
  'dojo/dom-construct',
  'dojo/dom-attr',
  'dijit/form/Select',
  'dijit/form/Button',
  'dijitkj/IntervalTextBox',
  'dijitkj/AutoDestroyDialog',
  'timeclock/models/User',
  'timeclock/templates'
], function(declare, lang, request, domConstruct, domAttr, Select,
            Button, IntervalTextBox, AutoDestroyDialog, User, templates) {
  return declare(AutoDestroyDialog, {
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

      var base = domConstruct.create('div');
      var main = domConstruct.create('div', {
        class: 'dijitDialogPaneContentArea'
      }, base);
      
      var namepara = domConstruct.create('p', null, main);

      this.iconSelect = new Select({
        sortByLabel: false,
        onChange: lang.hitch(this, function(v) {
          if (v == this.user.iconClass) return;

          request.put('/res/users/me', {
            data: {
              iconClass: v
            },
            handleAs: 'json'
          }).then(lang.hitch(this, function(data) {
            this.dirty = true;
          }), templates.getRequestErrorHandler());
        }),
        options: [
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
        ]
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

          request.put('/res/users/me', {
            data: {
              breakTime: newVal
            },
            handleAs: 'json'
          }).then(lang.hitch(this, function(data) {
            this.dirty = true;
          }), templates.getRequestErrorHandler());
        })
      });
      domConstruct.place(this.breakTime.domNode,
                         domConstruct.create('td', null, tr));

      var footer = domConstruct.create('div', {
        class: 'dijitDialogPaneActionBar'
      }, base);

      var btn = new Button({
        label: 'OK',
        onClick: lang.hitch(this, function() {
          this.hide();
        })
      });
      domConstruct.place(btn.domNode, footer);

      this.set('content', base);
    },

    // @Override
    startup: function() {
      this.inherited(arguments);
    },

    // @Override
    destroy: function() {
      this.inherited(arguments);
    },

    // @Override
    onShow: function() {
      this.inherited(arguments);

      if (this.user) {
        this.setUserInfo();
      } else {
        this.user = new User();

        request('/res/users/me', {
          handleAs: 'json'
        }).then(lang.hitch(this, function(data) {
          lang.mixin(this.user, data);
          this.setUserInfo();
        }), templates.getRequestErrorHandler());
      }
    },

    // @Override
    onHide: function() {
      this.inherited(arguments);

      if (this.dirty) this.onDirty();
    },

    onDirty: function() {
      // nop.
    },

    setUserInfo: function() {
      domAttr.set(this.nameDom, 'innerHTML', this.user.name);
      this.iconSelect.set('value', this.user.iconClass);
      this.breakTime.set('interval', this.user.breakTime);
    }
  });
});
