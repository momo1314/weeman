define(
    [
        "dojo/_base/declare",
        "./Validation",
        "dojo/query",
        "dojo/dom-class",
        "dojo/dom",
        "dojo/on",
        "dojo/dom-attr",
        "dojo/_base/array",
        "dojo/dom-style",
        "dojo/dom-form",
        "dojo/_base/lang",
        "hsbccore/dom-util",
        "dojo/dom-construct",
        "dijit/registry",
        "dijit/focus",
        "dojo/NodeList-traverse",
        "dojo/NodeList-manipulate"

    ], function(declare, Validation, query, domClass, dom, on, domAttr, array, style, domForm, lang, domUtil, domConstruct, registry, focusUtil) {

        return declare("hsbcwidget.form.ValidationGus", [Validation], {

            /**
             * Called when widget is created and initalised
             */
            postCreate: function(){
                this.inherited(arguments);
                this.submitButton = query('.gusPrimary.submit_input', this.domNode);
                this.$questions = query(this.selectors.question, this.domNode);
                this.questionWidgets = [];
            },

            startup: function(){
                this.inherited(arguments);
                
                //this.$questions = query(this.selectors.question, this.domNode);
                //this.questionWidgets = [];
                
                this.$questions.forEach(lang.hitch(this, function(node){
                    var widget = registry.findWidgets(node);
                    
                    if (widget){
                        this.questionWidgets.push(widget);
                    }
                }));
            },

            /**
             * Binds custom events to question
             */
            bindQuestionEvents: function(){                                 
                this.$questions
                    .on('validate', lang.hitch(this, function(){
                        var valid = this.allWidgetsValid();

                        domAttr.set(this.submitButton[0], 'disabled', !valid);
                        domAttr.set(this.submitButton[0], 'aria-disabled', !valid?"true":"false");
                    }));
            },
            
            allWidgetsValid: function(){
                var validCount = 0,
                    widgetCount = 0;
                
                this.questionWidgets.forEach(function(question){
                    question.forEach(function(widget){
                        if (widget.domNode.offsetHeight){
                            widgetCount++;
                        }
                        
                        if (widget.isValid()){
                            validCount++;
                        }
                    });
                });
                
                return validCount === widgetCount;
            }
        });
    }
);