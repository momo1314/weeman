ConfigCtrl.$inject = [ '$rootScope'];
function ConfigCtrl($rootScope) {
	//***************************************广告URL*********************************************//
	$rootScope.$$urlPrefix='https://mkt.cmbc.com.cn/dgserver/loadAdvertisements.do';	
	//*******************************************************************************************//
	
	//***************************************交易评分*******************************************//
	$rootScope.$$urlTransGrade='https://mkt.cmbc.com.cn/dgserver/PageStatisticsRecord.do';	
	//*******************************************************************************************//
	
	//***************************************客户之声*******************************************//
	$rootScope.$$urlCusVioce='https://mkt.cmbc.com.cn/dgserver/loadSurveys.do';
	
	//*******************************************************************************************//
	
	//***************************************在线客服URL*****************************************//
	//$rootScope.$$onlineURL='http://202.9.0.77:80/webstat/msWebcalllogin.html?type=1';
	//*******************************************************************************************//
	
	//***************************************地图URL*********************************************//
	//$rootScope.$$MapJSURL='http://api.map.baidu.com/getscript?key=&v=1.2&key=&services=true&t=11111111';
	//$rootScope.$$MapCssURL='//api.map.baidu.com/res/12/bmap.css';
	//*******************************************************************************************//
	
	//***************************************外汇控件推送地址*************************************//
	$rootScope.$$ForexAddr='autd.cmbc.com.cn/wqs/ocx';
	//*******************************************************************************************//
	
	//***************************************纸金银控件推送地址***********************************//
	$rootScope.$$GoldAddr='autd.cmbc.com.cn/wqsClientXau/wqs/ocx';
	//***************************************黄金实物*******************************************//
	$rootScope.$$urlGold='https://mkt.cmbc.com.cn/advimages';
	//***************************************图片服务器图片目录*******************************************//
	$rootScope.$$urlMKTPath='https://mkt.cmbc.com.cn/advimages/';
	//*******************************************************************************************//
	
}
//***************************************贵金属控件推送地址***********************************//
TGoldAddr='autd.cmbc.com.cn/AuTD/config';
//*******************************************************************************************//

//***************************************积存金控件推送地址***********************************//
StoreGoldAddr='autd.cmbc.com.cn/kau/config';
//*******************************************************************************************//

//cmbc begin
//控件安装程序
var downloadCsp86="CMBCIE32.exe";
var downloadCsp64="CMBCIE64.exe";
var downloadnpCsp="CMBCPlugin.exe";
//批量文件生成工具
var downloadBatchTool="CMBC_Setup_64_x86.exe";
//外汇、贵金属、纸金银控件
var downloadForexOcx="CmbcFxvtSetup.exe";
//静态资源下载地址
var staticDownLoadsafe = "https://dld.cmbc.com.cn/dld/";
var CDNDownLoadsafe="http://assist.cmbc.com.cn/";
//证书更新下载地址
var staticUrl = "https://dld.cmbc.com.cn/pstatic/";
var cspOkVersion = "3.2.1.3";//签名控件版本号
var subjectDNFilter = "CN=95568#CN=0305#OU=CMBC";//DN过滤条件
var issuerDNFilter = "OU=Customers#OU=Individual";//颁发者过滤条件
//CSP列表
var strSM2CSPName="EnterSafe ePass2000Auto CSP For CMBC Enterprise V1.0||CMBC CSP V1.0||CMBC HaiTai Cryptographic Service Provider||CMBC HaiTai Cryptographic Service Provider V2.0|| CMBC EnterSafe CSP V2.0||CMBC HaiTai Cryptographic Service Provider V3.0||CMBC StarKey 220m CSP||EnterSafe CSP For CMBC V1.0||EnterSafe CSP For CMBC V2.0||Watch CSP for CMBC V1.0||FTSafe CSP For CMBC V1.0||UranuSafe CSP For CMBC V1.0||CMBC EnterSafe CSP v1.0||CBox FOR CMBC Admin UKEY CSP v1.1.0||Microsoft Enhanced Cryptographic Provider v1.0||CFCA CSP V3.0";

var demoURL="https://dld.cmbc.com.cn/dld/pweb/rukou.html"
//老网银贵宾版URL
var oldVipPerUrl = "https://business.cmbc.com.cn/index_Private_pri.html";
//老网银大众版URL
var oldPublicPerUrl = "https://ebank.cmbc.com.cn/index_NonPrivate.html";
//老网银商户版URL
var oldBusinessPerUrl = "https://smes.cmbc.com.cn/login.jsp";
//老网银U宝弹出页面URL
var oldUKeyURL='https://business.cmbc.com.cn/index_Private.html';
//旧版UIURL
var oldUIURL="https://per.cmbc.com.cn/pweb/static/";
//cmbc end
