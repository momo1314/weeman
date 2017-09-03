define([
	'dojo/_base/declare',
	'dijit/form/ValidationTextBox',

	'dojo/on',
    'dojo/query',
	'dojo/_base/lang',
    'dojo/dom-construct',
    'dijit/focus',
    'dojo/NodeList-dom'
], function(
    declare, ValidationTextBox,
    on, query, lang, domConstruct,focusUtil){
	


	return declare([ValidationTextBox], {

        confirmMessage: 'Confirmed',

        validationNode: null,
		postCreate: function(){
			on(this.domNode, 'keyup', lang.hitch(this, 'onKeyUp'));
            this.parentQuestion = query(this.domNode).closest('.jsQuestion');
            this.inlineErrorMessage = query('.jsValidationMsg', this.parentQuestion[0]);
		},

		onKeyUp: function(e){
			
            this.inlineErrorMessage.removeAttr('role', 'alert');
			this.validate(true);
			
	        var $this =dojo.query("#passwordDate .gusTextInput input.dijitInputInner");//the three input element
	        var $scdate = dojo.query("#secureCodeDate .gusTextInput input.dijitInputInner")
	        dojo.query("#passwordDate .gusTextInput div.dijitValidationTextBox, #secureCodeDate .gusTextInput div.dijitValidationTextBox").removeClass('dijitValidationTextBoxError1');			
	        var key = (e.keyCode ? e.keyCode : e.which);
	 
	        var $dayNode = $this[1];
	        var $monthNode = $this[0];
	        var $yearNode = $this[2];
	        
	        var $scdayNode = $scdate[1] ;
	        var $scmonthNode = $scdate[0];
	        var $scyearNode = $scdate[2];
	 
	 
	        if(key >= 48 && key <= 105 && this.id == "dateMonth" && $monthNode.value.length >= 2) {
	            focusUtil.focus($dayNode);
		    }else
		    if(key >= 48 && key <= 105 && this.id == "dateDay" && $dayNode.value.length >= 2) {
		            focusUtil.focus($yearNode);
		    }
	        
			if(key >= 48 && key <= 105 &&  this.id == "scDateMonth" && $scmonthNode.value.length >= 2) {
	            focusUtil.focus($scdayNode);
		    }else{
				if(key >= 48 && key <= 105 &&  this.id == "scDateDay" && $scdayNode.value.length >= 2 ){
						focusUtil.focus($scyearNode);
				}
			}
			
		},

        displayMessage: function(/*String*/ message){
            if(this.inlineErrorMessage.length > 0) {
             /*   if (message && !(message === this.confirmMessage)){
                    this.inlineErrorMessage.addClass('showMsg');
                }
                else {
                    this.inlineErrorMessage.removeClass('showMsg');
                }
*/
            	if(message==""){
            		message=" ";
            	}
                if (message !==  this.inlineErrorMessage.innerHTML()) {
                   this.inlineErrorMessage.innerHTML(message);
                }
                if(message === this.confirmMessage) {
					//    this.inlineErrorMessage.addClass('confirm');
					this.inlineErrorMessage.innerHTML(' ');
                }
			/*	if (message && !message === this.confirmMessage){
                    this.inlineErrorMessage.addClass('showMsg');
					this.inlineErrorMessage.innerHTML(message);
                } else {
                    this.inlineErrorMessage.removeClass('showMsg');
 					this.inlineErrorMessage.innerHTML("");
               }
*/
            }
            else {
                throw new Error(this.id + ': Validation message must be set');
            }

        },

        _onBlur: function(){
			if(this.disabled){ return; }
			this.inherited(arguments);
			this._updatePlaceHolder();
            this.inlineErrorMessage.attr('role', 'alert');
        },

        _onFocus: function(){
			if(this.disabled || this.readOnly){ return; }
			this.inherited(arguments);
			this._updatePlaceHolder();
			this.inlineErrorMessage.removeClass('blurred');
        },
		
		validate: function(isFocused){
			on.emit(this.parentQuestion[0], 'validate', {
				bubbles: true,
				cancelable: true
			});
			
			return this.inherited(arguments);
		}
	});

});