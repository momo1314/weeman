define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dojo/query",
    "dojo/dom-class",
    "dojo/Stateful",
    "dojo/dom-style",
    "dojo/fx",
    "dojo/html",
    "dojo/dom-attr",
    "dojo/on",
    "dojo/_base/lang"
], function(declare, WidgetBase, query, domClass, stateful, domStyle, fx, html, domAttr, on, lang) {

        return declare([WidgetBase], {
            startChecked: false,
            duration: 500,

            selectors: {
                checkbox: '.checkbox',
                checkedTarget: '.checkedTarget',
                uncheckedTarget: '.uncheckedTarget'
            },

            startup: function() {
                this.$checkbox = query(this.selectors.checkbox, this.domNode)[0];
                this.$checkedTarget = query(this.selectors.checkedTarget, this.domNode)[0];
                this.$uncheckedTarget = query(this.selectors.uncheckedTarget, this.domNode)[0];

                on(this.$checkbox, 'click', lang.hitch(this, function(e) {
                    if(domAttr.get(e.target, 'checked')) {
                        this._check();
                    } else {
                        this._uncheck();
                    }
                }));

                if(this.startChecked === true) {
                    this._check(true);
                } else {
                    this._uncheck(true);
                }
            },


            _check: function(snap) {
                var duration = this.duration;

                if(snap === true) {
                    duration = 0;
                }

                this._toggle(this.$checkedTarget, this.$uncheckedTarget, duration);
            },

            _toggle: function(toOpen, toClose, duration){

                closeAnim = fx.wipeOut({
                        node: toClose,
                        duration: duration
                    });

                openAnim = fx.wipeIn({
                        node: toOpen,
                        duration: duration
                    });

                on(closeAnim, 'End', lang.hitch(this, function(e) {
                    domAttr.set(toClose, 'aria-hidden', 'true');
                    openAnim.play();
                }));

                on(openAnim, 'End', lang.hitch(this, function(e) {
                    domAttr.set(toOpen, 'aria-hidden', 'false');
                }));

                closeAnim.play();
            },

            _uncheck: function(snap) {
                var duration = this.duration;

                if(snap === true) {
                    duration = 0;
                }

                this._toggle(this.$uncheckedTarget, this.$checkedTarget, duration);
            }
        });

    }
);