(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "jquery.validate"], factory );
	} else {
		factory( $ );
	}
}(function( $ ) {
    /*
     * Translated default messages for the $ validation plugin.
     * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
     */
    $.extend($.validator.messages, {
	    required: "必填字段不能为空",
	    remote: "请修正此字段",
	    email: "请输入有效的电子邮件地址",
	    url: "请输入有效的网址",
	    date: "请输入有效的日期",
	    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
	    number: "请输入有效的数字",
	    digits: "只能输入数字",
	    creditcard: "请输入有效的信用卡号码",
	    equalTo: "你的输入不相同",
	    extension: "请输入有效的后缀",
	    maxlength: $.validator.format("最多可以输入 {0} 个字符"),
	    minlength: $.validator.format("最少要输入 {0} 个字符"),
	    rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
	    range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
	    max: $.validator.format("请输入不大于 {0} 的数值"),
	    min: $.validator.format("请输入不小于 {0} 的数值")
    });

    // 判断整数value是否等于0
    $.validator.addMethod("isIntEqZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value == 0;
    }, "整数必须为0");

    // 判断整数value是否大于0
    $.validator.addMethod("isIntGtZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value > 0;
    }, "整数必须大于0");

    // 判断整数value是否大于或等于0
    $.validator.addMethod("isIntGteZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value >= 0;
    }, "整数必须大于或等于0");

    // 判断整数value是否不等于0
    $.validator.addMethod("isIntNEqZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value != 0;
    }, "整数必须不等于0");

    // 判断整数value是否小于0
    $.validator.addMethod("isIntLtZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value < 0;
    }, "整数必须小于0");

    // 判断整数value是否小于或等于0
    $.validator.addMethod("isIntLteZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value <= 0;
    }, "整数必须小于或等于0");

    // 判断浮点数value是否等于0
    $.validator.addMethod("isFloatEqZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value == 0;
    }, "浮点数必须为0");

    // 判断浮点数value是否大于0
    $.validator.addMethod("isFloatGtZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value > 0;
    }, "浮点数必须大于0");

    // 判断浮点数value是否大于或等于0
    $.validator.addMethod("isFloatGteZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value >= 0;
    }, "浮点数必须大于或等于0");

    // 判断浮点数value是否不等于0
    $.validator.addMethod("isFloatNEqZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value != 0;
    }, "浮点数必须不等于0");

    // 判断浮点数value是否小于0
    $.validator.addMethod("isFloatLtZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value < 0;
    }, "浮点数必须小于0");

    // 判断浮点数value是否小于或等于0
    $.validator.addMethod("isFloatLteZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value <= 0;
    }, "浮点数必须小于或等于0");

    // 判断浮点型
    $.validator.addMethod("isFloat", function (value, element) {
        return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "只能包含数字、小数点等字符");

    // 匹配integer
    $.validator.addMethod("isInteger", function (value, element) {
        return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value) >= 0);
    }, "匹配integer");

    // 判断数值类型，包括整数和浮点数
    $.validator.addMethod("isNumber", function (value, element) {
        return this.optional(element) || /^[-\+]?\d+$/.test(value) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "匹配数值类型，包括整数和浮点数");

    // 只能输入[0-9]数字
    $.validator.addMethod("isDigits", function (value, element) {
        return this.optional(element) || /^\d+$/.test(value);
    }, "只能输入0-9数字");

    // 判断中文字符
    $.validator.addMethod("isChinese", function (value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
    }, "只能包含中文字符");

    // 判断英文字符
    $.validator.addMethod("isEnglish", function (value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, "只能包含英文字符");

    // 手机号码验证
    $.validator.addMethod("isMobile", function (value, element) {
        var mobile = /^[0-9]{11}$/;
        return (mobile.test(value));
    }, "请正确填写您的手机号码");

    //验证手机
    $.validator.addMethod( "checkMobile",function(value,element){
        var reg0 = /^(12[0-9]|13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

        if (reg0.test(value))
            return true;
        else
            return false;

    },"请输入有效的手机号码");

    // 电话号码验证
    $.validator.addMethod("isPhone", function (value, element) {
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的电话号码");

    // 联系电话(手机/电话皆可)验证
    $.validator.addMethod("isTel", function (value, element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || tel.test(value) || (length == 11 && mobile.test(value));
    }, "请正确填写您的联系方式");

    // 匹配qq
    $.validator.addMethod("isQq", function (value, element) {
        return this.optional(element) || /^[1-9]\d{4,12}$/;
    }, "匹配QQ");

    // 邮政编码验证
    $.validator.addMethod("isZipCode", function (value, element) {
        var zip = /^[0-9]{6}$/;
        return this.optional(element) || (zip.test(value));
    }, "请正确填写您的邮政编码");

    // 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线
    $.validator.addMethod("isPwd", function (value, element) {
        return this.optional(element) || /^[a-zA-Z]\\w{6,12}$/.test(value);
    }, "以字母开头，长度在6-12之间，只能包含字符、数字和下划线");

    // 身份证号码验证
    $.validator.addMethod("isIdCardNo", function (value, element) {
        //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;
        return this.optional(element) || isIdCardNo(value);
    }, "请输入正确的身份证号码");

    // IP地址验证
    $.validator.addMethod("ip", function (value, element) {
        return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
    }, "请填写正确的IP地址");

    // 字符验证，只能包含中文、英文、数字、下划线等字符
    $.validator.addMethod("stringCheck", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
    }, "只能包含中文、英文、数字、下划线等字符");

    // 匹配english
    $.validator.addMethod("isEnglish", function (value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, "非英文字符");

    // 匹配汉字
    $.validator.addMethod("isChinese", function (value, element) {
        return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
    }, "非中文");

    // 匹配中文(包括汉字和字符)
    $.validator.addMethod("isChineseChar", function (value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
    }, "非中文字符(包括汉字和字符) ");

    // 判断是否为合法字符(a-zA-Z0-9-_)
    $.validator.addMethod("isRightfulString", function (value, element) {
        return this.optional(element) || /^[A-Za-z0-9_-]+$/.test(value);
    }, "判断是否为合法字符(a-zA-Z0-9-_)");

    // 判断是否包含中英文特殊字符，除英文"-_"字符外
    $.validator.addMethod("isContainsSpecialChar", function (value, element) {
        var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\)(\，)(\、)(\？)]+/);
        return this.optional(element) || !reg.test(value);
    }, "含有中英文特殊字符");

    // 校验短信验证码 hwl added
    $.validator.addMethod("isSmsCode", function (value, element) {
        var code = /^[0-9]{6}$/;
        return (code.test(value));
    }, "请输入6位数字短信验证码");

    // 校验金额 hwl added
    $.validator.addMethod("isCurrency", function (value, element) {
        var amt = /^((([1-9]\d{0,9})|0)(\.\d{1,2})?){0,1}$/;
        return (amt.test(value));
    }, "请输入合法金额");

    // 校验卡号 weina added
    $.validator.addMethod("isCardNo", function (value, element) {
        var length = value.length;
        var cardNo = /^\d+$/;
        return (length >= 14 && cardNo.test(value));
    }, "请输入正确卡号");

    // 校验证件有效期 weina added
    $.validator.addMethod("isIdEndTime", function (value, element) {
        var code = /^[0-9]{8}$/;
        return (code.test(value));
    }, "请输入正确年月日");

    // 校验普通卡号及存折 cgz added
    $.validator.addMethod("isNormalCardNo", function (value, element) {
        var cardNo = /^[A-Za-z0-9]+$/;
        var filterArray = value.split("-");
        //普通卡或者存折不带-或者错误卡
        if (filterArray.length != 2)
        {
            return (cardNo.test(value));
        }
        //存折带有-，过滤-
        else if (filterArray.length == 2)
        {
            return (cardNo.test(filterArray[0] + filterArray[1]));
        }

    }, "请输入正确卡号");

    $.validator.addMethod("lengthRange", function (value, element,param) {
      return (value.length > param[0] && value.length < param[1]);
    }, "请输入长度在{0}-{1}之间的值");

    //校验身份证号
    $.validator.addMethod("validId18", function (value, element) {
      var powers = new Array("7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2");
      var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
      value = value + "";
      if (value.length < 18) {
          return false;
      }
      if (value.length == 18 && (/(\d{18})|(\d{17}X)/.test(value))) {
        var num = value.substr(0, 17);
        var oneParityBit = value.substr(17);
        var power = 0;
        for (var i = 0, len = value.length - 1; i < len; i++) {
          power += parseInt(num.charAt(i)) * parseInt(powers[i]);//加权
        }
        //取模
        var mod = parseInt(power) % 11;
        if (parityBit[mod] == oneParityBit) {
          return true;
        }
        return false;
      }
      return true;
    }, "请输入正确的18位身份证号");

  //校验身份证号，不足18位，默认返回true
    $.validator.addMethod("looseValidId18", function (value) {
      var powers = new Array("7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2");
      var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
      value = value + "";
      if (value.length === 18 && (/(\d{18})|(\d{17}X)/.test(value))) {
        var num = value.substr(0, 17);
        var oneParityBit = value.substr(17);
        var power = 0;
        for (var i = 0, len = value.length - 1; i < len; i++) {
          power += parseInt(num.charAt(i)) * parseInt(powers[i]); //加权
        }
        var mod = parseInt(power) % 11;
        if (parityBit[mod] === oneParityBit) {
          return true;
        }
        return false;
      }
      return true;
    }, "请输入正确的18位身份证号");

    //被某数整除校验
  jQuery.validator.addMethod("moneyDivide", function(value, element, param) {
    return this.optional(element) || (value % param == 0);
  });

}));
