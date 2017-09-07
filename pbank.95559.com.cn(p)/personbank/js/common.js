$.ajaxSetup({
	cache:false,
	beforeSend: function(xhr,config){
		if(config && config.dataType=="json"){
			xhr.setRequestHeader("Accept","text/javascript;charset=utf-8");
			xhr.setRequestHeader("If-Modified-Since","0");
			xhr.setRequestHeader("Cache-Control","no-cache,must-revalidate");
		}
	}
});


$.extend(Util,{
	based:true,
	isDialog:false,
	cache:{menu:{}},
	safeInput:{},
	radio:{},
	tabs:{},
	safeInit:[],
	authCheck:[],
	cardInfo:{},
	dialogMask:null,
	tooltip:{
		open:function(event,data){
			var tooltip = data.tooltip;
			var needmask = Util.mask!=false;
			if(needmask){
				var mask=$(this).data("mask");
				if(!mask){
					var url=Util.getFullPath("html/blank.html");
					mask=$("<iframe  src='"+url+"' style='position:absolute;' frameborder='0'></iframe>");
					$("body").append(mask);
					$(this).data("mask",mask);
				}
				mask.show();
				mask.offset(tooltip.offset());
				mask.height(tooltip.height());
				mask.width(tooltip.width());
				$(tooltip).mouseover(function(){
					tooltip.hide();
					mask.hide();
				});
			}
		},
		close:function(){
			var mask=$(this).data("mask");
			if(mask){
				mask.hide();
			}
		},
		position:{
			my:"center bottom-20",
			at:"center top",
			using:function(position,feedback){
					$(this).css(position);
					$("<div>").addClass("b4")
						.prependTo(this);
					$("<div>").addClass("b3")
						.prependTo(this);
					$("<div>").addClass("b2")
						.prependTo(this);
					$("<div>").addClass("b1")
						.prependTo(this);
					$("<div>").addClass("b5")
						.appendTo(this);
					$("<div>").addClass("b6")
						.appendTo(this);
					$("<div>").addClass("b7")
						.appendTo(this);
					$("<div>").addClass("b8")
						.appendTo(this);
					$("<div>")
					.addClass("arrow")
					.addClass(feedback.vertical)
					.addClass(feedback.horizontal)
					.appendTo(this);
				}
		},
		tooltipClass:"tooltip-type-1"
	},
	hasParent:function(){
		try{
			return window.parent &&  window.parent.document && window.parent.window!=window;
		}catch(e){
			return false;
		}
	},
	getParent:function(){
		if(Util.hasParent()){
			return parent;
		}else{
			return window;
		}
	},
	getUser:function(){
		if(Util.hasParent()){
			return Util.getParent().Util.getUser();
		}else{
			return user;
		}
	},
	isLowIE:function(){
		return $.browser.msie && ($.browser.version=="6.0" || $.browser.version=="7.0");
	},
	isIE:function(){
		if(!!window.ActiveXObject || "ActiveXObject" in window){
		      return true;
		    }else{
		      return false;
		   }
	},
	/**
	 * 判断是否是64位操作系统
	 * @returns {Boolean} true-是 false-否
	 */
	is64:function(){
		var platform=navigator.platform;
		return platform.indexOf("Win64")>-1;
	},
	/**
	 * 判断是否是64为浏览器
	 * @returns {Boolean} true-是 false-否
	 */
	isIE64:function(){
		var ua=navigator.userAgent;
		var platform=navigator.platform;
		return platform.indexOf("Win64")>-1 && ua.indexOf("WOW64")==-1; 
	},
	/**
	 * 判断是否是32位浏览器运行在64位操作系统上
	 * @returns {Boolean} true-是 false-否
	 */
	isWOW64:function(){
		var ua=navigator.userAgent;
		return ua.indexOf("WOW64")>-1; 
	},
	isIEWin10:function(){
		try{
			var ua=navigator.userAgent;
			var isWin10 = ua.indexOf("Windows NT 10.0")>-1;
			return Util.isIE() && isWin10;
		}catch(e){
			return false;
		}
	},
	getSpecialOCX: function(ocx){
		var codebase = " codebase=" + ocx;
		if((ocx != null
				&& ocx.indexOf("Bocomx32New.cab") > -1 
				&& navigator.userAgent == "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)") ||
				navigator.userAgent.indexOf("Windows NT 5.1") > -1 || navigator.userAgent.indexOf("Windows XP") > -1){
			return "";
		}
		
		return codebase;
	},
	/**
	 * 判断是否为MacOS上运行safari
	 */
	isMacOSRequest:function() {
		var ua=navigator.userAgent;
		var platform=navigator.platform;
		return ua.indexOf("Safari") > -1 && ua.indexOf("Chrome") == -1 && platform.indexOf("Mac") > -1;
	},
	/**
	 * 获取输入文字或字符的长度
	 * @param {String} value
	 * @return {int} 
	 */
	getLength:function(value){
	 	var len = 0;
	 	for(i=0;i<value.length;i++){
	     var c = value.substr(i,1);
	     var ts = escape(c);
	     if(ts.substring(0,2) == "%u") {
	      len+=2;
	     } else {
	      len+=1;
	     }
	   }
	   return len;
	},
	/**
	 * 是否为money
	 * @param amt 输入金额
	 * @returns true-合法 false-非法
	 */
	isMoney:function(amt){
		var regex = /^(([1-9]\d*)|0)(\.\d{1,2})?$/;
		return regex.test(amt);
	},
	addCookie:function(name,value,day){
		var date = new Date();
		if(day){
			date.setTime(date.getTime() + (day*24*60*60*1000));
		}else{
			date.setTime(date.getTime() + (30*24*60*60*1000));
		}
		document.cookie = name+"="+value+ ";expires=" + date.toGMTString()+";path=/";
	},
	getCookie:function(name){
		var aCookie = document.cookie.split("; ");
		for (var i=0; i < aCookie.length; i++){
			var aCrumb = aCookie[i].split("=");
			if (name == aCrumb[0]){
				return unescape(aCrumb[1]);
			}
		}
		return null;
	},
	autoHeight:function(){
		if(Util.hasParent() && parent.isPebs && $(document.body).width()>300){
			parent.Util.setMainHeight(0);
			$("iframe").not(".paperOil").load(function(evnet){
				var height = Math.max(this.contentWindow.document.body.scrollHeight,
						this.contentWindow.document.documentElement.scrollHeight);
				$(this).height(height);
			});
			var oldHeight=0;
			setInterval(function(){
				var height=Math.max($(document.body).height(),document.body.scrollHeight);
				if(Math.abs(oldHeight-height)>0){
					parent.Util.setMainHeight(height);
					oldHeight=height;
				}
			}, 500);
			$(document.body).css("overflow-y","hidden");
		}
	},
	/**
	 * 是否为price
	 * 
	 * @param param
	 * 
	 * @returns true-合法 false-非法
	 */
	isPrice:function(param) {
		if(param=='0'){
			return true;
		}
		if ((isNaN(param)) || (parseFloat(param) < 0) || (param.indexOf('.') == 0) || (param.lastIndexOf('.') == param.length - 1)) {
			return false;
		}
		//小数点后最多只允许保留五位有效数字	

		var docIndex =  $.trim(param).lastIndexOf('.');
		if ((docIndex < parseInt( $.trim(param).length) - 5) && (docIndex >= 0)) {

			return false;
		}
		if (param.charAt(0)=="0" )
		{		  	  	
	  		if (!(param.charAt(1)=="."))
	  		{	  	
				return false;
			}						
		}
		return true;
	},
	/**
	 * 是否为Rate
	 * 
	 * @param rate
	 * 
	 * @returns true-合法 false-非法
	 */
	isExRate:function(rate) {
		if (rate == "")
			return false;
		for (var j = 0; j < rate.length; j++) {
			if (isNaN(parseInt(rate.charAt(j), 10)) && rate.charAt(j) != ".") {
				return false;
			}
		}
		if(rate.indexOf(".")!=rate.lastIndexOf(".") || rate.lastIndexOf(".")==rate.length-1){
			return false;
		}
		if(rate.indexOf(".")!=-1 && rate.substring(rate.indexOf(".")+1).length>4)//小数点后面只能有四位
		{
			return false;
		}
		if((rate * 1 <=0)||(rate * 1 >= 100000))    //汇率必须大于0 汇率必须小于100000.
			return false;
		if (rate.charAt(0)=="0" )
		{		  	  	
		  	if (!(rate.charAt(1)=="."))
		  	{	  	
					return false;
			}						
		}
		return true;
	},
	/**
	 * 选中某个数据域
	 * @param dom id值
	 */
	makeFocus:function(dom){
		$("#"+dom).focus();
		$("#"+dom).select();
	},
	/**
	 * 检查变量是否是整数
	 * @param val 
	 * @returns true-是整数 false-不是整数
	 */
	isInteger:function(val){
		var regex=/^[0-9]+$/;
		return (regex.test(val));
	},
	/**
	 * 是否为合法的手机事情
	 * @param val 检测的值
	 * @returns true-合法 false-非法
	 */
	isMobile:function(val){
		var regex=/^[0-9]{11}$/;
		return(regex.test(val));
	},
	/**
	 * 短信验证码是否正确
	 * @param val 检测的值
	 * @returns true-合法 false-非法
	 */
	
	isMobileCode:function(val){
		var regx = /^[0-9a-zA-Z]{6}$/;
		return(regx.test(val));
	},
	
	
	
	/**
	 * 是否为合法的邮箱
	 * @param val 检测的值
	 * @returns true-合法 false-非法
	 */
	isEmail:function(val) {
		var bValidate = RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(val);
		
		if ( bValidate )
		{
			return true;
		}
		else
			return false;
	},
	/**
	 * 检查输入中是否有引起HTML页面展示混乱的内容
	 * @param v 检测的值
	 * @returns {Boolean} true-合法 false-非法
	 */
	checkToHTML:function(v){
		if(v.indexOf("'")>-1||v.indexOf("|")>-1||v.indexOf("\\")>-1||v.indexOf("<")>-1||v.indexOf(">")>-1||v.indexOf("\"")>-1||v.indexOf("#")>-1){
			return false;
		}
		return true;
	},
	/**
	 * 检查文本是否包含非法字符
	 * @param textTemp 文本
	 * @returns {Boolean} false-非法,true-合法
	 */
	checkText:function(textTemp){
		var rExp = RegExp(/[^\x00-\xff]/);
		var textval = $.trim(textTemp);
		for(var i=0;i<textval.length;i++){
			var textsingle = textval.charAt(i);
			if(!rExp.test(textsingle)){
				var flag = textsingle.search(/[^a-zA-Z0-9\.\,\-\_\(\)\/\=\+\?\!\*\;\@\#\· ]/);
				if(flag >= 0 ){
					return false;
				}
			}
		}
		return true;
	},
	/**
	 * 将金额格式化为#.00形式
	 * @param fixMoney
	 * @returns
	 */
	formatInMoney:function(fixMoney){
		if(!fixMoney){
			return '';
		}
		fixMoney =$.trim(''+fixMoney);
		if(fixMoney==''){
			return fixMoney;
		}
		var index =fixMoney.indexOf(".");
		if(index<0){
			fixMoney=fixMoney+".00";
		}else{
			fixMoney=fixMoney+"00";
			fixMoney=fixMoney.substr(0,index+3);
		}
		return fixMoney;
	},
	/**
	 * 将金额格式化为#.0000形式
	 * @param fixMoney
	 * @returns
	 */
	formatMoney:function(fixMoney){
		if(!fixMoney){
			return '';
		}
		fixMoney =$.trim(''+fixMoney);
		if(fixMoney==''){
			return fixMoney;
		}
		var index =fixMoney.indexOf(".");
		if(index<0){
			fixMoney=fixMoney+".0000";
		}else{
			fixMoney=fixMoney+"0000";
			fixMoney=fixMoney.substr(0,index+5);
		}
		return fixMoney;
	},
	/**
	 * 将金额格式化为指定币种的金额格式日元为#,其他币种为#.00形式
	 * @param fixMoney
	 * @param currType
	 * @returns
	 */
	formatInCurrTypeMoney:function(fixMoney,currType){
		fixMoney =$.trim(''+fixMoney);
		var index =fixMoney.indexOf(".");
		if(currType=='JPY'){
			if(index<0){
			}else{
				fixMoney=fixMoney.substring(0,index);
			}
		}else{
			if(index<0){
				fixMoney=fixMoney+".00";
			}else{
				fixMoney=fixMoney+"00";
				fixMoney=fixMoney.substring(0,index+3);
			}
		}
		return fixMoney;
	},
	/**
	 * 金额处理
	 * @param obj输入框
	 * @returns 格式化后的金额值
	 */
	getMoney:function(obj,currType){
		obj.val($.trim(obj.val()));
		var money=obj.val();
		if(!Util.isMoney(money)){
			money="";
		}else{
			money=Util.formatInCurrTypeMoney(money,currType);
		}
		obj.val(money);
		return money;
	},
	/**
     * ###,###.00
     */
    showFormatMoney:function(fixMoney){
    	if(isNaN(fixMoney)||fixMoney==""){
        	return "0.00";
    	}
    	fixMoney=Math.round(fixMoney*100)/100;
        if(fixMoney<0){
        	return '-'+outputDollars(Math.floor(Math.abs(fixMoney)-0)+'')+outputCents(Math.abs(fixMoney)-0);
        }else{
        	return outputDollars(Math.floor(fixMoney-0)+'')+outputCents(fixMoney-0);
        }
        function outputDollars(fixMoney){
        	if(fixMoney.length<=3){
                return (fixMoney==''?'0.00':fixMoney);
            }else{
                var mod=fixMoney.length%3;
                var output=(mod==0?'':(fixMoney.substring(0,mod)));
                for(var i=0;i<Math.floor(fixMoney.length/3);i++){
                    if((mod==0)&&(i==0)){
                    	output+=fixMoney.substring(mod+3*i,mod+3*i+3);
                    }else{
                    	output+=','+fixMoney.substring(mod+3*i,mod+3*i+3);
                	}
                }
            	return output;
         	}
        };
        function outputCents(fixMoney){
                fixMoney=Math.floor(((fixMoney)-Math.floor(fixMoney))*100);
                return (fixMoney<10?'.0'+fixMoney:'.'+fixMoney);
        };
    },
    
	/**
	 * 根据证件号码获取地区代码
	 * @param certType,certNo
	 * @returns areaCode
	 */
	getAreaCodeFromCertNo:function(certType,certNo){
		var areaCode="";
		var areaCodeTmp="";
		if("15"==certType){
			areaCodeTmp= certNo.substring(0,4);//通过证件号码的前两位来获取地区代码
		}
		if("15"==certType && "4403"==areaCodeTmp){
			areaCode =areaCodeTmp+"00";
		}else if("15"==certType && !("4403"==areaCodeTmp)){
			areaCode =areaCodeTmp.substring(0,2)+"0000";
		}else if(!("15"==certType)){
			areaCode = "310000";
		}
		return areaCode;
	},
	/**
	 * 处理国际化文件中有文本要填充的情况<br>
	 * 匹配正则表达式:<code>/\#\[[^\]]+\]/g</code><br>
	 * @param text 待处理文本
	 * @param data 待填充的值对象 例:{'bankNo':val1;'bankName':val2}
	 * @return 处理后的字符串
	 */
	dealMessage:function(text,data){
		var regExg=/\#\[[^\]]+\]/g;//全局
		var regEx=/\#\[[^\]]+\]/;
		var mArr=text.match(regExg);
		for(var i=0;mArr!==undefined&&mArr!=null&&i<mArr.length;i++){
			var key=mArr[i].substring(2,mArr[i].length-1);
			text=text.replace(regEx,data[key]);
		}
		return text;
	},
	/**
	 * 获取系统时间
	 * @returns {Date} 当前服务端系统时间
	 */
	getServerDate:function(){
		var trueDate=new Date(parseFloat(Util.time));
		return trueDate;
	},
	getFullPath:function(url,ignore){
		if(url.indexOf('http://')==0 || url.indexOf('https://')==0 ){
			return url;
		}
		var str=Util.contextPath+url;
		//静态页面，html，不添加其他参数
		if(url.indexOf(".html") > -1){
			return str;
		}
		if(str.indexOf('?')>-1){
			str=str+"&PSessionId="+Util.sessionId;
		}else{
			str=str+"?PSessionId="+Util.sessionId;
		}
		str=str+"&x-channel="+Util.channel;
		if(ignore!=false){
			str=str+"&menuCode="+Util.menuCode;
		}
		return str;
	},
	getPaFullPath:function(url,ignore){
		var str=Util.contextPath+url;
		if(str.indexOf('?')>-1){
			str=str+"&PSessionId="+Util.sessionId;
		}else{
			str=str+"?PSessionId="+Util.sessionId;
		}
		str=str+"&x-channel=4";
		return str;
	},
	/**
	 * 设置主交易区高度
	 */
	setMainHeight:function(height){
		if(!height){
			if(Util.isLowIE()){
				height=document.body.scrollHeight;
			}else{
				height=$(document.body).height();
			}
		}
		if(height && Util.hasParent()){
			parent.Util.setMainHeight(height);
			return height;
		}
	},
	toHome:function(){
		if(Util.hasParent() && parent.toHome){
			parent.toHome();
		}
	},
	/**
	 * 获取所有一级菜单
	 * @returns {Array} 一级菜单集合
	 */
	menus:function(){
		if(Util.hasParent()){
			return Util.getParent().Util.menus();
		}else{
			return {};
		}
	},
	localeMenu:function(menu){
		if(!Util.locale || Util.locale.indexOf("zh")>-1){
			return true;
		}else{
			var ctrl = menu.ctrl;
			if(ctrl && ctrl.charAt(0)=='1'){
				return true;
			}else{
				return false;
			}
		}
	},
	/**
	 * 根据菜单码找菜单实体
	 * @param menuCode 菜单码
	 * @param menus[非必输] 默认所有一级菜单
	 * @returns 菜单实体
	 */
	getMenu:function(menuCode,menus){
		menus=menus?menus:Util.menus();
		for(var key in menus){
			var menu = menus[key];
			if(menu.appId==menuCode){
				return menu;
			}else{
				var tmp = Util.getMenu(menuCode,menu.lstChildren);
				if(tmp!=null){
					return tmp;
				}
				
			}
		}
		return null;
	},
	/**
	 * 获取全路径
	 * @param menuCode 菜单码
	 * @returns 菜单路径字符串
	 */
	getMenuPath:function(menuCode,auto){
		var tmp=Util.getMenu(menuCode);
		var path=[];
		path[0]='<a class="red">'+tmp.localeName+'</a>';
		while(tmp.parentCode){
			tmp=Util.getMenu(tmp.parentCode);
			if(tmp!=null){
				path[path.length]='<a menu="'+tmp.appId+'">'+tmp.localeName+'</a>';
			}else{
				break;
			}
		}
		if(auto!=false){
			path[path.length-1]='<b>'+Util.Message.tip.position+'：</b>'+path[path.length-1];
		}
		return path.reverse().join("--");
	},
	/**
	 * 菜单跳转
	 * @param menuCode 要跳转到的菜单码
	 * @param args 菜单参数
	 */
	changeMenu:function(menuCode,args,autoSubmit,render){
		if(Util.hasParent()){
			Util.getParent().Util.changeMenu(menuCode,args,autoSubmit,render);
		}
	},
	/**
	 * 以弹出方式打开一个菜单，支持显示标签页
	 */
	openMenuDialog:function(menuCode,args){
		if(Util.hasParent()){
			Util.getParent().Util.openMenuDialog(menuCode,args);
			return;
		}
		var menu = Util.getMenu(menuCode);
		var tab = args.tab;
		var cardNo = args.cardNo;
		var targetMenu = menu;
		var frame = $('<iframe src="'+Util.contextPath+'html/blank.html" '
						+'style="width:100%;height:410px" frameborder="0" style="position:absolute;" >');
		var container=$("<div>");
		var checkMenuRole=function(menu,args){
			var bsn = Util.getBsnInfo(user,menu);
			var cardNo = args.cardNo;
			if(!bsn || bsn.state!="0"){
				Util.close();
				showLogin(menu.appId,args,Util.openMenuDialog);
				return 1;
			}
			if(!cardNo && bsn.cardType!=null){
				Util.error(Util.message.tip.cardNo);
				return 1;
			}
			return 0;
		}
		var openInDialog=function(user,item,args){
			if(checkMenuRole(item,args)!=0){
				return;
			}
			var bsn = Util.getBsnInfo(user,item);
			var url = bsn.url;
			if(!url){
				return;
			}
			if(url.substr(0,11)=="javascript:"){
				return;
			}else{
				var fullUrl=Util.getFullPath(url);
				fullUrl=fullUrl+"&"+$.param(args);
				frame.attr("src",fullUrl);
			}
		}
		if(checkMenuRole(targetMenu,args)!=0){
			return;
		}
		var tabContainer = $("<div id='tab-title' class='ui-dialog-title'></div>");
		var dialogSettings={width:900,height:500,dialogClass:"ui-dialog-buttons"};
		if(menu.leaf=="1" && menu.lstChildren && menu.lstChildren.length>0){
			if(isNaN(tab)){
				tab=0;
			}
			targetMenu = menu.lstChildren[tab];
			if(checkMenuRole(targetMenu,args)!=0){
				return;
			}
			Util.buildTab(tabContainer,menu.lstChildren,"localeName",function(index,item,args){
				args.tab=index;
				openInDialog(user,item,args);
			});
			Util.tab(tabContainer,tab,args);
			tabContainer.find(".query-from-main").css("margin-top","3px");
			dialogSettings.open=function(){
				if(Util.isLowIE()){
					var closeBtn = $(this).dialog("widget").find(".ui-dialog-titlebar-close");
					closeBtn.hide();
					closeBtn.show();
				}
				$(this).dialog("widget").find(".ui-dialog-title").empty().append(tabContainer);
				$(this).dialog("widget").append('<div class="ui-dialog-buttonpane">');
			}
		}else{
			dialogSettings.title=targetMenu.localeName;
			openInDialog(user,targetMenu,args);
		}
		container.append(frame);
		var dialog = Util.dialog(container,dialogSettings);
	},
	/**
	 * 创建一个标签页
	 * @param exp        创建父容器jQuery选择器id
	 * @param items      标签对象
	 * @param key         标签对象用于显示的键
	 * @param callBack  选中后的回调函数
	 */
	buildTab:function(exp,items,key,callBack,tabIndex){
		var container=$(exp);
		var html=['<div class="query-from-main"  id="'+container.attr("id")+'_tab"><ul>'];
		for(var i=0;i<items.length;i++){
			var item=items[i];
			html[html.length]='<li><a  href="#tabs-pannel" class="tab"  >';
			html[html.length]=item[key];
			html[html.length]='</a></li>';
		}
		html[html.length]='</ul><span id="tabs-pannel" style="display:none;"></span></div>';
		var dom=$(html.join(""));
		container.empty();
		container.append(dom);
		var config = {
			active:false,
			collapsible:true,
			activate:function(event,ui){
				var index=$(this).tabs("option","active");
				if(callBack){
					var ret= callBack.call(this,index,items[index],$(this).data("args"));
					return ret;
				}
			}
		};
		var jtab=$(dom).tabs(config);
	},
	/**
	 * 激活一个标签页，并传递参数
	 * @param exp      父容器选择器，与创建时一致
	 * @param index   要激活的标签页索引，从0开始
	 * @param args     需要传递的参数
	 */
	tab:function(exp,index,args){
		var dom = $(exp).find(":ui-tabs");
		if(index!=undefined && !isNaN(index)){
			dom.data("args",args);
			dom.tabs({active:index});
			dom.tabs({collapsible:false});
		}
	},
	StringBuffer:function(){
		var data = [];
		return {
			append:function(str){
				data[data.length]=str;
				return this;
			},
			toString:function(){
				return data.join("");
			}
		};
		
	},
	/**
	 * 获取主框架页
	 */
	getMain:function(){
		if(Util.hasParent()){
			return parent.Util.getMain();
		}else{
			return window;
		}
	},
	/**
	 * 显示一个对话框
	 * @param expr         jquery表达式或新建内容ID
	 * @param config      打开参数
	 * @returns
	 */
	dialog:function(exp,settings){
		/** 有父节点调用父节点 **/
		try{
			if(Util.hasParent()){
				if(!settings.opener){settings.opener=window;}
				var dialog = Util.getParent().Util.dialog(exp,settings);
				return dialog;
			}
		}catch(e){
			return;
			
		}
		var opener=settings.opener?settings.opener:window;
		var mask = Util.dialogMask;
		if(mask==null){
			mask = $('<iframe src="'+Util.getFullPath('html/blank.html')+'" style="display:none;position:absolute;top:0px;left:0px;width:100%;background:#fff">'
					+'</iframe>');
			$(document.body).append(mask);
		}
		var _dom=$(exp);
		var openHanlder = function(){
			var height = Math.max($(document.body).height(),$(window).height());
			$(".ui-widget-overlay").css({
				"position":"absolute",
				"height":height
			});
			// 修正z-index
			var maxZIndex = function(){
				var index = 101;
				$(".ui-dialog").each(function(i,o){
					var oZIndex = $(o).css('z-index');
					index = Math.max((oZIndex ? oZIndex : 101), index);
				});
				return index;
			}();
			var uiDialog = $(this).dialog("widget");
			uiDialog.css('z-index',maxZIndex+3);
			uiDialog.prev(".ui-widget-overlay").css('z-index',maxZIndex+2);
			mask.css('z-index',maxZIndex+1);
			if(Util.isLowIE()){
				var closeBtn = $(this).dialog("widget").find(".ui-dialog-titlebar-close");
				closeBtn.hide();
				closeBtn.show();
			}
			mask.height(height);
			mask.css({opacity:0.1});
			mask.show();
			Util.fireEvent("showActiveObject",false);
		};
		var  config={
			minHeight:130,
			minWidth:400,
			opener:window,
			draggable:true,
			modal:true,
			open:openHanlder,
			close:function(){
				Util.fireEvent("showActiveObject",true);
				var iframes = $(this).dialog("widget").find("iframe");
				iframes.attr("src",Util.getFullPath("html/blank.html"));
				mask.hide();
			},
			resizable:false
		};
		if(settings.buttons == undefined){
			config.open=function(){
				openHanlder.call(this);
				$(this).dialog("widget").append('<div class="ui-dialog-buttonpane"></div>');
			}
		}
		$.extend(config,settings);
		var buttons = config.buttons;
		if(buttons){
			var newButtons={};
			for(var key in buttons){
				(function(index){
					newButtons[index]=function(){
						var scope=$(this);
						var delegate=$(_dom);
						delegate.dialog=function(){
							scope.dialog.apply(scope,arguments);
						};
						var close = buttons[index].apply(delegate,arguments);
						if(close!=false){
							delegate.dialog("close");
						}
					};
				})(key);
			}
			config.buttons=newButtons;
		}else{
			_dom.after('');
		}
		var dialog= _dom.dialog(config);
		_dom.find("iframe").each(function(index,item){
			item.contentWindow.opener=config.opener;
		});
		return dialog;
	},
	/**
	 * 提供一个模态对话框显示
	 * @param expr jQuery表达式
	 * @param height 最小高度
	 * @param width  最小宽度
	 * @param buttons  按钮 ["label":function(){}]
	 */
	show:function(expr,height,width,buttons){
		var options={modal:true};
		if(height){options.minHeight=height;};
		if(width){options.minWidth=width;}else{options.minWidth=600;};
		if(buttons){
			options.buttons=buttons;
		}else{
			options.dialogClass="formtalbe";
		}
		
		return Util.dialog(expr, options);
	},
	/**
	 * 提供一个模态对话框显示
	 * @param url 要打开的地址
	 * @param width  最小宽度
	 * @param height 最小高度
	 * @param title  标题
	 */
	showWin:function(url,width,height,title){
		try{
			if(Util.hasParent()){
				Util.getParent().showWin(url,width,height,title);
				return;
			}
		}catch(e){
			
		}
		var settings={};
		settings.dialogClass="customer-win";
		var obj = $("#winTemplate");
		var iframe = obj.find("iframe");
		var titleBar = obj.find(".win-title");
		if(title){
			titleBar.html(title);
		}else{
			titleBar.html("");
		}
		if(height){
			settings.height=height+75;
			obj.height(height);
			iframe.height(height);
		}else{
			settings.height=275;
			iframe.height(200);
		}
		if(width){
			obj.find(".hiden-right").width(width-13);
			settings.minWidth=width;
		}else{
			obj.find(".hiden-right").width(787);
			settings.minWidth=800;
		}
		settings.buttons=[];
		settings.open = function(){
			var iframe = $(this).dialog("widget").find("iframe");
			iframe.attr("src",url);
		};
		Util.dialog(obj,settings);
	},
	/**
	 * 打开一个模态窗口
	 * @param options 传参对象{}包括以下内容
	 * url 路径地址 (String)
	 * title 标题，非必输 (String)
	 * height iframe高度，非必输,默认为850(Number)
	 * width  Number iframe宽度,非必输,默认为450(Number)
	 * params 参数，非必输 {cardNo:"${cardNo.UUID}"}
	 * buttons 显示的按钮{'ok':function(){}}
	 * minHeight dialog的最小显示高度,非必输(Number)
	 * minWidth dialog的最小显示宽度,非必输，默认为width+40(Number)
	 */
	open:function(options){
		if(!options){
			return;
		}
		var url=options.url;
		var title=options.title;
		var width=options.width?options.width:850;
		var height=options.height?options.height:450;
		var params=options.params?options.params:{};
		var minWidth=options.minWidth?options.minWidth:width+40;
	    var fullURL= Util.getFullPath(url);
	    var split="?";
		if(fullURL.indexOf('?')>-1){
			split="&";
		}
		fullURL=fullURL+split+$.param(params);
	    var expr='<div ';
	    if(title){
	    	expr+='title="'+title+'"';
	    }
	    expr+='><div class="messsage-detail"><iframe style="width:100%;height:'+height+'px" src="'+fullURL+'" frameborder="0" allowTransparency="true" scrolling="yes"></iframe></div>';
	    expr+='</div>';
	    return Util.show(expr,options.minHeight,minWidth,options.buttons);
	},
	/**
	 *用于客户端及Web页面打开一个窗口(绝对路径地址)
	 *	替换window.open()
	 * @param options 传参对象{}包括以下内容
	 * url 绝对路径地址 (String)
	 * title 标题，必输 (String)
	 * params 窗口特征(String) 无值时,使用:width=800,height=450,left=(screen.width-800)/2,top=(screen.height-450)/2,scrollbars=1,resizable=1
	 */
	openIE:function(options){		
		if(!options){
			return;
		}
		var url=options.url;
		var title=options.title;
		var params=options.params;
	    if(window.openex){
	    	return window.openex(url,'0');
	    }else{
	        if(params){
	        	 return window.open(url,title,params);
	        }else{
	        	var _width=800;
	        	var _height=450;
	        	var _left=(screen.width-_width)/2;
	        	var _top=(screen.height-_height)/2;
	        	var _win=window.open(url,title,"width="+_width+",height="+_height+",left="+_left+",top="+_top+",scrollbars=1,resizable=1");
	        	return _win;
	        }
	     }
	},
	/**
	 * 关闭所有对话框
	 */
	close:function(){
		if(Util.hasParent()){
			var scope = Util.getMain();
			scope.Util.close();
		}
		$(":ui-dialog").dialog("close");
		//$(".ui-dialog").remove();
		//$(".ui-widget-overlay").remove();
	},
	/**
	 * 提供confirm弹框；默认提供取消事件和确认事件，可自己传入<br>
	 * @param data 定义传入对象：<br>
	 * 可包括content：提醒文本（不传入则使用默认文本：是否确定删除该记录？），<br>
	 * confEvent：确认事件，<br>
	 * cancelEvent：取消事件,<br>
	 * options:对话框扩展属性<br>
	 * 示例：var data={content:'是否删除？',confEvent:function(){},cancelEvent:function(){},options:{}}
	 * @return 当前jquery-ui-dialog对象
	 */
	confirm:function(data){
		var content=Util.Message.tip.confirmMsg;
		if(data&&data.content){
			content=data.content;
		}
		var buffer=new Util.StringBuffer();
		buffer.append("<div><div class='dialog_img'><i class='icon_error_alert'></i></div>")
				.append("<div class='dialog_msg'><p align='center'>").append(content).append("</p></div></div>");
		var _options={autoOpen:false,modal:true,closeBtn:true,minWidth:382,minHeight:215,dialogClass:"no_title"};
		if(data&&data.options){
			//扩展对话框扩展属性
			$.extend(_options,data.options);
		}
		if(!(data&&data.options&&data.options.buttons)){
			_options.buttons=[];
		}
		var _dialog=Util.dialog(buffer.toString(),_options);
		//如果没有定义按钮，则使用默认按钮，注意自定义按钮形式为：{'ok':function(){return false;//不关闭dialog},'cancel':function(){return false;//不关闭dialog}}
		if(!(data&&data.options&&data.options.buttons)){
			_options.buttons = [
			                    {text:Util.Message.button.ok,click:function(){
			                    	var _close=true;
			                    	if(data&&data.confEvent){
			                    		_close=data.confEvent();
			                    	}
			                    	if(_close!=false){
			                    		_dialog.dialog('close');
			                    	}
			                    }},
			                    {text:Util.Message.button.cancel,Class:"default-but",click:function(){
			                    	var _close=true;
			                    	if(data&&data.cancelEvent){
			                    		_close=data.cancelEvent();
			                    	}
			                    	if(_close!=false){
			                    		_dialog.dialog('close');
			                    	}
			                    }}
			                    ];
			_dialog.dialog(_options);
		}
		_dialog.dialog("open");
		return _dialog;
	},
	/**
	 * 设置安全控件等是否显示
	 */
	showObject:function(flag){
		if(flag){
			$('object').css('visibility','visible');
			$('embed').css('visibility','visible');
		}else{
			$('object').css('visibility','hidden');
			$('embed').css('visibility','hidden');
		}
		
	},
	/**
	 * 提供一个错误提示对话框
	 * @param text 错误提示内容
	 * @param callBack 用户点击确定后执行的参数，若返回false则不关闭对话框
	 */
	error:function(text,callBack){
		
		var options={modal:true,minWidth:350,resizable:false};
		var buffer = new Util.StringBuffer();
		buffer.append('<div title="'+Util.Message.tip.error+'"><div class="dialog_img"><i class="icon_error_alert"></i></div>')
				 .append('<div class="dialog_msg"><p align="center">').append(text).append("</p></div></div>");
		
		if(!callBack || $.isFunction(callBack)){
			options.buttons = {};
			options.buttons[Util.Message.button.ok]=function(){
				var close = true;
				if(callBack){
					close=callBack.call(this);
				}
				return close;
			};
		}else{
			options.buttons=callBack;
		}
		return Util.dialog(buffer.toString(), options);
	},
	/**
	 * 提供一个错误提示对话框
	 * @param text 错误提示内容
	 * @param callBack 用户点击确定后执行的参数，若返回false则不关闭对话框
	 */
	warmTips:function(text,callBack){
		var options={modal:true,minWidth:350,resizable:false};
		var buffer = new Util.StringBuffer();
		buffer.append('<div title="'+Util.Message.tip.warmTips+'"><div class="dialog_img"><i class="icon_error_alert"></i></div>')
				 .append('<div class="dialog_msg"><p align="center">').append(text).append("</p></div></div>");
		
		if(!callBack || $.isFunction(callBack)){
			options.buttons = {};
			options.buttons[Util.Message.button.ok]=function(){
				var close = true;
				if(callBack){
					close=callBack.call(this);
				}
				return close;
			};
		}else{
			options.buttons=callBack;
		}
		return Util.dialog(buffer.toString(), options);
	},
	/**
	 * 提供一个成功提示对话框
	 * @param text 成功提示内容
	 * @param callBack 用户点击确定后执行的参数，若返回false则不关闭对话框
	 */
	success:function(text,callBack){
		
		var options={modal:true,minWidth:350,resizable:false};
		var buffer = new Util.StringBuffer();
		buffer.append('<div title="'+Util.Message.tip.success+'"><div class="dialog_img"><i class="icon_success_alert"></i></div>')
				 .append('<div class="dialog_msg"><p align="center">').append(text).append("</p></div></div>");
		options.buttons = {};
		options.buttons[Util.Message.button.ok]=function(){
			var close = true;
			if(callBack){
				close=callBack.call(this);
			}
			Util.showObject(true);
			return close;
		};
		Util.showObject(false);
		return Util.dialog(buffer.toString(), options);
	},
	/**
	 * 提供一个对话框
	 * @param text 错误提示内容
	 * @param callBack 用户点击确定后执行的参数，若返回false则不关闭对话框
	 */
	difinDialog:function(title,text,callBack){
		
		var options={modal:true,minWidth:350,minHigth:350,resizable:false};
		var buffer = new Util.StringBuffer();
		buffer.append('<div title="'+title+'"><div class="dialog_msg">').append(text).append('</div>')
				 .append('<div class="dialog_msg"><p align="center"></p></div></div>');
		options.buttons = {};
		options.buttons[Util.Message.button.ok]=function(){
			var close = true;
			if(callBack){
				close=callBack.call(this);
			}
			Util.showObject(true);
			return close;
		};
		Util.showObject(false);
		return Util.dialog(buffer.toString(), options);
	},
	/**
	 * 设置/获取Radio的值
	 * @param id radio的id
	 * @param val 可选，不为空将对象值设置为val
	 * @returns 当前选中的值
	 */
	radio:function(id,val){
		var set=$("#"+id);
		if(val){
			set.children("input[value="+val+"]").attr("checked",true);
			set.buttonset("refresh");
			return val;
		}else{
			var name=set.children("label.ui-state-active").attr("for");
			return set.children("#"+name+"").val();
		}
	},
	/**
	 * ajax通用回调函数
	 * @param data  后台返回结果
	 * @param callBack 成功时调用的方法
	 * @param errBack 失败回调，非必输
	 */
	result:function(data,callBack,errBack){
		var head=data["RSP_HEAD"];
		var success=head["TRAN_SUCCESS"];
		var errorCode=head["ERROR_CODE"];
		var errorMsg=head["ERROR_MESSAGE"];
		if(success=="1"){
			callBack(data["RSP_BODY"]);
		}else{
			if(!errBack || errBack==undefined){
				Util.error(errorCode+":"+errorMsg);
			}else{
				errBack(data);
			}
		}
	},
	
	template:function(id,values){
		var msg = $('#'+id).html();
		return Util.formatStr(msg,values);
	},
	formatStr:function(msg,values){
		var regx = /\{[^\}]+\}/;
		var result= null;
		var varIndex = 0;
		var buffer = new Util.StringBuffer();
		while((result= regx.exec(msg))){
			index = result.index;
			var str=result.toString();
			var varIndex=$.trim(str.substr(1,str.length-2));
			buffer.append(msg.substr(0,index));
			if(values[varIndex]!=undefined){
				buffer.append(values[varIndex]);
			}
			if(msg.length>str.length){
				msg = msg.substr(index+str.length);
			}else{
				index=0;
			}
		}
		return buffer.append(msg).toString();
	},
	/**
	 * 提供消息格式化内容
	 * @param msg 消息内容，待替换位置使用{index}
	 * @param values 替换的数据域值
	 * @returns
	 */
	getMessage:function(msg,values){
		var regx = /\{[^\}]+\}/;
		var result= null;
		var varIndex = 0;
		var buffer = new Util.StringBuffer();
		while((result= regx.exec(msg))){
			index = result.index;
			var str=result.toString();
			var varIndex=parseInt(str.substr(1,str.length-1));
			buffer.append(msg.substr(0,index));
			if(values[varIndex]!=undefined){
				buffer.append(values[varIndex]);
			}
			if(msg.length>str.length){
				msg = msg.substr(index+str.length);
			}else{
				index=0;
			}
		}
		return buffer.append(msg).toString();
	},
	events:{},
	addEvent:function(type,callBack){
		if(Util.hasParent()){
			Util.getMain().Util.addEvent(type,callBack);
		}else{
			var lstEvent=Util.events[type];
			if(lstEvent==undefined){
				lstEvent=[];
				Util.events[type]=lstEvent;
			}
			lstEvent[lstEvent.length]=callBack;
			$(window).unload(function(){
				try{Util.removeEvent(type,callBack);}catch(e){};
			});
		}
	},
	fireEvent:function(type,args,src){
		try{
			src==src?src:window;
			if(Util.hasParent()){
				Util.getMain().Util.fireEvent(type,args,src);
			}else{
				var lstEvent=Util.events[type];
				for(var i=lstEvent.length-1;i>-1;i--){
					var callBack=lstEvent[i];
					try{
						var next = callBack.call(src,args);
						if(next==false){
							break;
						}
					}catch(e){
					}
				}
			}
		}catch(e){
			
		}
	},
	removeEvent:function(type,callBack){
		if(Util.hasParent()){
			Util.getMain().Util.removeEvent(type,callBack);
		}else{
			var lstEvent=Util.events[type];
			for(var i=0;i<lstEvent.length;i++){
				if(lstEvent[i]==callBack){
					try{lstEvent.splice(i,1);}catch(e){};
				}
			}
		}
	},
	/**
	 * 以4位分割的形式展示卡号
	 * @param cardNo
	 */
	cardNoShow:function(cardNo,split){
		var tmpCardNo=" ";
		if(!split){split=" ";}
		if(!cardNo || !cardNo.length){
			return cardNo;
		}
		var times=0;
		while(cardNo.length>4 && times<4){
			tmpCardNo=tmpCardNo+cardNo.substring(0,4)+split;
			cardNo=cardNo.substring(4);
			times++;
		}
		tmpCardNo=tmpCardNo+cardNo;
		return tmpCardNo;
	},
	/**
	 * 以3+4+4位分割的形式展示手机号
	 * @param cardNo
	 */
	phoneNoShow:function(phoneNo,split){
		var tmpPhoneNo="";
		if(!split){split=" ";}
		if(!phoneNo || !phoneNo.length){
			return phoneNo;
		}
		var times=[3, 4, 4];
		var index = 0;
		var len = times[index];
		while(phoneNo.length > len && index < 3){
			tmpPhoneNo=tmpPhoneNo+phoneNo.substring(0,len)+split;
			phoneNo=phoneNo.substring(len);
			len = times[++index];
		}
		tmpPhoneNo=tmpPhoneNo+phoneNo;
		return tmpPhoneNo;
	},
	/**
	 * 将小写金额转换为大写金额
	 * @param amt 小写金额
	 */
	bigcashShow:(function(amt){
		if(amt == ""){
			return "";
		}
		var aNum = ["%u96F6","%u58F9","%u8d30","%u53c1","%u8086","%u4F0D","%u9646","%u67D2","%u634C","%u7396"];
		var HUNDREDMILLION = 0;
		var TENTHOUSAND = 1;
		var THOUSAND = 2;
		var HUNDRED = 3;
		var TEN = 4;
		var YUAN = 5;
		var JIAO = 6;
		var CENT = 7;
		var ZHENG = 8;
		var aUnit = new Array(9);
		aUnit[HUNDREDMILLION] = "%u4EBF";	//亿
		aUnit[TENTHOUSAND] = "%u4E07";		//万
		aUnit[THOUSAND] = "%u4EDF";			//仟
		aUnit[HUNDRED] = "%u4F70";			//佰
		aUnit[TEN] = "%u62FE";				//拾
		aUnit[YUAN] = "%u5143";				//元
		aUnit[JIAO] = "%u89D2";				//角
		aUnit[CENT] = "%u5206";				//分
		aUnit[ZHENG] = "%u6574";			//整
		
		function filterCharacter( filterString, filterChar ){
			if( filterString == null || filterString.length == 0 ){
				return null;
			}
			var i = 0;	
			for( ; i < filterString.length; i++ ){
				if( filterString.charAt( i ) != filterChar )
					break;
			}
			var ret = filterString.substring( i, filterString.length );
			ret = (ret.length > 0) ? ret : null;
			return ret;	
		}
		function convertIntegerToChineseCash( cash ){
			var tempCash = "";
			var returnCash = "";
			if( cash == null || cash.length == 0 )
				return null;
			var totalLen = cash.length;
			var times = ((cash.length % 4) > 0) ? ( Math.floor(cash.length/4) + 1 ) : Math.floor(cash.length/4);	
			var remainder = cash.length % 4;
			var i = 0;	
			for( ; i < times; i++ ){
				if( i == 0 && (remainder > 0) ) {
					tempCash = cash.substring( 0, remainder );
				}else {
					if( remainder > 0 )
						tempCash = cash.substring( remainder+(i-1)*4, remainder+i*4 );
					else
						tempCash = cash.substring( i*4, i*4+4 );
				}
				tempCash = convert4ToChinese( tempCash, false );
				returnCash += tempCash;
				if( tempCash != null && tempCash.length != 0 ) 
					returnCash += getUnit( times - i );
			}
			return returnCash;
		}
		function convertDecimalToChineseCash( cash, bOmitBeginZero ){
			var i = 0;
			var bBeginZero = false;
			var bMetZero = false;
			var returnCash = "";
			if( cash == null || cash.length == 0 )
				return returnCash;
			for( ; i < cash.length; i++ ){
				if( i >= 2 )
					break;
				if( i == 0 && bOmitBeginZero && cash.charAt(i) == '0' ){
					bBeginZero = true;
					continue;
				}
				if( bBeginZero && cash.charAt(i) == '0' )
					continue;
				if( cash.charAt(i) != '0' )	{
					if( bMetZero )
						returnCash += aNum[0]; //"零"
					bMetZero = false;
					returnCash += convert( cash.charAt(i) );
					switch( i )
					{
					case 0:
						returnCash += aUnit[JIAO]; //"角"
						break;
					case 1:
						returnCash += aUnit[CENT]; //"分"
						break;
					default:
						break;				
					}
				}else {
					bMetZero = true;
				}
			}
			return returnCash;	
		}
		function convert4ToChinese( cash, bOmitBeginZero ){
			var i = 0;
			var length = cash.length;
			var bBeginZero = false;
			var bMetZero = false;
			var returnCash = "";	
			
			for( ; i < length; i++ )
			{
				if( i == 0 && bOmitBeginZero && cash.charAt(i) == '0' )
				{
					bBeginZero = true;
					continue;
				}
				if( bBeginZero && cash.charAt(i) == '0' )
					continue;
						
				if( cash.charAt(i) != '0' )	{
					if( bMetZero )
						returnCash += aNum[0]; //"零"
					bMetZero = false;
					returnCash += convert( cash.charAt(i) );
					switch( i + (4-length) )
					{
					case 0:
						returnCash += aUnit[THOUSAND]; //"千"
						break;
					case 1:
						returnCash += aUnit[HUNDRED]; //"佰"
						break;
					case 2:
						returnCash += aUnit[TEN]; //"拾"
						break;
					case 3:
						returnCash += "";
						break;
					default:
						break;				
					}
				}else {
					bMetZero = true;
				}
			}
			return returnCash;
		}
		function getUnit( part ){
			var returnUnit = "";
			var i = 0;
			
			switch( part )
			{
			case 1:
				returnUnit = "";
				break;
			case 2:
				returnUnit = aUnit[TENTHOUSAND]; // "万"
				break;
			case 3:
				returnUnit = aUnit[HUNDREDMILLION]; //"亿"
				break;
			default:
				if( part > 3 ){
					for( ; i < part - 3; i++ ){
						returnUnit += aUnit[TENTHOUSAND]; // "万"
					}
					returnUnit += aUnit[HUNDREDMILLION]; //"亿"
				}
					
				break;
			}
			return returnUnit;
		}
		function convert( num ){
			return aNum[parseInt(num)];
		}
		return function(cash){
			var integerCash="";
			var decimalCash="";	
			var integerCNCash = "";
			var decimalCNCash = "";
			var dotIndex = 0;
			var cnCash = "";
			var Cash = "";
			Cash = $.trim( cash );
			if( Cash == null || Cash.length == 0 ){
				return cnCash;
			}
				
			if( !Util.isMoney( Cash ) ){
				return cnCash;	
			}
			dotIndex = Cash.indexOf('.');
			if( dotIndex != -1 ) {
				integerCash = Cash.substring( 0, dotIndex );
				decimalCash = Cash.substring( dotIndex + 1 );	
			}else {
				integerCash = Cash;
				decimalCash = null;
			}
			integerCNCash = filterCharacter( integerCash, '0' );
			if( integerCNCash == null ){
				integerCNCash = "";
			}else{
				integerCNCash = convertIntegerToChineseCash( integerCNCash );
			}
				decimalCNCash = convertDecimalToChineseCash( decimalCash, false );
			
			if( decimalCNCash == null || decimalCNCash.length == 0 ){
				if( integerCNCash == null || integerCNCash.length == 0 ){
					cnCash = aNum[0] + aUnit[YUAN] + aUnit[ZHENG]; //"零元整"
				}else{
					cnCash = integerCNCash + aUnit[YUAN] + aUnit[ZHENG]; //"元整"
				}
			}else {
				if( integerCNCash == null || integerCNCash.length == 0 ){
					cnCash = decimalCNCash;
				}else{
					cnCash = integerCNCash + aUnit[YUAN] + decimalCNCash;  //"元"
				}
			}
			var retCash = unescape(cnCash);
				
			if(cash<0.1 && cash!='0' &&cash!='0.'&&cash!='0.0'&&cash!='0.00'){
					retCash = retCash.substring(1);
			}
			
			return retCash;	
		};
	})(),
	getDate:function(id){
		var date = $("#"+id).datepicker("getDate");
		var str = $.datepicker.formatDate("yymmdd",date);
		return str;
	},
	getFormatDate:function(dateStr,format){
		return Validation.getFormatDate(dateStr,format);
	},
	clearSSL:function(){
		try{
			var xClearObject=window.xClearObject;
			if(xClearObject){
				xClearObject.ClearPINStatus();
				xClearObject.ClearSSLCache();
			}
		}catch(e){
			
		}
	},
	clearPIN:function(){
		try{
			var xClearObject=window.xClearObject;
			if(xClearObject){
				xClearObject.ClearPINStatus();
			}
		}catch(e){
			
		}
	},
	downloadNetSign:function(){
		if(Util.isMacOSRequest()){			
			location.href=Util.getFullPath("ocx/netSign/MacBocomNetSign.1.0.dmg");
		}else if(Util.isIE()){
			if(Util.isIE64()){
				location.href=Util.getFullPath("ocx/netSign/NetSign20_64.exe");
			}else{
				location.href=Util.getFullPath("ocx/netSign/NetSign20.exe");
			}
		}else{
			location.href=Util.getFullPath("ocx/netSign/NetSignPlugin.exe");
		}
	},
	downloadClear:function(){
		location.href=Util.getFullPath("ocx/SafeCtl.exe");
	},
	signDate:function(data,formName,callBack,filter,type){
		var isMac = Util.isMacOSRequest();
		var InfoSecNetSign=document.InfoSecNetSign?document.InfoSecNetSign:window.InfoSecNetSign;
		
		try {
			if(isMac){
				InfoSecNetSign.signMode = '4';				
				InfoSecNetSign.NSSetSM2CertStoreName("BocommSM2");
			} else{
				InfoSecNetSign.NSSignMode = 4;
				InfoSecNetSign.NSSetSM2CertStoreName("BocommSM2");
			}
		} catch (e) {}
		try{
			if(isMac){
				InfoSecNetSign.NSSetDigestArithmetic("SHA1");				
				InfoSecNetSign.NSSetCodePage("UTF-8");
			}else{
				InfoSecNetSign.NSSetDigestArithmetic("1.3.14.3.2.26");
				InfoSecNetSign.NSSetCodePage(65001);			
			}
		}catch(e){
			throw new Error(Util.getMessage(Util.Message.tip.signControl));
		}
		var bsnCode = data.bussiness.code;
		var bsnName = data.bussiness.name;
		var show = data.bussiness.show;
		var timestamp = data.time;
		var fields = data.fields;
		var submitForm = document.forms[formName];
		var signArray = [];
		var confirmStr=data.message;
		var width=200;
		filter=filter?filter:"BANKCOMM";
		
		for(var key in fields){
			var field = fields[key];
			var name  = key;
			var value = submitForm[name].value;
			var showValue  = value;
			var sh = "false";
			signArray[signArray.length]="<field><name>"+name+"</name><value>"+showValue+"</value><show>"+sh+"</show></field>";
		}
		
		if(confirmStr && confirmStr!=""){
			signArray[signArray.length]="<field><name>signShowMessage</name><value>"+confirmStr+"</value><show>true</show></field>";
		}
		
		var headerStr='<?xml version="1.0" encoding="utf-8"?><signData><preCheck>false</preCheck><tranType>'+
				'<tranName>'+bsnName+"</tranName>"+
				"<tranCode>"+bsnCode+"</tranCode>"+
				"<tranShow>"+show+"</tranShow>"+
				"<timestamp>"+timestamp+"</timestamp></tranType>";
		
		
		
		var plainText = headerStr+"<fields>"+signArray.join("")+"</fields></signData>";
		
		var buttons = {};
		var signFilter=filter;
		buttons[Util.Message.button.ok]=function(){
			InfoSecNetSign.NSSetPlainText(plainText);
			var signStr= isMac ? InfoSecNetSign.NSAttachedSign(filter) : InfoSecNetSign.NSAdvanceAttachedSign(filter);
			if(signStr==""){
				var prefix="";
				try{
					var errorNum = isMac ? InfoSecNetSign.errorCode : InfoSecNetSign.errorNum;
					if(errorNum){
						prefix = "["+errorNum+"]";
					}
				}catch(e){
					
				}
				throw new Error(prefix+Util.Message.tip.signError);
			}
			signStr=signStr.replace(/[\r\n]/g,"");
			var dn=InfoSecNetSign.NSGetSignerCertInfo(1);
			callBack(signStr,dn,plainText);
			return true;
		};
		buttons[Util.Message.button.cancel]=function(){
			return true;
		};
		if(type=="1"){
			Util.show("<div title="+Util.Message.tip.sign+">"+confirmStr+"</div>",
					80,120,buttons);
		}else{
			buttons[Util.Message.button.ok].call();
		}
	},
	paSignDate:function(data,formName,callBack,filter,type){
		var InfoSecNetSign=document.InfoSecNetSign?document.InfoSecNetSign:window.InfoSecNetSign;
		var isMac = Util.isMacOSRequest();
		try{
			if(isMac){
				InfoSecNetSign.NSSetDigestArithmetic("SHA1");
				InfoSecNetSign.NSSetCodePage("UTF-8");
			}else{
				InfoSecNetSign.NSSetDigestArithmetic("1.3.14.3.2.26");
				InfoSecNetSign.NSSetCodePage(65001);			
			}			
		}catch(e){
			throw new Error(Util.getMessage(Util.Message.tip.signControl));
		}
		var bsnCode = data.bussiness.code;
		var bsnName = data.bussiness.name;
		var show = data.bussiness.show;
		var timestamp = data.time;
		var fields = data.fields;
		var submitForm = document.forms[formName];
		var signArray = [];
		var confirmStr=data.message;
		var width=200;
		if(filter=='false' || filter==false){
			filter='';	
		}else{
			filter="OU=Customers,OU=BANKCOMM,O=BANKCOMM CA,C=CN";
		}
		for(var key in fields){
			var field = fields[key];
			var name  = key;
			var value = submitForm[name].value;
			var showValue  = value;
			var sh = "false";
			signArray[signArray.length]="<field><name>"+name+"</name><value>"+showValue+"</value><show>"+sh+"</show></field>";
		}
		var headerStr='<?xml version="1.0" encoding="utf-8"?><signData><preCheck>false</preCheck><tranType>'+
				'<tranName>'+bsnName+"</tranName>"+
				"<tranCode>"+bsnCode+"</tranCode>"+
				"<tranShow>"+show+"</tranShow>"+
				"<timestamp>"+timestamp+"</timestamp></tranType>";
		
		
		
		var plainText = headerStr+"<fields>"+signArray.join("")+"</fields></signData>";
		
		
		var buttons = {};
		var signFilter=filter;
		buttons[Util.Message.button.ok]=function(){
			InfoSecNetSign.NSSetPlainText(plainText);
			var signStr=isMac ? InfoSecNetSign.NSAttachedSign(filter) : InfoSecNetSign.NSAdvanceAttachedSign(filter);
			if(signStr==""){
				var prefix="";
				try{
					var errorNum =isMac ? InfoSecNetSign.errorCode : InfoSecNetSign.errorNum;
					if(errorNum){
						prefix = "["+errorNum+"]";
					}
				}catch(e){
					
				}
				throw new Error(prefix+Util.Message.tip.signError);
			}
			
			var dn=InfoSecNetSign.NSGetSignerCertInfo(1);
			callBack(signStr,dn,plainText);
			return true;
		};
		buttons[Util.Message.button.cancel]=function(){
			return true;
		};
		if(type=="1"){
			Util.show("<div title="+Util.Message.tip.sign+">"+confirmStr+"</div>",
					80,120,buttons);
		}else{
			buttons[Util.Message.button.ok].call();
		}
	},
	/**
	 * 获取用户对菜单的操作权限
	 * @param user 用户角色
	 * @param menu 菜单对象
	 * @returns 
	 */
	getBsnInfo:function(user,menu){
		if(!menu){
			return;
		}
		var menudefs=menu.lstBsnInfo;
		if(!menudefs || menudefs.length<0){
			return;
		}
		var roles=user.roles;
		for(var i=0;i<=roles.length;i++){
			for(var j=0;j<menudefs.length;j++){
				var menudef = menudefs[j];
				if(roles[i]==menudef.roleCode){
					return menudef;
				}
			}
		} 
		var role=roles[0];
		for(var i=0;i<=role.length;i++){
			var tmpRole=role.substr(0,role.length-i);
			tmpRole =(tmpRole+"***").substr(0,3);
			for(var j=0;j<menudefs.length;j++){
				var menudef = menudefs[j];
				if(tmpRole==menudef.roleCode){
					return menudef;
				}
			}
		}
		return null;
	},
	/**
	 * 创建提示文本
	 */
	buildAlt:function(obj){
		var _obj = $(obj);
		_obj.blur(function(){
			var tip = $(this).attr("alt");
			$(this).attr("emptyValue",tip);
			var val = $(this).val();
			if(val==""){
				$(this).val(tip);
				$(this).css("color","#999999");
			}else{
				$(this).css("color","#000000");
				$(this).val(val);
			}
		});
		_obj.focus(function(){
			var tip = $(this).attr("alt");
			$(this).attr("emptyValue",tip);
			var val = $(this).val();
			if(val==tip){
				$(this).val("");
				$(this).css("color","#000000");
			}
		});
		_obj.blur();
	},
	val:function(obj){
		var item=$(obj);
		var type=item.attr("type");
		var based=item.attr("based");
		var val=item.val();
		if(based && val==item.attr("emptyValue")){
			return "";
		}else{
			return val;
		}
	},
	step:function(step){
		var Mthis = $(".zzlc-pic");
		var Mwidth = Mthis.width();
		var Div = Mthis.find("div").length;
		var Dwidth = (Mwidth-((Div-1)*41))/Div;
		var zhong1 = '<div class="zhong_1"></div>';
		var zhong2 = '<div class="zhong_2"></div>';
		var zhong3 = '<div class="zhong_3"></div>';
		Dwidth = Math.floor(Dwidth*100/Mwidth)+"%";
		Mthis.find("div").each(function(i){
			$(this).width(Dwidth);
			$(this).addClass("step-step");
			if(i == step-1){
				$(zhong3).insertAfter($(this));
			}else if(i == step){
				if(Div-1 != i)
				$(zhong1).insertAfter($(this));
				$(this).addClass("shen");
			}else if(Div-1 != i){
				$(zhong2).insertAfter($(this));
			}
			var number = i+1;
			$(this).find("span").addClass("number_aloe_"+number);
		});
		$(window).resize(function(){
			var Mthis = $(".zzlc-pic");
			var Mwidth = Mthis.width();
			var Dwidth = (Mwidth-((Div-1)*41))/Div;
			Dwidth = Math.floor(Dwidth*100/Mwidth)+"%";
			Mthis.find(".step-step").each(function(i){
				$(this).outerWidth(Dwidth);
			});
		});
	},
	/**
	 * 验证输入为金额
	 */
	inputMoney:function(thisItem){
		/** input输入框金额输入 */
		var inputSum = $(thisItem).val();
		var reg = RegExp(/^(([1-9]{1}\d{0,14})|([0]{1}))(\.(\d){1,2})?$/);
		var regLast = RegExp(/^(\d){1,2}$/);
		var len = (inputSum+"").length;
		var firstIndex = (inputSum+"").indexOf(".");
		var lastIndex = (inputSum+"").lastIndexOf(".");
		if(len >0 && lastIndex >-1){
			var firstSum = inputSum.substring(0,lastIndex);
			var lastSum = inputSum.substring(lastIndex+1,len);
			if(firstSum.length == 0){
				firstSum = "0";
			}
			if(lastIndex == firstIndex){
				var lastSumLen = lastSum.length;
				if(lastSumLen >0){
					if(lastSumLen == 1){
						if(!regLast.test(lastSum)){
							lastSum = "";
						}
					}else if(lastSumLen == 2){
						if(!regLast.test(lastSum)){
							lastSum = lastSum.substring(0, 1);
						}
					}else{
						lastSum = lastSum.substring(0, 2);
					}
				}
				for(var i=lastSum.length;i<2;i++){
					lastSum = lastSum + "0";
				}
				$(thisItem).val(firstSum+"."+lastSum);
			}else {
				inputSum = inputSum.substring(0,lastIndex);
				$(thisItem).val(inputSum);
			}
		}else{
			if(len > 0){
				if(!reg.test(inputSum)){
					for(var i=0;i<len;i++){
						var subSum = inputSum.substring(0,len-i);
						if(reg.test(subSum)){
							$(thisItem).val(subSum);
							break;
						}else{
							if(subSum.length ==1){
								$(thisItem).val("");
							}
						}
					}
				}
			}
		}
	},
	/**
	 * 将JSON类型的字符串转化为JSON对象，支持IE6和IE7
	 */
	toJson: function(jsonStr){
		try{
			if(jQuery){
				return jQuery.parseJSON(jsonStr);
			}else{
				if(!Util.isLowIE()){
					return JSON.parse(jsonStr);
				}else{
					//支持IE6和IE7
					//return eval('(' + jsonStr +')')
					return (new Function("return"+jsonStr))();
				}
			}
		}catch(e){
			return jsonStr;
		}
	},
	/**
	 * 获取指定日期nowDate之后多少天（intervalday）的时间
	 */
	dateOther:function(intervalday, nowDate) {
		var strdate = nowDate;
	    var year = parseInt(strdate.substr(0, 4),10);
	    var month = parseInt(strdate.substr(4, 2),10)-1;
	    var date = parseInt(strdate.substr(6, 2),10);
	    	dateDate = new Date(year,month,date);
		for (var i = 0; i < Math.abs(intervalday); i++)
		{
			if (parseInt(intervalday)>=0)
				dateDate.setTime(dateDate.getTime()+1000*60*60*24);
			else
				dateDate.setTime(dateDate.getTime()-1000*60*60*24);
		}
		var strYear = dateDate.getFullYear(); 
		var strMonth = dateDate.getMonth()+1;
		var strDate = dateDate.getDate();
		if (strMonth<10)
			strMonth="0"+strMonth;
		if (strDate<10)
			strDate="0"+strDate;
		strdate = strYear+""+strMonth+""+strDate;
		return strdate;
	},
	/**
	 * 判断日期间隔是否为指定月
	 * @param startDate 起始日期,格式为yyyyMMdd
	 * @param endDate 截止日期,格式为yyyyMMdd
	 * @param month 间隔月数
	 * @returns {Boolean} 
	 */
	monthInterval:function(startDate,endDate,month){
		var endYear = parseInt(endDate.substr(0, 4),10);
		var endMonth = parseInt(endDate.substr(4, 2),10);
	    var endDateNew = parseInt(endDate.substr(6, 2),10);
	    var newYear = endYear;
	    var newMonth = endMonth-month;
	    while(newMonth<=0){
	    	newYear = newYear - 1;
	    	newMonth = newMonth+12;
	    }
	    var newDate = endDateNew;
	    
	    if (newMonth<10)
			newMonth="0"+newMonth;
		if (newDate<10)
			newDate="0"+newDate;
	    var minDate = newYear+""+newMonth+""+newDate;
	    if(startDate>=minDate){
	    	return true;
	    }
	    return false;
	},
	getLocation:function(addParams){
		var url=location.href;
		if(addParams){
			return url; 
		}else{
			return url.substr(0,url.indexOf('?'));
		}
	},
	backLastMenu:function(menuCode){
		var lastMenu = parent.lastMenu;
		var currentMenu = Util.getCurrentMenu();
		if(menuCode!=currentMenu.menuCode){
			Util.changeMenu(currentMenu.menuCode);
		}else if(lastMenu && lastMenu[menuCode] ){
			var menu = lastMenu[menuCode];
			Util.changeMenu(menu);
		}else{
			Util.toHome();
		}
	},
	getCurrentMenu:function(){
		if(window.currentMenu){
			return window.currentMenu;
		}else if(Util.hasParent()){
			return Util.getParent().Util.getCurrentMenu();
		}else{
			return {};
		}
	},
	retrySubmit:function(formName){
		if(!formName){
			location.href=Util.getLocation(true);
		}else{
			var form = $("form[name="+formName+"]");
			if(form){
				form.attr("action",Util.getLocation(false));
				form.submit();
			}
			
		}
	},
	changeCard:function(cardNo,callBack){
		var submit=true;
		if(callBack){
			var cardInfo=Util.cardInfo[cardNo]
			submit=callBack.call(this,cardInfo);
		}
		if(submit && Util.hasParent()){
			Util.getParent().Util.changeCard.call(this,cardNo,undefined);
		}
	},
	/**
	 * 获取一个文本对象当前光标位置
	 */
	getCursorPos:function(obj){
		try{
			if(obj.setSelectionRange){
				return obj.selectionStart;
			}else if(document.selection){
				obj.focus();
				var sel = document.selection.createRange();
				sel.moveStart('character',-obj.value.length);
				return sel.text.length;
			}
		}catch(e){
			
		}
		return obj.value.length;
	},
	/**
	 * 四舍五入至整数位
	 */
	getFmtJPYAndKRW:function(obj){
		try{
			if(obj){
	    		var val=$.trim(obj);
	    		obj=Math.round(val);
	    	}
		}catch(e){
			
		}
		return obj;
	},
	/**
	 * 设置文本光标位置
	 */
	setCursorPos:function(obj,pos){
		try{
			if(obj.setSelectionRange){
				obj.focus();
				obj.setSelectionRange(pos,pos);
			}else if(obj.createTextRange){
				var range=obj.createTextRange();
				range.collapse(true);
				range.moveEnd('character',pos);
				range.moveStart('character',pos);
				range.select();
			}
		}catch(e){
			
		}
		
	},
	/**
	 * 启用文本框输入限制
	 * @param obj input对象
	 * @param rule money-金额限制
	 *             card-卡号限制
	 */
	ruleInput:function(obj,rule){
		var base=function(expr){
			var partern = expr;
			return function(e){
				var pos=Util.getCursorPos(this);
				if(!partern.test(this.value)){
					var old=$(this).attr("validValue");
					old=old?old:"";
					this.value=old;
					Util.setCursorPos(this,pos-1);
					$(this).change();
				}else{
					$(this).attr("validValue",this.value);
				}
			};
		};
		var rules={
			limit:function(e){
				var partern=/^([1-9][0-9]*|0)?$/;
				var callBack=base(partern);
				callBack.call(this,e);
			},
				
			money:function(e){
				var partern=/^(([1-9][0-9]*|0)(\.[0-9]{0,2})?)?$/;
				var callBack=base(partern);
				callBack.call(this,e);
			},
			/**
			 * 纸原油成交数量amount
			 * @param e
			 */
			amount:function(e){
				var partern=/^(([1-9][0-9]*|0)(\.[0-9]{0,1})?)?$/;
				var callBack=base(partern);
				callBack.call(this,e);
			},
			/**
			 * 利率:12位长度-整数位4位,8位小数
			 * @param e
			 */
			rate:function(e){
				var partern=/^(([1-9][0-9]{0,3}|0)(\.[0-9]{0,8})?)?$/;
				var callBack=base(partern);
				callBack.call(this,e);
			},
			/**
			 * 数字
			 * @param e
			 */
			number:function(e){
				var partern=/^[0-9]*$/;
				var callBack=base(partern);
				callBack.call(this,e);
			},
			percent:function(e){
				var partern=/^((10{0,2}(\.0{0,2})?)|(([0-9]{1,2})(\.[0-9]{0,2})?))?$/;
				var callBack=base(partern);
				callBack.call(this,e);
			},
			JPYMoney:function(e){
				var partern=/^([1-9][0-9]*|0)?$/;
				var callBack=base(partern);
				callBack.call(this,e);
			},
			charNum:function(e){
				var partern = /^[0-9a-zA-Z]*$/;
				var callBack=base(partern);
				callBack.call(this,e);
			}
		};
		var blurs={
			money:function(e){
				rules.money.call(this,e);
				var val=$.trim(this.value);
				if(val && val!=""){
					var index =val.indexOf(".");
					if(index<0){
						val=val+".00";
					}else{
						val=val+"00";
						val=val.substr(0,index+3);
					}
					this.value=val;
				}
			},
			/**
			 * 纸原油成交数量
			 */
			amount:function(e){
				rules.amount.call(this,e);
				var val=$.trim(this.value);
				if(val && val!=""){
					var index =val.indexOf(".");
					if(index<0){
						val=val+".0";
					}else{
						val=val+"0";
						val=val.substr(0,index+2);
					}
					this.value=val;
				}
			},
			/**
			 * 利率:8位小数格式化
			 */
			rate:function(e){
				rules.rate.call(this,e);
				var val=$.trim(this.value);
				if(val && val!=""){
					var index =val.indexOf(".");
					if(index<0){
						val=val+".00000000";
					}else{
						val=val+"00000000";
						val=val.substr(0,index+9);
					}
					this.value=val;
				}
			},
			/**
			 * 数字
			 * @param e
			 */
			number:function(e){
				
			},
			percent:function(e){
			},
			charNum:function(e){
				
			},
			JPYMoney:function(e){//日元金额格式化
				rules.money.call(this,e);
				var val=$.trim(this.value);
				if(val && val!=""){
					var index =val.indexOf(".");
					if(index>0){
						val=val.substr(0,index);
					}
					this.value=val;
				}
			}
		
		}; 
		$(obj).keyup(function(e){
			return rules[rule].call(this,e);
		});
		$(obj).change(function(e){
			return blurs[rule].call(this,e);
		});
		$(obj).keyup();
	},
	/**
	 * 页面加载完成后调用
	 * @see Body.tag
	 */
	ready:function(sysType){
		$(".radio").buttonset();
		/*$(".contact-check").button({text:false}).next("label").addClass("mcheckbox");
		
		$(".contact-radio input[type=radio]").each(function(index,item){
			var id=item.id;
			if(!id){
				id="radio"+index;
				item.id=id;
			}
			$(item).after('<label for="'+id+'"></label>')
		});
	    $(".contact-radio").buttonset({text:false}).addClass("mradio");*/
		$(".button").each(function(i,e){
			var item=$(e);
			var icon=item.attr("icon");
			var config={};
			if(icon){
				config.icons={
			        primary: "ui-icon-locked"
			    };
			}
			item.children("button").button(config);
		});
		$("[based]").each(function(index,item){
			var _obj = $(item);
			var based=_obj.attr("based")+"";
			if(based.indexOf("alt")>-1){
				Util.buildAlt(_obj);
			}
			if(based.indexOf("tooltip")>-1){
				_obj.tooltip(Util.tooltip);
				if(_obj.is("select") && Util.isIE()){
					_obj.unbind("mouseover");
					_obj.change(function(){
						$(this).tooltip("close");
					});
				}
			}
		});
		$(".based").each(function(index,item){
			var _obj = $(item);
			if(_obj.hasClass("x-currency")){
				Util.ruleInput(_obj,"money");
			}
			if(_obj.hasClass("x-amount")){
				Util.ruleInput(_obj,"amount");
			}
			if(_obj.hasClass("x-limit")){
				Util.ruleInput(_obj,"limit");
			}
			if(_obj.hasClass("x-rate")){//利率格式化
				Util.ruleInput(_obj,"rate");
			}
			if(_obj.hasClass("x-number")){//数字
				Util.ruleInput(_obj,"number");
			}
			if(_obj.hasClass("x-JPYcurrency")){//日元金额格式化
				Util.ruleInput(_obj,"JPYMoney");
			}
			if(_obj.hasClass("x-percent")){//小数百分比格式化
				Util.ruleInput(_obj,"percent");
			}
			if(_obj.hasClass("x-card")){
				Util.fmtInput(_obj,"card");
			}
			if(_obj.hasClass("x-charNum")){//字母+数据 如：证件号，动态码
				Util.ruleInput(_obj,"charNum");
			}
		});
		if(sysType=='pmps'){
			Util.setMainHeight(600);
			Util.setMainHeight($(document).height());	
		}else{
			Util.autoHeight();	
		}
		try{
			parent.scrollTo(0, 0);
		}catch(e){
			
		}
	},
	fmtInput:function(input,type){
		var input=$(input);
		if(type=="card"){
			var id=input.attr("name")+"_show";
			var showInput=$('<input id="'+id+'" name="'+id+'"/>');
			showInput.width(input.width());
			Validation.setItemSource("inputForm","toCardNo",showInput);
			input.after(showInput);
			input.hide();
			var showCardNo=function(src,target){
				var position=Util.getCursorPos(target.get(0));
				var cardNo=src.val();
				var length=cardNo.length;
				var oldShow=target.val();
				var oldLength=oldShow.length;
				var showCardNo="";
				var offset=0;
				while(length>4){
					var start=cardNo.length-length;
					showCardNo+=cardNo.substr(start,4)+" ";
					length=length-4;
				}
				if(length>0){
					showCardNo+=cardNo.substr(cardNo.length-length);
				}
				if(position%5==0){
					if(showCardNo.length>oldLength){
					  position++;
					}
				}
				if(oldShow==""){
					position=showCardNo.length;
				}
				target.val(showCardNo);
				Util.setCursorPos(target.get(0),position);
			};
			showInput.keyup(function(){
				var showInput=$(this);
				var input=showInput.prev("input");
				var cardNoShow=showInput.val();
				var cardNo=cardNoShow.replace(/\s/g,"");
				var oldCardNo=input.val();
				if(oldCardNo!=cardNo){
					input.val(cardNo);
					showCardNo(input,showInput);
				}
			});
			showInput.change(function(){
				showCardNo(input,showInput);
			});
			input.change(function(){
				showCardNo(input,showInput);
			});
			showCardNo(input,showInput);
		}
	},
	/**
	* 金额格式化
	* @param str 金额
	* 返回值：
	* 	格式化后的字符串
	*/
	fmtMoney : function (str) {
		var reg = RegExp(/^([-]{0,1})(\d{0,15})(\.(\d){0,2})?$/);
		if(str == null || str == undefined || $.trim(str+"") ==''){
			return "0.00";
		}
		var subAmt = $.trim(str+"");
		if(!reg.test(subAmt)){
			return str;
		}
		var pfix = "";
		if(subAmt.indexOf('-') == 0){
			subAmt = subAmt.substring(1,subAmt.length);
			pfix = "-";
			if(subAmt.length ==0){
				return "0.00";
			}
		}
		if((subAmt.indexOf(".") == -1)||(subAmt.length == 1)) {
			subAmt = subAmt + ".00";
		}
		if(subAmt.indexOf(".") == (subAmt.length - 2)) {
			subAmt = subAmt + "0";
		}
		if(subAmt.indexOf(".") < (subAmt.length - 3)){
			subAmt = subAmt.substring(0, subAmt.indexOf(".") + 3);
		}
		var len = subAmt.length;
		
		var tempStr = subAmt.substring(0,len-3);
		var revert = function(_str){
			var _tempArr =[];
			for(var i=0;i<_str.length;i++){
				_tempArr[_str.length-1-i] = _str.substring(i,i+1);
			}
			_str = _tempArr.join("");
			return _str;
		};
		tempStr = revert(tempStr);
		var arr = [];
		var fmtStr = "";
		var mod = tempStr.length%3;
		var intNum = (tempStr.length-mod)/3;
		if(mod ==0){
			for(var i=0;i<intNum;i++){
				arr[arr.length] = tempStr.substring(i*3,(i+1)*3);
			}
		}else{
			if(intNum == 0){
				return pfix+subAmt;
			}else{
				for(var i=0;i<intNum;i++){
					arr[arr.length] = tempStr.substring(i*3,(i+1)*3);
				}
				arr[arr.length] = tempStr.substring(intNum*3,tempStr.length);
			}
		}
		var cashArr = [];
		for(var i=0;i<arr.length;i++){
			cashArr[i]=revert(arr[arr.length-1-i]);
		}
		fmtStr = cashArr.join(",") + subAmt.substring(len-3,len);
		return pfix+fmtStr;
	},
	/**
	 * 通过上传卡号uuid，异步方式查询对应卡号金额
	 * @param uuid 卡号uuid值
	 * @param param 字符串类型或回调函数</br>
	 *   字符串：为对应需要显示余额信息的 dom id值，支持输入框和以html()格式的dom</br>
	 *   回调函数：获取余额信息后，执行的函数，默认传入余额值</br>
	 *   				同时可使用this字段，获取对应account对象
	 */
	qryCardBalance : function(uuid,param,cashFlag,curType){
        if(!Validation.hasText(uuid) || uuid.length != 32){
        		//Util.error("卡号uuid有误："+uuid);
        		Util.error(Util.getMessage(Util.Message.tip.uuIDError,[uuid]));
                return ;
        }
        $.getJSON(Util.getFullPath('account/acQueryCardBalance.ajax')+'&cardNo='+uuid +'&cashFlag='+cashFlag+'&curType='+curType,
        		function(data){
                Util.result(data, function(body){
                        var _type = typeof param;
                        if( _type == "string"){
                                var j_dom = $("#"+param);
                                if(j_dom[0].tagName == 'INPUT'){
                                        j_dom.val(body.balance);
                                }else{
                                        j_dom.html(body.balance);
                                }
                        }else if(_type == "function"){
                        	param.call(body.cardNo,body.balance);
                        }else{
                                //类型不一致
                                Util.error(Util.getMessage(Util.Message.tip.typeError,[_type]));
                        }
                });
        });
     },
     /**
      * 验证储蓄存款留存金额是否达到最低开户金额
      * @param currType
      * @param ofFlag
      * @param minSum
      */
     validateDepositMinOpenSum:function(currType,ofFlag,minSum){
    	 var ok=true;
    	 var cnymin=50;
    	 var usdmin=20;
    	 if("CNY"==currType){
    		 if(minSum<cnymin){
    			 ok = false;
    		 }
    	 }else if("USD"==currType){
    		 if(minSum<usdmin){    			 
    			 ok = false;
    		 }
    	 }else{    		 
    		 var fxData={
    				 outCur:"USD",
    				 applySum:minSum,
    				 buyCurrency:currType,
    				 ofFlag:ofFlag,
    				 date:new Date()
    		 };
    		 $.ajax({
    				type:'post',
    				url:Util.getFullPath('money/moQueryForExchangePrice.ajax'),
    				data:fxData,
    				dataType:'json',
    				async: false,
    				success:function(data){
    					Util.result(data,function(body){
    						var outSum=parseFloat(body['outSum']);
    						if(outSum<20){
    							ok = false;
    						}else{
    							ok = true;
    						}
    					});
    				}
			});
    	 }
    	 return ok;
     },
	/** 
	 *如果源字符串未定义或为'null'，则用目标字符串替换,否则返回源字符串
	 *@param source
	 * 	源字符串
	 *@param target
	 *	目标字符串,如果为null或未定义设值为""
	*/
     nvs : function(source,target){
		if(source== undefined || source == null || source == 'null'){
			if(target!= undefined && target != null){
				return target;
			}else{
				return "";
			}
		}else{
			return source;
		}
	}
});
$(window).unload(function(){
	var events=Util.events;
	for(var type in events){
		var lstEvent=events[type];
		for(var i=0;i<lstEvent.length;i++){
			Util.removeEvent(type,lstEvent[i]);
		}
	}
});
//jQuery默认设置
(function(){
	$.datepicker.setDefaults({
		 altFormat:"yy-mm-dd",
	     dateFormat: 'yymmdd',
	     monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
	      monthNamesShort: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
	      dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
	      dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
	      dayNamesMin: ['日','一','二','三','四','五','六'],
	     firstDay:1,
	     showButtonPanel:true,
	     changeYear:true,
	     changeMonth:true,
	     showOtherMonths:true,
	     showMonthAfterYear:true,
	     isRTL: false,
	     showOn: 'both',
	     closeText:'关闭',
	     prevText:'前一月',
	     nextText:'后一月',
	     currentText:'今日',
	     buttonImage:Util.contextPath+"images/date.png",
	     buttonImageOnly:true,
		 onClose:function(){
             var mask=$("#datepikerMask");
             mask.hide();
         },
         duration:function(){
        	var mask=$("#datepikerMask");
			if(mask.length==0){
				var url=Util.getFullPath("html/blank.html");
				mask=$("<iframe id='datepikerMask' src='"+url+"' style='position:absolute;' frameborder='0'></iframe>");
				$(document.body).append(mask);
			}
			mask.show();
			mask.offset($("#ui-datepicker-div").offset());
			mask.height($("#ui-datepicker-div").height());
			mask.width($("#ui-datepicker-div").width());
         },
         beforeShow: function(input){
	        $("#ui-datepicker-div").addClass("mdatepicker").css("z-index","10");
	     }
	});
})();
//国际化定义开始
Util.Message={
	"tip":{
		"home":"首页",
		"error":"错误提示",
		"warmTips":"温馨提示",
		"success":"操作成功",
		"page":"页码",
		"pageNo":"页码请输入数字，并小于总页数{0}",
		"date":"日期格式不正确",
		"sign":"请确认签名内容",
		"smsError":"短信附加码输入有误，请检查",
		"signError":"签名数据失败",
		"more":"更多",
		"confirmMsg":"是否确定删除该记录？",
		"card_error":"您的尚未关联符合条件的卡或账户，是否现在关联卡片？",
		"tkTime_error":"随机码必须为6位数字",
		"tkChap_error":"动态口令必须为6位数字",
		"newToken_error":"动态口令必须为6位数字",
		"newTokenTime_error":"动态口令必须为8位数字",
		"position":"您当前所在位置",
		"content":"内容",
		"noMessage":"暂无消息",
		"loading":"正在加载，请稍后……",
		"notice":"提示",
		//黄金（延期黄金）开通
		"customer_readAndAgree":"请先阅读相关协议。",
		"customer_agreementNotFound":"该附件暂未提供协议文件。",
		"customer_inputMidBranchNo":"请输入第三方机构号。",
		"customer_signedMidBranch":"抱歉，您已签约第三方机构。",
		"customer_notAgreeGoldFee":"您没有选择同意收取开户费，无法为您开通交易账户。",
		"customer_mobileNotEqual":"两次输入的签约手机号不一致!",
		"customer_addressForPostBill":"请输入正确的对账单寄送地址!",
		"customer_postForPostBill":"请输入正确的邮政编码!",

		//电子账户管理开始
		"openArea":"请选择开户地区！",
		"OpenBk":"请选择开户分行！",
		"noCardType":"不支持的卡类型",
		"inputEN":"请输入姓名拼音",
		"inputMobile":"请输入正确的手机号",
		"mobileEr":"手机号输入不正确，请重新输入",
		"inputEmail":"请输入正确的电子邮箱",
		"emailEr":"电子邮箱输入不正确，请重新输入",
		"inputAddr":"请输入联系地址",
		"addrEr":"联系地址不能超过30个中文字",
		"inputPostal":"请输入邮编",
		"postalEr":"邮编输入不正确，请重新输入",
		"certNo":"请输入证件号码",
		"toCardNoMinLen":"收款账号位数不能小于10位",
		"toCardNoInputErr":"收款账号输入错误",
		//电子账户管理结束
		//年金开始
		"startBeforEight":"起始月不能早于2013年8月",
		"startAfterEnd":"查询起始日期不能大于截止日期",
		"dataTwoYear":"查询起始日期至结束日期间隔不能超过24个月!",
		"accNameSelect":"请选择账户名称",
		"cardNo":"请选择卡号",
		"noGroup":"请没有可以选择的投资组合",
		"selectTranType":"请选择交易类型!",
		"perNoBlank":"目标分配比例不能为空!",
		"selectInvChgAcc":"请选择投资变更的账户!",
		"selectInvTsfAcc":"请选择投资转换的账户!",
		"noTranTimes":"您的剩余转换次数为0",
		"endBeforNow":"结束日期不能在当前日期之后",
		"selectOne":"请选择一条记录",
		"print":"打印",
		"printView":"打印预览",
		"perNoAccount":"无账户可分配！",
		//年金结束
		//国债证券期货开始
		"noProCodSel":"未选择国债代码",
		"noProTypSel":"未选择国债类型",
		"noInFutCorpSel":"未选择转入期货公司",
		"noCurrencySel":"未选择币种",
		"noOutFutCorpSel":"未选择转出期货公司",
		"noQryTypSel":"未选择查询类型",
		"noFutCorpSel":"未选择期货公司",
		"noBondAgentSel":"未选择证券机构名称",
		"noFundAccSel":"未选择资金账号",
		"noBondNameSel":"未选择证券名称",
		"noBondFundAccSel":"未选择证券资金账号",
		"noTranTypeSel":"未选择交易类型",
		"noInBondCorpSel":"未选择转入证券公司",
		"noBondFundAccSel":"未选择证券公司资金账号",
		"noOutBondCorpSel":"未选择转出证券公司",
		"noMarNameSel":"未选择交易市场名称",
		"noInMarSel":"未选择转入交易市场",
		"noOutMarSel":"未选择转出交易市场",
		"debtTranAmtReq":"认购金额必须是100的整数倍",
		"debtTranNotNull":"认购金额不能为空",
		"certTypeOrNoErr":"证件类型或者证件号码输入错误",
		"certNoNull":"请输入证件号码",
		"currencyNotMatchSignCur":"选择币种与签约币种不符",
		"tranSumThanAccBalance":"转账金额不得大于可用余额",
		"certTypAndNoMustInput":"由于转账金额大于二十万，证件类型和证件号码必须输入并且要和签约账户的证件类型和证件号码匹配",
		"certTypAndNoNotMatch":"输入的证件类型或证件号码与签约账户的证件类型或证件号码不匹配",
		"debtCodeNotNull":"国债代码不能为空，请选择国债代码",
		"debtNameNotNull":"国债类型不能为空，请选择国债类型",
		"prdCodNotSel":"国债代码未选择",
		"tranAmtGreateThanAccBalance":"认购金额不能大于卡余额",
		"futTranAmtReq":"转账金额必须是整数，以元为单位",
		"startDateNotMoreThanServerDate":"起始日期不能大于当前日期",
		"endDateNotMoreThanServerDate":"截止日期只能小于当前日期",
		"startDateNotMoreThanEndDate":"截止日期不能小于起始日期",
		"noBusinTypeSel":"未选择业务类型，请选择。",
		"tranAmtNotNull":"转账金额不能为空",
		"confirmBan":"禁用该{0}后将无法继续使用。是否确定禁用?",
		"notOnLineCardSoNotQrypwd":"上线行卡暂时不支持重置查询密码交易，敬请谅解",
		"notSignRongZi":"您未签约融券融券，请去柜面网点办理或选择其他业务类型",
		"notSignCunGuan":"您未签约三方存管，请去柜面网点办理或选择其他业务类型",
		"errorBizType":"业务类型错误，请选择正确的业务类型",
		//国债证券期货结束
		//客户端开始
		"wbcsPackage":"套餐包",
		"wbcsEmptyPackage":"这个套餐包是空的！",
		"wbcsPageFromTo":"第{0}页/共{1}页",
		"wbcsMakeSureDelete":"您确定要删除“{0}”？",
		"wbcsPreInstApp":"预置应用",
		"wbcsTemplateApp":"模板应用",
		"wbcsRecommandApp":"推荐应用",
		"wbcsCantDelete":"{0}不能删除!",
		"wbcsAdded":"已添加",
		"wbcsAddApp":"添加应用",
		//客户端结束
		"depositCalculateTitle":"个人存款计算器（仅供参考）",
		"dayLimitWarning":"输入“0”表示无限制,您确认要将限额设置为0么？",
		"pstHasSigned":"对不起，您已签约该券商",
		"pstHasBooked":"对不起，您已预指定该券商",
		"customer_selectCertType":"请选择证件类型",
		"customer_inputCertNo":"请输入正确的证件号码",
		"customer_inputFundNo":"请输入资金账号",
		"CNY":"人民币",
		"USD":"美元",
		"HKD":"港币",
		"EUR":"欧元",
		"inputNickname":"请输入正确的昵称",
		"nameDuplicateNotice":"该用户名已被占用",
		"nameDuplicate":"对不起，用户名已被占用",
		"pleaseGotoCounter":"对不起，请您至柜面办理",
		"confirmDelete":"确定要删除此应用么?",
		"inputValDate":"请输入正确的卡有效期",
		"inputCheckCode":"请输入正确的卡校验码",
		"mergedAllready":"您已完成归并。",
		"pleaseSelect":"第{0}题请选择",
		"atmostThree":"本题最多可选择两项！",
		"atmostTwo":"本题最多可选择三项！",
		"notSupport":"对不起，您所在的地区不支持此业务！",
		"notRiskInvestor":"您不属于风险型投资人士, 您不适合办理黄金延期业务。建议适当选择黄金实物产品，如：AU100g,AU99.99,AU99.95等；开通延期黄金业务，请点击“确定”按钮重新进行风险评估。",
		"RestRiskOrNot":"黄金定投的业务风险等级为4R,该业务的风险等级高于您风险偏好，是否重新评估您的风险偏好？",
		"paperOilRiskMessage":"您风险评估等级不符合该业务等级，请重新评估或退出",
		//安全控件(safeControl-support.js)开始
		"mountControl":"请先安装交通银行安全控件!",
		"password":"密码",
		"notURL":"{0}非交通银行网上银行的网页地址，请查证核实",
		"debugAndOpen":"{0}网页处于被调试状态，请重新打开再试",
		"runException":"{0}安全控件运行异常，请关闭并重新安装",
		"startException":"{0}安全控件启动异常，请关闭并使用管理员重新安装",
		"inputRight":"请输入正确{0}!",
		"runAndRefresh":"{0}安全控件运行异常，请刷新页面",
		"signControl":" 请先安装交通银行签名控件",
		"uuIDError":"卡号uuid有误:{0}",
		"typeError":"上传的第二个参数类型为:{0}"
		//安全控件(safeControl-support.js)结束
	},
	"messageType":{"1":"营销活动","2":"账务消息","3":"系统消息","4":"产品热荐","5":"资讯信息","99":"其他消息"},
	"button":{
		"ok":"确定",
		"cancel":"取消",
		"yes":"是",
		"no":"否",
		"manageCard":"维护下挂卡",
		"reLogin":"重新登录",
		"closeWin":"关闭网页",
		"close":"关闭",
		"next":"下一步"
	},
	"rule":{
		"notempty":"{0}为必输项",
		"values":"{0}请选择[{1}]",
		"minLength":"{0}最少输入{1}个字符",
		"maxLength":"{0}不能超过{1}个字符",
		"length":"{0}必须输入{1}个字符",
		"regex":"请输入正确的{0}",
		"notblank":"{0}不能为空串",
		"minsize":"{0}最少输入{1}项",
		"maxsize":"{0}最多输入{1}项",
		"size":"{0}最少输入{1}项，不能超过{2}项",
		"min":"{0}必须大于{1}",
		"max":"{0}不能大于{1}",
		"range":"{0}必须大于{1}，小于{2}",
		"rangeMax":"{0}必须大于{1}",
		"rangeMin":"{0}必须小于{1}",
		"before":"{0}必须早于{1}",
		"after":"{0}必须晚于{1}",
		"between":"{0}不能早于{1}，晚于{2}"
	}
};


