// <!-- cmbc begin -->
var cspTestFlag = true;//控件检查是否通过
var cspUpdName = "";//U宝驱动升级CSP名称
var certDN = "";
var firstFreshFlag = true;
var _IsMacFlag = false;
var pgeditorChar = null;
var UbaoTestFlag = false;
_IsMacFlag = navigator.platform.indexOf("Mac")>=0 || navigator.platform.indexOf("iPad")>=0 || navigator.platform.indexOf("iPod")>=0 || navigator.platform.indexOf("iPhone")>=0;
var userAgentSys = navigator.userAgent;
_IsWin10Flag= userAgentSys.indexOf("Windows NT 6.4")>-1 || userAgentSys.indexOf("Windows NT 10")>-1;
_IsWin64Flag= userAgentSys.indexOf("Win64")>=0 || userAgentSys.indexOf("WOW64")>=0;
_IsChrome=userAgentSys.indexOf("Chrome")>=0;
vx.module('ui.config', []).value('ui.config', {});
vx.module('ui.libraries', ['ui.config']);
vx.module('ui', ['ui.libraries','ui.config']);
vx.module('ui.cert', ['ui.libraries','ui.config']);
vx.module('clogin', ['ui.cert','ui.config']);
var directive={};
directive.loginPassword=[
                   	  function(){
                   		  pgeditorChar = new PGEdit({
                   			  pgeId: "_ocx_passwordChar_login",// 控件ID
                   			  pgeEdittype: 0,// 控件类型,0星号,1明文
                   			  pgeHasskb:"0",// 是否启用软键盘1启用/0不启用
                   			  pgeType:20,// 密码长度及类型
                   			  pgeTabindex: 2,// tab键顺序
                   			  pgeClass: "ocx_style",// 控件css样式
                   			  pgeOnkeydown:"authenticateUser()",// 回车键响应函数
                   			  tabCallback:"_vTokenName"	  
                   		  });
                   		  return {
                   			  name:'loginPassword',
                   			  restrict:'C',
                   			  controller:['$scope', '$element',function($model, element){
                   				  var password=vx.element(pgeditorChar.load());
                 				  element.replaceWith(password);
                 				  pgeditorChar.pgInitialize();
                   				  $model.pgeditorChar_login=pgeditorChar;
                   			  }]
                   		  };
                     }];
