var cryptokit_control = new cryptokit();
function cryptokit() {
};

/*******************************************************************************
* 函数名称：  init	
* 功能描述：	控件初始化
* 输入参数：  无
* 输出参数：	无
* 返 回 值：	           c
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-11    	许华锋	      创建           xuhuafeng@bris.cn
* 2012-08-29    	秘相友	      实现           xybei@cfca.com.cn
*******************************************************************************/
cryptokit.prototype.init = function () {
    var eDiv = document.createElement("div");
    if (checkIsIE()) {
        if (window.navigator.cpuClass == "x86") {
            eDiv.innerHTML = "<object id=\"cryptokitCtrl\" codebase=\"CMBCIE32.cab\" classid=\"clsid:4D1B14A9-5284-4CB7-A0AA-D91AFAE68A1B\" ></object>";
        }
        else {
            eDiv.innerHTML = "<object id=\"cryptokitCtrl\" codebase=\"CMBCIE64.cab\" classid=\"clsid:652BC3C3-0930-4652-9624-A0307D540FC5\" ></object>";
        }
    }
    else {
        eDiv.innerHTML = "<embed id=\"cryptokitCtrl\" type=\"application/npCryptoKit.CMBC.U2.x86\" style=\"height: 0px; width: 0px\">";
    }
    document.body.appendChild(eDiv);
}
/*******************************************************************************
* 函数名称： checkIsInstalled	
* 功能描述：	检测控件是否安装。
* 输入参数： 无
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(控件安装：true/未安装：false)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2012-12-21	    姜景竹	      创建           jzjiang@cfca.com.cn
*******************************************************************************/
    cryptokit.prototype.checkIsInstalled = function () {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var retVal = document.getElementById("cryptokitCtrl").GetLastErrorDesc();
        if (!retVal) {
            throw "";
        }
        obj.result = 0;
        obj.val = true;
    }
    catch (e) {
        obj.result = 1;
        obj.val = false;
    }
    return obj;
}
/*******************************************************************************
* 函数名称： getVersion	
* 功能描述：	获取控件版本号。
* 输入参数： 无
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(返回控件版本号)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2012-12-21	    姜景竹	      创建           jzjiang@cfca.com.cn
*******************************************************************************/
cryptokit.prototype.getVersion = function () {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var version = document.getElementById("cryptokitCtrl").GetVersion();
        if (!version) {
            throw "";
        }
        obj.result = 0;
        obj.val = version;
    }
    catch (e) {
        obj.result = 1;
        obj.val = "未知版本";
    }
    return obj;
}
/*******************************************************************************
* 函数名称： setSM2CSPName	
* 功能描述：	设置SM2 CSP名称。
* 输入参数： bstrSM2CSPNameList 过滤SM2证书所在CSP
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(返回控件版本号)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2016-05-28	    姜景竹	      创建           jzjiang@cfca.com.cn
*******************************************************************************/
cryptokit.prototype.setSM2CSPName = function (bstrSM2CSPNameList) {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var bResult = document.getElementById("cryptokitCtrl").SetSM2CSPName(bstrSM2CSPNameList);
        if (true != bResult) {
            throw "";
        }
        obj.result = 0;
        obj.val = bResult;
    }
    catch (e) {
        obj.result = 1;
        obj.val = "false";
    }
    return obj;
}

