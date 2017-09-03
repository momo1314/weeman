define(
		[ "dojo/_base/declare", "dijit/_WidgetBase","dojo/topic"

		],
		function(declare, _WidgetBase,topic

		) {
			return declare(
					"tempdata",
					[ _WidgetBase ],
					{

						startup : function() {
							this.inherited(arguments);
							var i = 0;
							var Supported_Browser = this.unsupported_list;
							if (Supported_Browser[0] == "AllBrowserSupported") {
							} else {
								var Sorted_Browser = new Array();

								if (typeof dojo.isFF != 'undefined') {
									dojo.forEach(Supported_Browser, function(
											item, index) {
										if (item.substring(0, 2) == "FI") {
											Sorted_Browser[i] = item
													.match(/[0-9]+/)[0];
											i = i + 1;
										}
									});
									if (dojo.indexOf(Sorted_Browser, Math.floor(dojo.isFF.toString())) != -1) {
										var cookie_browser = document.cookie;
										if (cookie_browser
												.indexOf("validBrowser") == -1) {
											document.cookie = "validBrowser=NO;path=/";
											
											setTimeout(function(){
												notSupported();
											},90);
										}
									}
								} else if (typeof dojo.isIE != 'undefined') {
									calculateArray("IE", Supported_Browser);
									supported(dojo.isIE.toString(),
											Sorted_Browser);
								} else if (typeof dojo.isOpera != 'undefined') {
									calculateArray("OP", Supported_Browser);
									supported(dojo.isOpera.toString(),
											Sorted_Browser);
								} else if (typeof dojo.isSafari != 'undefined') {
									calculateArray("SA", Supported_Browser);
									supported(dojo.isSafari.toString(),
											Sorted_Browser);
								} else if (typeof dojo.isChrome != 'undefined') {
									calculateArray("CH", Supported_Browser);
									supported(dojo.isChrome.toString(),
											Sorted_Browser);
								} else {
									var iev = 0;
									var ieold = (/MSIE (\d+\.\d+);/
											.test(navigator.userAgent));
									var trident = !!navigator.userAgent
											.match(/Trident\/7.0/);
									var rv = navigator.userAgent
											.indexOf("rv:11.0");
									if (ieold)
										iev = new Number(RegExp.$1);
									if (navigator.appVersion.indexOf("MSIE 10") != -1)
										iev = 10;
									if (trident && rv != -1)
										iev = 11;

									if (null != iev && "11" == iev) {
										calculateArray("IE", Supported_Browser);
										supported("11", Sorted_Browser);
									} else {
										var cookie_browser = document.cookie;
										if (cookie_browser
												.indexOf("validBrowser") == -1) {
											document.cookie = "validBrowser=NO;path=/";
											setTimeout(function(){
												notSupported();
											},90);
										}
									}
								}
								function calculateArray(browser,
										Supported_Browser) {
									dojo.forEach(Supported_Browser, function(
											item, index) {
										if (item.substring(0, 2) == browser) {
											Sorted_Browser[i] = item
													.match(/[0-9]+/)[0];
											i = i + 1;
										}
									});
								}

								function supported(browser1, Sorted_Browser) {
									if (dojo.indexOf(Sorted_Browser, Math.floor(browser1)) != -1) {
										var cookie_browser = document.cookie;
										if (cookie_browser
												.indexOf("validBrowser") == -1) {
											document.cookie = "validBrowser=NO;path=/";
										
												if (typeof dojo.isSafari != 'undefined') {
													var d= document.getElementById('browserlink');
													var evt = document.createEvent('MouseEvents');
													evt.initMouseEvent('click',true,true,window);
													d.dispatchEvent(evt);
												}else{
														notSupported();
													
						}
											
										}

									}
								}
								
								function notSupported(){
									setTimeout(function(){
										topic.publish("lightbox/processtrigger",document.getElementById('browserlink'));
									},1000);
									
									
									
								}
							}
						},					
						
						
						unsupported_list : ""

					});
		});