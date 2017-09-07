function show()  //显示隐藏层和弹出层
{
   var hideobj=document.getElementById("hidebg");
   hidebg.style.display="block";  //显示隐藏层
   document.getElementById("hidebox").style.display="block";  //显示弹出层
}
function hide()  //去除隐藏层和弹出层
{
   document.getElementById("hidebg").style.display="none";
   document.getElementById("hidebox").style.display="none";
}
//redirect_uri: "https://passport.csdn.net/account/weixin?qr=true%26rebindWX%3dtrue%26from%3dhttp%3a%2f%2fwww.baidu.com",
var obj = new WxLogin({
	id:"wxqr", 
	appid: "wx0ae11b6a28b4b9fc", 
	scope: "snsapi_login",
	redirect_uri: "https://passport.csdn.net/account/weixin?qr=true",
	state: "csdn",
	style: "white",
	href: "https://passport.csdn.net/css/replace-wx-style.css"
});