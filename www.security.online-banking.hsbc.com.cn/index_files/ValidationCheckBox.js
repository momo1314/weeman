define([
    'dojo/_base/declare',
    'dijit/form/CheckBox',
    'dijit/Tooltip',
    'dojo/dom-prop',
    'dojo/on',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/dom-class'
], function(declare, CheckBox, Tooltip, domProp, on, lang, query, domClass){

    return declare([CheckBox], {

        invalidMessage: '',

        tooltipPosition: [],

        postCreate: function(){
            this.inherited(arguments);

            this.input = query('input', this.domNode)[0];
            this.parentQuestion = query(this.domNode).closest('.jsQuestion');
            this.inlineErrorMessage = query('.jsValidationMsg', this.parentQuestion[0]);

            on(this.input, 'click', lang.hitch(this, 'validate'));
            on(this.input, 'blur', lang.hitch(this, '_onBlur'));
        },

        _onBlur: function(){
            this.validate();
            Tooltip.hide(this.domNode);
        },

        validate: function(){			
            var valid = domProp.get(this.input, 'checked'),
                message = '';
				
            if(!valid){
                message = this.invalidMessage;
                domClass.add(this.domNode, 'dijitError');
            }
            else{
                if (this.confirmMessage){
                    message = this.confirmMessage;
                }
                domClass.remove(this.domNode, 'dijitError');
                Tooltip.hide(this.domNode);
            }
            this.displayMessage(message);
            return valid;
        },

        displayMessage: function(message){
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

        }

    });

});