//带检索功能的下拉框
(function($) {
	$.widget("custom.combobox",
		{
			_create : function() {
				this.wrapper = $("<span>").addClass(
						"custom-combobox")
						.insertAfter(this.element);
				this.element.parents(".select").css("border","none");
				this.element.hide();
				this._createAutocomplete();
				this._createShowAllButton();
			},
			_setOption:function(key,value){
				if(key=="value"){
					if(this.element.is("select")){
						this.element.find("option").each(function(index,item){
							if(item.text==value || item.value==value){
								item.selected=true;
								return false;
							}
						});
					}else{
						this.element.val(value);
					}
					this.input.val(value);
				}
				
				this._super( key, value );
			},
			_createAutocomplete : function() {
				var selected = this.element.find(":selected"), value = selected
						.val() ? selected.text() : "";
				this.input = $("<input>")
						.appendTo(this.wrapper)
						.val(value)
						.attr("title", "")
						.addClass(
								"custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
						.autocomplete({
							delay : 0,
							minLength : 0,
							open:function(e,ui){
								var container= $( ":ui-menu:visible" );
								var size = container.children(":visible").length;
								if(size>8){
									container.height(200);
									container.css("overflow-y","auto");
									container.css("overflow-x","visible");
									container.css("white-space","nowrap");
								}else{
									container.height(container.children().height()*size);
								}
							},
							source : $.proxy(this, "_source")
						}).tooltip({
							tooltipClass : "ui-state-highlight"
						}).click(function(){
							$(this).autocomplete("search", "");
						});
				this._on(this.input, {
					autocompleteselect : function(event, ui) {
						ui.item.option.selected = true;
						this._trigger("select", event, {
							item : ui.item.option
						});
					},
					autocompletechange : "_removeIfInvalid"
				});
			},
			_createShowAllButton : function() {
				var input = this.input, wasOpen = false;
				$("<a>")
						.attr("tabIndex", -1)
						.appendTo(this.wrapper)
						.button({
							icons : {
								primary : "ui-icon-triangle-1-s"
							},
							text : false
						})
						.removeClass("ui-corner-all")
						.addClass(
								"custom-combobox-toggle ui-corner-right")
						.mousedown(
								function() {
									wasOpen = input.autocomplete(
											"widget")
											.is(":visible");
								}).click(function() {
							input.focus();
							// Close if already visible
							if (wasOpen) {
								return;
							}
							// Pass empty string as value to search
							// for, displaying all results
							input.autocomplete("search", "");
						});
			},
			_source : function(request, response) {
				var matcher = new RegExp($.ui.autocomplete
						.escapeRegex(request.term), "i");
				response((function(obj){
					var arr=[],count=0;
					obj.element.children("option").each(function(){
						var text = $(this).text();
						if (this.value
								&& (!request.term || matcher
										.test(text))){
							try{
								//设置最大匹配记录数
								var MAXCOUNT=obj.options.MAXCOUNT;
								if(MAXCOUNT&&!isNaN(MAXCOUNT)){
									if(++count>MAXCOUNT){
										return false;
									}
								}
							}catch(e){
								//do nothing
							}
							arr.push({
								label : text,
								value : text,
								option : this
							});
						}
					});					
					return arr;
				})(this));
			},
			_removeIfInvalid : function(event, ui) {
				// Selected an item, nothing to do
				if (ui.item) {
					return;
				}
				// Search for a match (case-insensitive)
				var value = this.input.val(), valueLowerCase = value
						.toLowerCase(), valid = false;
				this.element
						.children("option")
						.each(
								function() {
									if ($(this).text()
											.toLowerCase() === valueLowerCase) {
										this.selected = valid = true;
										return false;
									}
								});
				// Found a match, nothing to do
				if (valid) {
					return;
				}
				// Remove invalid value
				this.input
						.val("")
						.attr("title", "没有匹配到项目")
						.tooltip(Util.tooltip);
				this.input.mouseover();
				this.element.val("");
				this._delay(function() {
					this.input.tooltip("close").attr("title", "");
				}, 2500);
				this.input.data("ui-autocomplete").term = "";
			},
			_destroy : function() {
				this.wrapper.remove();
				this.element.show();
			}
		});
})(jQuery);

$(function() {
	$(".combobox").combobox();
});
if(!Util.isIE()){
	Util.addEvent("showActiveObject",function(obj){
		Util.showObject(obj);
	});
}
var openUpdUrl=function(){
	if(Util.isMacOSRequest()){
		location.href=Util.getFullPath("download/BocomEdit.2.0.dmg");	
	}else if (Util.oldSafeInput && Util.isIE()) {
		location.href=Util.getFullPath("download/BocomSetupInput.exe");
	} else {
		location.href=Util.getFullPath("download/BocomSetupInput3.0.exe");
	}
	
}
//修复IE中表格右侧双实线
$(function(){
			  if($(".form-table").length>0){
       $(this).children("tbody,thead").find("th:only-of-type").css("border-right","none");
        $(this).find("tr td:last-child").not("table").css("border-right","none");
    }});

function setFundRateColor(){
	var reg = RegExp(/^([-]{0,1})(([0-9]{1}\d{0,14})|([0]{1}))(\.(\d){1,4})?$/);
	$(".rateColor").each(function(i){
		var txt = $.trim($(this).text());
		if(reg.test(txt)){
			var val = parseFloat(txt);
			if(val > 0){
				$(this).addClass("hongse-12-b");
			}else if(val < 0){
				$(this).addClass("lvse-12-b");
			}else{
				$(this).addClass("heise-12-b");
			}
		}
	});
}