/*******************************************************************************
* 函数名称： initKeyDetector	
* 功能描述：	初始化检测Key插拔事件
* 输入参数： 无
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2013-04-05    秘相友	      创建           xybei@cfca.com.cn
*******************************************************************************/
cryptokit.prototype.initKeyDetector = function () {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var retVal = document.getElementById("cryptokitCtrl").InitKeyDetector();
        if (!retVal) {
            throw "";
        }
        obj.result = 0;
        obj.val = retVal;
    }
    catch (e) {
        obj.result = 1;
        var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();
        obj.val = LastErrorDesc;
    }
    return obj;
}
/*******************************************************************************
* 函数名称：  selectCertificate	
* 功能描述：	通过传入的字符串作为DN的筛选条件，选择出符合DN条件的带私钥证书，返回选定证书的主题CN。
如果筛选字符串为空，则对相应条件不进行筛选
* 输入参数：  bstrSubjectDNFilter 目标证书中标题DN中所包含的字符串，作为该筛选条件选出证书。
bstrIssuerDNFilter  目标证书中办法者DN中所包含的字符串，作为该筛选条件选出证书。
serialNo     证书序号。
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(被选出证书的主题CN)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16	    许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.selectCertificate = function (bstrSubjectDNFilter, bstrIssuerDNFilter, serialNo) {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var result = document.getElementById("cryptokitCtrl").SelectCertificate(bstrSubjectDNFilter, bstrIssuerDNFilter, serialNo);
        if (!result) {
            throw "";
        }
        obj.result = 0;
        obj.val = result;
    }
    catch (e) {
        obj.result = 1;
        var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();
        obj.val = LastErrorDesc;
    }
    return obj;
}

/*******************************************************************************
* 函数名称：  getCertType	
* 功能描述：	根据已选定的证书（通过SelectCertificate选定的证书），获得证书所对应的密钥的长度证书类型。
* 输入参数：  无
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(证书类型)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2012-11-16	    秘相友	      创建           xybei@cfca.com.cn
*******************************************************************************/
cryptokit.prototype.getCertType = function () {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var result = document.getElementById("cryptokitCtrl").GetCertType();
        if (!result) {
            throw "";
        }
        obj.result = 0;
        obj.val = result;
    }
    catch (e) {
        obj.result = 1;
        var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();
        obj.val = LastErrorDesc;
    }
    return obj;
}

/*******************************************************************************
* 函数名称：  selectCertificateEx	
* 功能描述：	通过传入的字符串作为DN的筛选条件，选择出符合DN条件的带私钥证书，返回选定证书的主题CN。
如果筛选字符串为空，则对相应条件不进行筛选
* 输入参数：  bstrSubjectDNFilter 目标证书中标题DN中所包含的字符串，作为该筛选条件选出证书。
bstrIssuerDNFilter  目标证书中办法者DN中所包含的字符串，作为该筛选条件选出证书。
serialNo     证书序号。
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(被选出证书的主题CN)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16	    许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.selectCertificateEx = function (bstrSubjectDNFilter, bstrIssuerDNFilter, serialNo, certType) {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var result = document.getElementById("cryptokitCtrl").SelectCertificateEx(bstrSubjectDNFilter, bstrIssuerDNFilter, serialNo, certType);
        if (!result) {
            throw "";
        }
        obj.result = 0;
        obj.val = result;
    }
    catch (e) {
        obj.result = 1;
        var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();
        obj.val = LastErrorDesc;
    }
    return obj;
}

/*******************************************************************************
* 函数名称：  getCertTypeEx	
* 功能描述：	根据已选定的证书获得证书所对应的证书类型。
* 输入参数：  bstrSubjectDNFilter 目标证书中标题DN中所包含的字符串，作为该筛选条件选出证书。
            bstrIssuerDNFilter  目标证书中办法者DN中所包含的字符串，作为该筛选条件选出证书。
            serialNo            证书序号。
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(证书类型)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2012-11-16	    秘相友	      创建           xybei@cfca.com.cn
*******************************************************************************/
cryptokit.prototype.getCertTypeEx = function (bstrSubjectDNFilter, bstrIssuerDNFilter, serialNo) {
    var obj = this.selectCertificate(bstrSubjectDNFilter, bstrIssuerDNFilter, serialNo);
    if (obj.result == 0) {
        obj = this.getCertType();
    }
    return obj;
}


