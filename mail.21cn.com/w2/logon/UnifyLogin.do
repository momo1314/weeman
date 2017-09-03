
    





































<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>调用登录框</title>
<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />
<meta name="apple-touch-fullscreen" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=no" />
<meta property="qc:admins" content="425113751101636" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!--360浏览器基于Webkit内核浏览-->
<meta name="render" content="webkit">
<!-- 清除缓存 -->
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<!-- 图标 -->




    <script type="text/javascript">
        var isHttps = 'https:' == document.location.protocol ? true : false;
        if(isHttps) {
            var link = document.location.toString();
            var params = "";
            if(link.indexOf("?")>0){
                params = link.substring(link.indexOf("?"));
            }
            document.location.href = "http://e.189.cn/index.do" + params;
        }
    </script>
    <!--[if lt IE 9]>
    <script src="http://static.e.189.cn/open/js/libs/html5shiv.js"></script>
    <script src="http://static.e.189.cn/open/js/libs/respond.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="http://static.e.189.cn/open/stylesheets/passport/login/login_iframeV2_forFreemail.css">
    <!--[if lte IE 8]>
    <link rel="stylesheet" href="http://static.e.189.cn/open/stylesheets/passport/account/login_ie8.css">
    <![endif]-->
    <!--[if lte IE 7]>
    <link rel="stylesheet" href="http://static.e.189.cn/open/stylesheets/passport/account/login_ie7.css">
    <![endif]-->
</head>
<body id="body" >
<!--[if lte IE 6]>
<style>
    .login-box {overflow: hidden;}
    .login-type .switch .web-login .switch_btn {width: 149px;}
    .login-box .ui-switchable-content {height: auto;}
    .ft p{height:40px;}
    .login-type .switch .phone-login .switch_btn {float: none;}
    .hcenter .ui-form-item-error {position: absolute;top: 85px;left: -92px;}
    .codeAlert{position: absolute;height:38px;left:0;}
</style>
<![endif]-->
<!--[if lte IE 10]>
<style>
    input::-ms-clear,input::-ms-reveal {display: none; /* For ie10+ */}
</style>
<![endif]-->
<!-- 去掉警告 IE7
<div id="ie6update-bar">
    <div class="bd">您现在使用的浏览器版本过低，可能会导致部分图片和信息的缺失。请立即
        <a href="http://www.microsoft.com/china/windows/IE/upgrade/index.aspx" target="_blank">免费升级</a> 或下载使用
        <a href="https://www.google.com/chrome/browser/" target="_blank">Chrome浏览器</a> 。
    </div>
</div>
<![endif]-->
<iframe name="loginIframe" style="display:none;"></iframe>
<div class="login-box login-box-commonLogin" id="j-login-box">

    <div class="login-box-inner bgfff" id="J_login_tab_box">
        <div class="ui-switchable-content fn-clear" id="J_login_tab" style="position: relative; width: 9999px; left: -320px;">
              <div id="J_login_tab_trigger"></div>
            <!-- commonLoginTab -->
            <div class="tab-cnt" id="commonLoginTab">
                <div class="hd login-box-bd hcenter">
                    <img class="main-img" src="http://static.e.189.cn/open/images/img-login/tianyi_logo1.png"  />
                    <div id="J_form_explain" class="ui-form-item-error">
                        <div class="alert alert-danger"></div>
                    </div>
                    <span id="clear_login_icon" class="clear"></span>
                </div>
            <div class="bd login-box-bd">
            <!-- 替换form 地址-->
            <form class="ui-form" name="loginForm" action="https://open.e.189.cn/api/common/loginSubmit.do" method="post" target="loginIframe"  id="loginForm">
<!--             <input type="hidden" name="submitAction" value="submit" /> -->
            <input type="hidden" name="clientType" value="" />
            <input type="hidden" name="accountType" value="02" />
            <input type="hidden" name="appId" value="8013411507" />
            <input type="hidden" name="returnUrl" value="http://mail.21cn.com/w2/logon/unifyPlatformLogonReturn.do?LSID=aWWUio3jlxwbZgbsa5">
