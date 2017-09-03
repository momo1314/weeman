/*
 * Licensed Internal Code - Property of HSBC
 * Restricted Materials of HSBC
 * (c) Copyright HSBC 2014
 * All Rights Reserved
 */
  
define([
	'dojo/_base/declare',
	'dojo/request',
	// 'dojo/xhrPost',
	'dojo/Deferred',
	'dojo/json',
	'dojo/topic',
	'dojo/_base/lang',
	'../Utils'
],
function(declare, request,  Deferred, json, topic, lang){

	/**
	 * _BaseStore
	 *
	 * A base class that all stores can extend that provides the following:
	 *
	 * - common approach to sending the request
	 * - common response handling for the following conditions:
	 * 		- system error check
	 */
	return declare(null, {

		/**
		 * _get
		 *
		 * @private
		 *
		 * Fires the request, checks the response and returns the (processed) response to the caller.
		 */
		_get: function(requestData, deferred){
			var results;			
			deferred = deferred || new Deferred();			
			results = request(this.serviceEndPoint.url, {
				method: this.serviceEndPoint.type,
				handleAs: 'json',
				headers: { 'Content-Type':'application/json; charset=utf-8'},
				data: json.stringify(requestData)
			});	
			// Transform data when the response is received
			results = results.then(
					lang.hitch(this, '_checkResponse', requestData, deferred),
					lang.hitch(this, '_processError', deferred)
				);

			return deferred;
		},
		
		/**
		 * _post
		 *
		 * @private
		 *
		 * Fires the request, checks the response and returns the (processed) response to the caller.
		 */
		// _post: function(form, requestData, deferred){
			// var results;			
			// deferred = deferred || new Deferred();			
			// results = xhrPost({		
				// form : form,
				// handleAs: 'json',
				// headers: { 'Content-Type':'application/json; charset=utf-8', 'X-HDR-jscData': this.getJSCDataTimeStamp(),'jdata': this.getJSCDataTimeStamp()},
				// postData: json.stringify(requestData)
			// });	
			// // Transform data when the response is received
			// results = results.then(
					// lang.hitch(this, '_checkResponse', requestData, deferred),
					// lang.hitch(this, '_processError', deferred)
				// );

			// return deferred;
		// },

		/**
		 * _query
		 *
		 * @private
		 *
		 * Fires the request, checks the response and returns the (processed) response to the caller.
		 *
		 */
		_query: function(requestData,query, deferred){			
			var results;

			deferred = deferred || new Deferred();
			
			results = request(this.serviceEndPoint.url, {
				query : query,
				method: this.serviceEndPoint.type,
				handleAs: 'json',
				headers: { 'Content-Type':'application/json; charset=utf-8' },
				data: json.stringify(requestData)
			});

			// Transform data when the response is received
			results = results.then( lang.hitch(this, '_checkResponse', requestData, deferred), lang.hitch(this, '_processError', deferred),lang.hitch(this,'_processEvent') );

			return deferred;
		},


		/**
		 * _checkResponse
		 *
		 * @private
		 *
		 * Checks the response for the following conditions:
		 *
		 * - system error check:
		 *
		 * If system error arise it will redirected to error page
		 *
		 */
		_checkResponse: function(requestData, deferred, response){						
			deferred.resolve(this._setDataFromResponse(response));			
		},
		
		_processEvent : function(evt){
			console.log("Progress event occurred: ",evt);
		},

		/**
		 * _setDataFromResponse
		 *
		 * @private
		 *
		 * sends the service response
		 *
		 */
		_setDataFromResponse: function(/*response*/){
			throw ('This method needs to be implemented by the concrete store implementation');
		},

		/**
		 * _processError
		 *
		 * @private
		 *
		 *Calls the error page widgets 
		 *
		 */
		_processError: function(deferred, error){
			if(error.response && error.response.data){
				deferred.reject(error.response.data);
			}else if(error.response){
				deferred.reject(error.response);
			}else{				
				deferred.reject(error);
			}
		},
		
		getJSCDataTimeStamp: function(){
			var jdata;			
			if(typeof(HSBCGLBL) != "undefined"){				
				HSBCGLBL.hsbcglblform('jdata');
				jdata = document.getElementById("jdata").value;
			}
			return jdata;
		}
	});
});