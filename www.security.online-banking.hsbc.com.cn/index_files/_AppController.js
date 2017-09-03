define([
    "dojo/_base/declare",
    "dojo/request",
    "dojo/json",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/topic",
    "dojo/query",
    "dojo/dom-attr"
], function(declare, request, json, lang, dom, topic, query, domAttr) {
    return declare(null, {

        /**
         * Url to load the session from.
         * @type {String}
         */
        sessionURL: '/stub/session.json',

        /**
         * Ajax request helper. It is set to use GET and return JSON
         * @param  {String} url    The url of the file
         * @param  {Object} params and object that includes configurations
         * @return {Promise}        Returns a Promise object
         */
        jsonGet: function(url, params) {
            return request(url, {
                method: "GET",
                handleAs: "json",
                data: params
            });
        },

        constructor: function(args) {
            this.args = args;
            declare.safeMixin(this, args);
            this.init();
        },

        init: function(){
            window.appController = this;
            // this.loadSessionFromFile(require.toUrl(this.sessionURL));
        },

        /**
         * Method to load a session from file
         * Uses the session object to store the session but will not replace existing session item
         * @param  {String} URL The url to be accessed
         */
        loadSessionFromFile: function(URL){
            this.jsonGet(URL).then(lang.hitch(this, function(data){

                    if (typeof data !== 'object') return;

                    for (key in data){
                        if (!this.getSessionItem(key)){
                            this.setSessionItem(key, data[key]);
                        }                   
                    }
                })
            );
        },

        /**
         * Accessor method for accessing session storage items
         * @param  {String} item name of the session item key
         * @return {String || Number || Object}      the value of the item
         */
        getSessionItem: function(item){
            var value = window.sessionStorage.getItem(item);
            if (!isNaN(value)){
                value = eval(value);
            }
            else {
                try{
                    value = json.parse(value);
                }
                catch(e){
                    void(e);
                }
            }
            return value;
        },

        /**
         * Accessor method for accessing raw session storage items
         * @param  {String} item name of the session item key
         * @return {String}      the value of the item
         */
        getSessionItemString: function(item){
            var value = window.sessionStorage.getItem(item);
            return value;
        },

        /**
         * Method to reset the session storage
         * @param  {Boolean} fromURL Bool for whether it should load from file
         */
        resetSession: function(fromURL){
            window.sessionStorage.clear();

            if (fromURL){
                this.loadSessionFromFile(require.toUrl(this.sessionURL));
            }
        },

        /**
         * Mutator method for setting session storage items;
         * @param {String} item  key to be used
         * @param {String || Number || Object} value The value to be saved
         */
        setSessionItem: function(item, value){
            value = (typeof value === "string") ? value : json.stringify(value);
            window.sessionStorage.setItem(item, value);

        }
    });
});
