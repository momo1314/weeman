define([
	'dojo/_base/declare',
	'dijit/form/ValidationTextBox',

	'dojo/on',
    'dojo/query',
	'dojo/_base/lang',
    'dojo/dom-construct',

    

    'dojo/NodeList-dom'
], function(
    declare, ValidationTextBox,
    on, query, lang, domConstruct){

	return declare([ValidationTextBox], {
		state: 'Incomplete',
        confirmMessage: 'Confirmed',
		invalidMessage1:'false',
        validationNode: null,
		postCreate: function()
		{
		//alert(this.minmaxmessage);
			on(this.domNode, 'keyup', lang.hitch(this, 'onKeyUp'));
            this.parentQuestion = query(this.domNode).closest('.jsQuestion');
            this.inlineErrorMessage = query('.jsValidationMsg', this.parentQuestion[0]);
		},

		onKeyUp: function(){
            this.inlineErrorMessage.removeAttr('role', 'alert');
			this.validate();
		},

        displayMessage: function(/*String*/ message){
		if(this.invalidMessage1=="true"){
		this.invalidMessage1="false";
		message=this.emptyMessgae;
		}
		
            if(this.inlineErrorMessage.length > 0) {
                if (message){
                    this.inlineErrorMessage.addClass('showMsg');
                }
                else {
                    this.inlineErrorMessage.removeClass('showMsg');
                }

                if (message !==  this.inlineErrorMessage.innerHTML()) {
                   this.inlineErrorMessage.innerHTML(message);
                }
                if(message === this.confirmMessage) {
                    this.inlineErrorMessage.addClass('confirm');
                }
                else {
                    this.inlineErrorMessage.removeClass('confirm');
                }

            }
            else {
                throw new Error(this.id + ': Validation message must be set');
            }

        },

        _onBlur: function(){
            this.inlineErrorMessage.attr('role', 'alert');
            if (this.validate()){
                this.displayMessage('');
            }
        },
		
		validator: function(value, constraints){
			if(value.length == 0){
			this.invalidMessage1="true";
    	    return false;
    	    }else if(!(new RegExp(this.pattern)).test(value)){
			return false;
			}else{
			return true;
			}

    	  
       	}
		
		
		
		
	});

});