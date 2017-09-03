define(
    [
        "dojo/dom-prop",
        "dojo/dom-attr",
        "dojo/query",
        "dojo/NodeList-traverse"
    ],
    function(domProp, domAttr, query){

        var isGroup = function($input){
            return query($input).closest(".jsGroup").length !== 0;
        };

        var rules = {
            /**
             * Checks the input value contains only alpha (including caps) chars.
             */
            alpha: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value'),
                    regex = /^[a-zA-Z]+$/i;

                return !!val.match(regex);
            },
            /**
             * Checks the input value contains only numerical chars.
             */
            numeric: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value'),
                    regex = /^[0-9]+$/i;
                
                return !!val.match(regex);
            },
            /**
             * Checks the input value contains only alphanumeric (including caps) chars with spaces.
             */
            alphaWithSpaces: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value'),
                    regex = /^[a-zA-Z\s]+$/i;

                return !!val.match(regex);
            },
            alphanumericWithSpaces: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value'),
                    regex = /^[a-zA-Z0-9\s]+$/i;

                return !!val.match(regex);
            },
            alphanumeric: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value'),
                    regex = /^[a-zA-Z0-9\s]+$/i;

                return !!val.match(regex);
            },
            /**
             * Checks the input value contains Alphanumeric (A-Z, 0-9) plus special characters (@), underscore (_), hyphen (-), space ( ), apostrophe (? and period (.).
             */
            alphaWithChart: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value'),
                regex = /^[A-Za-z0-9-@_'. ]*$/i;
                return !!val.match(regex);
            },
            /**
             * Checks the input value is a positive int
             */
            positiveInt: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value'),
                    regex = /^[0-9]+$/i;

                return !!val.match(regex);
            },
            /**
             * Checks if the input value is empty
             */
            empty: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value');
                if (!val || val === domAttr.get($input, 'data-default-text')){
                    return true;
                }else{
                    return false;
                }
            },
            checked: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                return domProp.get($input, 'checked');
            },
            /**
             * Checks the input value is not longer than a maximum value, this value is set within a data attribute called "data-max-length".
             */
            maxLength: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value'),
                    maxLen = domAttr.get($input, 'data-max-length');

                if (!maxLen || !parseInt(maxLen)){
                    throw new Error("Form Validation: Max Length rule. data-max-length attribute not found or invalid");
                }else{
                    if (val.length > parseInt(maxLen)){
                        return false;
                    }else{
                        return true;
                    }
                }
            },
            /**
             * Checks the input value is not shorter than a minimum value, this value is set within a data attribute called "data-min-length".
             */
            minLength: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value'),
                    minLen = domAttr.get($input, 'data-min-length');

                if (!minLen || !parseInt(minLen)){
                    throw new Error("Form Validation: Minimum Length rule. data-min-length attribute not found or invalid.");
                }else{
                    if (val.length < parseInt(minLen)){
                        return false;
                    }else{
                        return true;
                    }
                }
            },

            /**
             * Method to validate a valid range
             * will throw helpful message if format is not valid
             * @param  {HTML Node} $input The input element
             * @return {Boolean}        Returns if the validation is true or false
             */
            range: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = parseInt(domProp.get($input, 'value')),
                    range = domAttr.get($input, 'data-range'),
                    id = (domProp.get($input, 'id')) ? domProp.get($input, 'id') : domProp.get($input, 'name');

                if (range.match(/^ *\d* *- *\d* *$/)){
                    range = range.split("-");

                    range[0] = parseInt(range[0]);
                    range[1] = parseInt(range[1]);
                }
                else if (range.match(/^ *\d* *$/)){
                    range = [0, parseInt(range)];
                }
                else {
                    throw new Error('Invalid range format for: ' + id + '. Format accepted "n" or "n-n" instead got: ' + range );
                }


                if (range[0] > range [1]){
                    throw new Error('Invalid range format for: ' + id + '. Max range should be greater than min range' );
                }

                if (!isNaN(val) && val >= range[0] && val <= range[1]){
                    return true;
                }
                else {
                    return false;
                }

            },
            /**
             *
             */
            matches: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;

                var val = domProp.get($input, 'value'),
                    matchName = domAttr.get($input, 'data-match-element-name');

                if (!matchName){
                    throw new Error("Form Validation: data-match-element-name not specified");
                }else{
                    var $matchEle = query('[name="'+matchName+'"]', query($input).closest('form')[0]);
                    if (!$matchEle || !$matchEle.length){
                        throw new Error("Form Validation: element with data-match-element-name ("+matchName+") not found.")
                    }else{
                        if (domProp.get($matchEle[0], 'value') === val){
                            return true;
                        }else{
                            return false;
                        }
                    }
                }


            },

            activationCode: function($input){
                if (isGroup($input) && !domAttr.get($input, 'data-blurred')) return true;
                
                var val = domProp.get($input, 'value'),
                    regex = /^[a-zA-Z0-9\s\(\)]+$/i;

                return !!val.match(regex);
            }
        }
        return rules;
    }
);
