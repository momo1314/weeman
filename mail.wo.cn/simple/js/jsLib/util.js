String.prototype.byteLength=function(){var len=0;for(var i=0;i<this.length;i++){if(this.charCodeAt(i)>255){len+=2;}else{len++;}}return len;};String.prototype.getSubstrLen=function(){var len=0;var subLen=0;for(var i=0;i<this.length;i++){subLen=i+1;if(this.charCodeAt(i)>255){len+=2;}else{len++;}if(len>=12){break;}}return subLen;};String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"");};String.prototype.lTrim=function(){return this.replace(/^\s*/g,"");};String.prototype.rTrim=function(){return this.replace(/\s*$/g,"");};String.prototype.startWith=function(startWithString){var reg=new RegExp("^"+startWithString);return reg.test(this);};String.prototype.endWith=function(endWithString){var reg=new RegExp(endWithString+"$");return reg.test(this);};function leftPad(src,len,padChar){var srcString=(""+src).trim();var needPadLen=(1*len)-srcString.length;if(needPadLen>=1){var pad=new Array();for(var index=0;index<needPadLen;index++){pad.push(padChar);}pad.push(src);return pad.join("");}return src;}Array.prototype.clear=function(){var len=this.length;var clas=Object.prototype.toString.call(this).slice(8,-1);if(clas=="Array"){for(var index=0;index<len;index++){this.pop();}}};Array.prototype.deleteElement=function(elementObj){var resultArray=new Array();var len=this.length;for(var index=0;index<len;index++){if(elementObj!=this[index]){resultArray.push(this[index]);}}return resultArray;};Array.prototype.findElementIndex=function(elementObj){var len=this.length;for(var index=0;index<len;index++){if(elementObj==this[index]){return index;}}return -1;};Array.prototype.removeDuplicate=function(){for(var i=0;i<this.length;i++){for(var j=i+1;j<this.length;j++){if(this[i]===this[j]){this.splice(j,1);j--;}}}};var CalendarUtils={};CalendarUtils.MonDayCount=[0,31,28,31,30,31,30,31,31,30,31,30,31];CalendarUtils.isLeapYear=function(year){return(year%4==0||(year%100==0&&year%400==0));};CalendarUtils.getMonthDayCount=function(year,month){var dayCount=CalendarUtils.MonDayCount[1*month];if(2==month&&CalendarUtils.isLeapYear(1*year)){dayCount++;}return dayCount;};CalendarUtils.fill=function(selectId,start,count,isPad,valueLen,selectedValue){var showSelect_obj=selectId+"_obj";var showSelect_span=selectId+"_span";var $selectId=$("#"+selectId);var $selectObj=$("#"+showSelect_obj);$selectObj.html("");if((1*start)<(1*start+1*count)){$selectId.val("<ul>");}$selectObj.append("<ul>");for(var index=(1*start);index<(1*start+1*count);index++){var value=index;if(isPad){value=leftPad(index,valueLen,"0");}if(undefined!=selectedValue&&index==selectedValue){$("#"+showSelect_span).text(selectedValue);$("#"+selectId).val(value);}var $optionItem=$("<li onclick=\"calendarSelect('"+value+"','"+index+"','"+selectId+"','"+selectId+'_span\')"><a href="#"><span class="sendw1">'+index+"</span></a></li>");$selectObj.append($optionItem);}if((1*start)<(1*start+1*count)){$selectObj.append("</ul>");}};CalendarUtils.fillYear=function(selectId,startYear,yearCount,selectedValue){CalendarUtils.fill(selectId,startYear,yearCount,false,4,selectedValue);};CalendarUtils.fillMonth=function(selectId,startMonth,monthCount,selectedValue){CalendarUtils.fill(selectId,startMonth,monthCount,true,2,selectedValue);};CalendarUtils.fillDay=function(selectId,startDay,dayCount,selectedValue){CalendarUtils.fill(selectId,startDay,dayCount,true,2,selectedValue);};CalendarUtils.fillHour=function(selectId,startHour,hourCount,selectedValue){CalendarUtils.fill(selectId,startHour,hourCount,true,2,selectedValue);};CalendarUtils.fillMinute=function(selectId,startMinute,minuteCount,selectedValue){CalendarUtils.fill(selectId,startMinute,minuteCount,true,2,selectedValue);};CalendarUtils.stringToDate=function(stringDate){if(isStringEmpty(stringDate)||stringDate.length!=19){return null;}var year=stringDate.substring(0,4);if(year<1){return null;}var month=stringDate.substring(5,7);month-=1;if(month<0||month>11){return null;}var day=stringDate.substring(8,10);if(day<1||day>31){return null;}var hour=stringDate.substring(11,13);if(hour<0||hour>23){return null;}var minute=stringDate.substring(14,16);if(minute<0||minute>59){return null;}var second=stringDate.substring(17);if(second<0||second>59){return null;}return new Date(year,month,day,hour,minute,second,0);};var Convert={};Convert.convertByteToKB=function(fileSizeByte){var fileSizeKB=((1*fileSizeByte)/1024).toFixed(0);if(fileSizeKB<=0){fileSizeKB=1;}return fileSizeKB;};Convert.convertKBToMB=function(fileSizeKB){return((1*fileSizeKB)/1024).toFixed(2);};Convert.convertByteToMB=function(fileSizeByte){return Convert.convertKBToMB(Convert.convertByteToKB(fileSizeByte));};Convert.convertToSuitableUnit=function(fileSizeByte){if(fileSizeByte<1024){return fileSizeByte+"字节";}else{if(fileSizeByte>=1024&&fileSizeByte<1048576){return Convert.convertByteToKB(fileSizeByte)+"KB";}else{return Convert.convertByteToMB(fileSizeByte)+"MB";}}};function isStringEmpty(str){if(str==null||str.length==0){return true;}if(str.trim()==""){return true;}return false;}function checkIsAllChineseString(str){if(str==null||str.length==0){return false;}var pattern=/^([\u4e00-\u9fa5]+)$/;return pattern.test(str);}function isStringEqual(str1,str2,isIgnoreCase){if(str1==null){str1="";}else{if(typeof str1=="number"){str1=""+str1;}str1=str1.trim();if(isIgnoreCase){str1=str1.toLowerCase();}}if(str2==null){str2="";}else{if(typeof str2=="number"){str2=""+str2;}str2=str2.trim();if(isIgnoreCase){str2=str2.toLowerCase();}}return(str1==str2);}function isME(){var sAgent=navigator.userAgent.toLowerCase();if(sAgent.indexOf("msie")!=-1){return true;}else{return false;}}function valDate(Y,M,D,H,m){var months=new Array(31,28,31,30,31,30,31,31,30,31,30,31);leap=false;if(((Y%4==0)&&(Y%100!=0))||(Y%400==0)){leap=true;}if((D<1)||(D>31)||(M<1)||(M>12)||(H<0)||(H>23)||(m&&(m<0)||(m>59))){return(false);}if((D>months[M-1])&&!((M==2)&&(D>28))){return(false);}if(!(leap)&&(M==2)&&(D>28)){return(false);}if((leap)&&(M==2)&&(D>29)){return(false);}return true;}function checkTwiceConfirm(inputstr,reinputstr){var str1=inputstr.value;var str2=reinputstr.value;if(str1!=str2){alert(proStr.PwdConfirm);reinputstr.focus();reinputstr.select();return false;}return true;}function getCookie(name){var strCookie=document.cookie;var cookieName=name+"=";var valueBegin,valueEnd,value;valueBegin=strCookie.indexOf(cookieName);if(valueBegin==-1){return null;}valueEnd=strCookie.indexOf(";",valueBegin);if(valueEnd==-1){valueEnd=strCookie.length;}value=strCookie.substring(valueBegin+cookieName.length,valueEnd);return value;}function storeCookie(name,value,expires,path,domain,secure){var strCookie=name+"="+value;if(expires){var curTime=new Date();curTime.setTime(curTime.getTime()+expires*24*60*60*1000);strCookie+=";expires="+curTime.toGMTString();}else{strCookie+=";expires=Tue, 07 Jan 2010 00:00:01 GMT";}strCookie+=(path)?";path="+path:"";strCookie+=(domain)?";domain="+domain:"";strCookie+=(secure)?";path="+secure:"";document.cookie=strCookie;}function onlyNum(oInput){oInput.value=oInput.value.replace(/\D/gi,"");}function textAnalyseValue0(originText,value0){var resultText="";if(originText.indexOf("{0}")>=0){resultText=originText.replace("{0}",value0);}return resultText;}function showMsg(msg){jMessageTopCenter(msg);}function showNoHideMsg(msg){jMessageTopCenter(msg,false,false);}function hideNoHideMsg(){jClose();}function showLoadingPage(msg){jProgressDialog2(msg);}function hideLoadingPage(){jClose();}function showInputError(emsg,obj){jAlert(emsg,null,function(result){if(obj){$(obj).focus();}});}function showConformWindow(title,tips,doAction,obj){jConfirm(tips,title,function(result){if($.alerts.OK==result){if(obj==""){doAction();}else{doAction(obj);}}});}function hideAlertDiv(){jOverlay("close");}function coverDiv(flag){if(flag==1){jOverlay();}else{jOverlay("close");}}function public_checkSetName(obj,isAllowChinese){var _charset_include="1234567890abcdefghijklmnopqrstuvwxyz_-"+UserName.SpecChar;var str=(obj.value.length<1)?"":$.trim(obj.value);if(str==""){showMsg(obj.alt+proStr.Required);if($("#UNErrorDiv").length!=0){$("#UNErrorDiv").text(obj.alt+proStr.Required);}obj.focus();return false;}if(str.indexOf(" ")!=-1){showMsg(obj.alt+proStr.IncludeBlank);if($("#UNErrorDiv").length!=0){$("#UNErrorDiv").text(obj.alt+proStr.IncludeBlank);}obj.focus();return false;}if("1234567890_-".indexOf(str.substring(0,1))>=0){showMsg(obj.alt+proStr.FirstCharLimit);if($("#UNErrorDiv").length!=0){$("#UNErrorDiv").text(obj.alt+proStr.FirstCharLimit);}obj.focus();return false;}if(isAllowChinese==true){str=str.replace(/[\u4e00-\u9fa5]/g,"");}for(var i=0;i<str.length;i++){var ch=str.charAt(i);if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(ch)!=-1){showMsg(obj.alt+proStr.IncludeCapital);if($("#UNErrorDiv").length!=0){$("#UNErrorDiv").text(obj.alt+proStr.IncludeCapital);}obj.select();return false;}if(str.charCodeAt(i)>=255||_charset_include.indexOf(ch)<0){showMsg(obj.alt+proStr.IllegalChar);if($("#UNErrorDiv").length!=0){$("#UNErrorDiv").text(obj.alt+proStr.IllegalChar);}obj.select();return false;}}return true;}function formatSpcHtml(str){str=str.replace(/'/g,"&#39;");str=str.replace(/"/g,"&#34;");str=str.replace(/</g,"&lt;");str=str.replace(/>/g,"&gt;");return str;}function checkMailForm(strMail){if(strMail.length==0){return false;}var objReg=new RegExp("[a-z0-9-_]+@[a-z0-9-_]+[.]{1}[a-z0-9]","gi");var IsRightFmt=objReg.test(strMail);var objRegErrChar=new RegExp("[^a-z0-9-._@]","ig");var IsRightChar=(strMail.search(objRegErrChar)==-1);var IsRightPos=(strMail.indexOf("@",0)!=0&&strMail.indexOf(".",0)!=0&&strMail.lastIndexOf("@")+1!=strMail.length&&strMail.lastIndexOf(".")+1!=strMail.length);var IsNoDupChar=(strMail.indexOf("@",0)==strMail.lastIndexOf("@"));return(IsRightFmt&&IsRightChar&&IsRightPos&&IsNoDupChar);}function checkMailForPop(strMail){var objReg=new RegExp("[a-z0-9-_.&]+@[a-z0-9-_]+[.]{1}[a-z0-9]","gi");var IsRightFmt=objReg.test(strMail);var objRegErrChar=new RegExp("[^a-z0-9-._&@]","ig");var IsRightChar=(strMail.search(objRegErrChar)==-1);var IsRightPos=(strMail.indexOf("@",0)!=0&&strMail.indexOf(".",0)!=0&&strMail.lastIndexOf("@")+1!=strMail.length&&strMail.lastIndexOf(".")+1!=strMail.length);var IsNoDupChar=(strMail.indexOf("@",0)==strMail.lastIndexOf("@"));return(IsRightFmt&&IsRightChar&&IsRightPos&&IsNoDupChar);}function checkMailForPop2(strMail){var objReg=new RegExp("[a-z0-9-_&.]+@[a-z0-9-&_]+[.]{1}[a-z0-9&]","gi");var IsRightFmt=objReg.test(strMail);var objRegErrChar=new RegExp("[^a-z0-9-._&@]","ig");var IsRightChar=(strMail.search(objRegErrChar)==-1);var IsRightPos=(strMail.indexOf("@",0)!=0&&strMail.indexOf(".",0)!=0&&strMail.lastIndexOf("@")+1!=strMail.length&&strMail.lastIndexOf(".")+1!=strMail.length);var IsNoDupChar=(strMail.indexOf("@",0)==strMail.lastIndexOf("@"));return(IsRightFmt&&IsRightChar&&IsRightPos&&IsNoDupChar);}function checkMailForSend(mail){var str=mail;if(mail.indexOf("<")!=-1){str=str.substring(str.indexOf("<")+1,str.indexOf(">"));}return checkMailForPop2(str);}function checkMutiDomainMail(strMail){var objReg=new RegExp("[a-z0-9-_&.]+@([a-z0-9-&_]+[.])+[a-z0-9&]","gi");var IsRightFmt=objReg.test(strMail);var objRegErrChar=new RegExp("[^a-z0-9-._&@]","ig");var IsRightChar=(strMail.search(objRegErrChar)==-1);var IsRightPos=(strMail.indexOf("@",0)!=0&&strMail.indexOf(".",0)!=0&&strMail.lastIndexOf("@")+1!=strMail.length&&strMail.lastIndexOf(".")+1!=strMail.length);var IsNoDupChar=(strMail.indexOf("@",0)==strMail.lastIndexOf("@"));return(IsRightFmt&&IsRightChar&&IsRightPos&&IsNoDupChar);}function checkNormalStr(str){var strValue=str.replace(/[\u4E00-\u9FA5]/g,"");var objReg=new RegExp("[^a-z0-9-._]","ig");var isRightChar=(strValue.search(objReg)==-1);return isRightChar;}function checkNormalENStr(str){var objReg=new RegExp("[^a-z0-9-._]","ig");var isRightChar=(str.search(objReg)==-1);return isRightChar;}var commonMethod={showPromptDiv:function(title,content,cssStyle,rebind){$("#selectNav").hide();$("#LockWindows").show();var width=$("#promptDiv").width();var height=$("#promptDiv").height();var documentWidth=document.body.clientWidth;var documentHeight=document.body.clientHeight;var left=(documentWidth-width)/2;var top=(documentHeight-height)/2;$("#promptTitle").empty();$("#promptContent").empty();$("#promptTitle").text(title+"");$("#promptContent").text(content+"");var oldCss=$("#promptIcon").attr("class");$("#promptIcon").removeClass(oldCss);$("#promptIcon").addClass(cssStyle);$("#promptDiv").css({"position":"absolute","z-index":"102","left":left+"px","top":top+"px"});if(rebind!=0){$("#promptSure").unbind("click");$("#promptSure").bind("click",function(){$("#LockWindows").hide();$("#promptDiv").hide();$("#selectNav").show();commonMethod.showSelects();});$("#promptClose").unbind("click");$("#promptClose").bind("click",function(){$("#LockWindows").hide();$("#promptDiv").hide();$("#selectNav").show();commonMethod.showSelects();});}commonMethod.hideSelects();$("#promptDiv").show();},hideSelects:function(){if(window.ActiveXObject){var seles=document.getElementsByTagName("select");for(var j=0;j<seles.length;j++){if(seles[j].className!="alertSelect"){seles[j].disabled=true;}if(seles[j].className.indexOf("hiddenSelect")>-1){seles[j].style.display="none";}}}},showSelects:function(){if(window.ActiveXObject){var seles=document.getElementsByTagName("select");for(var j=0;j<seles.length;j++){if(seles[j].className!="alertSelect"){seles[j].disabled=false;}if(seles[j].className.indexOf("hiddenSelect")>-1){seles[j].style.display="";}}}},showConfirmDiv:function(title,content){$("#selectNav").hide();$("#LockWindows").show();var width=$("#confirmDiv").width();var height=$("#confirmDiv").height();var documentWidth=document.body.clientWidth;var documentHeight=document.body.clientHeight;var left=(documentWidth-width)/2;var top=(documentHeight-height)/2;$("#confirmTitle").text(title+"");$("#confirmContent").text(content+"");$("#confirmDiv").css({"position":"absolute","z-index":"101","left":left+"px","top":top+"px"});$("#confirmDiv").show();},showPopUpDiv:function(divWidth,divHeight){$("#selectNav").hide();var objWindow=$("#popUpDiv");var objLock=$("#LockWindows");var documentWidth=document.body.clientWidth;var documentHeight=document.documentElement.clientHeight;var left=(documentWidth-divWidth)/2;var top=(documentHeight-divHeight)/2;objLock.show();objWindow.width=divWidth+"px";objWindow.height=divHeight+"px";commonMethod.closeDiv(objWindow);objWindow.css({"position":"absolute","z-index":"10000","left":left+"px","top":top+"px"});objWindow.show();},closeDiv:function(objWindow){objWindow.find("input[type=button]").each(function(){var btnValue=$(this).get(0).value;if(btnValue=="取消"){var id=$(this).get(0).id;jQuery("#"+id).click(function(e){commonMethod.closeOperateDiv($("#popUpDiv"));commonMethod.closeLockWindowDiv();});}});},closeOperateDiv:function(obj){obj.hide();},closeLockWindowDiv:function(){$("#LockWindows").hide();},isMsisdn11:function(value){if(value==""||value.length!=11){return false;}var prefix=value.substring(0,3);var accord=conf.numberSect;if(accord.indexOf(prefix)==-1){return false;}return true;},getCharacterNum:function(){var messageContent=$("#msgContent").val();var chNum=messageContent.length;var smNum=0;var count=0;var str="";var zhChar=70;var enChar=160;for(i=0;i<chNum;i++){if(commonMethod.isChChar(str)==1){if(chNum>zhChar){zhChar=67;}else{zhChar=70;}if(count<zhChar){str=str+messageContent.charAt(i);count++;if(i==(chNum-1)){smNum++;}}else{str=messageContent.charAt(i);count=1;smNum++;}}else{if(chNum>enChar){enChar=153;}else{enChar=160;}if(count<enChar){str=str+messageContent.charAt(i);count++;if(i==(chNum-1)){smNum++;if(commonMethod.isChChar(messageContent.charAt(i))==1){smNum++;}}}else{str="";count=0;smNum++;}}}var desc="最大允许"+SMSConstraint.smsContentMaxLength+"字，还剩"+(SMSConstraint.smsContentMaxLength-chNum)+"字，拆分成"+smNum+"条";$("#msgExplain").html(desc);},isChChar:function(str){var i;for(i=0;i<str.length;i++){if(str.charCodeAt(i)>255){return 1;}}return 0;},checkForNum:function(downCount){var patrn=/^\d+$/;if(!patrn.exec(downCount)){return false;}return true;},strLen:function(value){var strlen=value.replace(/[^\x00-\xff]/g,"xx").length;return strlen;},interceptChatContent:function(content,maxlen){var len=content.length;var count=0;var newcontent="";for(var i=0;i<len;i++){var charCode=content.charCodeAt(i);if(charCode<255&&charCode>0){count++;}else{count+=2;}if(count>maxlen){break;}else{newcontent+=String.fromCharCode(charCode);}}return newcontent;},controlInput:function(obj,maxlen){var value=$("#"+obj).val();var reallen=commonMethod.strLen(value);if(reallen>=maxlen){var content=commonMethod.interceptChatContent(value,maxlen);$("#"+obj).val(content);}},checkFolderName:function(name){var flag=true;if(name.indexOf("\\")!=-1){flag=false;return flag;}else{if(name.indexOf("/")!=-1){flag=false;return flag;}else{if(name.indexOf(":")!=-1){flag=false;return flag;}else{if(name.indexOf("*")!=-1){flag=false;return flag;}else{if(name.indexOf("?")!=-1){flag=false;return flag;}else{if(name.indexOf('"')!=-1){flag=false;return flag;}else{if(name.indexOf("<")!=-1){flag=false;return flag;}else{if(name.indexOf(">")!=-1){flag=false;return flag;}else{if(name.indexOf("|")!=-1){flag=false;return flag;}}}}}}}}}return flag;},checkTimeFormat:function(time){var regex=/^(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/;if(!regex.test(time)){return false;}return true;},hideUab:function(){var icon=document.getElementById("hideUabIcon");if(icon.className=="icoOpenUab"){icon.className="icoCloseUab";$("#mailWriteUab").css("display","");}else{icon.className="icoOpenUab";$("#mailWriteUab").css("display","none");}}};var tool={};tool.displayAHideDiv=function(emsg,cffn,dealfn,dealfn2){function isFunction(testFun){if(undefined!=testFun&&null!=testFun&&"function"==typeof testFun){return true;}return false;}jConfirm(emsg,null,function(result){if($.alerts.OK==result){if(isFunction(cffn)){cffn();}}else{if($.alerts.CANCEL==result){if(isFunction(dealfn)){dealfn();}}else{if($.alerts.CLOSE==result){if(isFunction(dealfn2)){dealfn2();}}}}});};tool.getPasswordStrengthScore=function(passwd){var intScore=0;if(passwd.match(/[a-z]/)){intScore+=1;}if(passwd.match(/[A-Z]/)){intScore+=5;}if(passwd.match(/\d+/)){intScore+=5;}if(passwd.match(/(\d.*\d.*\d)/)){intScore+=5;}if(passwd.match(/[!,@#$%^&*?_~]/)){intScore+=5;}if(passwd.match(/([!,@#$%^&*?_~].*[!,@#$%^&*?_~])/)){intScore+=5;}if(passwd.match(/[a-z]/)&&passwd.match(/[A-Z]/)){intScore+=2;}if(passwd.match(/\d/)&&passwd.match(/\D/)){intScore+=2;}if(passwd.match(/[a-z]/)&&passwd.match(/[A-Z]/)&&passwd.match(/\d/)&&passwd.match(/[!,@#$%^&*?_~]/)){intScore+=2;}return intScore;};tool.getPasswordStrenth=function(passwd,id1,id2,id3){if(passwd==""){$("#"+id1).get(0).style.display="none";$("#"+id2).html("");$("#"+id3).get(0).style.width="";return;}var intScore=tool.getPasswordStrengthScore(passwd);if(intScore<=11){$("#"+id1).get(0).style.display="block";$("#"+id2).html("弱");$("#"+id3).get(0).style.width="50px";}else{if(intScore<=26){$("#"+id1).get(0).style.display="block";$("#"+id2).html("中");$("#"+id3).get(0).style.width="100px";}else{$("#"+id1).get(0).style.display="block";$("#"+id2).html("强");$("#"+id3).get(0).style.width="150px";}}};tool.getPasswordStrength=function(passwd,id1){if(passwd==""){$("#"+id1).get(0).style.width="0px";return;}var intScore=tool.getPasswordStrengthScore(passwd);if(intScore<=11){$("#"+id1).get(0).style.width="10px";}else{if(intScore<=26){$("#"+id1).get(0).style.width="30px";}else{$("#"+id1).get(0).style.width="60px";}}};tool.checkTelPhoneNumber=function(phone,callbackFun){if(phone==""||phone==undefined||phone==null){jAlert("手机号码不能为空",null,function(){if(undefined!=callbackFun&&"function"==typeof callbackFun){callbackFun();}});return false;}if(isNaN(phone)){jAlert("手机号码必须为数字",null,function(){if(undefined!=callbackFun&&"function"==typeof callbackFun){callbackFun();}});return false;}if(phone.length!=11){jAlert("手机号码只能为11位",null,function(){if(undefined!=callbackFun&&"function"==typeof callbackFun){callbackFun();}});return false;}var result=false;var param={actionType:"checkNumInfo",user:phone};$.ajax({type:"POST",data:param,url:"register.action",async:false,success:function(data){var resultCode=data.resultCode;if(resultCode==0){result=true;}}});if(!result){jAlert("手机号码不是联通手机号码",null,function(){if(undefined!=callbackFun&&"function"==typeof callbackFun){callbackFun();}});return false;}return true;};tool.checkPassword=function(password){var rangeReg=new RegExp("[a-zA-Z0-9~!@#$%^&*()_+=`\\{\\}|\\[\\]\\;':\",<>?-]","g");if(""!=password.replace(rangeReg,"")){jAlert("密码中出现了不允许的字符");return false;}if(password.length<6||password.length>16){jAlert("密码的长度必须是6~16位");return false;}return true;};tool.dealWithError=function(data){try{var eobj=eval(data);if(eobj.type=="server_error"){var obj=commonErrorMessage.paError;var emsg=obj[eobj.code];return emsg;}}catch(e){var obj=commonErrorMessage.paError;var emsg=obj["ok"];return emsg;}};tool.randomUUID=function(){var s=[],itoh=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];for(var i=0;i<36;i++){s[i]=Math.floor(Math.random()*16);}s[14]=4;s[19]=(s[19]&3)|8;for(var i=0;i<36;i++){s[i]=itoh[s[i]];}s[8]=s[13]=s[18]=s[23]="-";return s.join("");};var Flash={};Flash.isIE=(navigator.appVersion.indexOf("MSIE")!=-1)?true:false;Flash.isIE6=Flash.isIE&&!window.XMLHttpRequest;Flash.isIE8=Flash.isIE&&!!document.documentMode;Flash.isIE7=Flash.isIE&&!Flash.isIE6&&!Flash.isIE8;Flash.isWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false;Flash.isOpera=(navigator.userAgent.indexOf("Opera")!=-1)?true:false;Flash.controlVersion=function(){var version;var axo;var e;try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");version=axo.GetVariable("$version");}catch(e){}if(!version){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");version="WIN 6,0,21,0";axo.AllowScriptAccess="always";version=axo.GetVariable("$version");}catch(e){}}if(!version){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");version=axo.GetVariable("$version");}catch(e){}}if(!version){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");version="WIN 3,0,18,0";}catch(e){}}if(!version){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");version="WIN 2,0,0,11";}catch(e){version=-1;}}return version;};Flash.getSwfVer=function(){var flashVer=-1;if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var swVer2=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";var flashDescription=navigator.plugins["Shockwave Flash"+swVer2].description;var descArray=flashDescription.split(" ");var tempArrayMajor=descArray[2].split(".");var versionMajor=tempArrayMajor[0];var versionMinor=tempArrayMajor[1];var versionRevision=descArray[3];if(versionRevision==""){versionRevision=descArray[4];}if(versionRevision[0]=="d"){versionRevision=versionRevision.substring(1);}else{if(versionRevision[0]=="r"){versionRevision=versionRevision.substring(1);if(versionRevision.indexOf("d")>0){versionRevision=versionRevision.substring(0,versionRevision.indexOf("d"));}}}var flashVer=versionMajor+"."+versionMinor+"."+versionRevision;}}else{if(navigator.userAgent.toLowerCase().indexOf("webtv/2.6")!=-1){flashVer=4;}else{if(navigator.userAgent.toLowerCase().indexOf("webtv/2.5")!=-1){flashVer=3;}else{if(navigator.userAgent.toLowerCase().indexOf("webtv")!=-1){flashVer=2;}else{if(Flash.isIE&&Flash.isWin&&!Flash.isOpera){flashVer=Flash.controlVersion();}}}}}return flashVer;};Flash.detectFlashVer=function(reqMajorVer,reqMinorVer,reqRevision){var versionStr=Flash.getSwfVer();if(versionStr==-1){return false;}else{if(versionStr!=0){if(Flash.isIE&&Flash.isWin&&!Flash.isOpera){tempArray=versionStr.split(" ");tempString=tempArray[1];versionArray=tempString.split(",");}else{versionArray=versionStr.split(".");}var versionMajor=versionArray[0];var versionMinor=versionArray[1];var versionRevision=versionArray[2];if(versionMajor>parseFloat(reqMajorVer)){return true;}else{if(versionMajor==parseFloat(reqMajorVer)){if(versionMinor>parseFloat(reqMinorVer)){return true;}else{if(versionMinor==parseFloat(reqMinorVer)){if(versionRevision>=parseFloat(reqRevision)){return true;}}}}}return false;}}};Flash.isInstall=function(){var flashVersion=Flash.getSwfVer();if(-1!=flashVersion){return true;}return false;};var CheckBox={};CheckBox.isChecked=function(checkboxId){if($("#"+checkboxId).attr("checked")){return 1;}return 0;};var SelectOperate={};SelectOperate.selectByValue=function(selectId,value){$("#"+selectId+" option").attr("selected",false);$("#"+selectId+" option[value='"+value+"']").attr("selected",true);};var Constant={};Constant.KeyCode={Tab:9,Enter:13,Up:38,Down:40};Constant.Nds={FoldType:{Folder:"1",File:"0"}};