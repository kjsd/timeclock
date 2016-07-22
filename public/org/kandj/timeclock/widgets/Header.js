define([
    'dojo/_base/declare',
    'dojo/dom-style',
    'dijit/Toolbar',
    'dijit/ToolbarSeparator',
    'dijit/TooltipDialog',
    'dijit/form/DropDownButton'
], function(declare, domStyle, Toolbar, ToolbarSeparator,
            TooltipDialog, DropDownButton) {
    return declare(Toolbar, {
        baseClass: 'header',

        user_btn: null,

        // @Override
        postCreate: function() {
            this.inherited(arguments);

            var right = new Toolbar({
                style: "float: right; margin: 0; padding: 0;"
            });
            right.addChild(new ToolbarSeparator());
            right.addChild(this.getAboutWidget());
            this.addChild(right);

            this.user_btn = new DropDownButton({
                label: "Login...",
                style: "font-weight: bold;",
                showLabel: true,
                disabled: true
            });
            this.addChild(this.user_btn);
            this.addChild(new ToolbarSeparator());

            this.login();
        },

        // @Override
        startup: function() {
            this.inherited(arguments);
        },

        // @Override
        destroyRecursive: function() {
            this.user_btn = null;

            this.inherited(arguments);
        },

        login: function() {

        },

        getAboutWidget: function() {
            var about = new TooltipDialog({
                style: 'width: 400px;',
                content: '<div>'
                    + '<p>TimeClock / TAG</p>'
                    + '<hr />'
                    + '<p>Copyright (c) 2016 K&J Software Design Corp. '
                    + 'All Rights Reserved.</p>'
                    + '</div>'
            });
            domStyle.set(about.domNode, "visibility", "hidden");

            return new DropDownButton({
                label: "About Timeclock",
                iconClass: "tcInfoIcon",
                showLabel: false,
                dropDown: about
            });
        }
    });
});
