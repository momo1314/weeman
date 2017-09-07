;(function () {
	/**
	 * �ж����������
	 * add by xs @ 2008-3-4
	 */
	var _ua = navigator.userAgent.toLowerCase();
	var $IE = /msie/.test(_ua);
	var $moz = /gecko/.test(_ua);
	var $Safari = /safari/.test(_ua);
	
	/**
	 * encode HTML
	 * @param {String} str
	 * @return {String} str
	 * @author Robin Young | yonglin@staff.sina.com.cn
	 * @example
	 * encodeHTML('&<>" ') === '&amp;&lt;&gt;&quot;$nbsp;';
	 */
	function encodeHTML(str){
		if(typeof str !== 'string'){
			throw 'encodeHTML need a string as parameter';
		}
		return str.replace(/\&/g,'&amp;').
			replace(/"/g,'&quot;').
			replace(/\</g,'&lt;').
			replace(/\>/g,'&gt;').
			replace(/\'/g,'&#39').
			replace(/\u00A0/g,'&nbsp;').
			replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g,'&#32');
	}

	/**
	 * decode HTML
	 * @param {String} str
	 * @return {String} str
	 * @author Robin Young | yonglin@staff.sina.com.cn
	 * @example
	 * decodeHTML('&amp;&lt;&gt;&quot;$nbsp;') === '&<>" ';
	 */
	function decodeHTML(str){
		if(typeof str !== 'string'){
			throw 'decodeHTML need a string as parameter';
		}
		return str.replace(/&quot;/g,'"').
			replace(/&lt;/g,'<').
			replace(/&gt;/g,'>').
			replace(/&#39/g,'\'').
			replace(/&nbsp;/g,'\u00A0').
			replace(/&#32/g,'\u0020').
			replace(/&amp;/g,'\&');
	}
	
	/**
	 * ����Ԫ�ص�id��ȡ��Ӧ�ڵ������
	 * @author stan | chaoliang@staff.sina.com.cn
	 * @param {String} id �ڵ��id���߽ڵ㱾��
	 */
	function $E(id) {
		return typeof(id) == 'string' ? _viewWindow.document.getElementById(id) : id;
	}
/**
 * ȡ��ҳ���scrollPos
 * @return {Array} �������Ӷ� ����ֵ
 * @author chaoliang@staff.sina.com.cn
 *         fangchao@staff.sina.com.cn
 * @update 08.02.13
 */
var getScrollPos = function(oDocument) {
	oDocument = oDocument || document;
	return [
			Math.max(oDocument.documentElement.scrollTop, oDocument.body.scrollTop), 
			Math.max(oDocument.documentElement.scrollLeft, oDocument.body.scrollLeft),
			Math.max(oDocument.documentElement.scrollWidth, oDocument.body.scrollWidth), 
			Math.max(oDocument.documentElement.scrollHeight, oDocument.body.scrollHeight)
			];
};

/**
* ��ȡָ���ڵ����ʽ
* @method getStyle
* @param {HTMLElement | Document} el �ڵ����
* @param {String} property ��ʽ��
* @return {String} ָ����ʽ��ֵ
* @author FlashSoft | fangchao@staff.sina.com.cn
* @update 08.02.23
* @global $getStyle
* @exception
* 			getStyle(document.body, "left");
* 			$getStyle(document.body, "left");
*/ 
var getStyle = function (el, property) {
	switch (property) {
		// ͸����
		case "opacity":
				var val = 100;
				try {
						val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
				}
				catch(e) {
						try {
							val = el.filters('alpha').opacity;
						}catch(e){}
				}
				return val;
		 // ����
		 case "float":
				 property = "styleFloat";
		 default:
				 var value = el.currentStyle? el.currentStyle[property]: null;
				 return ( el.style[property] || value );
	}
};
if($moz) {
	getStyle = function (el, property) {
		// ����
		if(property == "float") {
			property = "cssFloat";
		}
		// ��ȡ����
		try{
			var computed = document.defaultView.getComputedStyle(el, "");
		}
		catch(e) {
			traceError(e);
		}
		return el.style[property] || computed? computed[property]: null;
	};
}


/**
* ��ȡ�ڵ����ľ��ĵ���XYֵ
* @method getXY
* @param {HTMLElement } el �ڵ����
* @return {Array} x,y���������
* @author FlashSoft | fangchao@staff.sina.com.cn
* @update 08.02.23
* @global $getXY
* @exception
* 			getXY($E("input"));
* 			$getXY($E("input"));
*/
var getXY = function (el) {
	if ((el.parentNode == null || el.offsetParent == null || getStyle(el, "display") == "none") && el != document.body) {
		return false;
	}
	var parentNode = null;
	var pos = [];
	var box;
	var doc = el.ownerDocument;
	// IE
	box = el.getBoundingClientRect();
	var scrollPos = getScrollPos(el.ownerDocument);
	return [box.left + scrollPos[1], box.top + scrollPos[0]];
	// IE end
	parentNode = el.parentNode;
	while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
		if (getStyle(parentNode, "display").search(/^inline|table-row.*$/i)) { 
			pos[0] -= parentNode.scrollLeft;
			pos[1] -= parentNode.scrollTop;
		}
		parentNode = parentNode.parentNode; 
	}
	return pos;
};
	if($moz) {
		getXY = function (el) {
			if ((el.parentNode == null || el.offsetParent == null || getStyle(el, "display") == "none") && el != document.body) {
				return false;
			}
			var parentNode = null;
			var pos = [];
			var box;
			var doc = el.ownerDocument;
			
			// FF
			pos = [el.offsetLeft, el.offsetTop];
			parentNode = el.offsetParent;
			var hasAbs = getStyle(el, "position") == "absolute";
			
			if (parentNode != el) {
				while (parentNode) {
						pos[0] += parentNode.offsetLeft;
						pos[1] += parentNode.offsetTop;
						if ($Safari && !hasAbs && getStyle(parentNode,"position") == "absolute" ) {
								hasAbs = true;
						}
						parentNode = parentNode.offsetParent;
				}
			}
			
			if ($Safari && hasAbs) {
				pos[0] -= el.ownerDocument.body.offsetLeft;
				pos[1] -= el.ownerDocument.body.offsetTop;
			}
			parentNode = el.parentNode;
			// FF End
			while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
				if (getStyle(parentNode, "display").search(/^inline|table-row.*$/i)) { 
					pos[0] -= parentNode.scrollLeft;
					pos[1] -= parentNode.scrollTop;
				}
				parentNode = parentNode.parentNode; 
			}
			return pos;
		};
	}


	/**
	 * ��ȡEvent����
	 * @method getEvent
	 * @return {Event} event����
	 * @author FlashSoft | fangchao@staff.sina.com.cn
	 * @update 08.02.23
	 * @exception
	 * 			getEvent();
	 */
	var getEvent = function () {
		return window.event;
	};
	if($moz) {
		getEvent = function () {
			var o = arguments.callee.caller;
			var e;
			var n = 0;
			while(o != null && n < 40){
				e = o.arguments[0];
				if (e && (e.constructor == Event || e.constructor == MouseEvent)) {
					return e;
					
				}
				n ++;
				o = o.caller;
			}
			return e;
		};
	}

	/**
	 * ��ֹEvent�¼�ð��
	 * @method stopEvent
	 * @author FlashSoft | fangchao@staff.sina.com.cn
	 * @update 08.02.23
	 * @exception
	 * 			stopEvent();
	 */
	var stopEvent = function() {
		var ev = getEvent();
		ev.cancelBubble = true;
		ev.returnValue = false;
	};
	if($moz) {
		stopEvent = function() {
			var ev = getEvent();
			ev.preventDefault();
			ev.stopPropagation();
		};
	}
	Function.prototype.bind3 = function(object, args) { 
		args = args == null? []: args;
		var __method = this; 
		return function() { 
			__method.apply(object, args); 
		} 
	};
	/**
	* ��ָ���ڵ��ϰ���Ӧ���¼�
	* @method addEvent2
	* @param {String} elm ��Ҫ�󶨵Ľڵ�id
	* @param {Function} func �¼�����ʱ��Ӧ�ĺ���
	* @param {String} evType �¼���������:click, mouseover
	* @update 08.02.23
	* @author Stan | chaoliang@staff.sina.com.cn
	*         FlashSoft | fangchao@staff.sina.com.cn
	* @example
	* 		//�����testEle��alert "clicked"
	* 		$addEvent2("testEle",function () {
	* 			alert("clicked")
	* 		},'click');
	*/
	function addEvent2 (elm, func, evType, useCapture) {
		var elm = $E(elm);
		if(typeof useCapture == 'undefined') useCapture = false;
		if(typeof evType == 'undefined')  evType = 'click';
		if (elm.addEventListener) {
			elm.addEventListener(evType, func, useCapture);
			return true;
		}
		else if (elm.attachEvent) {
			var r = elm.attachEvent('on' + evType, func);
			return true;
		}
		else {
			elm['on' + evType] = func;
		}
	};

	/**
		��ʼ����һЩ����
		
		@author FlashSoft | fangchao@staff.sina.com.cn
	*/
	var _inputNode;
	var _rndID = parseInt(Math.random() * 100);
	/** ��ǰ��ʾ�Ĳ˵����� */
	var _showMenuItems = [];
	/** ��ǰ��ʾ�Ĳ˵����� */
	var _selectMenuIndex = -1;
	/** ��ѡ���е����� */
	var _selectMenuText = "";

	var _viewWindow = window;
	var _container = null;
	var passcardOBJ = {
		// ��꾭��������ɫ
		overfcolor: "#999",
		// ��꾭��������ɫ
		overbgcolor: "#e8f4fc",
		// ����뿪������ɫ
		outfcolor: "#000000",
		// ����뿪������ɫ
		outbgcolor: "",
		menuStatus: {
			// �Ƿ���ʾSina����
			"sina.com": true,
			// �Ƿ���ʾVIP���� 
			"vip.sina.com": true,
			// �Ƿ���ʾcn����
			"sina.cn": true,
			// �Ƿ���ʾ3g����
			"3g.sina.cn": true,
			// �Ƿ���ʾ��������
			"����������": true
		}
	}

	/**
	 * ��̬������ʾ��
	 * add by xs @ 2008-3-4
	 * mod by jieming @ 2009-09-25 oContainer�����ڸ���������� û�в���body�����
	 */
	passcardOBJ.createNode = function(){
			var d = _viewWindow.document;
			var div = d.createElement('div');
			div.innerHTML = '<ul class="passCard" id="sinaNote" style="display:none;"></ul>'
			if (_container) _container.appendChild(div);
			else d.body.appendChild(div);
	}
	/**
		��ݼ�ѡ��˵�
		@author FlashSoft | fangchao@staff.sina.com.cn
	*/
	passcardOBJ.arrowKey = function (keyCodeNum) {
			if(keyCodeNum == 38) {// --
					if(_selectMenuIndex <= 0)_selectMenuIndex = _showMenuItems.length;
					_selectMenuIndex --;
					passcardOBJ.selectLi(_selectMenuIndex);
			}
			if(keyCodeNum == 40) {// ++
					if(_selectMenuIndex >= _showMenuItems.length - 1)_selectMenuIndex = -1;
					_selectMenuIndex ++;

					passcardOBJ.selectLi(_selectMenuIndex);
			}
	};
	passcardOBJ.showList = function(e)//��ʾ�б�
	{
			_selectMenuText = "";
			var keyCodeNum = getEvent().keyCode;
			if(keyCodeNum == 38 || keyCodeNum == 40)  {
				passcardOBJ.arrowKey(keyCodeNum);
				return false;
			}
			if (!$E('sinaNote')) 
					passcardOBJ.createNode();
			var username = $E(e).value;
			var menuList = {
			};
			var atIndex = username.indexOf("@");
			var InputCase = "";
			var InputStr = "";
			if(atIndex > -1) {
				InputCase = username.substr(atIndex + 1);
				InputStr = username.substr(0, atIndex);
			}

			
			_showMenuItems = [];
			_selectMenuIndex = 0;
			_showMenuItems[_showMenuItems.length] = "sinaNote_MenuItem_Title_" + _rndID;
			for(var key in this.menuStatus) {
				this.menuStatus[key] = true;
				if(InputCase != "" && InputCase != key.substr(0, InputCase.length)) {
						this.menuStatus[key] = false;
				}
				else {
						_showMenuItems[_showMenuItems.length] = "sinaNote_MenuItem_" + key + "_" + _rndID;
				}
			}
			var listcontent = '<li class="note">��ѡ���¼����</li>';
			listcontent += '<li id="sinaNote_MenuItem_Title_'+_rndID+'">' + encodeHTML(username) + '</li>';
			
			var itemLabel;
			for(var key in this.menuStatus) {
				if(this.menuStatus[key] == true) {
					if(InputStr == "") {
						itemLabel = username + "@" + key;
					}
					else {
						itemLabel = InputStr + "@" + key;
					}
					listcontent += '<li id="sinaNote_MenuItem_' + key + '_' + _rndID + '" title="'+ encodeHTML(itemLabel) +'">' + encodeHTML(itemLabel) + '</li>';
				}
			}
			$E("sinaNote").innerHTML = listcontent;
			for (var i = 0; i < username.length; i++) {
					if (username.charCodeAt(i) < 0xA0) {
							$E("sinaNote").style.display = "";
							this.selectList(e);
					}
					else {
							this.hideList();
					}
			}
			
			/**
			 * �Զ���Ӧ�ı����λ�ã������
			 * add by xs @ 2008-3-3
			 */
			var el = $E(e);
			var note = $E("sinaNote");

			/**
				Iframe�ڸ������λ��
				@author FlashSoft | fangchao@staff.sina.com.cn
			*/
			var frameLeft = 0;
			var frameTop = 0;
			var framePos;
			if(_viewWindow != window) {
				framePos = getXY(window.frameElement)
				frameLeft = framePos[0];
				frameTop = framePos[1];
			}
			
			
			var inputWidth = el.offsetWidth;
			if(inputWidth < 200) {
				inputWidth = 200;
			}
			note.style.width = inputWidth - 2 + 'px';
			var inputXY = getXY(el);
			note.style.left = (inputXY[0] - ($IE ? 2 : -1) + frameLeft) + 'px';
			note.style.top = (inputXY[1] + el.offsetHeight - ($IE ? 2 : -1) + frameTop) + 'px';
	}
	passcardOBJ.selectList = function(e)//ѡ���б�
	{
			var unames = $E("sinaNote").getElementsByTagName("li");
			for (var i = 1; i < unames.length; i++) {
					unames[1].style.backgroundColor = passcardOBJ.overbgcolor;
					unames[1].style.color = passcardOBJ.outfcolor;//��꾭��������ɫ
					unames[i].onmousedown = function(){
							var temp=this.innerHTML;
							if(temp.indexOf("����������")>-1){
								var pos=temp.split("@");
								$E(e).value = decodeHTML(pos[0]);
							}else{
								$E(e).value = decodeHTML(this.innerHTML);
							}
							stopEvent();
					}
					unames[i].onmouseover = function(){
							if (i != 1) {
									unames[1].style.backgroundColor = passcardOBJ.outbgcolor;
									unames[1].style.color = passcardOBJ.overfcolor;//��꾭��������ɫ
							}
							this.style.backgroundColor = passcardOBJ.overbgcolor;//��꾭��������ɫ
							this.style.color = passcardOBJ.outfcolor;//��꾭��������ɫ
					}
					unames[i].onmouseout = function(){
							this.style.backgroundColor = passcardOBJ.outbgcolor;//����뿪������ɫ
							this.style.color = passcardOBJ.overfcolor;//����뿪������ɫ
							unames[1].style.backgroundColor = passcardOBJ.overbgcolor;//��꾭��������ɫ
							unames[1].style.color = passcardOBJ.outfcolor;//��꾭��������ɫ
					}
			}
	}
	/**
		ѡ��ָ��ID��li
		@author | fangchao@staff.sina.com.cn
	*/
	passcardOBJ.selectLi = function (nIndex) {
			var menuNode;
			$E("sinaNote_MenuItem_Title_"+_rndID).style.backgroundColor = passcardOBJ.outbgcolor;//����뿪������ɫ
			$E("sinaNote_MenuItem_Title_"+_rndID).style.color = passcardOBJ.overfcolor;//����뿪������ɫ
			for(var i = 0; i < _showMenuItems.length; i ++ ) {
				menuNode = $E(_showMenuItems[i]);
				menuNode.style.backgroundColor = passcardOBJ.outbgcolor;//����뿪������ɫ
				menuNode.style.color = passcardOBJ.overfcolor;//����뿪������ɫ
			}
			$E(_showMenuItems[nIndex]).style.backgroundColor = passcardOBJ.overbgcolor;//��꾭��������ɫ
			$E(_showMenuItems[nIndex]).style.color = passcardOBJ.outfcolor;//��꾭��������ɫ
			_selectMenuText = $E(_showMenuItems[nIndex]).innerHTML;


	}
	passcardOBJ.hideList = function()//�����б�
	{
			/**
			 * ���û���ҵ�ҳ������Ӧ�Ķ������Զ�����
			 * add by xs @ 2008-3-3
			 */
			if (!$E('sinaNote')) 
					passcardOBJ.createNode();
			$E("sinaNote").style.display = "none";
	}
	passcardOBJ.init = function (oNode, oColors, oFocusNode, oWindowTarget, oContainer) {
		for(var key in oColors) {
			this[key] = oColors[key];
		}
		addEvent2(document, passcardOBJ.hideList, "click");
		addEvent2(oNode, passcardOBJ.hideList, "blur");
		addEvent2(oNode, passcardOBJ.showList.bind3(this, [oNode]), "keyup");
		addEvent2(oNode, function (e) {
			var keyCodeNum = getEvent().keyCode;
			if(keyCodeNum == 13 || keyCodeNum == 9) {
				if(_selectMenuText != "") {
						var temp=_selectMenuText;
							if(temp.indexOf("����������")>-1){
								var pos=temp.split("@");
								oNode.value = decodeHTML(pos[0]);
							}else{
								oNode.value = decodeHTML(_selectMenuText);
							}
				}
				if(oFocusNode != null) oFocusNode.focus();
				stopEvent();
			}
		}, "keydown");
		if(oWindowTarget) _viewWindow = oWindowTarget;
		if(oContainer) _container = oContainer;
	}
	window.passcardOBJ = passcardOBJ;
})();
