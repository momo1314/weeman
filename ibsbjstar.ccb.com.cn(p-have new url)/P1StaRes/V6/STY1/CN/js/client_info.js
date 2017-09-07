var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/(msie\s|trident.*rv:)([\w.]+)/)) ? Sys.ie = s[2] || "0" :
	(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
	(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

/******************以下进行测试
	if (Sys.ie) document.write('IE: ' + Sys.ie);
	if (Sys.firefox) document.write('Firefox: ' + Sys.firefox);
	if (Sys.chrome) document.write('Chrome: ' + Sys.chrome);
	if (Sys.opera) document.write('Opera: ' + Sys.opera);
	if (Sys.safari) document.write('Safari: ' + Sys.safari);
******************/
var client = function(){ 
		//呈现引擎 
		var engine = { ie : 0, gecko : 0, webkit : 0, khtml : 0, opera : 0, 
		/*完整的版本号*/ 
		ver : null }; 
		
		/*浏览器*/ 
		var browser = { 
		/*主要浏览器*/ 
		ie : 0, firefox : 0, konq : 0, opera : 0, chrome : 0, safari : 0,   
		/*具体的版本号*/ 
		ver : null };   
		/*平台、设备和操作系统*/ 
		var system ={ win : false, mac : false, xll : false,   
		//移动设备 
		ipad : false, iphone : false, ipod : false, android : false, nokiaN : false, winMobile : false, macMobile : false,   
		//游戏设备 
		wii : false, ps : false }; 
		//检测呈现引擎和浏览器 
		var ua = navigator.userAgent; 
		
		if (window.opera){ 
			engine.ver = browser.ver = window.opera.version(); 
			engine.opera = browser.opera = engine.ver; 
		} else if (/AppleWebKit\/(\S+)/.test(ua)){
			engine.ver = RegExp["$1"]; 
			engine.webkit = engine.ver;   
			//确定是Chrome还是Safari 
			if (/Chrome\/(\S+)/.test(ua)){ 
				browser.ver = RegExp["$1"]; 
				browser.chrome = browser.ver; 
			} else if (/Version\/(\S+)/.test(ua)){ 
				browser.ver = RegExp["$1"]; 
				browser.safari = browser.ver; 
			} else { 
				//近似地确定版本号 
				var safariVersion = 1; 
				if(engine.webkit < 100){ 
					safariVersion = 1; 
				}else if (engine.webkit < 312){ 
					safariVersion = 1.2; 
				}else if (engine.webkit < 412){ 
					safariVersion = 1.3; 
				}else { 
					safariVersion = 2; 
				} 
				browser.safari = browser.ver = safariVersion; 
			} 
		} else if (/KHTML\/(\S+)/.test(ua) || /Konquersor\/([^;]+)/.test(ua)){ 
			engine.ver = browser.ver = RegExp["$1"]; 
			engine.khtml = browser.kong = paresFloat(engine.ver); 
		} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){ 
			engine.ver = RegExp["$1"];
			engine.gecko = engine.ver; 
			//确定是不是Firefox 
			if (/Firefox\/(\S+)/.test(ua)){ 
				browser.ver = RegExp["$1"]; 
				browser.firefox = browser.ver; 
			} 
		} else if(/(MSIE\s|Trident.*rv:)([\w.]+)/.test(ua)){
			browser.ver = RegExp["$2"]; 
			engine.ie = browser.ie = browser.ver; 
		} 
		//检测浏览器 
		browser.ie = engine.ie; 
		browser.opera = engine.opera; 
		//检测平台 
		var p = navigator.platform; 
		system.win = p.indexOf("Win") == 0; 
		system.mac = p.indexOf("Mac") == 0; 
		system.x11 = (p == "X11") || (p.indexOf("Linux") == 0); 
		//检测Windows操作系统 
		if (system.win){ 
			if (/Win(?:doms)?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){ 
				if (RegExp["$1"] == "NT"){ 
					switch(RegExp["$2"]){ 
						case "5.0": system.win = "2000"; 
						break; 
						case "5.1": system.win = "XP"; 
						break; 
						case "6.0": system.win = "Vista"; 
						break; 
						default : system.win = "NT";
						break; 
					}
			} else if (RegExp["$1"]){ 
				system.win = "ME"; 
			} else { 
				system.win = RegExp["$1"]; 
			}
		}
	} 
	//移动设备 
	system.ipad = ua.indexOf("iPad") > -1;
	system.iphone = ua.indexOf("iPhone") > -1; 
	system.ipod = ua.indexOf("iPod") > -1; 
	system.android = ua.indexOf("Android") > -1; 
	system.nokiaN = ua.indexOf("NokiaN") > -1; 
	system.winMobile = (system.win == "CE" || ua.indexOf("Windows Phone") > -1); 
	system.macMobile = (system.ipad || system.iphone || system.ipod); 
	//游戏系统 
	system.wii = ua.indexOf("Wii") > -1; 
	system.ps = /playstation/i.test(ua); 
	//返回这些对象 
	return { engine: engine, browser: browser, system: system }; 
}();

/******************以下进行测试
	if (client.system.win)document.write('System:Windows');
	if (client.system.mac)document.write('System:Mac');
	if (client.system.xll)document.write('System:Linux or X11');
	if (client.system.iphone)document.write('System:iPhone');
	if (client.system.ipod)document.write('System:iPod');
	if (client.system.android)document.write('System:Android');
	if (client.system.nokiaN)document.write('System:NokiaN');
	if (client.system.winMobile)document.write('System:Win CE');
	if (client.system.macMobile)document.write('System:Mac iPhone/iPod');
	document.write("<br>");
	if (client.browser.ie) document.write('IE: ' + client.browser.ie);
	if (client.browser.firefox) document.write('Firefox: ' + client.browser.firefox);
	if (client.browser.chrome) document.write('Chrome: ' + client.browser.chrome);
	if (client.browser.opera) document.write('Opera: ' + client.browser.opera);
	if (client.browser.safari) document.write('Safari: ' + client.browser.safari);
******************/