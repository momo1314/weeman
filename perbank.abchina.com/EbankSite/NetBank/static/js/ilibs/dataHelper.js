/**
**isIncSym校验是否有特殊字符
** checkUserName 用户名校验，规则英文字符数字或者下划线
**/
$.extend({
    fmtMoney:function(money) {
        if (isNaN(money) || money === '') return '';

        money = '' + money;
        var parts = money.split('.');
        if (parts.length > 2) return '非法金额[' + money + ']';
        var intPartStr = parts[0], decPartStr = parts[1] || "00", intPartArray = [];
        for (var i = intPartStr.length; i > 0 ; i -= 3) {
            intPartArray.push(intPartStr.substring(Math.max(0, i - 3), i));
        }
        intPartArray = intPartArray.reverse();
        if (intPartArray.length > 1 && isNaN(intPartArray[0])) {
            return intPartArray[0] + intPartArray.slice(1).join(',') + '.' + decPartStr;
        }else{
            return intPartArray.join(',') + '.' + decPartStr;
        }
    },
  random: function() {
    var random = Math.random();
    return random;
  },
  getTd: function(content, className) {
    if (className) return '<td class="' + className + '">' + content + '</td>';
    else return '<td >' + content + '</td>';
  },
  getTr: function(content, id) {
    if (id) return '<tr id="' + id + '">' + content + '</tr>';
    else return '<tr >' + content + '</tr>';
  },
  //将phone打掩码 例如137******4321
  maskPhone: function(phone) {
    var phoneForShow = "";
    if (phone.length == 11) {
      var xing = '*';
      for (var i = 1, tmpLen = phone.length - 6; i < tmpLen-1; i++) {
        xing += '*';
      }
      phoneForShow += phone.substring(0, 3) + xing + phone.substring(7, 11);
    } else {
      phoneForShow = phone;
    }
    return phoneForShow;
  },
  validateId18: function (value) {//校验18位身份证号
    var powers = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];
    var parityBit = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    value = value + "";
    if (value.length != 18) {
      return false;
    }
    var num = value.substr(0, 17);
    var parityBitReal = value.substr(17);
    var power = 0;
    for (var i = 0, len = value.length-1; i < len; i++) {
      //校验每一位的合法性
      if (num.charAt(i) < '0' || num.charAt(i) > '9') {
        return false;
      } else {
        //加权
        power += parseInt(num.charAt(i)) * parseInt(powers[i]);
      }
    }
    //取模
    var mod = parseInt(power) % 11;
    if (parityBit[mod] == parityBitReal) {
      return true;
    }
    return false;
  },
  validateId15: function (value) {//校验15位身份证号
    if (value.length != 15) {
      return false;
    }
    for (var i = 0, len = value.length; i < len; i++) {
      if (value.charAt(i) < '0' || value.charAt(i) > '9') { //校验每一位的合法性
        return false;
      }
    }
    var year = value.substr(6, 2);
    var month = value.substr(8, 2);
    var day = value.substr(10, 2);
    //校验年份位
    if (year < '01' || year > '90') return false;
    //校验月份
    if (month < '01' || month > '12') return false;
    //校验日
    if (day < '01' || day > '31') return false;
    return true;
  },
  //金额大小写自动转换
  ChangeToBig: function (value,zeroFlag) {
    if (value == null || value == "") {
      //return "错误金额";
      return "";
    }
    value = "" + value;
    var intFen, i;
    var strArr, strCheck, nstrCheck, strFen, strDW, strNum, strBig, strNow;

    var v = -1;
    try {
      v = parseFloat(value);
    } catch(ex) {
    }
    if(zeroFlag!=undefined  &&  zeroFlag!=null && zeroFlag==true){
        if (isNaN(v) || v <0 || v > 999999999999.99) {
            return "错误金额";
        } else if (v >= 1 && value.charAt(0) == '0') {
            return "错误金额";
        } else if (value.charAt(0) == '+') {
            return "错误金额";
        }
        if (v == 0) {
            return "零元";
        }
    } else {
        if (isNaN(v) || v <= 0 || v > 999999999999.99) {
            return "错误金额";
        } else if (v >= 1 && value.charAt(0) == '0') {
            return "错误金额";
        } else if (value.charAt(0) == '+') {
            return "错误金额";
        }
    }

    if (value.indexOf("e") >= 0 || value.indexOf("E") >= 0) {
      return "错误金额";
    }

    var strArray = value.split(".");
    if ((strArray.length == 2 && strArray[0] == "") || (strArray[1] && strArray[1].length > 2)) { //小数点后面超过两位提示
      return "错误金额";
    }

    try {
      i = 0;
      strBig = "";
      intFen = parseInt(value * 100 + 0.00099999999); //转换为以分为单位的数值
      strFen = intFen.toString();
      strArr = strFen.split(".");
      strFen = strArr[0];
      intFen = strFen.length; //获取长度
      strArr = strFen.split(""); //将各个数值分解到数组内
      while (intFen != 0)             //分解并转换
      {
        i = i + 1;
        switch (i)
//选择单位
        {
        case 1:
          strDW = "分";
          break;
        case 2:
          strDW = "角";
          break;
        case 3:
          strDW = "元";
          break;
        case 4:
          strDW = "拾";
          break;
        case 5:
          strDW = "佰";
          break;
        case 6:
          strDW = "仟";
          break;
        case 7:
          strDW = "万";
          break;
        case 8:
          strDW = "拾";
          break;
        case 9:
          strDW = "佰";
          break;
        case 10:
          strDW = "仟";
          break;
        case 11:
          strDW = "亿";
          break;
        case 12:
          strDW = "拾";
          break;
        case 13:
          strDW = "佰";
          break;
        case 14:
          strDW = "仟";
          break;
        }

        switch (strArr[intFen - 1])
//选择数字
        {
        case "1":
          strNum = "壹";
          break;
        case "2":
          strNum = "贰";
          break;
        case "3":
          strNum = "叁";
          break;
        case "4":
          strNum = "肆";
          break;
        case "5":
          strNum = "伍";
          break;
        case "6":
          strNum = "陆";
          break;
        case "7":
          strNum = "柒";
          break;
        case "8":
          strNum = "捌";
          break;
        case "9":
          strNum = "玖";
          break;
        case "0":
          strNum = "零";
          break;
        }

        //处理特殊情况
        strNow = strBig.split("");
        //分为零时的情况
        if ((i == 1) && (strArr[intFen - 1] == "0")) {
          strBig = "整";
        }
          //角为零时的情况
        else if ((i == 2) && (strArr[intFen - 1] == "0")) { //角分同时为零时的情况
          if (strBig != "整")
            strBig = "零" + strBig;
        }
          //元为零的情况
        else if ((i == 3) && (strArr[intFen - 1] == "0")) {
          strBig = "元" + strBig;
        }
          //拾－仟中一位为零且其前一位（元以上）不为零的情况时补零
        else if ((i < 7) && (i > 3) && (strArr[intFen - 1] == "0") && (strNow[0] != "零") && (strNow[0] != "元")) {
          strBig = "零" + strBig;
        }
          //拾－仟中一位为零且其前一位（元以上）也为零的情况时跨过
        else if ((i < 7) && (i > 3) && (strArr[intFen - 1] == "0") && (strNow[0] == "零")) {
        }
          //拾－仟中一位为零且其前一位是元且为零的情况时跨过
        else if ((i < 7) && (i > 3) && (strArr[intFen - 1] == "0") && (strNow[0] == "元")) {
        }
          //当万为零时必须补上万字
        else if ((i == 7) && (strArr[intFen - 1] == "0")) {
          strBig = "万" + strBig;
        }
          //拾万－仟万中一位为零且其前一位（万以上）不为零的情况时补零
        else if ((i < 11) && (i > 7) && (strArr[intFen - 1] == "0") && (strNow[0] != "零") && (strNow[0] != "万")) {
          strBig = "零" + strBig;
        }
          //拾万－仟万中一位为零且其前一位（万以上）也为零的情况时跨过
        else if ((i < 11) && (i > 7) && (strArr[intFen - 1] == "0") && (strNow[0] == "万")) {
        }
          //拾万－仟万中一位为零且其前一位为万位且为零的情况时跨过
        else if ((i < 11) && (i > 7) && (strArr[intFen - 1] == "0") && (strNow[0] == "零")) {
        }
          //万位为零且存在仟位和十万以上时，在万仟间补零
        else if ((i < 11) && (i > 8) && (strArr[intFen - 1] != "0") && (strNow[0] == "万") && (strNow[2] == "仟")) {
          strBig = strNum + strDW + "万零" + strBig.substring(1, strBig.length);
        }
          //单独处理亿位
        else if (i == 11) {
          //亿位为零且万全为零存在仟位时，去掉万补为零
          if ((strArr[intFen - 1] == "0") && (strNow[0] == "万") && (strNow[2] == "仟")) {
            strBig = "亿" + "零" + strBig.substring(1, strBig.length);
          }
            //亿位为零且万全为零不存在仟位时，去掉万
          else if ((strArr[intFen - 1] == "0") && (strNow[0] == "万") && (strNow[2] != "仟")) {
            strBig = "亿" + strBig.substring(1, strBig.length);
          }
            //亿位不为零且万全为零存在仟位时，去掉万补为零
          else if ((strNow[0] == "万") && (strNow[2] == "仟")) {
            strBig = strNum + strDW + "零" + strBig.substring(1, strBig.length);
          }
            //亿位不为零且万全为零不存在仟位时，去掉万
          else if ((strNow[0] == "万") && (strNow[2] != "仟")) {
            strBig = strNum + strDW + strBig.substring(1, strBig.length);
          }
            //其他正常情况
          else {
            strBig = strNum + strDW + strBig;
          }
        }
          //拾亿－仟亿中一位为零且其前一位（亿以上）不为零的情况时补零
        else if ((i < 15) && (i > 11) && (strArr[intFen - 1] == "0") && (strNow[0] != "零") && (strNow[0] != "亿")) {
          strBig = "零" + strBig;
        }
          //拾亿－仟亿中一位为零且其前一位（亿以上）也为零的情况时跨过
        else if ((i < 15) && (i > 11) && (strArr[intFen - 1] == "0") && (strNow[0] == "亿")) {
        }
          //拾亿－仟亿中一位为零且其前一位为亿位且为零的情况时跨过
        else if ((i < 15) && (i > 11) && (strArr[intFen - 1] == "0") && (strNow[0] == "零")) {
        }
          //亿位为零且不存在仟万位和十亿以上时去掉上次写入的零
        else if ((i < 15) && (i > 11) && (strArr[intFen - 1] != "0") && (strNow[0] == "零") && (strNow[1] == "亿") && (strNow[3] != "仟")) {
          strBig = strNum + strDW + strBig.substring(1, strBig.length);
        }
          //亿位为零且存在仟万位和十亿以上时，在亿仟万间补零
        else if ((i < 15) && (i > 11) && (strArr[intFen - 1] != "0") && (strNow[0] == "零") && (strNow[1] == "亿") && (strNow[3] == "仟")) {
          strBig = strNum + strDW + "亿零" + strBig.substring(2, strBig.length);
        } else {
          strBig = strNum + strDW + strBig;
        }

        strFen = strFen.substring(0, intFen - 1);
        intFen = strFen.length;
        strArr = strFen.split("");
      }
      if (strBig.indexOf("undefined") != -1) {
        return "错误金额";
      }
      return strBig;
    } catch(err) {
      return ""; //若失败则返回原值
    }
  },

  rightPadCurrency: function(originalCurrency) {
    if (originalCurrency == null || originalCurrency == "") {
      /*如果是空的就不要加小数点后补两个0*/
      return "";
    }
    var dotPosition = originalCurrency.indexOf(".");
    var currencyLength = originalCurrency.length;
    var currencyInteger, originalRightPaddings;

    if (dotPosition < 0) {
      currencyInteger = originalCurrency;
      originalRightPaddings = ".";
    } else {
      currencyInteger = originalCurrency.substring(0, dotPosition);
      originalRightPaddings = originalCurrency.substring(dotPosition, currencyLength);
    }

    while (originalRightPaddings.length < 3) {
      originalRightPaddings += "0";
    }
    return currencyInteger + originalRightPaddings;
  },

  getAreaByPrv: function(prv) {
    //初始化
    var prvCode = new Array();
    var areCode = new Array();

    areCode[0] = '11'; //北京市分行
    prvCode[0] = '11'; //北京市分行
    areCode[1] = '12'; //天津市分行
    prvCode[1] = '02'; //天津市分行
    areCode[2] = '13'; //河北省分行
    prvCode[2] = '50'; //河北省分行
    areCode[3] = '14'; //山西省分行
    prvCode[3] = '04'; //山西省分行
    areCode[4] = '15'; //内蒙古自治区分行
    prvCode[4] = '05'; //内蒙古自治区分行
    areCode[5] = '21'; //辽宁省分行
    prvCode[5] = '06'; //辽宁省分行
    areCode[6] = '85'; //大连市分行
    prvCode[6] = '34'; //大连市分行
    areCode[7] = '22'; //吉林省分行
    prvCode[7] = '07'; //吉林省分行
    areCode[8] = '23'; //黑龙江省分行
    prvCode[8] = '08'; //黑龙江省分行
    areCode[9] = '31'; //上海市分行
    //prvCode[9] = '09'; //上海市分行
    prvCode[9] = '03'; //上海市分行
    areCode[10] = '32'; //江苏省分行
    prvCode[10] = '10'; //江苏省分行
    areCode[11] = '33'; //浙江省分行
    prvCode[11] = '19'; //浙江省分行
    areCode[12] = '82'; //宁波市分行
    prvCode[12] = '39'; //宁波市分行
    areCode[13] = '34'; //安徽省分行
    prvCode[13] = '12'; //安徽省分行
    areCode[14] = '35'; //福建省分行
    prvCode[14] = '13'; //福建省分行
    areCode[15] = '83'; //厦门市分行
    prvCode[15] = '40'; //厦门市分行
    areCode[16] = '36'; //江西省分行
    prvCode[16] = '14'; //江西省分行
    areCode[17] = '37'; //山东省分行
    prvCode[17] = '15'; //山东省分行
    areCode[18] = '84'; //青岛市分行
    prvCode[18] = '38'; //青岛市分行
    areCode[19] = '41'; //河南省分行
    prvCode[19] = '16'; //河南省分行
    areCode[20] = '42'; //湖北省分行
    prvCode[20] = '17'; //湖北省分行
    areCode[21] = '43'; //湖南省分行
    prvCode[21] = '18'; //湖南省分行
    areCode[22] = '44'; //广东省分行
    prvCode[22] = '44'; //广东省分行
    areCode[23] = '81'; //深圳市分行
    prvCode[23] = '41'; //深圳市分行
    areCode[24] = '45'; //广西自治区分行
    prvCode[24] = '20'; //广西自治区分行
    areCode[25] = '46'; //海南省分行
    prvCode[25] = '21'; //海南省分行
    areCode[26] = '51'; //四川省分行
    prvCode[26] = '22'; //四川省分行
    areCode[27] = '52'; //贵州省分行
    prvCode[27] = '23'; //贵州省分行
    areCode[28] = '53'; //云南省分行
    prvCode[28] = '24'; //云南省分行
    areCode[29] = '54'; //西藏自治区分行
    prvCode[29] = '25'; //西藏自治区分行
    areCode[30] = '61'; //陕西省分行
    prvCode[30] = '26'; //陕西省分行
    areCode[31] = '62'; //甘肃省分行
    prvCode[31] = '27'; //甘肃省分行
    areCode[32] = '63'; //青海省分行
    prvCode[32] = '28'; //青海省分行
    areCode[33] = '64'; //宁夏自治区分行
    prvCode[33] = '29'; //宁夏自治区分行
    areCode[34] = '65'; //新疆自治区分行
    prvCode[34] = '30'; //新疆自治区分行
    areCode[35] = '55'; //重庆市分行
    prvCode[35] = '31'; //重庆市分行
    areCode[36] = '10'; //总行营业部
    prvCode[36] = '81'; //总行营业部

    for (i = 0; i < prvCode.length; i++) {
      if (prv == prvCode[i]) {
        return areCode[i];
      }
    }
    return "00";
  },

  //反写getAreaByPrv方法，根据网银省市代码查abis省市代码，jiangshangxu
  getPrvByArea: function(area) {
    //初始化
    var prvCode = new Array();
    var areCode = new Array();
    areCode[0] = '11'; //北京市分行
    prvCode[0] = '11'; //北京市分行
    areCode[1] = '12'; //天津市分行
    prvCode[1] = '02'; //天津市分行
    areCode[2] = '13'; //河北省分行
    prvCode[2] = '50'; //河北省分行
    areCode[3] = '14'; //山西省分行
    prvCode[3] = '04'; //山西省分行
    areCode[4] = '15'; //内蒙古自治区分行
    prvCode[4] = '05'; //内蒙古自治区分行
    areCode[5] = '21'; //辽宁省分行
    prvCode[5] = '06'; //辽宁省分行
    areCode[6] = '85'; //大连市分行
    prvCode[6] = '34'; //大连市分行
    areCode[7] = '22'; //吉林省分行
    prvCode[7] = '07'; //吉林省分行
    areCode[8] = '23'; //黑龙江省分行
    prvCode[8] = '08'; //黑龙江省分行
    areCode[9] = '31'; //上海市分行
    prvCode[9] = '09'; //上海市分行
    //prvCode[9] = '03'; //上海市分行
    areCode[10] = '32'; //江苏省分行
    prvCode[10] = '10'; //江苏省分行
    areCode[11] = '33'; //浙江省分行
    prvCode[11] = '19'; //浙江省分行
    areCode[12] = '82'; //宁波市分行
    prvCode[12] = '39'; //宁波市分行
    areCode[13] = '34'; //安徽省分行
    prvCode[13] = '12'; //安徽省分行
    areCode[14] = '35'; //福建省分行
    prvCode[14] = '13'; //福建省分行
    areCode[15] = '83'; //厦门市分行
    prvCode[15] = '40'; //厦门市分行
    areCode[16] = '36'; //江西省分行
    prvCode[16] = '14'; //江西省分行
    areCode[17] = '37'; //山东省分行
    prvCode[17] = '15'; //山东省分行
    areCode[18] = '84'; //青岛市分行
    prvCode[18] = '38'; //青岛市分行
    areCode[19] = '41'; //河南省分行
    prvCode[19] = '16'; //河南省分行
    areCode[20] = '42'; //湖北省分行
    prvCode[20] = '17'; //湖北省分行
    areCode[21] = '43'; //湖南省分行
    prvCode[21] = '18'; //湖南省分行
    areCode[22] = '44'; //广东省分行
    prvCode[22] = '44'; //广东省分行
    areCode[23] = '81'; //深圳市分行
    prvCode[23] = '41'; //深圳市分行
    areCode[24] = '45'; //广西自治区分行
    prvCode[24] = '20'; //广西自治区分行
    areCode[25] = '46'; //海南省分行
    prvCode[25] = '21'; //海南省分行
    areCode[26] = '51'; //四川省分行
    prvCode[26] = '22'; //四川省分行
    areCode[27] = '52'; //贵州省分行
    prvCode[27] = '23'; //贵州省分行
    areCode[28] = '53'; //云南省分行
    prvCode[28] = '24'; //云南省分行
    areCode[29] = '54'; //西藏自治区分行
    prvCode[29] = '25'; //西藏自治区分行
    areCode[30] = '61'; //陕西省分行
    prvCode[30] = '26'; //陕西省分行
    areCode[31] = '62'; //甘肃省分行
    prvCode[31] = '27'; //甘肃省分行
    areCode[32] = '63'; //青海省分行
    prvCode[32] = '28'; //青海省分行
    areCode[33] = '64'; //宁夏自治区分行
    prvCode[33] = '29'; //宁夏自治区分行
    areCode[34] = '65'; //新疆自治区分行
    prvCode[34] = '30'; //新疆自治区分行
    areCode[35] = '55'; //重庆市分行
    prvCode[35] = '31'; //重庆市分行
    areCode[36] = '10'; //总行营业部
    prvCode[36] = '81'; //总行营业部
    for (i = 0; i < areCode.length; i++) {
      if (area == areCode[i]) {
        return prvCode[i];
      }
    }
    return "00";
  },
  //网银的币种转换为ABIS的币种
  ConvertToABISCurCode: function (curCode) {
      if (curCode == null || curCode == "") {
          alert("您输入的币种有误！");
          return false;
      }

      var ABISCurCode = new Array();

      //赋值  10个币种
      ABISCurCode["01"] = "156";    //人民币
      ABISCurCode["12"] = "826";    //英镑
      ABISCurCode["13"] = "344";    //港币
      ABISCurCode["14"] = "840";    //美元
      ABISCurCode["15"] = "756";    //瑞士法郎
      ABISCurCode["18"] = "702";    //新加坡元
      ABISCurCode["27"] = "392";    //日元
      ABISCurCode["28"] = "124";    //加拿大元
      ABISCurCode["29"] = "036";    //澳大利亚元
      ABISCurCode["38"] = "978";    //欧元

      var i = 0;

      for (var index in ABISCurCode) {
          if (curCode == ABISCurCode[index]) {
              i++;
              return index;
          }
      }

      //异常处理，找不到对应关系，返回原值
      if (i == 0) {
          return curCode;
      }
  },
    //ABIS币种代码转换为网银币种
  ConvertToEbankCurCode: function (curCode) {
        if (curCode == null || curCode == "") {
            alert("您输入的币种有误！");
            return false;
        }

        var EbankCurCode = new Array();

        //赋值  12个币种
        EbankCurCode["156"] = "CNY";    //人民币
        EbankCurCode["826"] = "GBP";    //英镑
        EbankCurCode["344"] = "HKD";    //港币
        EbankCurCode["840"] = "USD";    //美元
        EbankCurCode["756"] = "CHF";    //瑞士法郎
        EbankCurCode["702"] = "SGD";    //新加坡元
        EbankCurCode["392"] = "JPY";    //日元
        EbankCurCode["124"] = "CAD";    //加拿大元
        EbankCurCode["036"] = "AUD";    //澳大利亚元
        EbankCurCode["978"] = "EUR";    //欧元
        EbankCurCode["643"] = "RUB";    //卢布
        EbankCurCode["756"] = "SEK";    //瑞典克朗

        var i = 0;

        for (var index in EbankCurCode) {
            if (curCode == EbankCurCode[index]) {
                i++;
                return index;
            }
        }

        //异常处理，找不到对应关系，返回原值
        if (i == 0) {
            return curCode;
        }
    },

    //转换为BOE币种
  ConvertToBoeCurCode: function (curCode) {
        if (curCode == null || curCode == "") {
            alert("您输入的币种有误！");
            return false;
        }

        var EbankCurCode = new Array();

        //赋值  12个币种
        EbankCurCode["156"] = "CNY";    //人民币
        EbankCurCode["826"] = "GBP";    //英镑
        EbankCurCode["344"] = "HKD";    //港币
        EbankCurCode["840"] = "USD";    //美元
        EbankCurCode["756"] = "CHF";    //瑞士法郎
        EbankCurCode["702"] = "SGD";    //新加坡元
        EbankCurCode["392"] = "JPY";    //日元
        EbankCurCode["124"] = "CAD";    //加拿大元
        EbankCurCode["036"] = "AUD";    //澳大利亚元
        EbankCurCode["978"] = "EUR";    //欧元
        EbankCurCode["643"] = "RUB";    //卢布
        EbankCurCode["756"] = "SEK";    //瑞典克朗


        curCode = EbankCurCode[EbankCurCode];

        if (curCode == "" || curCode == null) {
            return "CNY";
        }
  },

  //字数截断(按字节，中文占2，其他占1)
  //str：字符串，len：需要截断的字节数，suffix：截断后的后缀
  StringSuffix : function(str, len, suffix) {
    if (!str) return "";
    if (len <= 0) return "";
    if (!suffix) suffix = "";
    var templen = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            templen += 2;
        } else {
            templen++;
        }
        if (templen == len) {
            return str.substring(0, i + 1) + suffix;
        } else if (templen > len) {
            return str.substring(0, i) + suffix;
        }
    }
    return str;
  }
});