/*******************************************************************************
* 函数名称：  getKeyLength	
* 功能描述：	根据已选定的证书（通过SelectCertificate选定的证书），获得证书所对应的密钥的长度。
* 输入参数：  无
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(密钥长度)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16	    许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.getKeyLength=function(){
  var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
	if (!cryptokitCtrl_OCX) {
		cryptokit.prototype.init();
	}
	var obj=new Object();
	try{
	    var result = document.getElementById("cryptokitCtrl").GetKeyLength();
	    if (!result) {
	        throw "";
	    }
	    obj.result=0;
	    obj.val=result;   
   }
   catch(e){
   	   obj.result=1;
       var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();    
       obj.val=LastErrorDesc;            
   }
   return obj;
}


/*******************************************************************************
* 函数名称：  getKeyLengthEx	
* 功能描述：	根据已选定的证书获得证书所对应的密钥的长度。
* 输入参数：  bstrSubjectDNFilter 目标证书中标题DN中所包含的字符串，作为该筛选条件选出证书。
            bstrIssuerDNFilter  目标证书中办法者DN中所包含的字符串，作为该筛选条件选出证书。
            serialNo            证书序号。
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(密钥长度)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16	    许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.getKeyLengthEx=function(bstrSubjectDNFilter,bstrIssuerDNFilter,serialNo){
	 var obj=this.selectCertificate(bstrSubjectDNFilter,bstrIssuerDNFilter,serialNo);
	 if(obj.result==0){
	 obj=this.getKeyLength();
	 }
   return obj;
}


/*******************************************************************************
* 函数名称：  getCSPName	
* 功能描述：	获取已选定证书（通过SelectCertificate选定的证书）对应CSP的名称
* 输入参数：  无
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(CSP名称)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16	    许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.getCSPName=function(){
  var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
	if (!cryptokitCtrl_OCX) {
		cryptokit.prototype.init();
	}
	var obj=new Object();
	try{
	    var result = document.getElementById("cryptokitCtrl").GetCSPName();
	    if (!result) {
	        throw "";
	    }
	    obj.result=0;
	    obj.val=result;   
   }
   catch(e){
   	   obj.result=1;
       var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();    
       obj.val=LastErrorDesc;            
   }
   return obj;
}


/*******************************************************************************
* 函数名称：  getCSPNameEx	
* 功能描述：  获取已选定证书对应CSP的名称
* 输入参数：  bstrSubjectDNFilter 目标证书中标题DN中所包含的字符串，作为该筛选条件选出证书。
            bstrIssuerDNFilter  目标证书中办法者DN中所包含的字符串，作为该筛选条件选出证书。
            serialNo            证书序号。
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(密钥长度)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16	    许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.getCSPNameEx=function(bstrSubjectDNFilter,bstrIssuerDNFilter,serialNo){
	 var obj=this.selectCertificate(bstrSubjectDNFilter,bstrIssuerDNFilter,serialNo);
	 if(obj.result==0){
	 obj=this.getCSPName();
	 }
   return obj;
}
   
 
/*******************************************************************************
* 函数名称：  getSupportedAlgs	
* 功能描述：	获取已选定证书（通过SelectCertificate选定的证书）对应CSP支持的算法。
* 输入参数：  无
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(CSP支持算法，返回以“|”分隔的算法名称列表。
            例如：获取到的微软CSP支持的算法名称列表如下：
            RC2|RC4|DES|3DES TWO KEY|3DES|SHA-1|MD2|MD4|MD5|SSL3 SHAMD5|MAC|RSA_SIGN|RSA_KEYX|HMAC|HMAC|
            )      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16	    许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.getSupportedAlgs=function(){
  var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
	if (!cryptokitCtrl_OCX) {
		cryptokit.prototype.init();
	}
	var obj=new Object();
	try{
	    var result = document.getElementById("cryptokitCtrl").GetSupportedAlgs();
	    if (!result) {
	        throw "";
	    }
	    obj.result=0;
	    obj.val=result;   
   }
   catch(e){
   	   obj.result=1;
       var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();    
       obj.val=LastErrorDesc;            
   }
   return obj;
}


/*******************************************************************************
* 函数名称：  getSupportedAlgsEx	
* 功能描述：  获取已选定证书对应CSP支持的算法
* 输入参数：  bstrSubjectDNFilter 目标证书中标题DN中所包含的字符串，作为该筛选条件选出证书。
            bstrIssuerDNFilter  目标证书中办法者DN中所包含的字符串，作为该筛选条件选出证书。
            serialNo            证书序号。
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(密钥长度)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16    	许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.getSupportedAlgsEx=function(bstrSubjectDNFilter,bstrIssuerDNFilter,serialNo){
	 var obj=this.selectCertificate(bstrSubjectDNFilter,bstrIssuerDNFilter,serialNo);
	 if(obj.result==0){
	 obj=this.getSupportedAlgs();
	 }
   return obj;
}


/*******************************************************************************
* 函数名称：  signMessage	
* 功能描述：	根据指定的算法对字符串（GBK或者UTF-8编码）进行PKCS#7不带原文签名。
* 输入参数：  bstrAlgorithm      哈希算法标识。“SHA-1”或“SHA-256”不区分大小写。
            lCodePage          签名原文的编码格式。936 – GBK，65001 – UTF-8。
            bstrSourceData     待签名的字符串，UTF-16 LE编码格式字符串。（IE默认是UTF-16 LE的编码字符串，
                               签名之前内部会根据指定字符集将其转换为GBK编码或者UTF-8编码）。
            isBase64Source     原文是否是base64编码
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(PKCS#7签名 (带原文) ，Base64编码格式字符串（UTF-16 LE编码）)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16	    许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.signMessage=function(bstrAlgorithm,lCodePage,bstrSourceData,isBase64Source){
  var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
	if (!cryptokitCtrl_OCX) {
		cryptokit.prototype.init();
	}
	var obj=new Object();
	try {
        var result = document.getElementById("cryptokitCtrl").SignMessage(bstrAlgorithm, lCodePage, bstrSourceData, isBase64Source);
	    if (!result) {
	        throw "";
	    }
        obj.result=0;
	    obj.val=result;   
   }
   catch(e){
   	   obj.result=1;
       var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();    
       obj.val=LastErrorDesc;            
   }
   return obj;
}


/*******************************************************************************
* 函数名称：  signMessageEx	
* 功能描述：  根据指定的算法对字符串（GBK或者UTF-8编码）进行PKCS#7不带原文签名。
* 输入参数：  bstrSubjectDNFilter 目标证书中标题DN中所包含的字符串，作为该筛选条件选出证书。
            bstrIssuerDNFilter  目标证书中办法者DN中所包含的字符串，作为该筛选条件选出证书。
            serialNo            证书序号。
            bstrAlgorithm       哈希算法标识。“SHA-1”或“SHA-256”不区分大小写。
            lCodePage           签名原文的编码格式。936 – GBK，65001 – UTF-8。
            bstrSourceData      待签名的字符串，UTF-16 LE编码格式字符串。（IE默认是UTF-16 LE的编码字符串，
                                签名之前内部会根据指定字符集将其转换为GBK编码或者UTF-8编码）。
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(密钥长度)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16	    许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.signMessageEx=function(bstrSubjectDNFilter,bstrIssuerDNFilter,serialNo,bstrAlgorithm,lCodePage,bstrSourceData,isBase64Source){
	 var obj=this.selectCertificate(bstrSubjectDNFilter,bstrIssuerDNFilter,serialNo);
	 if(obj.result==0){
	 obj=this.signMessage(bstrAlgorithm,lCodePage,bstrSourceData,isBase64Source);
	 }
   return obj;
}



/*******************************************************************************
* 函数名称：  SignFile	
* 功能描述：	根据指定的算法对文件进行PKCS#7不带原文签名。
* 输入参数：  bstrAlgorithm      哈希算法标识。“SHA-1”或“SHA-256”不区分大小写。
            bstrSourceFile     待签名文件路径。
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(PKCS#7不带原文签名) ，Base64编码格式字符串（UTF-16 LE编码）)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2012-11-29	    姜景竹	      创建           jzjiang@cfca.com.cn
*******************************************************************************/
cryptokit.prototype.SignFile = function (bstrAlgorithm, bstrSourceFile) {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var result = document.getElementById("cryptokitCtrl").SignFile(bstrAlgorithm, bstrSourceFile);
        if (!result) {
            throw "";
        }
        obj.result = 0;
        obj.val = result;
    }
    catch (e) {
        obj.result = 1;
        var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();
        obj.val = LastErrorDesc;
    }
    return obj;
}



