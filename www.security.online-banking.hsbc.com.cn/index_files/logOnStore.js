/*
 * Licensed Internal Code - Property of HSBC
 * Restricted Materials of HSBC
 * Package: app.jsModules.bijit
 * (c) Copyright HSBC 2013
 * All Rights Reserved
 */
define([
	'module',
	'dojo/_base/declare',
	'dojo/request',
	'dojo/json',
	'dojo/Deferred',
	'dojo/_base/lang',
	'dojo/topic',
	'./_BaseStore',	
	'../../../../config/logon/MasterConfig'
],
function(module, declare, request, json, Deferred, lang, topic, _BaseStore, config){
	var MID = module.id;

	return declare([_BaseStore], {	
	
	/**
		 * get
		 *
		 *  Service calls related to Logon journey
		 */
		_setServiceEndPoint: function( url ){
			var F = MID + '._setServiceEndPoint(): ';
			console.log(F, arguments);

			this.serviceEndPoint = url;
		}, 
		
		_setDataFromResponse: function(response){
			return response;
		},
	
	
		userLogon: function(requestData,query){
		    //alert("abc 123");
		    F = MID + '.userLogon(): ';
			console.log(F+"abc request :::: " + JSON.stringify(requestData));
			this._setServiceEndPoint(config.serviceEndPoint.logon._loginContinue);
			//alert("in abc" + this._get(requestData));
			return this._query(requestData,query);
			// return "000";
			
		},
		
		authenticate: function(requestData){
		    //alert("abc 123");
		    F = MID + '.userLogon(): ';
			console.log(F+"abc request :::: " + JSON.stringify(requestData));
			this._setServiceEndPoint(config.serviceEndPoint.logon._passAuthenticate);
			//alert("in abc" + this._get(requestData));
			return this._get(requestData);
			// return "000";
			
		},

		secureKeyAuth: function(requestData){
		    //alert("abc 123");
		    F = MID + '.userLogon(): ';
			console.log(F+"abc request :::: " + JSON.stringify(requestData));
			this._setServiceEndPoint(config.serviceEndPoint.logon._secureKeyAuth);
			//alert("in abc" + this._get(requestData));
			return this._get(requestData);
			// return "000";
			
		},
		
		sessionRequest: function(requestData){
		    //alert("abc 123");
		    F = MID + '.sessionCmd(): ';
			console.log(F+"abc request :::: " + JSON.stringify(requestData));
			this._setServiceEndPoint(config.serviceEndPoint.logon._sessionAuthenticate);
			//alert("in abc" + this._get(requestData));
			return this._get(requestData);
			// return "000";
			
		},
		sessionRequestPost: function(form,requestData){
		    //alert("abc 123");
		    F = MID + '.sessionCmd(): ';
			console.log(F+"abc request :::: " + JSON.stringify(requestData));
			this._setServiceEndPoint(config.serviceEndPoint.logon._sessionAuthenticate);
			//alert("in abc" + this._get(requestData));
			return this._post(form,requestData);
			// return "000";
			
		},
		
		forgotPassword: function(requestData){
		    //alert("abc 123");
		    F = MID + '.sessionCmd(): ';
			console.log(F+"abc request :::: " + JSON.stringify(requestData));
			this._setServiceEndPoint(config.serviceEndPoint.logon._saasOLR);
			//alert("in abc" + this._get(requestData));
			return this._get(requestData);
			// return "000";
			
		},
		
		secureKeyToken: function(requestData){
		    //alert("abc 123");
		    F = MID + '.sessionCmd(): ';
			console.log(F+"abc request :::: " + JSON.stringify(requestData));
			this._setServiceEndPoint(config.serviceEndPoint.logon._saasTokenPinReset);
			//alert("in abc" + this._get(requestData));
			return this._get(requestData);
			// return "000";
			
		}
		
		
		
		// getUser: function(requestData){
		     // F = MID + '.getUser(): ';
			// console.log(F+"getUser request :::: " + JSON.stringify(requestData));
			// this._setServiceEndPoint(config.serviceEndPoint.logon._initLogon);
			// return this._get(requestData);
			
		// },
		// passLogin: function(requestData){
		    // // alert("passLogin password");
		    // F = MID + '.passLogin(): ';
			// console.log(F+"abc request :::: " + JSON.stringify(requestData));
			// this._setServiceEndPoint(config.serviceEndPoint.logon._logonbtn);
			// //alert("in abc" + this._get(requestData));
			// return this._get(requestData);
			// // return "000";
			
		// }
		
		
		


		
	});
}); 