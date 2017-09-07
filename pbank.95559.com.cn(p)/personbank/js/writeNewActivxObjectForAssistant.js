
/******************************************************
// 	 *功能描述:把网银向导控件写入页面中
// 	 *参数说明：
//		
***************************************************** */ 
	var platform=navigator.platform;
	
	var is64IE=false;
	if(platform.indexOf("Win64")>-1){
		is64IE=true;
	}else{
		is64IE=false;
	}

	function writeAssistantActivxObject()
	{ 
		var fullPath="";
		if(Util.contextPath){
			fullPath=Util.contextPath;
		}
		if(is64IE){
			document.write('<OBJECT ID="AxAssistComm" CLASSID="CLSID:B3D433B8-F0D2-4D58-9DC0-09C62B7B8EAD" CODEBASE="'+fullPath
						+'ocx/BocomAssistCommx64.cab#Version=2,0,1,1" width=0 height=0 >');
		}else{
			document.write('<OBJECT ID="AxAssistComm" CLASSID="CLSID:B3D433B8-F0D2-4D58-9DC0-09C62B7B8EAD" CODEBASE="'+fullPath
						+'ocx/BocomAssistComm.cab#Version=2,0,1,1" width=0 height=0 >');
		}
		document.write('</object>');
		
	}
	
	function runAssistant(param)
	{
    try {
    	setTimeout(function(){
    		AxAssistComm.Run('url=');
    	},1000);
        return AxAssistComm.Run('url=');
    } catch (Exception) {
        return false;
    }
	}
	
	function checkInstalled()
	{
		try{
			if(AxAssistComm.IsInstalled()!=0) {
				return true;
			} else {
				return false;
			}
		} catch(Exception) {
			return false;
		}
	}