<!--             <input type="hidden" name="mail" value="@189.cn"> -->
            <input type="hidden" name="captchaToken" id="j_captchaToken" value="">
            <input type="hidden" name="ValidateCode" id="h_j_code" value="">
            <div class="ui-form-item ui-1-item" id="j_delName">
            <input type="text" class="ui-input tianyi-user-input" autocomplete="off"  placeholder="21CN邮箱账号" id="userName" name="userName" value=""/>
            <i class="delete" id="j-common-delete"></i>
            <span id="userNameMsg"></span>
            </div>
            <div class="ui-form-item ui-2-item">
            <input type="password" class="ui-input password-input" placeholder="密码" id="password" name="password" value="">
            <i class="delete" id="j-psw-delete"></i>
            </div>
            
            <div class="ui-form-item ui-form-btn ">
	            <button class="ui-button login-button  c-ff8400" type="submit" id="b-logon">登 录</button>
            </div>


            <div class="ui-form-item ui-msg-item fn-left">
            
            </div>
            <p class="ui-form-item ui-msg-item fn-right">
            <a href="https://e.189.cn/getPassword.do?returnUrl=" target="_blank">忘记密码</a>

            </p>

            </form>
            </div>
            </div>
            <!-- mobileLoginTab -->
            <div class="tab-cnt" style="display: none " id="mobileLoginTab">
                <div class="login-type">
                <div class="switch">
                    <div class="phone-login msg-auth">
                    <span class="go-back" id="j-msg-back"><i></i>返回</span>
                    <div class="switch_btn">短信验证码登录</div>
                    </div>

                </div>
            </div>
                <div class="bd login-box-bd">
                    <div class="mobileLogin-tip">
                    仅支持中国大陆手机用户
                    </div>
                <form class="ui-form" name="smsLoginForm" action="https://open.e.189.cn/api/common/loginSubmit.do" style="position:relative" method="post" target="loginIframe"  id="smsLoginForm">
				<input type="hidden" name="accountType" value="02" />
				<input type="hidden" name="dynamicCheck" value="TRUE" />
				<input type="hidden" name="appId" value="8013411507" />
				<input type="hidden" name="returnUrl" value="http://mail.21cn.com/w2/logon/unifyPlatformLogonReturn.do?LSID=aWWUio3jlxwbZgbsa5" />
				<input type="hidden" name="clientType" value="" />
                <div class="j_form_explain_dynamic ui-form-item-error" >
                <div class="alert alert-danger"></div>
                </div>
                <div class="ui-form-item ui-1-item" >
                <input autocomplete="off" type="text" class="ui-input tianyi-user-input"
                placeholder="手机号"
                id="dynamicUserName" name="userName" value="" tabindex="-1" />
                <i class="delete" id="j-msg-delete"></i>
                </div>
                <div class="ui-form-item ui-2-item" >
	                <input type="text" style="width: 128px;" class="ui-input password-input" placeholder="验证码" id="dynamicPassword"	 name="password" tabindex="-1">
	                <span id="verifyCode_msg" class="send-msg-code">发送动态密码</span>
                </div>
                
                <div class="ui-form-item">
                	<button class="ui-button login-button  c-ff8400" type="submit" id="dynamicLogon"  tabindex="-1">登 录</button>
                </div>
                </form>
                </div>

            </div>
            <!--验证码-->
            <div class="tab-cnt v-code-tab" id="captchaLoginTab">
                <div class="login-type">
                    <div class="switch">
                        <div class="phone-login code-auth ">
                            <span class="go-back" id="j-code-back"><i></i>返回</span>
                            <div class="switch_btn">安全验证</div>
                        </div>
                    </div>
                </div>
                <div class="bd login-box-bd v-code-box">
                    <p class="v-code-tpis">检测到您的账号存在安全风险，为确保账号安全，请完成以下验证：</p>
                </div>
                <div class="bd login-box-bd " style="margin-bottom: 10px;position:relative;">
                    <div id="code_form_explain"  class="ui-form-item-error"  >
                        <div class="alert alert-danger"></div>
                    </div>
                    <div class="ui-form-item ui-1-item">
                        <input autocomplete="off" type="text" class="ui-input tianyi-vcode-input" placeholder="请输入验证码" id="J_code" name="ValidateCode"  value=""  />
                        <span id="userNameMsg"></span>
                    </div>
                    <div class="ui-form-item  ui-form-code" id="J_er_code_sec" >
                        <div class="img-frame">
                            <span id="Captcha" ></span>                      
                            <a class="change-code" href="javascript:reloadCaptcha();" id="J_b_change_code">看不清，换一张</a>
                        </div>
                    </div>
                    <div class="ui-form-item " style="padding: 15px 5px 0px 0px;">
                        <!-- id="safety_login_btn"-->
                        <button class="ui-button login-button safety-login-btn c-ff8400" type="button" id="logon2" >确 定</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="ft login-box-bd" id="login-box-ft">
            <p class="fn-right">
                <a href="https://e.189.cn/register.do?returnUrl=&amp;appKey=8013411507" target="_blank">注册</a>
                <span class="sep">|</span>
                <a href="http://e.189.cn/help/feedback.do"  target="_blank">意见反馈</a>
            </p>
        </div>
    </div>
