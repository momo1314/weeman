sinaSSOConfig = {};
(function() {
	var queryString = function(val){
		var uri = window.location.search;
		var re = new RegExp("" +val+ "=([^&?]*)", "ig");
		return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
    };
	var $ = function(id) {
		return document.getElementById(id);
	};
	var entry = queryString("entry");
	if (!entry) entry = $("e").value;
	if (!entry)	{
		entry = "sso";
	}
	this.entry = entry;
	this.service = entry; 
	this.setDomain = true;
	this.from = queryString("from");
	this.customInit = function() {
	}
	
	var pined = false;
	
	this.customLoginCallBack = function(loginStatus) {
		if (!loginStatus.result) {
			if ( loginStatus.errno == "4010"){
				loginStatus.reason = "帐号尚未激活，请<a href=\"/signup/signupmail1.php\">点此激活</a>";
			}
			//验证码错误或用户名密码错误
			if( loginStatus.errno === "2070" || loginStatus.errno === '101') {
				//重置验证码
				changePincode();
			}
			//异地登陆
			if( loginStatus.errno === "4049" ) {	
				var door = document.getElementById('door'),
					doorCon = document.getElementById('door_content');
				//清空验证码
				door.value = '';
				//重新激活验证字段
				door.disabled = false;
				//显示验证码
				doorCon.style.display = '';
				//设置验证码图片src
				var random = Math.floor( Math.random()*100000000 ) ;
				document.getElementById("check_img").src = "https://login.sina.com.cn/cgi/pin.php?r=" + random + "&s=0";
				pined = true;
				//设置提示信息
				loginStatus.reason = !!loginStatus.reason ? loginStatus.reason : "";				
			}
			//微盾动态码
			if( loginStatus.errno === '5025' || loginStatus.errno === '5024' ) {
				var vdun = document.getElementById('vsn_content'),
					vsncode = document.getElementById('vsncode'),
					username = document.getElementById('username'),
					password = document.getElementById('password');
                if( vdun.style.display === 'none' ) {
                    vdun.style.display = '';                                                                           
                    username.setAttribute('readonly', 'true');
					password.setAttribute('readonly', 'true');                                                                                 
				}  
				vsncode.disabled = false;
				loginStatus.reason = !!loginStatus.reason ? loginStatus.reason : "";
			}
			//加上判断条件的目的是之前显示错误状态时没有加icon,现在有了icon,当msg返回为空时,icon会出现。
			if(loginStatus.reason != ""){
				if(loginStatus.errno ==='2089'){
					document.getElementById("login_err").innerHTML = '<span class= "form_prompt" style="margin-left:0"><i class="W_icon icon_rederrorS"></i>'+'<i>'+"您已开启登录保护，请查收@微博安全中心发来的私信，按提示完成登录。"+"<a href='http://kefu.weibo.com/faqdetail?id=20200' target='_blank'>查看帮助</a>"+'</i></span>';
				}else{
					document.getElementById("login_err").innerHTML = '<span class= "form_prompt" style="margin-left:0"><i class="W_icon icon_rederrorS"></i>'+'<i>'+loginStatus.reason+'</i></span>';
				}
			}
		} else {
			var remLoginName = document.getElementById("remLoginName");
			if (remLoginName) {
				if(remLoginName.checked) {
					setCookie("cREMloginname",encodeURIComponent(document.getElementById("username").value),30*24*3600);
				} else {
					deleteCookie("cREMloginname");
				}
			}
			var saveState = document.getElementById("savestate");
			if(saveState){
				if(saveState.checked){
					setCookie("cSaveState",encodeURIComponent(document.getElementById("username").value),10*366*30*24*3600);
				} else {
					setCookie("cSaveState","0",10*366*30*24*3600);
				}
			}
			
			var url = getReturnUrl();
			if (this.crossDomain) {
				window.location.replace(url);
				return true;
			}
			window.location.replace("https://login.sina.com.cn/crossdomain2.php?action=login&r=" + encodeURIComponent(url));
		}
	};
	this.customLogoutCallBack = function(logoutStatus) {
		//用户退出后的操作
	};
	var getReturnUrl = function() {
		var returnUrl =  document.getElementById("r").value;
		if (returnUrl) return returnUrl;

		if(sinaSSOController.getSinaCookie()){
			var uid = sinaSSOController.getSinaCookie()["uid"];
		}
		switch (sinaSSOController.entry) {
			case "mblog" :
				returnUrl = "http://blog.sina.com.cn/u/" + uid;
				break;
			case "nphoto":
				returnUrl = "http://blog.sina.com.cn/" + uid + "/home";
				break;
			default:
				returnUrl = "https://login.sina.com.cn/";
		}
		return returnUrl;
	};
	//cookie 函数
	var setCookie = function (name, value, time) { 
		var expdate = new Date(); 
		expdate.setTime(expdate.getTime() + time); 
		document.cookie = name + "=" + value + "; expires=" + expdate.toGMTString() + ';path=/'; 
	};
	var deleteCookie = function(name) { 
		var expdate = new Date(); 
		expdate.setTime(expdate.getTime() - (86400 * 2000 * 1)); 
		document.cookie = name + "=; expires=" +expdate.toGMTString() + ';path=/'; 
	};
	var changePincode = function() {
		if( pined ) { 
			var random = Math.floor( Math.random()*100000000 ) ;
			var pin = document.getElementById("check_img");
			pin.src = "https://login.sina.com.cn/cgi/pin.php?r=" + random + "&s=0";
		}
	}
}).call(sinaSSOConfig);
