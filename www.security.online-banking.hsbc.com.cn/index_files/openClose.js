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
			startOpen: false,
			duration: 500,

			classes: {
				open: 'openCloseOpen',
				content: 'openCloseContent',
				state: 'openCloseState'
			},
			
			states: {
				open: '(expanded)',
				closed: '(collapsed)'
			},

			state: '',

			postCreate: function(){
				//this.$content = query('.' + this.classes.content, this.domNode)[0];
				this.$content = this.domNode;
				this.$state = query('.' + this.classes.state, this.domNode)[0];
			},

			startup: function() {
				if(this.startOpen === false) {
					this.close(true);
				} else {
					this.open(true);
				}
			},


			open: function(snap) {
				if (this.state === 'open') return;

				on.emit(this.domNode, 'open', { bubbles: true, widget: this});
				var duration = this.duration,
					anim;

				if(snap === true) {
					duration = 0;
				}

				anim = fx.wipeIn({
						node: this.$content,
						duration: duration
					});

				on(anim, 'End', lang.hitch(this, function(e) {
					domClass.add(this.domNode, this.classes.open);
					domAttr.set(this.$content, 'aria-hidden', 'false');
					if (this.$state) {
						html.set(this.$state, this.states.open);
					}
					this.set('state', 'open');
				}));

				anim.play();
			},

			close: function(snap) {

				if (this.state === 'closed') return;

				var duration = this.duration,
					anim;

				if(snap === true) {
					duration = 0;
				}

				anim = fx.wipeOut({
						node: this.$content,
						duration: duration
					});

				on(anim, 'End', lang.hitch(this, function(e) {
					domClass.remove(this.domNode, this.classes.open);
					domAttr.set(this.$content, 'aria-hidden', 'true');
					if (this.$state) {
						html.set(this.$state, this.states.closed);
					}
					this.set('state', 'closed');
				}));

				anim.play();
			}
		});

	}
);