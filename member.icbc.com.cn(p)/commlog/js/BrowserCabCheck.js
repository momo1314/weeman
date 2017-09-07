 /// <summary>
    /// ��ȡ������汾
    /// </summary>
    /// <returns></returns>
    function GetBrowserType()
    {
        
    	var ua=navigator.userAgent.toLowerCase();
        
        if (ua.indexOf("msie") > -1)
        {
            return "MSIE";
        }
        else if (ua.indexOf("chrome") > -1)
        {
            return "Chrome";
        }
        else if (ua.indexOf("mac") > 0 && ua.indexOf("safari") > 0)
        {
            return "MacSafari";
        }
        else if (ua.indexOf("firefox") > -1)
        {
            return "Firefox";
        }
        return "MSIE";


    }
    

//�鿴����Ƿ�װȫ
function pulginHasInstalled() {
	navigator.plugins.refresh(false);
    // �����npapidemo Plugin��plugin��name����
	var pluginsFlag;
	if("Firefox"==GetBrowserType()){
		pluginsFlag =  
		typeof(navigator.mimeTypes['application/x-icbcnpxxin-plugin-input'])!="undefined" &&
    	typeof(navigator.mimeTypes['application/x-icbc-plugin-submit'])!="undefined" &&
    	
    	typeof(navigator.mimeTypes['application/x-npClCache-plugin'])!="undefined";
	}else if("Chrome"==GetBrowserType()){
		pluginsFlag = 
		typeof(navigator.mimeTypes['application/x-icbc-plugin-chrome-npxxin-input'])!="undefined" &&
    	typeof(navigator.mimeTypes['application/x-icbc-plugin-chrome-npsubmit'])!="undefined";
	}
    if (pluginsFlag) {return true;}
    return false;
  }
//�ԱȰ汾��
function checkVersionIsOk() {
	
	navigator.plugins.refresh(false);
	var des;
	  try{
		  if("Firefox"==GetBrowserType()){
		  des = navigator.mimeTypes['application/x-icbcnpxxin-plugin-input'].enabledPlugin['description'].split("_");
		  }else if("Chrome"==GetBrowserType())
			  {
			  	des = navigator.mimeTypes['application/x-icbc-plugin-chrome-npxxin-input'].enabledPlugin['description'].split("_");
			  }
	      if (typeof(des[3]) == "undefined" || !cmpVersion(des[3], pluginInputVersion)){	//һ�º�ˢ��ҳ�棬���������µĲ��
	    	  return false;
	      }
	  }catch(exception){;return false;}
	  try{
		  if("Firefox"==GetBrowserType()){
			  des = navigator.mimeTypes['application/x-icbc-plugin-submit'].enabledPlugin['description'].split("_");
		  }else if("Chrome"==GetBrowserType())
		  {
			  des = navigator.mimeTypes['application/x-icbc-plugin-chrome-npsubmit'].enabledPlugin['description'].split("_");
		  }
		  if (typeof(des[3]) == "undefined" || !cmpVersion(des[3], pluginSubmitVersion)){	//һ�º�ˢ��ҳ�棬���������µĲ��
			  return false;
		  }
	  }catch(exception){return false;}
	  
	  try{
		  if("Firefox"==GetBrowserType()){
			  des = navigator.mimeTypes['application/x-npClCache-plugin'].enabledPlugin['description'].split("_");
		  }else if("Chrome"==GetBrowserType()){
			  des = navigator.mimeTypes['application/x-icbc-plugin-chrome-npclcache'].enabledPlugin['description'].split("_");
		  }
		  if (typeof(des[3]) == "undefined" || !cmpVersion(des[3], pluginCLCacheVersion)){	//һ�º�ˢ��ҳ�棬���������µĲ��
			  return false;
		  }
	  }catch(exception){return false;}     
	  
	return true;
  }
 function cmpVersion(cabVersion, ParamVersion)
 {
     try {
         var cabArr = cabVersion.split('.');
         var paraArr = ParamVersion.split('.');
         for (var i = 0; i < cabArr.length; i++) {
             if (parseInt(cabArr[i]) < parseInt(paraArr[i])) {
                 return false;
             }
         }
         //if (cabVersion < ParamVersion) {
         //    return false;
         //}
         return true;
     } catch (e) {
         return false;
     }

 }
 function isIE() {
     if ((!!window.ActiveXObject || "ActiveXObject" in window)&&GetBrowserType()!="Firefox")
         return true;
     else
         return false;
 }