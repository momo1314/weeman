/**
 * Loader widget
 * 
 * A widget to overlay other widgets during some process, such as loading or saving data.
 * 
 * Instantiate a new instance of the Loader and place it as the first node of the calling
 * widget. For example:
 * 	this.loader = new Loader().placeAt(this.domNode, 'first');
 * 
 * The Loader widget is automatically shown when instantiated.
 * 
 * Call #hideLoader() to hide the Loader widget one the process has complete.
 * 
 * Call #showLoader() to show the Loader widget at the start of a process.
 */
define([
	'dojo/_base/declare',
	'dojo/_base/lang',
	'dojo/_base/fx',
	'dojo/dom-style',
	'dojo/topic',
	"dojo/query",
	"dojo/dom-attr",
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetsInTemplateMixin',
	'dojo/text!./templates/Interstitial.html'
], function(declare, lang, fx, domStyle, topic, query, domAttr, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template){
	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		// The widgets template
		templateString: template,
		// Duration of the fade in/out effect (milliseconds)
		fadeDuration: 200,
		// Node i the calling widget to hide when the interstitial widget is displayed
		nodeToHide: null,
		interstitialNode: null,
		loaderClass: 'inline_interstitial',		

		/**
		 * postCreate
		 * 
		 * Displays the Loader widget.
		 * 
		 * Note: no fade in effect here. First, widget is not yet showing so the user would
		 * not see the effect. Second, when the widget is first show the calling widget is
		 * (probably) starting up, so there is nothing to fade in over the top of.
		 * 
		 */
		postCreate: function(){
			this.inherited(arguments);
			domStyle.set(this._interstitialNode, 'display', 'none');
			this.interstitialNode = query('.interstitial', this._interstitialNode)[0];
			if(this.nodeToHide){
				domStyle.set(this.nodeToHide, 'display', 'none');
			}
			
			topic.subscribe("loader/show",lang.hitch(this,function(data){
				this.show();
			}));
			
			topic.subscribe("loader/hide",lang.hitch(this,function(data){
				this.hide();
			}));
			
			topic.subscribe("loader/inlineShow",lang.hitch(this,function(node){
				this.inlineShow(node);
			}));
			
			topic.subscribe("loader/inlineHide",lang.hitch(this,function(){
				this.inlineHide();
			}));			
			
		},
		
		/**
		 * inlineShow
		 * when loader need to shown inline to object.
		 * object like button, textbox etc
		 */	
		inlineShow: function(node){
			domStyle.set(this._interstitialNode, 'display', 'inline-block');
			domStyle.set(this.interstitialNode, 'display', 'none');
			dojo.addClass(node[0], this.loaderClass);
			
			if(this.nodeToHide){
				domStyle.set(this.nodeToHide, 'display', 'none');
			}
			fx.fadeIn({
				node: this._interstitialNode, 
				duration: this.fadeDuration
			}).play();			
		},
		 
		/**
		 * inlineHide
		 * when loader need to hide inline to object.
		 * object like button, textbox etc
		 */	
		inlineHide: function(){
			if(this.nodeToHide){
				domStyle.set(this.nodeToHide, 'display', 'block');
			}
			domAttr.remove(this.interstitialNode, 'style');
			query('.'+ this.loaderClass).forEach(lang.hitch(this,function(node){
				dojo.removeClass(node, this.loaderClass);				
			}));
			fx.fadeOut({
				node: this._interstitialNode, 
				duration: this.fadeDuration, 
				onEnd: lang.hitch(this, function(){ 
					domStyle.set(this._interstitialNode, 'display', 'none');
				})
			}).play();
		},
		  
		/**
		 * show
		 * 
		 * Fade in the widget.
		 * 
		 */
		 
		show: function(){
			domStyle.set(this._interstitialNode, 'display', 'inline-block');
			if(this.nodeToHide){
				domStyle.set(this.nodeToHide, 'display', 'none');
			}
			fx.fadeIn({
				node: this._interstitialNode, 
				duration: this.fadeDuration
			}).play();
		},

		/**
		 * hide
		 * 
		 * Fade out the widget.
		 * 
		 */
		hide: function(){
			if(this.nodeToHide){
				domStyle.set(this.nodeToHide, 'display', 'block');
			}
			fx.fadeOut({
				node: this._interstitialNode, 
				duration: this.fadeDuration, 
				onEnd: lang.hitch(this, function(){ 
					domStyle.set(this._interstitialNode, 'display', 'none');
				})
			}).play();
		}
	})
})