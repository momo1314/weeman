// WebTrends SmartSource Data Collector Tag v10.4.7
// Copyright (c) 2013 Webtrends Inc.  All rights reserved.
// Tag Builder Version: 4.1.2.4
// Created: 2013.08.13

// Set defaults, since these are required here
if (typeof(HSBC.DCS.ID) == "undefined") {
	HSBC.DCS.ID = "dcsxxxxxxxxxxxxxxxxxxxxxx_1234";

}
if (typeof(HSBC.DCS.DOMS) == "undefined") {
	HSBC.DCS.DOMS = "";
}
	
window.webtrendsAsyncInit=function(){
    var dcs=new Webtrends.dcs().init({
        dcsid:HSBC.DCS.ID,
	domain:"www1.member-hsbc-group.com",
        timezone:0, 
        i18n:true,
        adimpressions:true,
        adsparam:"WT.ac",
        offsite:true,
        download:true,
        downloadtypes:"xls,doc,pdf,txt,csv,zip,docx,xlsx,rar,gzip",
	onsitedoms:new RegExp(HSBC.DCS.DOMS),
        plugins:{
            //hm:{src:"//s.webtrends.com/js/webtrends.hm.js"},
            //facebook:{src:"//s.webtrends.com/js/webtrends.fb.js"},
            //yt:{src:"//s.webtrends.com/js/webtrends.yt.js"}
        }
    }).track({
		transform:function(_tag,options){
			// This function collects all the HSBC variables and translates
			// them into the appropriate WebTrends variabls (WT variables
			// from HSBC.PAGE, DCSext variables from SITE and EXT, and 
			// DCS variables from HSBC.LOG variables.  It also overrides
			// the value of gDcsId from the HSBC.DCS.ID variable.
			for (N in HSBC) {
				if (N == "SITE")  {
					for (S in HSBC.SITE) {
						_tag.DCSext[S] = HSBC.SITE[S];
					}
				}
				if (N == "PAGE") {
					for (S in HSBC.PAGE) {
						_tag.WT[S] = HSBC.PAGE[S];
					}
				}
				if (N == "EXT") {
					for (S in HSBC.EXT) {
						_tag.DCSext[S] = HSBC.EXT[S];
					}
				}
				if (N == "LOG") {
					for (S in HSBC.LOG) {
						_tag.DCS[S] = HSBC.LOG[S];
					}
				}
				if (N == "DCS") {
					_tag.WT.dcsid = HSBC.DCS.ID;
					
				}
		  	}
			if (typeof(_tag.DCS.dcsuri) != "undefined") _tag.DCS.dcsuri = dcsFixUT(_tag.DCS.dcsuri);
			_tag.DCSext.HSBCCookie = dcsGetHSBCCookie("HSBC_COOKIEMI");
	 	}
	});
};

(function(){
    var s=document.createElement("script"); s.async=true; s.src=globalVP+"/saas/Components/default/resources/script/theme_public/js/webtrends.js"; // ACTION REQUIRED: Please ensure correct path to webtrends.js (Delete comment once complete)  
    var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
}());
