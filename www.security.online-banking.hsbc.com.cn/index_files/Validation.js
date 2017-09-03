define(
    [
        "dojo/_base/declare",
        "dijit/_WidgetBase",
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

    ], function(declare, WidgetBase, query, domClass, dom, on, domAttr, array, style, domForm, lang, domUtil, domConstruct, registry, focusUtil) {

        return declare("hsbcwidget.form.Validation", [WidgetBase], {
            selectors: {
                question: '.jsQuestion',
                errorMsg: '.jsValidationMsg',
                validationFocus: '.jsFormValidationErrorFocus',
                errorListWrapper: '.jsFormErrorListWrapper',
                errorList: '.jsFormErrorList',
                errorListItem: '.jsFormErrorListItem',
                formErrorAlert: '.jsAlertClient'
            },
            classes: {
                valid: 'valid',
                invalid: 'invalid',
                ignore: 'jsIgnore',
                hidden: 'hidden',
                formError: 'formError'
            },
            event: 'blur',
            rulesLocation: 'app/validation-rules',
            visibleErrors: 1,
            catchSubmit: true,

            //internal class vars
            $nodes: null,
            $errorList: null,
            $errorListItem: null,
            rules: null,

            /**
             * Called when widget is created and initalised
             */
            postCreate: function(){
                var self = this;

                this.validationFocus = query(this.selectors.validationFocus, this.domNode)[0];
                require([self.rulesLocation], function(rules){
                    self.rules = rules;
                    self.bindInputEvents();
                    self.bindQuestionEvents();
                    self.bindFormEvents();
                    self.bindFormErrorListEvents();
                });
            },

            startup: function(){
                this.inherited(arguments);
				var alert = query(this.selectors.formErrorAlert, this.domNode)[0];
                if(alert) {
					this.formErrorAlert = registry.byNode(alert);
				}
            },

            bindFormErrorListEvents: function(){
                var self = this;
                self.$errorListWrapper = query(this.selectors.errorListWrapper, self.domNode)[0];
                self.$errorList = query(this.selectors.errorList, self.domNode);
                self.$errorListItem = query(this.selectors.errorListItem, self.domNode).remove();

                if (self.$errorListWrapper && self.$errorList.length && self.$errorListItem.length){
                    style.set(self.$errorListWrapper, 'display', 'none');
                    query(self.selectors.errorMsg, self.domNode).forEach(function($error){
                        on($error, 'onshowerror', function(e){
                            self.errorListError(true, e.message, e.f0r, e.rule);
                        });
                        on($error, 'onhideerror', function(e){
                            self.errorListError(false, e.message, e.f0r, e.rule);
                        });
                    });
                }
            },

            errorListError: function(show, message, f0r, rule){
                var self = this,
                    id = f0r+rule,
                    $msgNode = query('[data-msg-id="'+id+'"]', self.$errorList[0]);
                if (show && !$msgNode.length){
                    var $node = domConstruct.toDom('<a href="#'+f0r+'" title="activate link to focus incorrect form field">'+message+'</a>'),
                        $msg = domConstruct.place(query(lang.clone(self.$errorListItem[0])).html($node)[0], self.$errorList[0], 'last');
                    domAttr.set($msg, 'data-msg-id', id);
                    on($msg, 'click', function(e){
                        e.preventDefault();
                        var $input = query('#'+f0r, self.domNode);
                        if ($input.length){
                            focusUtil.focus($input[0]);
                        }
                    });
                }else if (!show && $msgNode.length){
                    domConstruct.destroy($msgNode[0]);
                }

                if (!query(self.selectors.errorListItem+'[data-msg-id]', self.$errorList[0]).length && style.get(self.$errorListWrapper, 'display') !== 'none'){
                    style.set(self.$errorListWrapper, 'display', 'none');
                }else if (query(self.selectors.errorListItem+'[data-msg-id]', self.$errorList[0]).length && style.get(self.$errorListWrapper, 'display') === 'none'){
                    style.set(self.$errorListWrapper, 'display', 'block');
                }
            },
            /**
             * Binds form events
             */
            bindFormEvents: function(){
                var self = this;
                if (self.catchSubmit){
                    on(self.domNode, 'submit', function(e){
                        var result = self.validateForm(),
                            action = e.target.action,
                            formData = domForm.toObject(e.target),
                            firstInvalid = '';

                        e.preventDefault();
                        if (!result.valid) {
                            for (var i = 0, len = result.results.length; i < len; i++){
                                var focusNode = result.results[i].focusNode,
                                    dijit = result.results[i].dijit;
                                if (focusNode) {
                                    focusNode.focus();
                                }
                                focusUtil.curNode.blur();
                                if (!firstInvalid && !result.results[i].valid){
                                    if (dijit){
                                        firstInvalid = dijit;
                                    }
                                    else if(focusNode) {
                                        firstInvalid = focusNode;
                                    }
                                }
                                self.showMsgs(result.results[i].node, result.results[i]);
                            }
                            if (self.$errorList.length > 0){
                                focusUtil.focus(query('a', self.$errorList[0])[0]);
                            }

                            if (self.validationFocus){
                                focusUtil.focus(self.validationFocus);
                            }
                            else {
                                firstInvalid.focus();
                            }
                        }
                        else {
                            self.emit("submission", {data:formData});
                            window.location = action;
                        }
                    });
                }
            },
            /**
             * Binds custom events to question
             */
            bindQuestionEvents: function(){
                var self = this,
                    $questions = query(self.selectors.question, self.domNode);
                $questions.on('validate', function(addClasses, showMsgs, callback){
                    var valid = self.validateQuestion(this);

                    if (addClasses){
                        self._addClasses(this, valid);
                    }
                    if (showMsgs){
                        self.showMsgs(this, valid);
                    }
                    if (typeof callback === 'function'){
                        callback(valid);
                    }
                });
            },

            /**
             * Binds events to inputs
             */
            bindInputEvents: function(){
                var self = this;
                query(self.selectors.question, self.domNode).forEach(function($question){
                    if (!domClass.contains($question, self.classes.ignore)){
                        query('input[data-validation-rule], textarea[data-validation-rule], select[data-validation-rule], input[type="checkbox"], input[type="radio"]', $question).on(self.event, function(e){
                           domAttr.set(e.target, "data-blurred", "true");
                           onEvent($question);
                        });
                         query('input[type="checkbox"]', $question).on('change', function(){
                           onEvent($question);
                        });
                    }
                });

                function onEvent($question){
                    var validate = self.validateQuestion($question);
                    self._addClasses($question, validate);
                    self.showMsgs($question, validate);
                    on.emit($question, 'onquestionvalidate', {
                        bubbles: true,
                        cancelable: true,
                        result: validate
                    });
                }

            },

            /**
             * Show error messages
             * @param $question {Dom Node} - Question to have messages shown.
             * @param result {Object} - the results of the validation for this question.
             */
            showMsgs: function($question, result){
                var self = this,
                    errorsShown = 0;

                query(self.selectors.errorMsg, $question).forEach(function($error){

                    var rule = self.splitRules(domAttr.get($error, 'data-validation-rule')),
                        forName = (domAttr.get($error, 'data-message-for')) ? domAttr.get($error, 'data-message-for').split(","): [],
                        evaluation = [],
                        $input = [];

                    if (result.results) {
                        for (var i = 0, len = result.results.length; i < len; i++){

                            array.forEach(forName, function(name){
                                if (domAttr.get(result.results[i].node, 'name') === name){
                                    $input.push(result.results[i].node);
                                }                                 
                            });

                            if (i === len-1 && !$input.length){
                                return;
                            }
                        }

                        array.forEach($input, function(input){
                            var iv = [];
                            for (var i = 0, len = rule.length; i < len; i++){
                                iv.push(rule[i]);
                                if (array.indexOf(['!', '(', ')', '&&', '||'], rule[i]) === -1){
                                    if (self.rules[rule[i]] && typeof self.rules[rule[i]] === 'function'){
                                        iv[i] = self.rules[rule[i]](input);
                                    }else{
                                        throw new Error('Form Validation: No rules found for: '+rule[i]);
                                    }
                                }
                            }
                             evaluation.push(iv.join(""));
                             
                        });

                        if (eval(evaluation.join(' || ')) && errorsShown < self.visibleErrors){

                            style.set($error, 'display', 'block');
                            domAttr.set($error, 'aria-hidden', 'false');
                            on.emit($error, 'onshowerror', {
                                bubbles: true,
                                cancelable: true,
                                message: query($error).text(),
                                f0r: domAttr.get($error, 'data-message-for'),
                                rule: domAttr.get($error, 'data-validation-rule')
                            });
                            errorsShown++;
                        }else if (style.get($error, 'display') !== 'none'){
                            style.set($error, 'display', 'none');
                            domAttr.set($error, 'aria-hidden', 'true');
                            on.emit($error, 'onhideerror', {
                                bubbles: true,
                                cancelable: true,
                                message: query($error).text(),
                                f0r: domAttr.get($error, 'data-message-for'),
                                rule: domAttr.get($error, 'data-validation-rule')
                            });
                        }
                    }
                });
            },

            /**
             * Adds classes to questions and inputs depending on the validation results supplied
             * @param $question {Dom Node} - Question to have classes added
             * @param result {Object} - results of the validation for this question.
             * @private
             */
            _addClasses: function($question, result){
                var self = this;
                if (result.valid){
                    domClass.remove($question, self.classes.invalid);
                    domClass.add($question, self.classes.valid);
                }else{
                    domClass.remove($question, self.classes.valid);
                    domClass.add($question, self.classes.invalid);
                }
            },

            /**
             * Validates the form
             * @return {Object} - validation results for whole form.
             */
            validateForm: function(){
                var self = this,
                    results = [],
                    formValid = true;
                query(self.selectors.question, self.domNode).forEach(function($question){
                    var dijits = registry.findWidgets($question),
                        validation = {};
                    if (!domClass.contains($question, self.classes.hidden) && domUtil.isVisible($question) && style.get($question, 'visibility') === "visible"){
                        if (dijits.length) {
                            for (var i = 0; i < dijits.length; i++) {
                                if(dijits[i] && typeof dijits[i].validate === 'function'){
                                    dijits[i]._hasBeenBlurred = true;
                                    dijits[i]._hasBeenChanged = true;
                                    validation.valid = dijits[i].validate();
                                    validation.node = $question;
                                    validation.value = dijits[i].get("value"),
                                    validation.name = dijits[i].get("name") || dijits[i].get("id"),
                                    validation.dijit = dijits[i];

                                    on.emit(dijits[i].domNode, "form-submit", {valid : validation.valid});
                                    results.push(validation);
                                    if (!validation.valid){
                                        formValid = false;
                                    }
                                }
                            }
                        } else {

                            if (!domClass.contains($question, self.classes.ignore)){
                                query('input[data-validation-rule], textarea[data-validation-rule], select[data-validation-rule], input[type="checkbox"]', $question).forEach(function(input){
                                    domAttr.set(input, "data-blurred", "true");
                                });
                                validation = self.validateQuestion($question);
                                validation.node = $question;
                                results.push(validation);
                                if (!validation.valid){
                                    formValid = false;
                                }
                            }
                        }
                    }

                });

                if(this.formErrorAlert){

                    if (formValid){
                        this.formErrorAlert.hide();
                    }
                    else{
                        this.formErrorAlert.show();
                    }
                }


                return {
                    valid: formValid,
                    results: results
                };
            },

            /**
             * @param $question {Dom Node} - Question node to be validated
             * @return {Object} - validation results from question
             */
            validateQuestion: function($question){
                var self = this,
                    results = [],
                    qsValid = true,
                    focusNode;
                query('input[data-validation-rule], textarea[data-validation-rule], select[data-validation-rule], input[type="checkbox"]', $question).forEach(function($node){

                    if (!domClass.contains($node, self.classes.ignore)){
                        var validation = self.validateInput($node, self.splitRules(domAttr.get($node, 'data-validation-rule')));
                        validation.node = $node;
                        results.push(validation);
                        if (!validation.result){
                            qsValid = false;
                            focusNode = focusNode || $node;
                        }
                    }
                });

                return {
                    valid: qsValid,
                    results: results,
                    focusNode: focusNode
                };
            },

            /**
             * @param $input {Dom Node} - Input to be validated
             * @param ruleArr {Array} - Rules to be validated against
             * @return {Object}  validation results from input
             */
            validateInput: function($input, ruleArr){
                var self = this,
                    validation = {
                        rules: {}
                    };
                if (!ruleArr){
                    var ruleArr = self.splitRules(domAttr.get($input, 'data-validation-rule'));
                }
                for (var i = 0, len = ruleArr.length; i < len; i++){
                    if (self.rules[ruleArr[i]]){
                        if (self.rules[ruleArr[i]]($input)){
                            ruleArr[i] = validation.rules[ruleArr[i]] = true;
                        }else{
                            ruleArr[i] = validation.rules[ruleArr[i]] = false;
                        }
                    }
                }
                validation.result = eval(ruleArr.join(''));
                return validation;
            },

            /**
             * Parses and splits a rule string into an array that can be used in the validation step
             * @param ruleStr {String} - The validation rule in string form
             * @return {Array} - The split validation rule
             */
            splitRules: function(ruleStr){
                var ruleArr = [],
                    temp = '',
                    token;

                if (ruleStr) {
                    for (var i = 0, len = ruleStr.length; i < len; i++){
                        token = ruleStr.charAt(i);
                        if (temp === '||' || temp === '&&' || temp === '(' || temp === ')' || temp === '!'){
                            ruleArr.push(temp);
                            temp = '';
                        }
                        switch (token){
                            case '(':
                            case ')':
                            case '|':
                            case '&':
                            case '!':
                                if (temp !== '' && temp !== '|' && temp !== '&'){
                                    ruleArr.push(temp);
                                    temp = '';
                                }
                                break;
                        }
                        temp += token;
                        if (i === len-1){
                            ruleArr.push(temp);
                        }
                    }
                    if (!ruleArr || !ruleArr.length){
                        throw new Error('Form Validation: No rules found for: '+ruleStr);
                    }
                    return ruleArr;
                }
                return [];
            }
        });

    }
);