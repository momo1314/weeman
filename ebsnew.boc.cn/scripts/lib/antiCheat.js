/*! BUILD: 2015-08-21 */
Common.AntiCheat=Common.AC=function(a){this.init(a)},Common.AC.enabled=!0,Common.AC.prototype.EJS={before:{SMS:"templates/antiCheat/sms_login.ejs",QUESTION:"templates/antiCheat/question_login.ejs",NULL:"templates/antiCheat/nullAlert.ejs",DENY:"templates/antiCheat/deny_login.ejs",CCC:"templates/antiCheat/ccc.ejs",FAILED:"templates/antiCheat/failed_login.ejs"},after:{SMS:"templates/antiCheat/sms.ejs",QUESTION:"templates/antiCheat/question.ejs",NULL:"templates/antiCheat/nullAlert.ejs",DENY:"templates/antiCheat/deny.ejs",CCC:"templates/antiCheat/ccc.ejs",FAILED:"templates/antiCheat/failed.ejs"}},Common.AC.prototype.resultPath={NULL:"templates/antiCheat/null_result.ejs",DENY:"templates/antiCheat/deny_result.ejs",CCC:"templates/antiCheat/ccc_result.ejs",FAILED:"templates/antiCheat/failed_result.ejs"},Common.AC.prototype.init=function(a){var b=this,c=a.loginPre?"PSNGetRandomLoginPre":"PSNGetRandom",d=a.loginPre?"PSNGetTokenIdLoginPre":"PSNGetTokenId",e=a.loginPre?"PsnSendSMSCodeToMobilePre":"PsnSendSMSCodeToMobile";if(b.loginPre=a.loginPre,b.isLogin=!!a.isLogin,b.ejsPath=b.isLogin?b.EJS.before:b.EJS.after,b.prefix=a.prefix||"",b.data=a.data,b.ok=a.ok,b.cancel=a.cancel,b.random=a.random,b.cid=a.conversationId,b.el=a.el,!b.data||!b.data.transMonStatus)return b.result="ALLOW",b.disabled=!0,b;switch(b.data.suspendObj&&$.extend(b.data,b.data.suspendObj),b.data.transMonStatus){case"QUESTION":b.show({ejs:b.ejsPath.QUESTION,data:b.data,callback:function(){b.el.find("#ac-question-close, #ac-question-cancel").on("click",function(){b.hide(b.isLogin),b.result="FAILED",b.failed(b.isLogin)}),b.el.find("#ac-question-ok").on("click",function(){var a=$(this);a.hasClass("disabled")||formValid.checkAll(b.el.find("#ac-popup"))&&b.ok&&(a.addClass("disabled"),b.getTokenId(d,function(){b.ok(function(){a.removeClass("disabled")})}))}),b.el.find("#ac-question-anwser").on("focus",function(){b.reset()})}}),b.getTokenId(d),b.result="QUESTION";break;case"SMS":b.show({ejs:b.ejsPath.SMS,data:b.data,callback:function(){function a(){b.el.find("#ac-sms-code").sec({mode:3,width:60,RandomKey_S:b.random,focus:function(){b.reset()}}),b.el.find("#ac-sms-code").on("mouseover",function(){b.el.find("#ac-warn-text:visible")&&b.el.find("#ac-warn-text").hide()}),b.el.find("#ac-sms-close, #ac-sms-cancel").on("click",function(){b.hide(b.isLogin),b.result="FAILED",b.failed(b.isLogin)}),b.el.find("#ac-sms-ok").on("click",function(){var a=$(this);a.hasClass("disabled")||formValid.checkAll(b.el.find("#ac-popup"))&&b.ok&&(a.addClass("disabled"),b.getTokenId(d,function(){b.ok(function(){a.removeClass("disabled")})}))}),b.el.find("#ac-sms-send").on("click",function(){Common.postRequest(new Model(e,b.cid)).then(function(a){if(b.ajaxDataHandle(a),CU.isSuccesful(a)){b.el.find("#ac_code_cd").show();var c=60,d=setInterval(function(){c-=1,0>=c?(clearTimeout(d),b.el.find("#ac_code_sec").size()>0&&(b.el.find("#ac-sms-send").show(),b.el.find("#ac_code_cd").hide())):b.el.find("#ac_code_sec").size()>0?b.el.find("#ac_code_sec").text(c):clearInterval(d)},1e3);b.el.find("#ac_code_sec").text(c),b.el.find("#ac-sms-send").hide()}})})}b.random?a():Common.postRequest(new Model(c,b.cid)).then(function(c){b.random=b.ajaxDataHandle(c),"01"===c.response[0].status&&a()})}}),b.getTokenId(d),b.result="SMS";break;case"ALLOW":b.result="ALLOW";break;case"DENY":"1"==b.data.CredentialNullFlag?(b.result="NULL",b.isLogin&&b.show({ejs:b.ejsPath.NULL,data:null,callback:function(){b.el.find("#ac-alert-close, #ac-alert-ok").on("click",function(){b.hide()})}})):(b.result="DENY",b.isLogin&&b.show({ejs:b.ejsPath.DENY,data:null,callback:function(){b.el.find("#ac-alert-close, #ac-alert-ok").on("click",function(){b.hide()})}})),b.showResult();break;case"CCC":b.result="CCC",b.isLogin&&b.show({ejs:b.ejsPath.CCC,data:null,callback:function(){b.el.find("#ac-alert-close, #ac-alert-ok").on("click",function(){b.hide()})}}),b.showResult()}},Common.AC.prototype.showMask=function(){Common.LightBox.show()},Common.AC.prototype.hideMask=function(){Common.LightBox.hide()},Common.AC.prototype.showResult=function(){var a=this;a.isLogin||a.el.empty().html(a.prefix+a.resultPath[a.result],null,function(){a.hideMask(),CU.changeLan(a.el)}).addClass("transresult-r")},Common.AC.prototype.getTokenId=function(a,b){var c=this;Common.postRequest(new Model(a,c.cid)).then(function(a){c.token=c.ajaxDataHandle(a),b&&b()})},Common.AC.prototype.failed=function(a){var b=this;b.isLogin&&b.show({ejs:b.ejsPath.FAILED,data:null,mask:a,callback:function(){b.el.find("#ac-alert-close, #ac-alert-ok").on("click",function(){b.hide()})}}),b.showResult()},Common.AC.prototype.show=function(a){var b=this;a.mask||b.showMask(),b.el.append(b.prefix+a.ejs,a.data,function(){b.popup=b.el.find("#ac-popup"),b.popup.find("#ac-warn-text").hide(),CU.setObjAbsCenter(b.popup),b.zIndex&&b.zIndex>921?b.popup.css("zIndex",b.zIndex+""):b.popup.css({zIndex:"921"}),a.callback&&a.callback(),CU.changeLan(b.el)})},Common.AC.prototype.hide=function(a){var b=this;b.popup&&($(window.top.document.body).find("#info-ps").hide(),b.popup.remove(),$("#ac-popup_iframe").remove(),delete b.popup,a||b.hideMask())},Common.AC.prototype.warn=function(){var a=this;switch(a.data.transMonStatus){case"QUESTION":a.el.find("#ac-question-anwser").addClass("warning");break;case"SMS":a.el.find("#ac-sms-code").addClass("warning")}a.el.find("#ac-warn-text").show()},Common.AC.prototype.reset=function(){var a=this;switch(a.data.transMonStatus){case"QUESTION":a.el.find("#ac-question-anwser").removeClass("warning");break;case"SMS":a.el.find("#ac-sms-code").removeClass("warning")}a.el.find("#ac-warn-text").hide()},Common.AC.prototype.get=function(){var a=this;switch(a.data.transMonStatus){case"QUESTION":return{devicePrint:encode_deviceprint(),questionId:a.data.questionId,questionText:a.data.questionText,questionAnswer:a.el.find("#ac-question-anwser").val(),token:a.token};case"SMS":return{devicePrint:encode_deviceprint(),activ:a.el.find("#ac-sms-code").sec("Version"),state:a.el.find("#ac-sms-code").sec("State"),Smc:a.el.find("#ac-sms-code").sec("Value"),Smc_RC:a.el.find("#ac-sms-code").sec("RandomKey_C"),token:a.token};default:return null}},Common.AC.prototype.ajaxDataHandle=function(a,b,c){var d=this;if($("#disablePage").hide(),b=b||0,a){var e=a.response;if(e&&e.length)if(e[b].status==ajaxSuccessStatusCode){var f=e[b].result;if(f)return CU.Json.replaceNull(f)}else{var g=e[b].error,h={"validation.session_invalid":"l15798","role.invalid_user":"l15803","validation.resubmit_same_session":"l15797","QA.authenticate.limit":"l15817","smc.token.true.lock":"","smc.token.lock":"15818","smc.token.false.lock":"15818"},i={"smc.verify.overDeadline":"","smc.verify.fail":"","QA.authenticate.fail":"","smc.verify.notcreate":"","TM.psn.bindDevice.query.fail":"","TM.psn.challenge.answer.invalid":"","smc.validation.isnull":"","smc.getStatus.fail":"","smc.applyToken.fail":"","smc.verify.needNext":"","smc.verify.repeat":"","smc.token.not.appBind":"","smc.token.forbidden":"","smc.token.reportLoss":"","smc.system.error":"","TM.psn.UnbindDevice.fail":"","TM.psn.BindDevice.fail":"","TM.00020000":""};g&&g.code&&g.code in h?window.top.location.href=(Common.basePath||"")+"logout.html?title="+escape(g.message)+"&locale="+localParam[lan]+("validation.resubmit_same_session"===g.code?"&relogin=0":""):g&&g.code&&g.code in i?d.warn(g.message):(CU.changeLan($("#msgBox")),Common.LightBox.showMessage(e[b].error.message),c&&c.length&&(Common.Dispatcher.redirect(c),d.hideMask(),CU.cordinateWithMenu(c)),d.hide())}}return null};