/*******************************************************************************
* 函数名称：  SignFileEx	
* 功能描述：  根据指定的算法对文件进行PKCS#7不带原文签名。
* 输入参数：  bstrSubjectDNFilter 目标证书中标题DN中所包含的字符串，作为该筛选条件选出证书。
            bstrIssuerDNFilter  目标证书中办法者DN中所包含的字符串，作为该筛选条件选出证书。
            serialNo            证书序号。
            bstrAlgorithm      哈希算法标识。“SHA-1”或“SHA-256”不区分大小写。
            bstrSourceFile     待签名文件路径。
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(密钥长度)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2012-11-29	    姜景竹	      创建           jzjiang@cfca.com.cn
*******************************************************************************/

cryptokit.prototype.SignFileEx = function (bstrSubjectDNFilter, bstrIssuerDNFilter, serialNo, bstrAlgorithm, bstrSourceFile) {

    var obj = this.selectCertificate(bstrSubjectDNFilter, bstrIssuerDNFilter, serialNo);

    if (obj.result == 0) {

        obj = this.SignFile(bstrAlgorithm, bstrSourceFile);

    }

    return obj;
}


/*******************************************************************************
* 函数名称：  getCertsDN	
* 功能描述：	筛选民生所有证书（可以多条件，以#分隔）
* 输入参数：  filter1      证书类型 ：CN=95568#CN=0305#OU=CMBC
            filter2      企业证书 ：OU=Customers#OU=Individual1、OU=Enterprises#OU=Organizational1
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(所有民生证书)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2011-04-16	    许华锋	      创建           xuhuafeng@bris.cn
*******************************************************************************/
cryptokit.prototype.getCertsDN=function(filter1, filter2){
  var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
	if (!cryptokitCtrl_OCX) {
		cryptokit.prototype.init();
	}
	var obj=new Object();
	try{
	    var result = document.getElementById("cryptokitCtrl").GetCertsDN(filter1, filter2);
	    if (!result) {
	        throw "";
	    }
        obj.result=0;
	    obj.val=result;   
   }
   catch(e){
   	   obj.result=1;
       var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();    
       obj.val=LastErrorDesc;            
   }
   return obj;
}


