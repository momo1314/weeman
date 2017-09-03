define([
        "dojo/_base/declare",
        "app/controllers/_AppController",
        "dojo/query",
        "dojo/_base/array",
        "dojo/_base/lang",
        "dojo/dom-form",
        "dijit/form/Form",
        "dojo/request",
        "dijit/registry",
        "dojo/on",
        "dojo/parser",
        "dojo/dom-attr",
        "dojo/dom-construct",
        "dojo/dom",
        "dijit/focus",
        "dojo/topic",
        "modules/logon/common/store/logOnStore",
        "modules/common/widget/Interstitial",
        "hsbcwidget/ext!/saas/Components/resource/jsbundle/logon/nls/error.js?aggregationRequired",
        "hsbcwidget/ext!/saas/Components/resource/jsbundle/common/nls/common.js?aggregationRequired",
        "modules/managetoken/widget/SecureKeyHelpOverlay",
        'hsbcwidget/browserSupport'
        ], function (declare, _AppController, query, array, lang, domForm, dijitForm, request, registry, on, parser, domAttr, domConstruct, dom, focusUtil, topic, logOnStore, Interstitial, i18n_error, webtrends, SecureKeyHelpOverlay, BrowserSupport) {
	return declare(_AppController, {

		webtrends : webtrends,
		deviceMap : {
			'dsk' : 'showDsk',
			'nonDsk' : 'showNonDsk'
		},
		i18n_error : i18n_error,
		usernameID: null,
		rememberMeValue : false,
		store : null,
		oldUsernameValue : "",
		needHelpTrigger : null,
		reqType : "",
		sessionToken : "",
		dojoValidationClassName: 'dijitValidationTextBoxError',
		dojoValidationClassName1: 'dijitValidationTextBoxError1',
		SECURECODE_helpModelTargetID: null,


		init : function () {
			this.interstitial = new Interstitial({
				displayStyle : "block"
			}).placeAt(document.body, 'last');
			topic.publish("loader/show");
			this.loadWebtrendsTag("viewNo1");
			this.inherited(arguments);
			var logonAction = "",
			stopIndicator = 'Stop',
			continueIndicator = 'Continue',
			isOperationInProgress = 'Stop',
			usernameForm = registry.byId('usernameForm'),
			passwordForm = this.passwordForm = registry.byId('passwordForm'),
			secureCodeForm = this.secureCodeForm = registry.byId('secureCodeForm'),
			passwordDetails = registry.byId('passwordDetails'),
			secureCodeDetails = registry.byId('secureCodeDetails'),

			username = this.username = registry.byId('username'),
			password = this.password = registry.byId('password'),
			secureCode = this.secureCode = registry.byId('secureCode'),

			viewNos = this.viewNos = query('.hideableStep'),
			viewNo1 = this.viewNo1 = query('#viewNo1'),
			viewNo2 = this.viewNo2 = query('#viewNo2'),
			viewNo3 = this.viewNo3 = query('#viewNo3'),
			viewNo4 = this.viewNo4 = query('#viewNo4'),
			viewNo5 = this.viewNo5 = query('#viewNo5'),
			viewNo6 = this.viewNo6 = query('#viewNo6'),
			viewNo7 = this.viewNo7 = query('#viewNo7'),
			viewNo8 = this.viewNo8 = query('#viewNo8'),
			rememberMe = this.rememberMe = query('#rememberMe'),
			forgotUsernamediv = this.forgotUsernamediv = query('#forgotUsernamediv'),
			changeUser = query('.changeUser'),
			logonMethod = query('#logonMethod'),
			showPassword = query('#showPassword'),
			$password = query('#password'),

			$notRegisteredLink = query('#notRegisteredLink'),
			$contactHSBC = query('#contact-hsbc'),
			$returnToHomepageLink = this.$returnToHomepageLink = query('.returnToHomepageLink'),
			$forgotUserLink = query('#forgotUserLink'),
			passwordDate = this.passwordDate = registry.byId('passwordDate'),
			passwordDateInfo = this.passwordDateInfo = registry.byId('passwordDateInfo'),

			secureCodeDate = this.secureCodeDate = registry.byId('secureCodeDate'),
			secureCodeDateInfo = this.secureCodeDateInfo = registry.byId('secureCodeDateInfo'),
			$switchToSecureCode = this.$switchToSecureCode = query('.switchToSecureCode'),
			$forgotPass = this.$forgotPass = query('.forgotPass'),
			$forgotSecureKeyPin = this.$forgotSecureKeyPin = query('.forgotSecureKeyPin'),
			$pwdRecovery = this.$pwdRecovery = query('.pwdRecovery'),
			$switchToSecureCode = this.$switchToSecureCode = query('.switchToSecureCode'),
			$switchToPassword = this.$switchToPassword = query('.switchToPassword'),
			$usernameError = this.$usernameError = query('#usernameError'),
			$passwordError = this.$passwordError = query('#passwordError'),
			$passwordDosiError = this.$passwordDosiError = query('#passwordDosiError'),
			$secureCodeError = this.$secureCodeError = query('#secureCodeError'),
			$secureCodeDosiError = this.$secureCodeDosiError = query('#secureCodeDosiError'),
			$currentTimeStamp = null;

			if(logonMngr.maskUserId)
				username.attr('type','password');			
			this.needHelpTrigger = query(".needHelpTrigger");
			$logonName = query('.logonName');
			$familiarName1 = query('.familiarName1');
			$familiarName2 = query('.familiarName2');
			$greeting = query('.greeting');
			username.set('disabled', false);
			query('#username')[0].focus();
			this.checkboxWidget = registry.byId('rememberMeWidget');
			//get page titles
			this.pageTitles = {
				cam10UsernamePageTitle: this.i18n.Logon.LOGON_OLBNKING_USERNAME_TITLE,
				cam30PasswordPageTitle: this.i18n.PasswordPage.LOGON_OLBNKING_PASSWORD_TITLE,
				cam40SecureCodePageTitle: this.i18n.PasswordPage.LOGON_USING_SECURE_CODE_TITLE,
				fallbackTitle: document.title				
			};
			//set page title
			document.title = (this.pageTitles.cam10UsernamePageTitle) ? this.pageTitles.cam10UsernamePageTitle : this.pageTitles.fallbackTitle;
			this.secData = {
				"attrList" : null,
				"currCamLvl" : null,
				"rawJsc" : this.getJSCDataTimeStamp(),
				"dviceType" : null,
				"epsDviceId" : null,
				"epsDviceStatus" : null,
				"oauthDviceId" : null,
				"toknModel" : null,
				"toknType" : null
			};
			
			if (logonMngr.userID != null && logonMngr.userID != "") {
				username.set('value', logonMngr.userID);
				this._rememberME(true);
			}
			this.initStore();
			$notRegisteredLink.attr('href', this.i18n.Logon.LOGON_NOT_REGISTERED_LINK);
			$returnToHomepageLink.attr('href', logonMngr.pwsHomeUrl);
			$contactHSBC.attr('href', (this.i18n.LockedSecureKey.LOGON_CONTACT_HSBC_LINK) ? this.i18n.LockedSecureKey.LOGON_CONTACT_HSBC_LINK : "#" );

			if (logonMngr.cookieNotSupported == false) {
				var rememberMeWidget = query("#rememberMe").parents(".gusCheckboxContainer");
				if (rememberMeWidget !=null) {
					rememberMeWidget.addClass("hiddenNew");
				}
			}

			if ((logonMngr.saasForgotUserIdSupported == false && logonMngr.entityConfigForgotUseridSupported == false) || (logonMngr.saasForgotUserIdSupported == true && logonMngr.entityConfigForgotUseridSupported == true)) {
				forgotUsernamediv.addClass("hiddenNew");
			} else if (logonMngr.saasForgotUserIdSupported) {
				forgotUsernamediv.removeClass("hiddenNew");
				forgotUsernamediv[0].innerHTML = "<a class='normalIcon' href='/gsa/?idv_cmd=idv.ForgotUserName&amp;FORGOT_USER=true'>" + this.i18n.Logon.LOGON_FORGOT_USERNAME + "</a>";
			} else if (logonMngr.entityConfigForgotUseridSupported) {
				forgotUsernamediv.removeClass("hiddenNew");
				forgotUsernamediv[0].innerHTML = this.i18n.Logon.LOGON_FORGOTUSERNAME_LINK;

			} else {
				forgotUsernamediv.removeClass("hiddenNew");
			}
			
			if(commonProp.ssoLaunchBackFlag != false)
			{
				var gvgtHelp = query('#helpForGvgt');
				gvgtHelp.removeClass('hiddenNew');
				
				$notRegisteredLink.addClass("hiddenNew");
				var node=query('.jsSliderTrigger.helpIcon.right');
				if(node!=null)
				{
					node.addClass("hiddenNew");
				} 
				
				var $switchuser = query("#switchUser");
				if ($switchuser !=null) {
					$switchuser.addClass("hiddenNew");
				}
				
				if($forgotPass!=null){
					$forgotPass.addClass("hiddenNew");
				}
				if (showPassword !=null) {
					showPassword.addClass("hiddenNew");
				}
				var rememberMeWidget = query("#rememberMe").parents(".gusCheckboxContainer");
				if (rememberMeWidget !=null) {
					rememberMeWidget.addClass("hiddenNew");
				} 
				if (forgotUsernamediv !=null) {
					forgotUsernamediv.addClass("hiddenNew");
				} 
				var gvgtLink1=query("#formGvgtButton"),gvgtLink2 = query("#formGvgtButton2"),gvgtLink3 = query("#formGvgtButton3");
				if (gvgtLink1 !=null) {
					gvgtLink1.style("visibility", "visible");
					gvgtLink1.attr('href',"/gsa/GSA_AUTOSUBMIT/" );
				}
				if (gvgtLink2 !=null) {
					gvgtLink2.style("visibility", "visible");
					gvgtLink2.attr('href',"/gsa/GSA_AUTOSUBMIT/" );
				}
				if (gvgtLink3 !=null) {
					gvgtLink3.style("visibility", "visible");
					gvgtLink3.attr('href',"/gsa/GSA_AUTOSUBMIT/" );
				}
			}
			
			changeUser.on("click", lang.hitch(this, function (e) {
				e.preventDefault();
				passwordDetails.close();
				secureCodeDetails.close();
				viewNos.removeClass("showStep");
				viewNo1.addClass("showStep " + this.logonAction);

				//reset textbox value
				this._resetPageViews();
				username.focus();
				viewNo1.style("opacity", "1");
				this._rememberME(false);
				this._showPassword();
				//set page title
				document.title = (this.pageTitles.cam10UsernamePageTitle) ? this.pageTitles.cam10UsernamePageTitle : this.pageTitles.fallbackTitle;
				
				topic.publish('switchView', false);				
			}));

			rememberMe.on("click", lang.hitch(this, function (e) {
				this._rememberME( domAttr.get(e.target, 'checked') ? true : false );
			}));

			showPassword.on("click", lang.hitch(this, function (e) {
				e.preventDefault();
				if ($password.attr("type") == "password") {
					$password.attr("type", "text");
				} else {
					$password.attr("type", "password");
				}
			}));

			usernameForm.on("submission", lang.hitch(this, function (e) {
			
					// do something
				e.preventDefault();
				this.reqType = "U";
				this.usernameID = username.get("value");
				this.viewNo = 1;
				this.sendRequest({
					type : "U",
					etarget: e,
					jsonReq: {
						"application" : {
							"groupMemberCode" : logonMngr.groupMemberCode,
							"countryCode" : logonMngr.entityCode,
							"channel" : "WEB"
						},
						"username" : this.usernameID,
						"rememberMe" : this.rememberMeValue,
						"targetcam" : logonMngr.targetcam,
						"secData" : this.secData
					}
				});		
				
			}));

			passwordForm.on("submission", lang.hitch(this, function (e) {
				
				e.preventDefault();
				passwordDetails.close();
				this.logonAttempt = true;
				this.reqType = "P";
				this.viewNo = 2;
				this.sendRequest({
					type : "P",
					etarget: e,
					jsonReq: {
						"sessionToken" : this.sessionToken,
						"username" : this.usernameID,
						"password" : this.password.get("value").toLowerCase(),
						"secData" : this.secData,
						"dosi" : this.getDate('#passwordDate'),
						"application" : {
							"groupMemberCode" : logonMngr.groupMemberCode,
							"countryCode" : logonMngr.entityCode,
							"channel" : "WEB"
						}
					}
				});	
				
			}));

			secureCodeForm.on("submission", lang.hitch(this, function (e) {
				
				e.preventDefault();
				secureCodeDetails.close();
				this.logonAttempt = true;
				this.reqType = "S";
				this.viewNo = 3;
				this.sendRequest({
					type : "S",
					etarget: e,					
					jsonReq: {
						"sessionToken" : this.sessionToken,
						"username" : this.usernameID,
						"otp" : this.secureCode.get("value").toLowerCase(),
						"secData" : this.secData,
						"dosi" : this.getDate('#secureCodeDate'),
						"application" : {
							"groupMemberCode" : logonMngr.groupMemberCode,
							"countryCode" : logonMngr.entityCode,
							"channel" : "WEB"
						}
					}
				});	
				
			}));

			$switchToPassword.on("click", lang.hitch(this, function (e) {
				e.preventDefault();
				this.logonAttempt=false;
				this.switchView(this.setUpView2(this.data));
			}));

			$switchToSecureCode.on("click", lang.hitch(this, function (e) {
				e.preventDefault();
				this.logonAttempt=false;
				this.switchView(this.setUpView3(this.data));

			}));

			$forgotPass.on("click", lang.hitch(this, function (e) {

				if (isOperationInProgress == stopIndicator)
				{
						isOperationInProgress = continueIndicator;
						topic.publish("loader/show");
						this.sendRequest({
							type : "FP"
						});
				} 
				else 
				{
					e.preventDefault();
				}

			}));
			
			$forgotPass.on("dblclick", lang.hitch(this, function (e) {
				
				e.preventDefault();
				

			}));
			$pwdRecovery.on("click", lang.hitch(this, function (e) {
				
				this.sendRequest({
					type : "FP"
				});
				

			}));

		
			this.checkExternalDispatchedEvents();
			topic.publish("loader/hide");

			this.alertIfBrowserNotSupported();

			if (logonMngr.jwtTokenIdKey !=null) {
				//viewNo1.addClass("hideableStep");
				//viewNo1.style("opacity", "0");
				
				this.data = JSON.parse(logonMngr.jwtTokenIdKey);				
				this.showSuccess = true; 
				this.button = query('#formSubmitButton');
				this.reqType = "U";				
				this.viewNo = 1;
				this.savedValue = domAttr.get(this.button[0], 'value');
				this.processResponse();
				
			}					
		},
		checkExternalDispatchedEvents : function () {
			topic.subscribe("externaldispatch/init", lang.hitch(this, function (node) {
				var actionType = domAttr.get(node, 'data-action-type');

				switch (actionType) {
				case 'launchSecureHelp':
					this.launchSecureKeyOverlay(node);
					break;
				case 'forgotSecureKey':
					this.sendRequest({
						type : "FSK"
					});
					break;
				case 'lostDamageSecurekey':
					if (domAttr.has(node, 'data-initialised-id')){
						domAttr.remove(node, "data-initialised-id");
					}
					topic.publish("lightbox/processtrigger", node);
					break;
					
				case 'forgotSecureKeyPass':
					if (domAttr.has(node, 'data-initialised-id')){
						domAttr.remove(node, "data-initialised-id");
					}
					topic.publish("lightbox/processtrigger", node);
					break;				
				
				default:
					console.log("No Action Specified");
					break;
				}
			}));
		},

		launchSecureKeyOverlay : function (node) {
			if (this.secureKeyHelpOverlay) {
				this.secureKeyHelpOverlay.destroyRecursive(false);
			}

			this.secureKeyHelpOverlay = new SecureKeyHelpOverlay({
				i18n : this.i18n
			});
			this.secureKeyHelpOverlay.startup();

			topic.publish("lightbox/changeAndShow", {
				content : this.secureKeyHelpOverlay.domNode,
				currentTrigger : node
			});
		},

		alertIfBrowserNotSupported : function () {
			var browserDiv = query("#browserDiv");
			if (browserDiv && browserDiv.length > 0) {
				browserDiv = browserDiv[0];
			}

			var browserSup = new BrowserSupport({
				'unsupported_list' : logonMngr.unsupportedBrowsers
			}, browserDiv);
			browserSup.startup();
		},

		initStore : function () {
			this.store = {};
			this.store.logOnStore = new logOnStore();
		},
		
		getDate: function (query) {
			var $date = dojo.query( query + " .gusTextInput input.dijitInputInner"),
				$dayNode = $date[1].value,
				$monthNode = $date[0].value,
				$yearNode = $date[2].value;
			
			return $dayNode + "/" + $monthNode + "/" + $yearNode;
		},

		sendRequest: function (reqData) {
			// Give the document focus
			window.focus();

			// Remove focus from any focused element
			if (document.activeElement) {
				document.activeElement.blur();
			}
			
			if (["U", "P", "S"].indexOf(reqData.type) >= 0) {
				//process form
				var targetedButton = query(".submit_input", reqData.etarget.target);
					this.showSuccess = true;
					this.savedValue = targetedButton.attr('value');
					this.button = targetedButton;
				
				topic.publish("loader/inlineShow", targetedButton);
				domAttr.set(targetedButton[0], {
					'value': (this.i18n.Logon.LOGON_VERIFYING !=undefined) ? this.i18n.Logon.LOGON_VERIFYING : 'Verifying',
					'class': targetedButton.attr('class') + ' processing',
					'disabled': 'disabled',
					'aria-disabled': 'true'
				});				
			}
			
			var deferred = null;			
			try {
				switch (reqData.type) {
					case 'U':
						deferred = this.store.logOnStore.userLogon(reqData.jsonReq);
						break;
					
					case 'P':
						deferred = this.store.logOnStore.authenticate(reqData.jsonReq);
						break;
					
					case 'S':
						deferred = this.store.logOnStore.secureKeyAuth(reqData.jsonReq);
						break;
					
					default:
						console.log("No Action Specified");
						break;
				}				
			} catch (e) {
				this.switchView(this.viewNo8);
				return;
			}
			
			if (["SR", "FP", "FSK"].indexOf(reqData.type) >= 0) {
				
				var functionMap = {
					"SR" : "Saas_Authentication",
					"FP" : "Saas_OLR",
					"FSK" : "Saas_TokenPinReset"
				}
				
				var olrLink=null;
				
				if(reqData.type=="FP"){
					olrLink= "CAM30ForgotPasswordLink";
				}

				jsonReq = {
					"tokenRequest" : {
						"sessionToken" : this.sessionToken,
						"application" : {
							"groupMemberCode" : logonMngr.groupMemberCode,
							"countryCode" : logonMngr.entityCode,
							"channel" : "WEB"
						}
					},
					"olrLink": olrLink,
					"functionName" : functionMap[reqData.type]
				};

				if (reqData.type == "SR") {
					deferred = this.store.logOnStore.sessionRequest(jsonReq);
					//deferred = this.store.logOnStore.sessionRequestPost(this.passwordForm,jsonReq);
				} else if (reqData.type == "FP") {
					deferred = this.store.logOnStore.forgotPassword(jsonReq);
				} else if (reqData.type == "FSK") {					
					deferred = this.store.logOnStore.secureKeyToken(jsonReq);
				}
			}
			

			deferred.then(lang.hitch(this, function (data) {
				this.data = data;			
				setTimeout(lang.hitch(this, function () {
					return this.processResponse();
				}), 1000);
			}), lang.hitch(this, function (err) {
				//console.log("Error occurred: ", err);
				this.processError();
			}));
	

		},
		processError: function () {
			//help content hide for locked views.
			this.switchView(this.viewNo8);
			topic.publish("loader/inlineHide");
		},

		handleAs000: function() {
			// Button needs to show 'success' for a while
			if (this.button && this.showSuccess) {					
				this.sessionToken = this.data.sessionToken;
				this.button.removeClass("processing");
				clearTimeout(this.switchViewTimerId);
				this.switchViewTimerId = setTimeout(lang.hitch(this, function () {
					return this.processResponse()
				}), 1000); // come back later
				this.showSuccess = false;
				if (this.reqType != "U") {
					this.sendRequest({
						type : "SR"
					});
				}
				return;
			} else if (this.button) { // Button is disabled, so enable it
				this.button.removeClass("processing");
				this.button.attr("value", this.savedValue);
				this.button.removeAttr("disabled");
				this.button.attr("aria-disabled", "false");
				this.button = null;
			}
			
			//handle success for views
			if (this.viewNo ===1) {
				if (this.oldUsernameValue !== this.usernameID) { // User has switched username - reset flags
					this.logonAttempt = false;
					this.oldUsernameValue = this.usernameID;
				}
				
				//reset for widgets
				this._resetPageViews();
				
				if (this.data.isPasswordAuthAllowed == false && this.data.isOTPAuthAllowed == true) {
					var nextViewNo = this.setUpView3(this.data);
					this.switchView(nextViewNo);
				} else if (this.data.isPasswordAuthAllowed == true && this.data.isOTPAuthAllowed == true) {
					if (this.authPref == "PWD") {
						var nextViewNo = this.setUpView2(this.data);
						this.switchView(nextViewNo);
					} else if (this.authPref == "OTP") {
						var nextViewNo = this.setUpView3(this.data);
						this.switchView(nextViewNo);
					} else {
						var nextViewNo = this.setUpView2(this.data);
						this.switchView(nextViewNo);
					}
				} else if (this.data.isPasswordAuthAllowed == true && this.data.isOTPAuthAllowed == false) {
					var nextViewNo = this.setUpView2(this.data);
					this.switchView(nextViewNo);
				}
				
				topic.publish("loader/inlineHide");
			}			
		},		
		
		handleAs004: function() {
			var jdata = this.getJSCDataTimeStamp();
			
			if ( this.data.responseInfo.reasons[0].traceCde[0].cde == "USR_UID_VAL_109" ) {
				var tempform = domConstruct.toDom('<form id="formUID109" method="POST" action="/gsa/?idv_cmd=idv.Authentication&nextPage=SaaS30Resource"><input name="userid" value="' + this.usernameID + '"></input><input name="initialAccess" value="true"></input><input id="nav" type="submit"></input></form>');
				domConstruct.place(tempform, query("body")[0]);
				tempform.submit();
			
				topic.publish("loader/inlineHide");
				return;
			}

			if ((this.data.responseInfo.reasons[0].traceCde[0].cde == "USR_UID_VAL_009") || (this.data.responseInfo.reasons[0].traceCde[0].cde == "USR_UID_VAL_110")) {
				jsonreq = {
						"userid" : this.usernameID,
						"initialAccess" : true,
						"cookieuserid" : this.rememberMeValue,
						"jdata" : jdata
				};
             var usernameForm1 = domConstruct.toDom('<form id="userform" method="POST" action="/gsa/?idv_cmd=idv.Authentication&nextPage=SaaS30Resource"><input name="userid" value="' + this.usernameID + '"></input><input name="initialAccess" value="true"></input><input name="cookieuserid" value="' + this.rememberMeValue + '"></input></input><input name="jdata" value="' + jdata + '"></input><input id="nav" type="submit"></input></form>');
			 domConstruct.place(usernameForm1, query("body")[0]);
				userform.submit();
			
				topic.publish("loader/inlineHide");
				return;
			}
		},
		
		handleAs008: function() {
			if (this.viewNo ===1) {
				this._displayErrors({
					page: 'USER',
					errMessages: {
						widget: i18n_error.LOG_0002_01
					}
				});
				
				//trigger help
				var _o = { panelTargetID: 'sliderContentUsername'};
				this.slideOutTargetedHelp(_o);
			}
			if (this.viewNo ===2) {
				this.switchView(this.setUpView2(this.data));
			}
			if (this.viewNo ===3) {
				this.switchView(this.setUpView3(this.data));				
			}
			if (this.button) { // Button is disabled, so enable it
				this.button.removeClass("processing");
				//this.button.removeClass("success");
				this.button.attr("value", this.savedValue);
				this.button.removeAttr("disabled");
				this.button.attr("aria-disabled", "false");
				this.button = null;
			}
			
			topic.publish("loader/inlineHide");
		},
		
		processResponse: function () {
			//local scope variable
			var data = this.data;
				
			if (data) {
				var displayFamiliarName = (data.firstName) ? data.firstName.toLowerCase() : null,
					respReasonCode = (data.responseCode =="32") ? data.reasons[0].cde : (data.responseInfo.reasons[0].code) ? data.responseInfo.reasons[0].code : null,
					queryStr = {};
				
				//redirect, if displayResource
				if (respReasonCode =="000" && data.displayResource !==undefined) {
					var url = '/gsa', 
					str = data.displayResource, 
					isContent = 'idv_cmd=';
												
					//create URL
					url = url + ((str.search(isContent) >= 0 ) ? '?' + this.data.displayResource : '/' + this.data.displayResource + '/' );
					
					//redirect to URL
					window.location = url;
					return;
				}
					
				/* Store important values from the response */
				this.usernameID = (data.userName) ? data.userName : this.usernameID;
				$logonName.html( (data.maskUserName) ? data.maskUserName : (data.userName) ? data.userName : "" );				
				if (displayFamiliarName) {
					$familiarName1.forEach(dojo.empty);
					$greeting.html(this.i18n.PasswordPage.LOGON_GREET_USER);
					$familiarName1.html(displayFamiliarName);
					$familiarName2.html(displayFamiliarName);
				} else {
					var date = new Date(),
						hours = date.getHours(),
						html = this.i18n.PasswordPage.LOGON_GREET_USER_GOOD;

					if (hours < 12) {
						html += this.i18n.PasswordPage.LOGON_GREET_USER_MORNING;
					} else if (hours < 18) {
						html += this.i18n.PasswordPage.LOGON_GREET_USER_AFTERNOON;
					} else if (hours <= 23) {
						html += this.i18n.PasswordPage.LOGON_GREET_USER_EVENING;
					}
					$greeting.html(html);
					$familiarName1.forEach(dojo.empty);
					$familiarName2.html( (data.maskUserName) ? data.maskUserName : (data.userName) ? data.userName : "" );
				}
				
				this.sessionToken = (data.sessionToken) ? data.sessionToken : null;
				if (data.isPasswordAuthAllowed) { this.isPasswordAuthAllowed = data.isPasswordAuthAllowed; }
				if (data.authPref) { this.authPref = data.authPref; }				
				this.tokenType = (data.tokenType) ? data.tokenType.substring(0, 3) : "DP2"; //DP2 means DP270
				if (this.tokenType === "DP2" || this.tokenType === "VIR" ) {
					this.SECURECODE_helpModelTargetID = (data.isOtpRequireDosi === true) ? 'sliderContentDobSecurityDP270' : 'sliderContentSecurityDP270';
					queryStr = {
						hideElements: ((data.isOtpRequireDosi === false) ? '#dobDP270help, ' : '#DP270help, ') + '#dobMOBhelp, #MOBhelp, #MOBhow, #dobgo3help, #go3help, #go3how',
						showElements: '#DP270how' + ((data.isOtpRequireDosi === false) ? ', #DP270help' : ', #dobDP270help')
					}
				} else if (this.tokenType === "MOB" || this.tokenType === "SOT") { // this.tokenType == "MOB001"
					this.SECURECODE_helpModelTargetID = (data.isOtpRequireDosi === true) ? 'sliderContentDobSecurityMOB' : 'sliderContentSecurityMOB';
					queryStr = {
						hideElements: ((data.isOtpRequireDosi === false) ? '#dobMOBhelp, ' : '#MOBhelp, ') + '#dobDP270help, #DP270help, #DP270how, #dobgo3help, #go3help, #go3how',
						showElements: '#MOBhow' + ((data.isOtpRequireDosi === false) ? ', #MOBhelp' : ', #dobMOBhelp')
					}
				} else {
					this.SECURECODE_helpModelTargetID = (data.isOtpRequireDosi === true) ? 'sliderContentDobSecuritygo3' : 'sliderContentSecuritygo3';
					queryStr = {
						hideElements: ((data.isOtpRequireDosi === false) ? '#dobgo3help, ' : '#go3help, ') + '#dobDP270help, #DP270help, #DP270how, #dobMOBhelp, #MOBhelp, #MOBhow',
						showElements: '#go3how' + ((data.isOtpRequireDosi === false) ? ', #go3help' : ', #dobgo3help')
					}
				}
				
				queryStr.hideElements = queryStr.hideElements + ((this.tokenType === "MOB001") ? ", .noDSK" : ", .hasDSK") +
										((data.isOTPAuthAllowed !== true) ? ", .hasSecureCode" : ", .noSecureCode") + 
										((this.isPasswordAuthAllowed !== true) ? ", .hasPassword" : ", .noPassword") + 
										((data.isPwdRequireDosi === false) ? ", #dobPwdHelp" : ", #pwdHelp");
				queryStr.showElements = queryStr.showElements + ((this.tokenType === "MOB001") ? ", .hasDSK" : ", .noDSK") +
										((data.isOTPAuthAllowed !== true) ? ", .noSecureCode" : ", .hasSecureCode") + 
										((this.isPasswordAuthAllowed !== true) ? ", .noPassword" : ", .hasPassword") + 
										((data.isPwdRequireDosi === false) ? ", #pwdHelp" : ", #dobPwdHelp");
				
				//finally fire or execute query
				query(queryStr.hideElements).style("display", "none");
				query(queryStr.hideElements).attr("aria-hidden", "true");
				query(queryStr.showElements).style("display", "block");
				query(queryStr.showElements).attr("aria-hidden", "false");
				
				switch (respReasonCode) {
					case '000':
						this.handleAs000();
						break;
						
					case '004':
						this.handleAs004();
						break;
						
					case '008':
						this.handleAs008();
						break;					
					
					case 'POL_002':
						window.location = '/gsa/IDV_GLOBAL_SESSION_INVALID_ERROR/';
						break;
						
					case 'POL_001' :
						window.location = '/gsa/SANCTIONS_DENY_PAGE/';
						break;	
						
					default:
						this.processError();
						return;						
				}
			} else {
				clearTimeout(this.switchViewTimerId);
				this.processError();
				return;
			}
			
			//topic.publish("loader/inlineHide");
		},

		switchView : function (viewNo) {
			var nodeID = viewNo[0].id,
				intViewNo = parseInt(nodeID.replace('viewNo','')), 
				hidePanel = null;
				
			this.viewNos.removeClass("showStep");
			this.viewNos.style("opacity", "0");
			viewNo.addClass("showStep " + this.logonAction);
			// using setTimeout so the element is changed at the end of the event loop, giving the dom enough time to update
			setTimeout(lang.hitch(this, function () {
				viewNo.style("opacity", "1");
			}), 0);
				
			this.loadWebtrendsTag(viewNo[0].id);
			
			if (intViewNo>3) {
				hidePanel = true;								
			} else {
				if (intViewNo <=2 && this.data.responseInfo.reasons[0].code == "000") {					
					hidePanel = true;	
				}				
			}
			if (hidePanel)
				topic.publish('switchView', false);
		},

		//webtrends
		loadWebtrendsTag : function (viewNo) {
			dcsMultiTrack('DCS.dcsuri', this.webtrends[viewNo].dcsuri,
				'WT.ti', this.webtrends[viewNo].ti,
				'cam', '30',
				'WT.cg_n', this.webtrends[viewNo].cg_n,
				'WT.si_n', this.webtrends[viewNo].si_n,
				'WT.si_x', this.webtrends[viewNo].si_x);
		},

		setUpView2 : function (data) {
			//local scope variables
			var helpModelTargetID = null,
				pwdRemainAttempt = parseInt(data.pwdRemainAttempt),
				pwdDosiRemainAttempt = parseInt(data.pwdDosiRemainAttempt),
				$showPwddiv = query('#showPwd');
			
			//set page title
			document.title = (this.pageTitles.cam30PasswordPageTitle) ? this.pageTitles.cam30PasswordPageTitle : this.pageTitles.fallbackTitle;
			
			//help panel
			if (data.responseInfo.reasons[0].code == "008") {
				//this will occur when error in view3 (secure code page)
				if (data.isPwdRequireDosi === true) {
					//if DOB DIV is required
					helpModelTargetID = 'sliderContentDobPassword';
				} else {
					helpModelTargetID = 'sliderContentPassword';
				}
				var _o = { panelTargetID: helpModelTargetID};
				this.slideOutTargetedHelp(_o);
			} 

			
			//set up view = UI
			(pwdRemainAttempt>=4) ? dojo.addClass($showPwddiv[0], "hiddenNew") : dojo.removeClass($showPwddiv[0], "hiddenNew");
			if(data.isPwdRequireDosi === false) {
				this.passwordDate.close();
				this.passwordDateInfo.close();
			}


			//display errors
			if (data.isPwdRequireDosi === true || data.isPwdLocked === true || data.isPwdTempLock === true) {
				if (this.logonAttempt) { // Only display the error message if the user has tried at least one password this session.
					this.passwordDateInfo.open();
				}
				this.passwordDate.open();

				if (this.logonAttempt == false) { // If the password is locked but the user has not entered a password this session, prompt for password.
					return this.viewNo2;
				} else {
					if (data.isPwdLocked === true) {
						return this.viewNo6;
					} else if (data.isPwdTempLock === true) {
						return this.viewNo4;
					} else if (pwdDosiRemainAttempt < logonMngr.totalDosiCam30RetriesBeforeTempLock) {
						this._displayErrors({
							page: 'PWD',
							errMessages: {
								dob: i18n_error.LOG_PASSWORD_ENTER_DOB
							}
						});
						
					} else if (pwdDosiRemainAttempt == logonMngr.totalDosiCam30RetriesBeforeTempLock) {
						this._displayErrors({
							page: 'PWD',
							errMessages: {
								dob:i18n_error.LOG_PASSWORD_ENTER_DOB
							}
						});
						
						if (pwdRemainAttempt<logonMngr.allowedCam30InvalidAttempts) {
							if (this.logonAttempt) { // Only display the error message if the user has tried at least one password this session.
								this._displayErrors({
									page: 'PWD',
									errMessages: {
										widget:i18n_error.LOG_0006_01_1 + pwdRemainAttempt + i18n_error.LOG_0006_01_2
									}
								});

								this.$passwordDosiError.html("");
							}
						}
					}
				}
			} else if (pwdRemainAttempt < logonMngr.allowedCam30InvalidAttempts) {
				if (this.logonAttempt) { // Only display the error message if the user has tried at least one password this session.
					this._displayErrors({
						page: 'PWD',
						errMessages: {
							widget: i18n_error.LOG_0006_01_1 + pwdRemainAttempt + i18n_error.LOG_0006_01_2
						}
					});
					
				}
			}
			
			return this.viewNo2;
		},
		getJSCDataTimeStamp : function () {
			var jdata;
			if (typeof(HSBCGLBL) != "undefined") {
				HSBCGLBL.hsbcglblform('jdata');
				jdata = document.getElementById("jdata").value;
			}
			
			return jdata;
		},
		
		getCookie: function(cname) {
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return null;
		},
		
		setUpView3 : function (data) {
			//local scope
			var helpModelTargetID = null,
				slideOutFlag = this.getCookie('slideOutFlag'),
				lastOpenedModel = this.getCookie('lastOpenedModel'),
				otpRemainAttempt = parseInt(data.otpRemainAttempt),
				otpDosiRemainAttempt = parseInt(data.otpDosiRemainAttempt),
				clearCookies = false;
				
			//set page title
			document.title = (this.pageTitles.cam40SecureCodePageTitle) ? this.pageTitles.cam40SecureCodePageTitle : this.pageTitles.fallbackTitle;
			
			//help panel
			if (data.responseInfo.reasons[0].code == "008") {
				//this will occur when error in view3 (secure code page)
				slideOutFlag = "true";
				helpModelTargetID = this.SECURECODE_helpModelTargetID;
			} else {
				if (lastOpenedModel !== null) {
					if (data.isOtpRequireDosi ==false && lastOpenedModel.toLowerCase().search('dob') >=0) {
						clearCookies = true;
						slideOutFlag = "false";
					} else if (data.isOtpRequireDosi ==true && lastOpenedModel.toLowerCase().search('dob') == -1) {
						clearCookies = true;
						slideOutFlag = "false";
					}else if (lastOpenedModel.toLowerCase().search(this.tokenType.toLowerCase()) < 0) {
						clearCookies = true;
						slideOutFlag = "false";
					} else {
						helpModelTargetID = this.getCookie('lastOpenedModel');
					}					
				}				
			}			

			if (slideOutFlag !== null) {				
				if (slideOutFlag === "true") {
					//trigger help
					var _o = { panelTargetID: helpModelTargetID, addParam: helpModelTargetID };
					this.slideOutTargetedHelp(_o);
				} else {
					topic.publish('callSliderMethod', {name: 'hide'});
					if (clearCookies) {
						//user change, reset flags
						topic.publish('callSliderMethod', {name: 'flushCookie'});						
					}
				}
			}

			//display errors
			if (data.isOtpRequireDosi === true || data.isOTPLocked === true || data.isOtpTempLock === true) {
				//secureCodeError.html("");
				if (this.logonAttempt) { // Only display the error message if the user has tried at least one secure code this session.
					this.secureCodeDateInfo.open();
				}
				this.secureCodeDate.open();

				if (this.logonAttempt == false) {
					return this.viewNo3;
				} else {
					if (data.isOTPLocked === true) {
						return this.viewNo7;
					} else if (data.isOtpTempLock === true) {
						return this.viewNo5;
					} else if (otpDosiRemainAttempt < logonMngr.totalDosiCam40RetriesBeforeTempLock) {
						this._displayErrors({
							page: 'SCODE',
							errMessages: {
								dob: i18n_error.LOG_SECURE_KEY_ENTER_DOB
							}
						});
						
					} else if (otpDosiRemainAttempt == logonMngr.totalDosiCam40RetriesBeforeTempLock) {
						this._displayErrors({
							page: 'SCODE',
							errMessages: {
								dob: i18n_error.LOG_SECURE_KEY_ENTER_DOB
							}
						});
						
						if (otpRemainAttempt < logonMngr.maxAttemptsOfOtpPins) {
							if (this.logonAttempt) { // Only display the error message if the user has tried at least one secure code this session.
								this._displayErrors({
									page: 'SCODE',
									errMessages: {
										widget: i18n_error.LOG_INVALID_USER_SECURE_1 + otpRemainAttempt + i18n_error.LOG_INVALID_USER_SECURE_2
									}
								});
								
							}
						}
					}
				}

			} else if (otpRemainAttempt < logonMngr.maxAttemptsOfOtpPins) {
				if (this.logonAttempt) { // Only display the error message if the user has tried at least one secure code this session.
					this._displayErrors({
						page: 'SCODE',
						errMessages: {
							widget: i18n_error.LOG_INVALID_USER_SECURE_1 + otpRemainAttempt + i18n_error.LOG_INVALID_USER_SECURE_2
						}
					});

				}
			} 
			
			return this.viewNo3;
		},
				
		slideOutTargetedHelp: function(_options) {
			var settings = _options || {};
			
			//get the node as trigger by target id
			if (settings.panelTargetID !==undefined) {
				var $trigger = query('a[data-target-id=\"' + settings.panelTargetID +'"\]')[0];
				var isOpen = domAttr.get($trigger, 'aria-expanded');
				if(isOpen == "false"){
					if (_options.addParam !==undefined) {
						topic.publish('callSliderMethod', {name: 'loadContent', param1: $trigger, param2:_options.addParam});
					} else {
						topic.publish('callSliderMethod', {name: 'loadContent', param1: $trigger});
					}
					
					//open slideOut help
					topic.publish('callSliderMethod', {name: 'show'});
					var tryConfirm = domAttr.get($trigger, 'aria-expanded');
					if (tryConfirm !== "true"){
						domAttr.set($trigger, 'aria-expanded', 'true');
					}
				}
			}
		},
		
		_resetPageViews: function(_options) {
			//reset all inputs
			query("div.dijitInputContainer > input[type='text'], input[type='password']").forEach(function(node){
				//add exception, if any
				if (_options !==undefined) {
					if (_options.exceptionIdsForReset.indexOf(node.id) == -1) {
						node.value = "";	
					}
				} else {
					node.value = null;					
					var _controlWrapper = query(node).parents(".dijitValidationTextBoxError");
					_controlWrapper.removeClass('dijitValidationTextBoxError');					
				}
				
			});
			
			//continue button
			var buttons = query("form > .submit_input");
			buttons.forEach(function(ContunueButton) {
				domAttr.set(ContunueButton, {
					'disabled': true,
					'aria-disabled': "true"
				});				
			});			
			
			//reset message
			query('.validationMsg').forEach(dojo.empty);			
		},
		
		_rememberME: function(isRemember) {
			isRemember ? this.checkboxWidget._check() : this.checkboxWidget._uncheck();
			dijit.byId("rememberMe").set("checked", isRemember ? true : false);			
			this.rememberMeValue = isRemember;
			
			var warnHelp = query('#warn1');
			if (warnHelp !=null)
				isRemember ? warnHelp.addClass('showMe') : warnHelp.removeClass('showMe');		
		},
		
		_showPassword : function(){
			var $password = query('#password'),
				item = query('#showPassword')[0],
				checkboxWidget = dijit.getEnclosingWidget(item);
			
			checkboxWidget.set('checked', false); 
			$password.attr("type", "password");
			
		},
		
		_displayErrors: function(errlog) {
			if (!errlog) 
				return;
			
			var dobError = (errlog.errMessages.dob) ? errlog.errMessages.dob : null,
				widgetError = (errlog.errMessages.widget) ? errlog.errMessages.widget : null,
				domNode = null;
				
			switch (errlog.page) {
				case 'USER':
					this.$usernameError.html(widgetError);
					domNode = this.username.domNode;
					break;
				
				case 'PWD':
					domNode = this.password.domNode;					

					if (dobError !=null) {
						this.$passwordDosiError.html(dobError);
						dojo.query("#passwordDate .gusTextInput div.dijitValidationTextBox").addClass(this.dojoValidationClassName1);
					}
					if (widgetError !=null) {
						this.$passwordError.html(widgetError);
					}

					break;
					
				case 'SCODE':
					domNode = this.secureCode.domNode;					

					if (dobError !=null) {
						this.$secureCodeDosiError.html(dobError);
						dojo.query("#secureCodeDate .gusTextInput div.dijitValidationTextBox").addClass(this.dojoValidationClassName1);
					}
					if (widgetError !=null) {
						this.$secureCodeError.html(widgetError);
					}						

					break;	
				
				default:
					console.log('nothing to display...');
			}
			
			//add validation class
			dojo.addClass(domNode, this.dojoValidationClassName);				
		}
		
	});
});
