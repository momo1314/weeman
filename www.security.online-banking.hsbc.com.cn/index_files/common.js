define({ 
	root: {
		webtrends : {
			ti:'Online Banking Registration',
			tagversion : '1.10.7',
			channel : 'web',
			rgn : 'Europe',
			subrgn : 'UK',
			cnty : 'United Kingdom',
			DOMS : 'www.hsbc.co.uk' ,
			ent : 'HSBC Bank Plc',
			brand : 'HSBC',
			dcsuri : '/gsa/SAAS_REGISTRATION_UTILITY/',
			ID : 'dcss3oxau5twkf4oma0cdcas2_2o4b',
			custgrp : 'RBWM',
			busline : 'no busline',
			prodline:'internet banking',
			page_cg_n :'public;no ibtype',
			site : 'IB',
			ibtype : 'GSP',
			language : 'en',
			cam : '0'
		},

		webtrends_mt : {
			ti:'Online Banking Registration',
			tagversion : '1.10.7',
			channel : 'web',
			rgn : 'Europe',
			subrgn : 'UK',
			cnty : 'United Kingdom',
			//DOMS : 'www.hsbc.co.uk',
			ent : 'HSBC Bank Plc',
			brand : 'HSBC',
			dcsuri : '',
			//ID : 'dcss3oxau5twkf4oma0cdcas2_2o4b',
			custgrp : 'RBWM',
			busline : 'no busline',
			prodline: 'Internet Banking',
			page_cg_n :'IB;GSP',
			site : 'IB',
			ibtype : 'GSP',
			language : 'en'
		},

		//logon Webtrends
		viewNo1:{
			dcsuri:"/gsa/IDV_CAM10_AUTHENTICATION",
			ti:"HSBC Global Login: Step 1",
			cg_n:"IB;GSP",
			si_n:"OB_web_logon",
			si_x:"1"
		},

		viewNo2:{
			dcsuri:"/gsa/IDV_CAM10TO30_AUTHENTICATION",
			ti:"HSBC Global Login: Step 2",
			cg_n:"IB;GSP",
			si_n:"OB_web_logon",
			si_x:"2"
		},

		viewNo3:{
			dcsuri:"/gsa/IDV_CAM20_OTP_CHALLENGE",
			ti:"HSBC Global Login: Step 3",
			cg_n:"IB;GSP",
			si_n:"OB_web_logon",
			si_x:"3"
		},

		viewNo4:{
			dcsuri:"/gsa/IDV_USER_LOCKED_RES1",
			ti:"HSBC Global Login: Step 4",
			cg_n:"IB;GSP",
			si_n:"OB_web_logon",
			si_x:"4"
		},

		viewNo5:{
			dcsuri:"/gsa/IDV_USER_LOCKED_RES1",
			ti:"HSBC Global Login: Step 5",
			cg_n:"IB;GSP",
			si_n:"OB_web_logon",
			si_x:"5"
		},

		viewNo6:{
			dcsuri:"/gsa/IDV_USER_LOCKED_RES5",
			ti:"HSBC Global Login: Step 6",
			cg_n:"IB;GSP",
			si_n:"OB_web_logon",
			si_x:"6"
		},

		viewNo7:{
			dcsuri:"/gsa/IDV_USER_LOCKED_RES5",
			ti:"HSBC Global Login: Step 7",
			cg_n:"IB;GSP",
			si_n:"OB_web_logon",
			si_x:"7"
		},

		viewNo8:{
			dcsuri:"/gsa/IDV_SYSTEM_ERROR/",
			ti:"HSBC Global Login: Step 8",
			cg_n:"IB;GSP",
			si_n:"OB_web_logon",
			si_x:"8"
		},




		//Manage token Section - Contains repeated values since no data sheet


		ManageTokenKey : {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		HardTokenActivation: {
			dcsuri:'/authentication/activation/input/',
			ti:'Online Banking | Secure Key Activation Input',
			cg_n:'IB;GSP',
			z_in01:'activation time left | '
		},

		HardTokenActivationConfirmation: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		HardTokenActivationPrompt: {
			dcsuri:'/authentication/activation/',
			ti:'Online Banking | Secure Key Activation Request',
			cg_n:'IB;GSP',
			z_in01:'activation time left | show'
		},
		
		HardTokenOnlySwitchCase:{
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},
			
		SoftTokenSwitchActivationConfirmation:{
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},
		
		HardTokenActivation:{
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},
		
		HardTokenOnlyNewOrder:{
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},
		
		SwitchHardToSoft: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		SwitchSoftToHard: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		StepUpDigitalSecureKey: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		StepUpSecureKey: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		SoftTokenActivationPrompt: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		SoftTokenActivationConfirmation: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		PostSwitchOrderConfirmation: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		PostNewOrderConfirmation: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		BranchSwitchOrderConfirmation: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},

		BranchNewOrderConfirmation: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},
		
		CancelSoftTokenActConfirmation: {
			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token'
		},



		//Registration section

		//Terms and conditions step
		TnC : {
			dcsuri:'/authentication/registration/1/termsConditions/',
			ti:'Online Banking Registration | Ts and Cs',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'2',
			busline:'no busline',
			prodline:'internet banking',
			site:'IB',
			ibtype:'GSP'
		},
		//Verify Identity Step
		VerifyIdentity : {
			dcsuri:'/authentication/registration/2/Verify-identity/',
			ti:'Online Banking Registration | Verify Identity',
			cg_n:'IB;GSP',
			si_x:'3',
			si_n:'OB_web_reg',
			busline:'no busline',
			prodline:'internet banking',
			site:'IB',
			ibtype:'GSP'

		},

		//Verify Identity Step (for MPF)
		VerifyIdentityMPF : {
			dcsuri:'/authentication/registration/2/Verify-identity/',
			ti:'Online Banking Registration | Verify Identity',
			cg_n:'IB;GSP',
			si_x:'3',
			si_n:'OB_web_reg',
			busline:'no busline',
			prodline:'internet banking',
			site:'IB',
			ibtype:'GSP'
		},

		//Set up login Info step
		SetupLoginInfo : {
			dcsuri : '/authentication/registration/3/setup-logon-on/',
			ti:'Online Banking Registration | Set Login',
			cg_n:'IB;GSP',
			si_x:'4',
			si_n:'OB_web_reg',
			busline:'no busline',
			prodline:'internet banking',
			site:'IB',
			ibtype:'GSP'
		},
		// Setup olr info step

		SetupOLRInfo : {
			dcsuri:'/authentication/registration/4/pick-questions/',
			ti:'Online Banking Registration | Pick Security Question',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'5',
			busline:'no busline',
			prodline:'internet banking',
			site:'IB',
			ibtype:'GSP'
		},

		//Error Page Webtrends tag
		ErrorPage : {
			dcsuri:'/authentication/registration/errorPage/',
			ti:'Online Banking Registration | Error Page',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'',
			busline:'no busline',
			prodline:'internet banking',
			site:'IB',
			ibtype:'GSP'
		},

		// Token Activation
		OtpRegistration :{

		},

		ActivationToken : {
			dcsuri:'/authentication/registration/errorPage/',
			ti:'Online Banking Registration | Error Page',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'',
			busline:'no busline',
			prodline:'internet banking',
			site:'IB',
			ibtype:'GSP'
		},	

		ChooseSecureKey :{

			dcsuri:'/authentication/registration/5/choose-security/',
			ti:'Online Banking Registration | Choose Security',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'6',
			ria_a:'GSP',
			ria_f:'OB Reg',
			ria_ev:'tab-view',
			ria_c:'soft token',
			busline:'no busline',
			prodline:'internet banking',
			site:'IB',
			ibtype:'GSP',		


			REG_SOFTTOKEN : {

			},
			REG_HARDTOKEN : {

				HRADTOKEN_BYPOST : {

				},
				HRADTOKEN_BYBRANCH : {

				},
				HRADTOKEN_ALREADYPRESENT : {

				}
			},
			REG_WITHOUTTOKEN : {

			},
			SIDEBOX_POPUP : {

			}
		},
		//Confirmation Setup
		Confirmation : {
			dcsuri:'/authentication/registration/6/confirmation/',
			ti:'Online Banking Registration | Confirmation',
			cg_n:'IB;GSP',
			si_n:'OB_web_reg',
			si_x:'7',
			si_cs:'1',
			seg_1:'Customer',
			registration:'registrations',
			busline:'no busline',
			prodline:'internet banking',
			site:'IB',
			ibtype:'GSP',
			HRD_POST_RCT:'HGHQ_OB_reg_HRD_POST_RCT',
			HRD_POST_INCRT:'HGHQ_OB_reg_HRD_POST_INCRT',
			HRD_EXISTING:'HGHQ_OB_reg_HRD_EXISTING',
			SFT:'HGHQ_OB_reg_SFT',
			NO_TOKEN:'HGHQ_OB_reg_NO_TOKEN',
			HRD_POST_NOAD:'HGHQ_OB_reg_HRD_POST_NOAD'

		}


	}
/*"en-us": true, */
//"zh_fr": true,	
});