vx.module('ui.libraries').directive(directive);
vx.module('ui.cert').run([function() {
	if(!_IsMacFlag){
		//签名控件是否安装判断
		var objActivex = cryptokit_control.checkIsInstalled();
		if(objActivex.result != 0){
			if(_IsChrome){
				$(".chromeTips").show();
			}
			cspTestFlag = false;
			showCspUpdate();
			return;
		}else{
			//签名控件版本判断
			var objVersion=cryptokit_control.getVersion();
			var objVer=objVersion.val.split('.');
			var cspOkVer=cspOkVersion.split('.');
			if(objVer[0] != cspOkVer[0] || objVer[1] != cspOkVer[1]){
				cspTestFlag = false;
				showCspUpdate();
				return;
			}else{
				//初始化检测Key插拔事件
				cryptokit_control.setSM2CSPName(strSM2CSPName);
				var ret = cryptokit_control.initKeyDetector();
                if (0 != ret.result) {
                   // throw ret.val;
                }
			}
			
		}
		if(_IsWin10Flag && PGEdit.prototype.getVersion()!='1.0.0.4' && !_IsWin64Flag){
			cspTestFlag = false;
			showCspUpdate();
			return;
		}
		var eDiv = document.createElement("div");
		if (checkIsIE()) 
		{
			if (window.navigator.cpuClass == "x86") 
			{
				eDiv.innerHTML = '<object ID="cmbcocx" classid="clsid:953BEA4E-DF2C-444A-BBB3-856DDB1CC33E" border="0" width="0" height="0"/>';
			}
			else 
			{
				eDiv.innerHTML = '<object ID="cmbcocx" classid="clsid:953BEA4E-DF2C-444A-BBB3-856DDB1CC33E" border="0" width="0" height="0"/>';
			}
		}
		else 
		{
			eDiv.innerHTML = '<embed id="cmbcocx" name="cmbcocx" type="application/CMBC" style="height: 0px; width: 0px"></embed>';
		}
		document.body.appendChild(eDiv);
		
		try{
			document.getElementById("cmbcocx").GetFileVersion()
		}catch(e){
	        if (checkIsIE()) {
	            if (window.navigator.cpuClass == "x86") {
	            	eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.CMBC.UKeyCheck.x86.cab\" classid=\"clsid:2A1526A1-C875-4870-A144-8AA239A256BB\" ></object>";
	            }
	            else {
	            	eDiv.innerHTML = "<object id=\"CryptoAgent\" codebase=\"CryptoKit.CMBC.UKeyCheck.x64.cab\" classid=\"clsid:236FE3BC-B5FF-41D6-AE83-D4D8810209E2\" ></object>";
	            }
	        }
	        else {
	        	eDiv.innerHTML = "<embed id=\"CryptoAgent\" type=\"application/npCryptoKit.CMBC.UKeyCheck.x86\" style=\"height: 0px; width: 0px\">";
	        }
	        document.body.appendChild(eDiv);
		}					
	}
	$("#tishi").mouseenter(function() {
		$("#tishi_test").fadeIn(500);
	}).mouseout(function() {
		$("#tishi_test").fadeOut(500);
	});
}]);
function showCspUpdate(){
	$("#cLoginPassWord").hide();
	$(".bg_shadow").css("height",function(){
		return window.screen.height;
	});
	$(".bg_shadow").show();
	$("#bg_shadow").bgiframe2().show();
	$(".tips-box.cspupdate").show();
	return false;
}
function downloadCsp(){
	if(_IsMacFlag){
		window.location.href=staticDownLoadsafe+'CMBCEdit.pkg';
	}else{
		if (checkIsIE()) {
		    if (window.navigator.cpuClass == "x86") {
		    	  window.location.href=staticDownLoadsafe+''+downloadCsp86;
		    }
		    else {
		    	window.location.href=staticDownLoadsafe+''+downloadCsp64;
		    }
		 }else{
			 window.location.href=staticDownLoadsafe+''+downloadnpCsp;
		 }
	}
}
function showUbaoUpdate(u){
	UbaoTestFlag = true;
	$("#cLoginPassWord").hide();
	$(".bg_shadow").css("height",function(){
		return window.screen.height;
	});
	$(".bg_shadow").show();
	$("#bg_shadow").bgiframe2().show();
	$(".tips-box.ubaoupdate").show();
	
//	$(".login_guanbi").bind("click",function(){
//		closeUbaoUpdate(true);
//	});
	cspUpdName = u.cspCompany;
	return false;
}
function closeUbaoUpdate(flag){
	UbaoTestFlag = false;
	$("#cLoginPassWord").show();
	$(".bg_shadow").hide();
	$("#bg_shadow iframe").remove();
	$(".tips-box.ubaoupdate").hide();
	if(loginCtrl && flag){
		loginCtrl.prototype.passGuardInit();
	}
}
function updCsp(){
	//U宝驱动更新
	if(cspUpdName == 'feitian'){
		window.location.href=staticDownLoadsafe+"cmbc_ft11.exe";
	}else if(cspUpdName == 'feitianepass'){
		window.location.href=staticDownLoadsafe+"CMBCCSP.exe";
	}else if(cspUpdName == 'hengbao'){
		window.location.href=staticDownLoadsafe+"CMBCCSP.exe";
	}else if(cspUpdName == 'haitai'){
		window.location.href=staticDownLoadsafe+"cmbc_ht.exe";
	}else if(cspUpdName == 'guomi'){
		window.location.href=staticDownLoadsafe+"cmbc_gm.exe";
	}else if(cspUpdName == 'jiede' || cspUpdName == 'haitaivip'){
		alert("该U宝型号网银已不支持，您可以到柜面更换U宝。");
	}else{
		alert("未找到最新驱动，您可以联系银行科技人员来解决此问题！");
	}
}
function downloadHelpWorld(){
	window.open("loginHelper.html");
}
function chromeHelper(){
	window.open("loginChromeHelper.html");
}
function downLoadStatic(exeName){
	if(exeName){
		if(exeName=='CryPto'){
			downloadCsp();
		}else if(exeName=='CSP'){
			window.open(staticUrl+'static/cspDownloaFBAZ.html');
		}else if(exeName=='certDownLoad'){
			window.open(staticUrl+'static/certdownloadmain.html');
		}else{
			window.location.href=staticDownLoadsafe+''+exeName;
		}
	}
}
function downLoadCDNStatic(exeName){
	window.location.href=CDNDownLoadsafe+''+exeName;
}
// <!-- cmbc end -->
function toRegister(){
	window.location.href="registermain.html";
}
function OpenCardOnline(){
	window.location.href="OpenCardOnline.html";
}
//常用下载
function comDownload(){
	loginLayer('xiazai');
}
//登录指引
function loginWay(){
	loginLayer('zhiyin');
}
//在线客服
function OnLineService(){
	window.open("http://webchat.cmbc.com.cn:7001");
}
function OpenAccount(){
	window.open("https://www.mszxyh.com/peweb/CmbcDBankIndexDB.do?pid=DEPO&cid=0200902052");
}
//在线杀毒
function shadu(){
	$("#cLoginPassWord").hide();
	$(".bg_shadow").show();
	$("#bg_shadow").bgiframe2().show();
	$(".tips-box.shadu").show();
	$(".tips-box-guanbi,#shadugb").bind("click",function(){
		$("#cLoginPassWord").show();
		$(".bg_shadow").hide();
		$("#bg_shadow iframe").remove();
		$(".tips-box.shadu").hide();
	});
}
//安全提示
function safe(){
//	$("#cLoginPassWord").hide();
	$(".bg_shadow").show();
	$("#bg_shadow").bgiframe2().show();
	$(".tips-box.safety-tips").show();
	$(".tips-box-guanbi").bind("click",function(){
//		$("#cLoginPassWord").show();
		$(".bg_shadow").hide();
		$("#bg_shadow iframe").remove();
		$(".tips-box.safety-tips").hide();
	});
}
function demoOpen(){
	window.open(demoURL);
}
function oldPerOpen(){
//	$("#cLoginPassWord").hide();
	$(".bg_shadow").show();
	$("#bg_shadow").bgiframe2().show();
	$(".tips-box.laowangyin").show();
	$(".tips-box-guanbi").bind("click",function(){
//		$("#cLoginPassWord").show();
		$(".bg_shadow").hide();
		$("#bg_shadow iframe").remove();
		$(".tips-box.laowangyin").hide();
	});
}
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date()
exdate.setDate(exdate.getDate()+expiredays)
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