</div>
<script>
var basePageInfo = {

}
</script>
<script type="text/javascript">
    var pageInfo=window.pageInfo||{};
    pageInfo.showDivIndex = 1;//0-二维码登录或只有一个tab,1-普通登录
    pageInfo.checkCodeLoginUrl='http://open.e.189.cn/api/qrCode/getUUID.do';
    pageInfo.qrCodeLoginUrl='http://open.e.189.cn/api/qrCode/image.do';
    pageInfo.qrCodeLoginIframeUrl='http://open.e.189.cn/api/qrCode/qrcodeLoginCheck.do?appId=8013411507&timeStamp=2017-09-02+09%3A50%3A18&returnURL=http%3A%2F%2Fmail.21cn.com%2Fw2%2Flogon%2FunifyPlatformLogonReturn.do%3FLSID%3DaWWUio3jlxwbZgbsa5&clientType=1';
    pageInfo.qrCodeLoginStateUrl='http://open.e.189.cn/api/qrCode/qrcodeLoginState.do?appId=8013411507&timeStamp=2017-09-02+09%3A50%3A18&returnURL=http%3A%2F%2Fmail.21cn.com%2Fw2%2Flogon%2FunifyPlatformLogonReturn.do%3FLSID%3DaWWUio3jlxwbZgbsa5&clientType=1';
    pageInfo.needcaptchaUrl='http://open.e.189.cn/api/common/needcaptcha.do?appId=8013411507';
    pageInfo.getCaptchaHtmlUrl='/api/common/getCaptchaHtml.do';
    pageInfo.captchaSrc='/api/common/picCaptcha.do';
    pageInfo.sendSmsCode='/api/common/sendSmsCode.do';
    pageInfo.hasAt=false;
    pageInfo.appId='8013411507';
    pageInfo.EmailExt=['21cn.com','vip.21cn.com','21cn.net','vip.21cn.net','fun.21cn.com'];
</script>
<script src="http://static.e.189.cn/open/js/libs/jquery/jquery/jquery.js"></script>
<script src="http://static.e.189.cn/open/js/libs/jquery-plugin/jquery-watermark/jquery.watermark.min.js"></script>
<script src="http://static.e.189.cn/open/js/plus/passport/loginv2/_flatformpage_forFreeMail.js"></script>
<script>
    $("a,button").focus(function(){this.blur()});
</script>

</body>
</html>