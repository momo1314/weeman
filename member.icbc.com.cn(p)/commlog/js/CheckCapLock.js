// JScript 文件


function CheckCapLock(inputtype,displayarea)
{
	var isFocus = 1;
	var registCapTip = document.getElementById("registCapTip");
	var registCapTip2 = document.getElementById("registCapTip2");
	var changepassCapTip = document.getElementById("changepassCapTip");
	var changepassCapTip1 = document.getElementById("changepassCapTip1");
	var changepassCapTip2 = document.getElementById("changepassCapTip2");
	var tooltip2 = document.getElementById("tooltip2");
	if(displayarea.id!=null && displayarea.id.length>=6)
    {
        if(displayarea.id.substring(0,6)=="regist")
        {
            
            if(registCapTip!=displayarea &&  registCapTip.style.visibility=="visible")
            {
                registCapTip.style.visibility="hidden";
            }
            if(registCapTip2!=displayarea &&  registCapTip2.style.visibility=="visible")
            {
                registCapTip2.style.visibility="hidden";
            }
        }
    }
    if(displayarea.id!=null && displayarea.id.length>=6)
    {
        if(displayarea.id.substring(0,6)=="change")
        {
            
            if(changepassCapTip!=displayarea &&  changepassCapTip.style.visibility=="visible")
            {
                changepassCapTip.style.visibility="hidden";
            }
            if(changepassCapTip1!=displayarea &&  changepassCapTip1.style.visibility=="visible")
            {
                changepassCapTip1.style.visibility="hidden";
            }
            if(changepassCapTip2!=displayarea &&  changepassCapTip2.style.visibility=="visible")
            {
                changepassCapTip2.style.visibility="hidden";
            }
        }
    }
	if(inputtype.CapsOnOrNot())
    {
        
        
        helpor_net_show2(displayarea,window.event,'<b>大写锁定打开</b><br>保持大写锁定打开可能会使您错误输入密码。<br>在输入密码前，您应该按“Caps Lock”键来将其关闭。',150,170,300);
     	var pos=eval("document.getElementById('" + inputtype.id + "')");
     	
    }
    else
    {
        try{helpor_net_hide2(displayarea);}catch(exception){}
 		
 	}		
}
function PasswordBlur(inputtype,displayarea)
{
	
	//if(!inputtype.FocusOrNot())
    //{
	    
		if(document.activeElement==inputtype)
	    {
	        CheckCapLock(inputtype,displayarea);
	    }
	    else
	    {
	        
	        try{helpor_net_hide2(displayarea);}catch(exception){}
	    }
   // }
}
var float_width_floatTip1;

function helpor_net_show2(displayarea,e,text,x,y,float_width){
	
	if (document&&document.readyState=="complete"){
	
		displayarea.innerHTML='<table cellspacing="1" style="width:300px;" bgcolor="#CCCCCC" cellpadding="0"><tr><td><table bgcolor="#FFFFCC" valign="center" style="font-size:12px;width:300px;"><tr><td>'+text+'</td></tr></table></td></tr></table>';
		
		displayarea.style.offsetLeft=0;
		displayarea.style.offsetTop=0;
var ua=navigator.userAgent.toLowerCase();
        
        
		if (ua.indexOf("msie") <= -1) {
		    if (displayarea.id.indexOf("logon") >= 0) {
		        displayarea.style.marginLeft = "152px";
		        displayarea.style.marginTop = "-21px";
		    }
		    else {
		        displayarea.style.marginLeft = "148px";
		        displayarea.style.marginTop = "-22px";
            }
        }
		float_width_floatTip1=displayarea.style.width;
		displayarea.style.width="300px";
		displayarea.style.visibility="visible";
	}

}	
	function helpor_net_hide2(displayarea){
		if (document){
			displayarea.style.visibility="hidden";
			displayarea.style.width=float_width_floatTip1;
		}else if (document.layers){
			clearInterval(currentscroll)
			displayarea.visibility="hidden";
		}
	}	
	function scrolltip(){
		if (document.tooltip2.document.nstip.left>=-document.tooltip2.document.nstip.document.width)
			document.tooltip2.document.nstip.left=5
		else
			document.tooltip2.document.nstip.left=150
	}
	//2011-08-10 大写提示添加 end

	function XReturnDetectCapsLock(e) {
	    try {
	        document.getElementById(e).onfocus();
	    } catch (e1) {
	        document.getElementById(e).focus();
	    }
	}