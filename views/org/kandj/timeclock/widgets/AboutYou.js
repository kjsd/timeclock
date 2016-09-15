define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/request',
  'dojo/dom-construct',
  'dojo/dom-attr',
  'dojo/store/Memory',
  'dijit/Dialog',
  'dijit/form/Select',
  'dojox/form/TimeSpinner',
], function(declare, lang, request, domConstruct, domAttr, Memory,
            Dialog, Select, TimeSpinner) {
  return declare(Dialog, {
    user: { id: '', name: '' },
    nameDom: null,
    breakTime: null,
    iconSelect: null,

    // @Override
    postCreate: function() {
      this.inherited(arguments);

      this.set('title', 'About you');

      var base = domConstruct.create('div',
                                     { class: 'dijitDialogPaneContentArea' });
      
      var namepara = domConstruct.create('p', null, base);

      this.iconSelect = new Select({
        sortByLabel: false,
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

      var tbl = domConstruct.create('table', null, base);
      var tr = domConstruct.create('tr', null, tbl);

      domConstruct.place('<td>A breaktime length: </td>', tr);

      this.breakTime = new TimeSpinner({
        style: 'width: 100px',
        smallDelta: 1,
        largeDelta: 30,
        value: '0:30'
      });
      domConstruct.place(this.breakTime.domNode,
                         domConstruct.create('td', null, tr));

      this.set('content', base);
    },

    // @Override
    startup: function() {
      this.inherited(arguments);
    },

    onShow: function() {
      this.inherited(arguments);

      request('/res/me', {
        handleAs: 'json'
      }).then(lang.hitch(this, function(data) {
        this.user = data;

        domAttr.set(this.nameDom, 'innerHTML', this.user['name']);
        this.iconSelect.set('value', this.user['iconClass']);
      }));
    },
      
    onHide: function() {
      this.inherited(arguments);
      setTimeout(lang.hitch(this, this.destroyRecursive), 0);
    },
      
    // @Override
    destroy: function() {
      this.inherited(arguments);
    }
  });
});
