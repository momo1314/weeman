define([
	'exports',
	'require',
	'dojo/_base/lang',
	'dojo/text',
	'dojo/i18n',
	'dojo/cookie'
], function (exports, require, lang, text, i18n, cookie) {
	var jsRE = /.js(?:[#\?].*)?$/,
		htmlRE = /.html(?:[#\?].*)?$/,
		propertiesRE = /.properties(?:[#\?].*)?$/,
		preloadRE = /^\*preload\*(.*)$/,
		nlsRE = /\/nls\//;

	var preloadWaitQueue = [],
		preloading = 0,
		cache = {};

	function waitForPreloads(id, require, load) {
		if (preloading) {
			preloadWaitQueue.push([ id, require, load ]);
		}
		return preloading;
	}

	function preloadNls(moduleId, contextRequire) {
		contextRequire = contextRequire || require;

		preloading++;
		contextRequire([moduleId], function (rollup) {
			for (var moduleId in rollup) {
				// put layers in the rollup into the cache
				cache[require.toAbsMid(moduleId)] = rollup[moduleId];
			}
			preloading--;
			while (!preloading && preloadWaitQueue.length) {
				// run the module that was requested back through this plugin
				// to get it out of the cache and notify the loader
				exports.load.apply(null, preloadWaitQueue.shift());
			}
		});
    }

    function matchLocale(availableLocales, locale) {
        // Match a given locale to a list of available locales.
        // Make the locale more general until a match is found.
        // If none is found, then return ROOT.
        var parts = locale.split("-");
        while(parts.length){
            locale = parts.join("-");
            if (availableLocales.indexOf(locale) !== -1) {
                return locale;
            }
            parts.pop();
        }
        return "ROOT";
    }

    function insertAggregationParam(url, isModule) {
    	var result;
    	var contentServicePrefix="/ContentService/"+commonProp.globalVP;
    	var urlDivision=url.split('?');
    	
    	//var ecaCookie =false;// cookie(global_app_var.ecaCookieName);
    	if (url.split('?')[1]=='confirmationTemp') {
        	
    		result = './templates/Confirmation_'+regMnger.registrationType+regMnger.secureKeyTab+regMnger.secureKeyDeviceby+'.html';
    		
    	}
    	else if (url.split('?')[1]=='aggregationRequired') {
    	
    		result = "&ECAL="+commonProp.locale+"&SAGG="+commonProp.entityVP;
    		result = contentServicePrefix+urlDivision[0] + result;
    	} else {
    	
    		result = url;
    	}
    	
    	
    	return result.indexOf("?") >= 0 ? result : result.replace("&", "?");
    }
    
	exports.load = function (id, contextRequire, loaded) {
		var preload;
		if (htmlRE.test(id) || propertiesRE.test(id)) {
			// offload to text's mechanism's and cache
			id = insertAggregationParam(id);
			text.load(id, contextRequire, loaded);
		}
//		else if (jsRE.test(id) || !nlsRE.test(id)) {
//			// offload to loader's mechanism's and cache
//			id = insertAggregationParam(id, true);
//			contextRequire([id], loaded);
//		}
		else {
			// nls path
			id = insertAggregationParam(id, true);
			if (preload = id.match(preloadRE)) {
				if (!cache[id]) {
					cache[id] = true;
                    var parts = preload[1].split('*');
                    // Parse the available locales.
                    var locales = JSON.parse(parts[1]);
                    // Get the user's locale.
                    var locale = i18n.normalizeLocale();
                    // Find a locale in the list of available locales that matches
                    // the user's locale.
                    locale = matchLocale(locales, locale);
                    // Load the appropriate NLS layer for the locale.
                    preloadNls(parts[0] + '_' + locale, contextRequire);
				}
				// don't stall the loader
				loaded(1);
			}

			if (preload || waitForPreloads(id, contextRequire, loaded)) {
				return;
			}
			if (cache[id]) {
				var bundle = cache[id];
				loaded(lang.delegate(bundle.root || bundle));
			}
			else {
				// offload to i18n's mechanisms cache
				i18n.load(id, contextRequire, function (bundle) {
					cache[id] = bundle;
					loaded(bundle);
				});
			}
		}
	};

	exports.dynamic = true;
});