/*******************************************************************************
* 函数名称：  verifySignature	
* 功能描述：  验证PKCS#7不带原文签名，并验证签名证书有有效性。此接口用于验证非交易签名，即标准签名。
* 输入参数：  bstrSourceData         原文字符串。
              lCodePage              验签时原文的字符集编码。936–GBK，65001–UTF-8。
              pbstrSignature         Base64编码格式的PKCS#7签名 (不带原文)。
              bstrSignatureAlg       签名算法。 传入RSA或SM2。
              lCertVerifyFlag        验证证书有效性标识。
                                      1：验证证书链中证书的时间有效性。
                                      2：验证证书是否被吊销。
                                      4：验证证书链完整性。
                                      8：验证证书链中证书的签名。
                                      以上标识可以单独使用，也可以相加组合使用。例如：
                                      如果传入0，则不验证证书有效性；
                                      如果传入2，只验证证书是否被吊销；
                                      如果传入15（1+2+4+8），全部都验证。
              bstrCRLPath            证书吊销列表（CRL）文件路径。如果lCertVerifyFlag包含2，则此参数不能为空。
              bstrCertChainFilePath  对于RSA签名：此参数为证书链（p7b）文件路径，如果此参数为空，将默认查找Windows系统证书库。对于SM2签名：此参数为根证书文件路径，如果有多个根证书，则以“|”为分隔，传入拼接后的路径。

* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(验签是否通过)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2012-08-29	 秘相友	      创建           xybei@cfca.com.cn
*******************************************************************************/

cryptokit.prototype.verifySignature = function (bstrSourceData, lCodePage, pbstrSignature, bstrSignatureAlg, lCertVerifyFlag, bstrCRLPath, bstrCertChainFilePath) {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var result = document.getElementById("cryptokitCtrl").VerifySignature(bstrSourceData, lCodePage, pbstrSignature, bstrSignatureAlg, lCertVerifyFlag, bstrCRLPath, bstrCertChainFilePath);
        if (!result) {
            throw "";
        }
        obj.result = 0;
        obj.val = result;
    }
    catch (e) {
        obj.result = 1;
        var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();
        obj.val = LastErrorDesc;
    }
    return obj;
}


