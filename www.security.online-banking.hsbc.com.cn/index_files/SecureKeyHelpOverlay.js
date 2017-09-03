define([
	// dojo modules
	'module',
	'require',
	'dojo/_base/declare',
	'dojo/_base/lang',
	"dojo/dom",
	"dojo/dom-attr",
	"dojo/dom-construct",
	"dojo/dom-class",
	'dojo/query',
	'dojo/on',

	// extended modules
	'dijit/_WidgetBase',
	'dijit/_TemplatedMixin',
	'dijit/_WidgetsInTemplateMixin',

	// widget template
	//'dojo/text!./templates/SecureKeyHelpOverlay.html',
	'hsbcwidget/ext!/saas/Components/htmls/managetoken/SecureKeyHelpOverlay.html?aggregationRequired',
	//'../common/store/manageTokenStore',


	// other dependencies - no handle required.
	'dijit/form/RadioButton',
	'hsbcwidget/form/Validation',
	//'hsbcwidget/form/ValidationCheckBox'
	'dijit/layout/ContentPane',

	// other dependencies - no handle required.
	'hsbcwidget/form/ValidationCheckBox',
	'hsbcwidget/alertBox',
	'hsbcwidget/Lightbox1',
	'hsbcwidget/form/KeyPressValidationTextBox',

	'dijit/form/Button',
	'hsbcwidget/ToggleButtons',
	'hsbcwidget/ShowHide1'


],

function(module, require, declare,lang,dom,domAttr,domConstruct,domClass, query,on,_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin,template,manageTokenStore){
	var MID = module.id;

	return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		templateString : template,	
		
		postCreate : function(){
			//alert("postCreate from secure key help overlay");
			var F = MID + '.postCreate(): ';
			console.log(F, arguments);
			this.inherited(arguments);
			//this.sidebox.addChild(new SideBox());
			this._initEventHandlers();

		},
		_initEventHandlers : function(){
			var F = MID + '._initEventHandlers(): ';
			console.log(F, arguments);
			this.store = {};
			//this.store.manageTokenStore = new manageTokenStore();
		},

		_onTabSelect : function(event){
			var tab = event.target;
			var tabHashValue = domAttr.get(tab,"href");
			if(tabHashValue && tab.parentNode){
				tabHashValue = tabHashValue.replace("#","");
				if(domClass.contains(tab.parentNode,"active")){
					return;
				}else{
					domClass.remove(this.currentTab,"active");
					domClass.remove(this.currentTabContent,"active");
					domClass.add(this.currentTabContent,"hide");
					this.currentTab = tab.parentNode;
					this.currentTabContent = dom.byId(tabHashValue);
					domClass.remove(this.currentTabContent,"hide");
					domClass.add(this.currentTab,"active");
					domClass.add(this.currentTabContent,"active");
					spanNode = query("span.listStyle02inner",this.currentTab)[0];
					domConstruct.place(this.pointerArrow,spanNode);
				}
			}

		},

		startup : function(){
			//alert("coming in startup......")
			var F = MID + '.startup(): ';
			console.log(F, arguments);


		}
	});
});
