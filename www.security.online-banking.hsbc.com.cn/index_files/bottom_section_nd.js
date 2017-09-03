require(
		['hsbcwidget/ext!/saas/Components/resource/jsbundle/common/nls/common.js?aggregationRequired'],
		function(i18n) {
			var check_ele = initializeWebtrends(i18n);

			require(
					[globalVP+'/saas/Components/default/resources/script/theme_public/js/bottom_section.js'],function(bs){}
			);
		}
);