/*******************************************************************************
* 函数名称：  VerifyFileSignature	
* 功能描述：  验证PKCS#7不带原文文件签名，并验证签名证书有有效性。此接口用于验证非交易签名，即标准签名。
* 输入参数：  bstrSourceFile         待签名文件路径。
            bstrSignature          Base64编码格式的PKCS#7文件签名 (不带原文)。
            bstrSignatureAlg       签名算法。 传入RSA或SM2。
            lCertVerifyFlag        验证证书有效性标识。
                                   1：验证证书链中证书的时间有效性。
                                   2：验证证书是否被吊销。
                                   4：验证证书链完整性。
                                   8：验证证书链中证书的签名。
                                   以上标识可以单独使用，也可以相加组合使用。例如：
                                   如果传入0，则不验证证书有效性；
                                   如果传入2，只验证证书是否被吊销；
                                   如果传入15（1+2+4+8），全部都验证。
            bstrCRLPath            证书吊销列表（CRL）文件路径。如果lCertVerifyFlag包含2，则此参数不能为空。
            bstrCertChainFilePath  对于RSA签名：此参数为证书链（p7b）文件路径，如果此参数为空，将默认查找Windows系统证书库。对于SM2签名：此参数为根证书文件路径，如果有多个根证书，则以“|”为分隔，传入拼接后的路径。

* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(验签是否通过)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2012-12-3    姜景竹	           创建         jzjiang@cfca.com.cn
*******************************************************************************/
cryptokit.prototype.VerifyFileSignature = function (bstrSourceFile, bstrSignature, bstrSignatureAlg, lCertVerifyFlag, bstrCRLPath, bstrCertChainFilePath) {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var result = document.getElementById("cryptokitCtrl").VerifyFileSignature(bstrSourceFile, bstrSignature, bstrSignatureAlg, lCertVerifyFlag, bstrCRLPath, bstrCertChainFilePath);
        if (!result) {
            throw "";
        }
        obj.result = 0;
        obj.val = result;
    }
    catch (e) {
        obj.result = 1;
        var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();
        obj.val = LastErrorDesc;
    }
    return obj;
}


/*******************************************************************************
* 函数名称：  verifyCustomSignature	
* 功能描述：  验证民生自定义PKCS#7不带原文签名，并验证签名证书有有效性。此接口用于验证交易签名，即民生自定义格式签名，参见《民生银行二代U宝应用接口规范》
* 输入参数：  bstrSourceData         原文字符串。
            isBase64Source         如果此参数为VARIANT_TRUE,则说明bstrSourceData为Base64编码后的内容，控件内部会先对bstrSourceData进行Base64解码再验签，
                                   即此时会忽略lCodePage参数，不再进行字符集编码转换，调用方需保证Base64编码前原文的字符集和签名时原文的字符集相同，否则会验签不过。
                                   如果此参数为VARIANT_FALSE, 说明bstrSourceData内容未进行Base64编码，控件内部会根据lCodePage指定的编码，对bstrSourceData转码后再验签。
            lCodePage              验签时原文的字符集编码。936–GBK，65001–UTF-8。
            pbstrSignature         Base64编码格式的PKCS#7签名 (不带原文)。
            lCertVerifyFlag        验证证书有效性标识。
                                      1：验证证书链中证书的时间有效性。
                                      2：验证证书是否被吊销。
                                      4：验证证书链完整性。
                                      8：验证证书链中证书的签名。
                                      以上标识可以单独使用，也可以相加组合使用。例如：
                                      如果传入0，则不验证证书有效性；
                                      如果传入2，只验证证书是否被吊销；
                                      如果传入15（1+2+4+8），全部都验证。
            bstrCRLPath            证书吊销列表（CRL）文件路径。如果lCertVerifyFlag包含2，则此参数不能为空。
            bstrCertChainFilePath  证书链（p7b）文件路径。如果此参数为空，则验证证书链相关操作时，将默认查找Windows系统证书库。如果此参数不为空，则验证证书链相关操作时，将使用传入的证书链作验证。
* 输出参数：	无
* 返 回 值：	对象obj,属性一result,方法执行结果代码，0代表称成功，其他代表失败，属性二val、执行结果(验签是否通过)      
* 其它说明：  
* 修改日期		修改人	      修改内容       电子邮箱
* ------------------------------------------------------------------------------
* 2012-08-29	    秘相友	      创建           xybei@cfca.com.cn
*******************************************************************************/
cryptokit.prototype.verifyCustomSignature = function (bstrSourceData, isBase64Source, lCodePage, pbstrSignature, lCertVerifyFlag, bstrCRLPath, bstrCertChainFilePath) {
    var cryptokitCtrl_OCX = document.getElementById("cryptokitCtrl");
    if (!cryptokitCtrl_OCX) {
        cryptokit.prototype.init();
    }
    var obj = new Object();
    try {
        var result = document.getElementById("cryptokitCtrl").VerifyCustomSignature(bstrSourceData, isBase64Source, lCodePage, pbstrSignature, lCertVerifyFlag, bstrCRLPath, bstrCertChainFilePath);
        if (!result) {
            throw "";
        }
        obj.result = 0;
        obj.val = result;
    }
    catch (e) {
        obj.result = 1;
        var LastErrorDesc = document.getElementById("cryptokitCtrl").GetLastErrorDesc();
        obj.val = LastErrorDesc;
    }
    return obj;
}

