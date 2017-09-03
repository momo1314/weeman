
/* global define */

define(['require'], function(require){

	//NOTE calculate context root based on RefApp location

	return {		
		// Defining page URLs and Page order 
		page: {
		
			ErrorPage: 'modules/common/widget/errorpage'
			},
		// Error Page Template URL
		errorPage: 'modules/common/widget/errorpage',
		//Service Calls defined for each step
		serviceEndPoint:{
			logon: {					
				//Service call for fetch
				_loginContinue:{
				// To Change location of stub
				url: (logonMngr.callService) ? "/gsa/CAM10AuthenticationIP" : "/ContentService/gsp_na01_jr02/saas/Components/default/resources/script/stub/logon/userresponse.json",
					type: 'post',
					cacheTimeout : '60' //in seconds
				},
				
				_passAuthenticate:{
				// To Change location of stub
				url: (logonMngr.callService) ? "/gsa/passwordAuth" : "/ContentService/gsp_na01_jr02/saas/Components/default/resources/script/stub/logon/passwordresponse.json",
					type: 'post',
					cacheTimeout : '60' //in seconds
				},
				
				_secureKeyAuth:{
				// To Change location of stub
				url: (logonMngr.callService) ? "/gsa/otpAuthentication" : "/ContentService/gsp_dit/saas/Components/default/resources/script/stub/logon/securekeyresponse.json",
					type: 'post',
					cacheTimeout : '60' //in seconds
				},

				_sessionAuthenticate:{
				// To Change location of stub
				url: (logonMngr.callService) ? "/gsa?idv_cmd=idv.SaaSSessionCommand&nextPage=IDV_CAM10_AUTHENTICATION" : "/ContentService/gsp_dit/saas/Components/default/resources/script/stub/logon/sessionresponse.json",
					type: 'post',
					cacheTimeout : '60' //in seconds
				},
				_saasTokenPinReset:{
				// To Change location of stub
				url: (logonMngr.callService) ? "/gsa?idv_cmd=idv.SaaSSessionCommand&nextPage=IDV_CAM10_AUTHENTICATION" : "/ContentService/gsp_dit/saas/Components/default/resources/script/stub/logon/sessionresponse.json",
					type: 'post',
					cacheTimeout : '60' //in seconds
				},
				_saasOLR:{
				// To Change location of stub
				url: (logonMngr.callService) ? "/gsa?idv_cmd=idv.SaaSSessionCommand&nextPage=IDV_CAM10_AUTHENTICATION" : "/ContentService/gsp_dit/saas/Components/default/resources/script/stub/logon/sessionresponse.json",
					type: 'post',
					cacheTimeout : '60' //in seconds
				}
			}			
		},
		delayCall: 100
	};
});