function checkBrowns(){
	if(navigator.appName.indexOf("Netscape")>=0){//火狐和chrome
		return false;
	}
	if(checkIsIE()){
		var start = navigator.appVersion.indexOf("MSIE")+5;
		var brownVersion = navigator.appVersion.substring(start,navigator.appVersion.length);
		brownVersion = brownVersion.substring(0,brownVersion.indexOf("."));
		if(brownVersion>=9){
			return false;
		}
	}
	return true;
}
//function wxtsSetCookie(){
//	var checkValue = $('.wxts :checked').val();
//	setCookie('login_wxts','1',7);
////	if(checkValue && checkValue=='1'){//用户在去掉勾选
////		setCookie('login_wxts','0',null);
////	}else{//用户在勾选
////		
////	}
//}
//提示触发
$(function() {
	$(".bg_shadow").css({
		width : $('body').width()+'px',
		height :parseInt(window.screen.availHeight)+'px'
	})
//	var wxtsFlag = getCookie('login_wxts');
//	var checkBrownsFlag = checkBrowns();
//	if(wxtsFlag != '1' && checkBrownsFlag){
//		$(".wxts").show();
//		$(".wxts_gb").click(function(){
//			$(".wxts").hide();	
//		})
//		$('.wxts').hcheckbox();
//	}
});
function oldVipPerOpen(){
	window.location.href=oldVipPerUrl;
}
function oldPublicPerOpen(){
	window.location.href=oldPublicPerUrl;
}
function oldBusinessPerOpen(){
	window.location.href=oldBusinessPerUrl;
}
function loginShowNotice(){
	window.open('dwgg.html','公告','height=500,width=900,scrollbars=yes');
}
//公告
showNoticeContent = function(notice){
	$("#noticeName").html(notice.NoticeName);
	$("#noticeContent").html(notice.NoticeContent);
	$("#cLoginPassWord").attr('style','visibility:hidden');
	$(".bg_shadow").show();
	$("#bg_shadow").bgiframe2().show();
	$(".tips-box.notice").show();
	$(".tips-box-guanbi,#noticeClose").bind("click",function(){
		$("#cLoginPassWord").attr('style','');
		if(cspTestFlag || UbaoTestFlag){
		$(".bg_shadow").hide();
		$("#bg_shadow iframe").remove();
		}
		$(".tips-box.notice").hide();
		$("#noticeClose").unbind("click");
		$(".tips-box-guanbi").unbind("click");
	});
}
//浮层公共方法
function loginLayer(key){
	$("#cLoginPassWord").attr('style','visibility:hidden');
	$(".bg_shadow").show();
	$("#bg_shadow").bgiframe2().show();
	$(".tips-box."+key).show();
	$(".login_guanbi").bind("click",function(){
		$("#cLoginPassWord").attr('style','');
		$(".bg_shadow").hide();
		$("#bg_shadow iframe").remove();
		$(".tips-box."+key).hide();
		$(".tips-box-guanbi").unbind("click");
	});
}
getParameter = function(key){
	var url=window.location.href;
	var reg=new RegExp("(^|&)"+key+"=([^&]*)(&|$)","i");
	var r=window.location.search.substr(1).match(reg);
	return (r!=null)?r[2]:null;
}
window.onresize=function(){
	$(".bg_shadow").css({
		width : $('body').width()+'px',
		height :parseInt(window.screen.availHeight)+'px'
	});
}
function checkIsIE(){
	var userAgent = navigator.userAgent, 
	rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
	var ua = userAgent.toLowerCase();
	var match = rMsie.exec(ua);
	if (match != null) {
	    return true;
	}else{
	    return false;
	}
}