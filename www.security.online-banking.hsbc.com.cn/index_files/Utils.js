//TODO This module is resposible for passing data between child widgets
define([
	'dojo/hash',
	'dojo/query'
],function(hash, query){
	var enableLog =  true;		
	return {	
		//TODO need to update this function - currently not being used.
		log: function( info ){
			if(enableLog) {
				console.log("log: ");
			}
		},
		
		
		checkFrSysErr: function( reasons ){
			if(JSON.stringify(reasons).toLowerCase().indexOf("json_") != -1){
				this.showErrPage();
				return true;
			}
			return false;
		},
		
		showErrPage: function(){
			hash("error");
			query(".loadingOverlay").style("display", "none");
		},
		
		getPWSHomePage : function(conf){
			return conf.pwsHomeUrl?conf.pwsHomeUrl:"";
		},
		
		getInitInfo: function(conf){
			//CAM30, CHOOSE_CAM40, ACTIVATE_HARD_TOKEN, ORDER_HARD_TOKEN and PREORDER_HARD_TOKEN 
			var pageNo,pageId,
			hostServer = location.hostname,
			contentService = "/ContentService",
			globalVP = conf.globalVP, 
			entityVP = conf.entityVP, 
			
			groupMemberCode = conf.groupMemberCode,
			entityCode = conf.entityCode,
			maskUserId=conf.maskUserId,
			cookieSupported=conf.cookieSupported,
			jwtTokenIdKey=conf.jwtTokenIdKey,
			
			saasForgotUserIdSupported=conf.saasForgotUserIdSupported,
			targetcam=conf.targetCam,
			entityConfigForgotUseridSupported=conf.entityConfigForgotUseridSupported,

			maxAttemptsOfOtpPins=parseInt(conf.maxAttemptsOfOtpPins),
			allowedCam30InvalidAttempts=parseInt(conf.allowedCam30InvalidAttempts),
			totalDosiCam30RetriesBeforeTempLock=parseInt(conf.totalDosiCam30RetriesBeforeTempLock),
			totalDosiCam40RetriesBeforeTempLock=parseInt(conf.totalDosiCam40RetriesBeforeTempLock),


			nextTemplateToShow = conf.nextTemplateToShow,
			isStepUpRequired = conf.isStepUpRequired,
			twoFactorType = conf.twoFactorType,
			daysLeftForOtpLinking = conf.daysLeftForOtpLinking,
			tokenDeliveryMethods = conf.hard_token_delivery_methods,
			unsupportedBrowsers = conf.unsupportedBrowserList,
			hardTokenSupported = conf.hardTokenSupported,
			softTokenSupported = conf.softTokenSupported,
			acCodePrefix = conf.acCodePrefix ? conf.acCodePrefix :'00',
			currTokenModelNo =  conf.currTokenModelNo ? conf.currTokenModelNo : 0,
			pwsHomeUrl = conf.pwsHomeUrl?conf.pwsHomeUrl:"",
			acDeliveryChannel = conf.acDeliveryChannel,
            userID=conf.userID,
					
			locale = {
				"ctryCde" : null,
				"langCde" : conf.locale,
				"variant" : null
			},
			SAGG = "gsp_uk",
			loadStepTrackerFrmTemplate = false,
			isTnCSupported = conf.tandcSupportFlag,
			registrationType = conf.registrationType,
			//registrationType = "CHOOSE_CAM40",
			tandcVersionList = conf.tandcVersionList,
			stepTracker = "steptracker_"+registrationType,
			stepsInfo = {
				"CAM30" : ['REG_STEP1_HEADER','REG_STEP2_HEADER','REG_STEP3_HEADER','REG_STEP4_HEADER','REG_STEP5_HEADER'],
				"PREORDER_HARD_TOKEN" : ['REG_STEP1_HEADER','REG_STEP2_HEADER','REG_STEP3_HEADER','REG_STEP4_HEADER','REG_STEP5_HEADER'],
				"CHOOSE_CAM40" : ['REG_STEP1_HEADER','REG_STEP2_HEADER','REG_STEP3_HEADER','REG_STEP4_HEADER','REG_STEP7_HEADER','REG_STEP5_HEADER'],
				"ACTIVATE_HARD_TOKEN" : ['REG_STEP1_HEADER','REG_STEP2_HEADER','REG_STEP3_HEADER','REG_STEP4_HEADER','REG_STEP6_HEADER','REG_STEP5_HEADER'],
			};			
			
			/**** testing ****/
			var	isTnCSupported = true;
			/***end***/
			
			(isTnCSupported) ? (pageNo = 0, pageId = "Logon") : (pageNo = 1, pageId = "Logon");			
						
			if(!isTnCSupported){
				stepTracker+="_without_tnc";
			}
			var steps = stepsInfo[registrationType];
			var custType = conf.custType;
			var appName = conf.appName;
			var acPrefixSupported = conf.acPrefixSupported;
			if(!isTnCSupported){
				steps.shift();
			}			
				
			return {
				pageNo : pageNo,
				pageId : pageId,
				stepTracker : stepTracker,
				isTnCSupported : isTnCSupported,
				registrationType : registrationType,
				tandcVersionList : tandcVersionList,
				hostServer : hostServer,
				locale : locale,
				contentService : contentService,
				targetcam:targetcam,
				globalVP : globalVP,
				entityVP : entityVP,
				
				groupMemberCode : groupMemberCode,
				entityCode : entityCode,
				maskUserId : maskUserId,
				cookieSupported:cookieSupported,
				jwtTokenIdKey:jwtTokenIdKey,
				saasForgotUserIdSupported:saasForgotUserIdSupported,
				entityConfigForgotUseridSupported:entityConfigForgotUseridSupported,
				unsupportedBrowsers : unsupportedBrowsers,
				maxAttemptsOfOtpPins: maxAttemptsOfOtpPins,
				allowedCam30InvalidAttempts : allowedCam30InvalidAttempts,
				totalDosiCam30RetriesBeforeTempLock : totalDosiCam30RetriesBeforeTempLock,
				totalDosiCam40RetriesBeforeTempLock : totalDosiCam40RetriesBeforeTempLock,
				SAGG : SAGG,				
				callService : true,
				loadStepTrackerFrmTemplate : loadStepTrackerFrmTemplate,
				stepsInfo : steps,
				
				secureKeyTab : "",
				secureKeyDeviceby : "",
				appName : appName,
				custType : custType,
				supportbranchId : true,
				nextTemplateToShow : nextTemplateToShow,
				isStepUpRequired : isStepUpRequired,
				twoFactorType  : twoFactorType ,
				daysLeftForOtpLinking:daysLeftForOtpLinking,
				tokenDeliveryMethods : tokenDeliveryMethods,
				secureKeySupportedList : ["softTokenSupprted","hardTokenSupported","noTokenSupported"],
				isHardTokenSupported : hardTokenSupported,
				isSoftTokenSupported : softTokenSupported,
				cam30ResourceURL : "/gsa/SaaS30Resource/",				
				isLogCancel : true,
				logOutURL : "/gsa?idv_cmd=idv.Logoff&nextPage=SaaSLogoutCAM0Resource",
				acDeliveryChannel : acDeliveryChannel,
				acCodePrefix : acCodePrefix,
				currTokenModelNo : currTokenModelNo,
				acPrefixSupported : acPrefixSupported,
                userID : userID,
				pwsHomeUrl : pwsHomeUrl
			};				
		}
	}
});