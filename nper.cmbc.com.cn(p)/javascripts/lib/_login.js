/**
 * @author ChenLin
 */
// <!-- cmbc begin -->
loginCtrl.$inject = ["$targets", "$scope", "$rootScope", "$http", "$window"];
function loginCtrl($targets, $model, $rootScope, $http, $window) {
	
	//公告
	 $model.showNotice = function(notice){
		 showNoticeContent(notice);
		 document.getElementById("noticeClose").focus();
	}
	
	$model.UserTokenCheck = function(submitFlag){
		$http.post('/pweb/UserTokenCheckCtrl.do', {}).success(function(u){
			if((u.errmsg || u.jsonError) && u.TokenCheckFlag==null) {
				$model.TokenShowFlag=true;
				$model.TokenCheckFlag=true;
			}else{

				$model.TokenShowFlag=u.TokenShowFlag;
				$model.TokenCheckFlag=u.TokenCheckFlag;
			}
				if(!submitFlag){
				if(_IsMacFlag){
					$model.toWriteStyle();
				}else{
					$model.toSelectStyle();//默认调用一次反显模式
				}}
				if(u.NoticeShowFlag && !submitFlag){
					$model.NoticeShowFlag=u.NoticeShowFlag;
					$model.NoticeList=u.NoticeList;	
					$model.CompelNoticeShowFlag=u.CompelNoticeShowFlag;
					$model.CompelNotice=$model.NoticeList[u.CompelNoticeIndex];
					if($model.CompelNoticeShowFlag && $model.CompelNotice!=null){
						$model.showNotice($model.CompelNotice);
					}
					}
				$model.LoginImgUrl=u.LoginImgUrl;
		});
	}
	$model.TokenShowFlag=false;
	$model.UserTokenCheck(false);
	
	var firstFreshFlag = true;
	$model.showFW = function(){
		if($("#showFWmsg")){
			$model.hideFW();
		}
		$("#fwMsg").html("<a href='#2' style='color: #0055AA;' id='showFWmsg'>防伪站信息</a>");
		$("#showFWmsg").bind("click",function(){
			$model.getUserId();
			var qryMap = {
				"UserId":$model.UserIdFW
			};
			$http.post("/pweb/CustomLabelQry.do",qryMap).success(function(u){
				if(u.errmsg || u.jsonError) {
					
				}else{
					if(u.Customlabel && !$("#trLabel")[0]){
						$model.Customlabel=u.Customlabel;
						$("#UserTbody").append('<tr id="trLabel"><td colspan="2" style="padding-left:5px;padding-top:8px;"><p style="width:200px;">'+u.Customlabel+'</p></td></tr>');
					}
				}
			});
			
		});
	}
	$model.hideFW = function(){
		$("#fwMsg").html("");
		$("#trLabel").remove();
	}
	//反显模式
	$model.toSelectStyle = function(){
		$model.error(null);
		if(!cspTestFlag){//控件未安装好
//			$model.toWriteStyle();
			return;
		}
		if(_IsMacFlag){
			$model.toWriteStyle();
			return;
		}
		//取DN
		var certSubjectDN = cryptokit_control.getCertsDN(subjectDNFilter,
				issuerDNFilter);
		if (certSubjectDN.result == 0) {
			//页面图片更改
			$(".slmorkh").hide();
			$(".slmorkh2").show();
//			$("#loginselectc1").show();
//			$("#loginselectc2").hide();
			$("#writeUserId").siblings("div").show();
			$("#writeUserId").hide();
			if(certSubjectDN.val != $model.certDN){//控件取出的DN与缓存DN不一致
				var oldDns = null;
				var newDn = null;
				if($model.certDN){
					oldDns = $model.certDN.split("|");
					newDn = certSubjectDN.val;
				}
				$model.certDN = certSubjectDN.val;
				// 根据certDN反显登录名
				$http.post('/pweb/LoginInStyle.do', {'CertNo' : $model.certDN,'PageRandom':$model.Random}).success(function(u){
					if(u.errmsg || u.jsonError) {
						$model.error(u.errmsg || u.jsonError[0]._exceptionMessage);
					}else{
						if(!$model.Random){
							//检查密码控件是否安装
							$model.pgeditorChar_login.pgInitialize();
							if($model.pgeditorChar_login.checkInstall() != true){
								showCspUpdate();
								return;
							}
							$model.pgeditorChar_login.pwdSetSk(u.RandNum);
							$model.Random = u.RandNum;
							if($model.TokenCheckFlag!=false){
							$("#_tokenImg").attr("src",'/pweb/GenTokenImg.do' + '?random=' + Math.random());
							}
							//$model.GenTokenImg = '/pweb/GenTokenImg.do' + '?random=' + Math.random();
						}
						if(u.List != null){
							$model.userList = u.List;
							var oWellSelect = $("#WellSelect");
							var oEm = document.createElement("em");
							oWellSelect.empty();
							if (u.List.length == 1) {
								oEm.innerHTML = u.List[0].UserId;
								oWellSelect.append(oEm);
								$model.watch(oEm.innerHTML);
							}else{
								if(oldDns){
									for(var i=0;i < oldDns.length;i++){
										newDn = newDn.replace(oldDns[i],'');
									}
									newDn = newDn.replace(/\|/g,'');
								}
								var oUl = document.createElement("ul");
								oUl.id="oUlId";
								var count = u.List.length;
								var _tempCheck = true;
								for(var i=0; i < u.List.length; i++){
									var oLi = document.createElement("li");
									oLi.innerHTML = u.List[i].UserId;
									oLi.id="oLi"+i;
									oUl.appendChild(oLi);
									if(newDn){
										if(u.List[i].CertNo==newDn){
											oEm.innerHTML = u.List[i].UserId;
											_tempCheck = false;
										}
									}
								}
								if(_tempCheck){
									oEm.innerHTML = u.List[0].UserId;
								}
								oWellSelect.append(oUl);
								oWellSelect.append(oEm);
								$model.watch(oEm.innerHTML);
							}
						}else{
							if(!firstFreshFlag){
								alert("未找到有效证书,请直接输入用户名登录或插入U宝并检查您的网银证书是否可用。");
							}else{
								firstFreshFlag = false;
							}
							$model.certDN = null;
							$model.toWriteStyle();
						}
					}
				});
			}else{
				$model.showFW();
				$model.UserIdStyle="select";
//				$model.UserTokenCheck(false);
			}
			$model.UserIdStyle="select";
		}else{
			$model.certDN = null;
			if(!firstFreshFlag){
				alert("未找到有效证书,请直接输入用户名登录或插入U宝并检查您的网银证书是否可用。");
			}else{
				firstFreshFlag = false;
			}
			$model.toWriteStyle();
		}
	}
	$("#WellSelect").bind("click", function(envent){
		$("#oUlId").show();
		if($(this).find("iframe").length==0){
			$("#oUlId").bgiframe2().show();
		}
		$("#oUlId li").bind("click",function(envent){
			$("em").text(this.innerHTML);
			$("#oUlId").hide();
			$("#oUlId iframe").remove();
			$("#jsonErrorShow").hide();
			$model.watch(this.innerHTML);
			envent.stopPropagation();
			$("#oUlId li").unbind("click");
		});
		envent.stopPropagation();
	});
	$("body").bind("click",function(){
		$("#oUlId").hide();
		$("#oUlId iframe").remove();
		$("#oUlId li").unbind("click");
	});
	//录入模式
	$model.toWriteStyle = function(){
		
		$(".slmorkh2").hide();
		$(".slmorkh").show();

		$("#writeUserId").siblings("div").hide();
		$("#writeUserId").show();
		if(cspUpdName){
			closeUbaoUpdate(false);
		}
		$model.UserIdStyle="input";
		$model.CspName = null;
		if(!$model.Random){//随机数为空
			$.getJSON("/pweb/GenerateRand.do",{},function(u){
				//检查密码控件是否安装
				$model.pgeditorChar_login.pgInitialize();
				if($model.pgeditorChar_login.checkInstall() != true){
					showCspUpdate();
					return;
				}
				$model.pgeditorChar_login.pwdSetSk(u.RandNum);
				$model.Random = u.RandNum;
				if($model.TokenCheckFlag!=false){
				$("#_tokenImg").attr("src",'/pweb/GenTokenImg.do' + '?random=' + Math.random());
				}
				//$model.GenTokenImg = '/pweb/GenTokenImg.do' + '?random=' + Math.random();
			});
		}
		$("#writeUserId").focus();
		if($model._writeUserId){
			$model.showFW();
		}else{
			$model.hideFW();
		}
	}
	//获取CSPName
	$model.getCSPName = function(){
		if (checkIsIE()) {//非IE
			if($model.UserCertDN){
				$model.UserCertDN = $model.UserCertDN.replace(/,/g, ", ");
			}
		}
		var cspObj = cryptokit_control.getCSPNameEx($model.UserCertDN, "", "");
		if(cspObj.result==0){
			$model.CspName = cspObj.val;
		}else{
			alert("请检查您的U宝驱动是否安装正确，或可以尝试重新安装驱动。");
			return false;
		}
	}
	
//	var user = $model.user;
	$("#writeUserId").focus(function(){
		if ($(this).val()=='请输入登录名或账(卡/折)号_') {
			$(this).val("");
		}
	});
	$("#tishi2").mouseenter(function() {
		$("#tishi_test2").fadeIn();
	}).mouseout(function() {
		$("#tishi_test2").fadeOut();
	});
	$("#userLogin").focus();
//	$model.userId = user.userId;
	
	function disabledLoginButton(){
		$("#loginButton").attr("disabled",true);
		$("#closeButton").attr("disabled",true);
	}
	function abledLoginButton(){
		$("#loginButton").attr("disabled",false);
		$("#closeButton").attr("disabled",false);
	}
	//根据不同的输入模式返回用户名
	$model.getUserId = function(){
		if($model.UserIdStyle == "select"){//选择模式
			$model.UserId = $model.userInfo.UserId;
			if(!$model.UserId){
				$model.error("请插入U宝或检查您的网银证书是否可用。");
			}
		}else{
			$model.UserId = $("#writeUserId").val();
			if(!$model.UserId){
				$model.error("请输入登录名或已追加网银的账号。");
			}else{
				$model.UserId = $.trim($model.UserId);
			}
		}
	}
	$model.error=function(e){
		var errorList;
		  if(e){
			var msg;
			if(e.jsonError){
				 if(e.jsonError.length<=1){
					 msg=e.jsonError[0]?e.jsonError[0]._exceptionMessage:null;
				 }else{
					 msg=errorList=e.jsonError;
				 }
			  }else if(e.errmsg){
				 msg=e.errmsg; 
			  }else if(e._RejMessage){
				  msg=e._RejMessage; 
			  } else{
				 msg=e;
			  }
			  $model.jsonError=msg;
			  if(errorList){
				  msg="<table>"
				  for ( var i = 0; i < errorList.length; i++) {
					msg = msg.concat("<tr><td style='padding-left:6px'><span class='ui-icon ui-icon-alert' style='float: left; margin: 2px 10px 5px 3px'></span>");
					msg = msg.concat(errorList[i]._exceptionMessage);
					msg = msg.concat("</td></tr>");
				}
				  msg = msg.concat("</table>");
			  }else{
				  msg="<span></span>".concat(msg);
			  }
			  $("#jsonError").html(msg);
			  if(msg){
				  $("#jsonErrorShow").show();
			  }else{
				  $("#jsonErrorShow").hide();
			  }
			  return;
		  }else{
			  if($("#jsonErrorShow")!=null){
					$("#jsonErrorShow").hide();
				}
		}
	  };
	  
	$model.authenticateUser = function() {
		disabledLoginButton();
		$model.getUserId();//获取登陆号
		if(!$model.UserId || $model.UserId=='请输入登录名或账(卡/折)号_'){//登陆名为空校验
			$model.error("请录入登录名或已追加网银的账号。");
			abledLoginButton();
			return;
		}else{
			$("#jsonErrorShow").hide();
			$("#jsonError").html('');
		}
		if($model.UserId.length<3 || $model.UserId.length>32){
			abledLoginButton();
			$model.error("用户不存在或该账号未追加网银，请核实后重新输入。");
			return;
		}else{
			$("#jsonErrorShow").hide();
			$("#jsonError").html('');
		}
		if ($model.pgeditorChar_login.pwdLength() == 0)//密码为空校验
		{
			abledLoginButton();
			$model.error("请输入登录密码。");
			return;
		}
		$model._vTokenName = $("#_vTokenName").val();
		if($model.TokenCheckFlag && !$model._vTokenName  )//附加码为空校验
		{
			 $model.error("请输入附加码。");
			 abledLoginButton();
			 $("#_vTokenName").focus();
			 return;
		}else{
			$("#jsonError").html('');
		}
		$model.formSubmit();
	}; 
	$model.formSubmit = function(){
		if($model.UserIdStyle=="input"){
			$model.UserCertDN = null;
		}
		$model.password = $model.pgeditorChar_login.pwdResult();
		var formData = {
				PwdResult : $model.password,
				CspName : $model.CspName,
				BankId : '9999',
				LoginType : 'C',
				_locale : 'zh_CN',
				UserId : $model.UserId,
				_vTokenName : $model._vTokenName,
				_UserDN : $model.UserCertDN,
				_asii : $model.pgeditorChar_login.pwdLength(),
				_targetPath : getParameter('targetPath')
		};
		$http.post("/pweb/clogin.do",formData).success(function(u){
			abledLoginButton();
			if(u.errmsg || u.jsonError) {
				if (u.jsonError[0]._exceptionMessageCode == "validation.keyloginguim_failed") {
					$model.CertDown = true;
				}
				$model.error(u.errmsg || u.jsonError[0]._exceptionMessage);
				//重新生成随机数，以防止后台session过期
				$http.post("/pweb/GenerateRand.do",{}).success(function(m){
					$model.pgeditorChar_login.pwdSetSk(m.RandNum);
					$model.Random = m.RandNum;
					$model.reloadTokenImg();
					$model.UserTokenCheck(true);
				});
				$("#_vTokenName").val("");
				$model.pgeditorChar_login.pwdclear();
				document.getElementById("_ocx_passwordChar_login").focus();
			}else{
				// 判断是否首次登录
				if (u.firstLoginFlag=="1") {
					window.location.href = 'firstloginmain.html';
				} else {
					// 非首次
					if(u.OldAcFlag=='1'){
						window.location.href = 'loginUserIdsetmain.html';
					}else{
						if (u.LockFlag=='1') {
							window.location.href = 'safefyloginmain.html';
						} else {
							window.location.replace('main.html');
							
						}
					}
				}
			}
			$model.pgeditorChar_login.pwdclear();
		});
	}
	loginCtrl.prototype._toSelectStyle=$model.toSelectStyle;
	//选择用户名执行操作
	$model.watch = function(s) {
		$model.CertDown=false
		for(var i = 0;i<$model.userList.length;i++){
			var o = $model.userList[i].UserId;
			if(o==s){
				$model.userInfo = $model.userList[i];
				$model.showFW();
				break ;
			}
		}
		$model.UserCertDN = $model.userInfo.CertNo;
		document.getElementById("_ocx_passwordChar_login").focus();
		$model.getCSPName();
		if(!$model.CspName){
			return;
		}
//		$model.UserTokenCheck(false);
		var p = {
				'Csp' : $model.CspName
			}
		$http.post('/pweb/CertLoginVerify.do', p).success(function(u) {
			if(u.cspCompany){
				showUbaoUpdate(u);
				return;
			}
		});
	}
	$model.$watch("_writeUserId",function(){
		if($model._writeUserId){
			$model.showFW();
		}else{
			$model.hideFW();
		}
	});
	$model.reloadTokenImg = function() {
		$("#_tokenImg").attr("src",'/pweb/GenTokenImg.do' + '?random=' + Math.random());
//		$model.GenTokenImg = '/pweb/GenTokenImg.do' + '?random=' + Math.random();
	};
	$model.reSet = function() {
		$model.userId = '';
	};
	$model.closeBrowser = function(){
		window.close();
	}
	$model.goToRegisterPage = function(){
		window.location.href='registermain.html';
	}
	$model.resetLoginPassword = function() {
		window.location.href='loginpswdresetmain.html';
	}
	$model.passGuardInit = function(){
		$model.pgeditorChar_login.pgInitialize();
		$model.pgeditorChar_login.pwdSetSk($model.Random);
	}
	loginCtrl.prototype.passGuardInit=$model.passGuardInit;
	$model.checkInputIsNull = function(inputId){
		$("#jsonError").html('');
		$("#jsonErrorShow").hide();
		if(inputId){
			if(inputId=="_ocx_passwordChar_login"){
				if($model.pgeditorChar_login.pwdLength() == 0){
					$model.authenticateUser();
					return;
				}
			}else if(!$("#"+inputId).val()){
				$model.authenticateUser();
				return;
			}
		}
		if($model.UserIdStyle=="input" && (!$("#writeUserId").val() || $("#writeUserId").val()=='请输入登录名或账(卡/折)号_')){
			$("#writeUserId").focus();
		}else if($model.pgeditorChar_login.pwdLength() == 0){
			document.getElementById("_ocx_passwordChar_login").focus();
		}
//		else if(!$("#_vTokenName").val()){
//			$("#_vTokenName").focus();
//		}
		else{
			$model.authenticateUser();
		}
	}
	$("#writeUserId").bind("keydown",function(envent){
		if(envent && 13==envent.keyCode){
			$model.checkInputIsNull("writeUserId");
		}
	});
	$model.PassWordKeyDown = function(){
			$model.checkInputIsNull("_ocx_passwordChar_login");
	}
	loginCtrl.prototype.formSubmit=$model.PassWordKeyDown;
	$("#_vTokenName").bind("keydown",function(envent){
		if(envent && 13==envent.keyCode){
			$model.checkInputIsNull("_vTokenName");
		}
	});
	
	$("a[name='icon_a']").bind("click",function(){
		var i = $("a[name='icon_a']").index($(this));
		$(this).addClass("copy_hover");
		$("#icon_ul li div").eq(i).stop(true,true).slideDown(600,function(){
			$(document).bind("click.global",function(){
				$("a[name='icon_a']").eq(i).removeClass("copy_hover");
				$("#icon_ul li div").eq(i).stop(true,true).slideUp(500);
				$(document).unbind("click.global");
			})
		});
	});
//	if(_IsMacFlag){
//		$model.toWriteStyle();
//	}else{
//		$model.toSelectStyle();//默认调用一次反显模式
//	}
	if(!$model._vTokenName){
		$model._vTokenName = "";
	}
};
function authenticateUser(){
	loginCtrl.prototype.formSubmit();
}
$(function(){
	$(".tishiE").hover(
	function(){var l=$("#lpass").offset().left;
	var t=$("#lpass").offset().top;
	
	$("#passtip").css("left",l+100);
	$("#passtip").css("top",t+20);
	$("#passtip").fadeIn();},
	function(){$("#passtip").hide();});
	
});
function AutoToSelectStyle(){
	firstFreshFlag = true;
	loginCtrl.prototype._toSelectStyle();
}
// <!-- cmbc end -->