define([
	"dojo/parser",
	"./nls",
	"dojo/dom-attr",	
	"hsbcwidget/ext!/saas/Components/resource/jsbundle/logon/nls/logon.js?aggregationRequired",
	//Leave a gap for not returning items
	"dojo/uacss",
	"dojo/domReady!"
], function(parser, nls, domAttr, logon) {

	nls.replace({ nls: logon });

	//Determine which page controller to use.
	//The parse here is purely for demonstration purposes only
	
	parser.parse().then(function(instances) {

            var bodyNode = document.body,
                controllerMid = domAttr.get(bodyNode, 'data-page-controller') || 'app/controllers/_AppController',
                args = domAttr.get(bodyNode, 'data-page-args') || '';				
            /*jshint -W054 */
            args = new Function('return { ' + args + ' }')();
			args.i18n = logon;
			
            /*jshint +W054 */
			
            require([controllerMid], function(Controller) {
                new Controller(args);				
            });
	});
});