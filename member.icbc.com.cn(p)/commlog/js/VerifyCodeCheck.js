/**
 * Created by kfzx-xingxx on 16-2-19.
 */


var verifyflag=0;
var verifyErrorCount=1;
var xmlhttp = null;
function getXmlHttp()
{
    if (window.XMLHttpRequest)
    { // Mozilla, Safari,...
        xmlhttp = new XMLHttpRequest();
        if (xmlhttp.overrideMimeType)
        {
            xmlhttp.overrideMimeType("text/xml");
        }
    } else if (window.ActiveXObject)
    { // IE
        try
        {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e)
        {
            try
            {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!xmlhttp)
    {
        alert("您的浏览器不支持XML请求");
        return false;
    }
    return xmlhttp;
}
function checkVerifyCode()
{
    xmlhttp=getXmlHttp();
    var url = '';
    var validate=document.getElementById("validate").value;
    
    //validate = encodeURIComponent(validate);
    validate = encodeURIComponent(validate);
    validate = escape(validate);
    url="/servlet/com.icbc.portal.commlog.servlets.CheckVerifyCodeServlet?inputcode="+validate + "&randomId=" + document.getElementById("randomId").value;
    xmlhttp.onreadystatechange = afterCheckVerifyCode;
    xmlhttp.open("POST",url,false);
    xmlhttp.setRequestHeader('Content-Type', 'charset=GBK;application/x-www-form-urlencoded;');
    xmlhttp.send(null);
}
function afterCheckVerifyCode()
{
    if(xmlhttp.readyState == 4)
    {
        if (xmlhttp.status == 200)
        {
            var reText=xmlhttp.responseText;
            if(reText=="true")
            {
                //document.getElementById("resultarea").innerHTML="验证码输入正硄1�7";
                verifyflag=1;
            }
            else if(reText=="false")
            {
                // document.getElementById("resultarea").innerHTML="验证码输入错误，请重新输兄1�7";
                verifyflag=0;
            }
            else if(reText=="change")
            {
                //document.getElementById("resultarea").innerHTML="验证码输入错误，请更换一张再评1�7";
                verifyflag=0;
            }
        }
    }

}