/**
 * @ ��¼����֤��
 * @author Li | jieming@staff.sina.com.cn
 * @version 0.1
 */
(function(){

    var $vdt = function(config){
		/**
		* ��ָ�룬��ǰ��
		* @type {Object}
		*/	
        var me = this;
		
		/**
		* �����ö���, ���е���֤������ʾ��Ϣ���Ǵ������ȡ
		* @type {Object}
		*/			
        this.opt = config;

		/**
		* �����ý���ʱ����ʽ����
		* @type {String}
		*/		
		this.focFun = function(node) {
			me.setState(node, 1);
		};
		/**
		* ��֤����ʱ����ʽ����
		* @type {String}
		*/			
        this.errFun = function(node) {
			me.setState(node, 0);
		};
		/**
		* ��֤��ȷʱ����ʽ����
		* @type {String}
		*/
        this.finFun = function(node) {
			me.setState(node, 0);
		};

		/**
		* �ָ�����
		* @type {String}
		*/
		var splitSign = ':';
		
		/**
		 * ���ñ������ʽ
         * @param {Object} ������
         * @param {Num} ״̬���� 0-Ĭ�� 1-�� 2-��
		 */
		this.setState = function(node, type) {
			var input = node;
			while(node && node != document) {
				if(node.tagName.toLowerCase() == "span" && hasClass(node, "input")) {
					switch(type) {
						case 0:
							$removeClassName(node, "inputGreen");
							$removeClassName(node, "inputRed");
							return;
						case 1:
							$removeClassName(node, "inputRed");
							$addClassName(node, "inputGreen");
							return;
						case 2:
							$removeClassName(node, "inputGreen");
							$addClassName(node, "inputRed");
							return;
						default:
							$removeClassName(node, "inputGreen");
							$removeClassName(node, "inputRed");
							return;
					}
				}
				node = node.parentNode;
			}
		};
		
	   /**
		 * Ĭ����֤����(������֤ģʽ)
         * @param {Object} ������
         * @param {Object} Validator ����ʵ��
		 */
		this.defaultRegFn = function(e, v){
			//trace( 'regFlag:'+ this.regFlag +' ||' +this.reg + '|this.reg.test('+e.value+'):' + this.reg.test(e.value));
			if(this.regFlag) {
				return this.reg.test(e.value) ? this.msg : '';
			}else {
				return !this.reg.test(e.value) ? this.msg : '';
			}
        };

	   /**
		 * Ĭ����֤����(��Χ��֤ģʽ)
         * @param {Object} ������
         * @param {Object} Validator ����ʵ��
		 */
		this.defaultRangeFn = function(e, v){
			var len = e.value.getBytes();
			if(!len) return '';
			var alt = e.alt;
			var range =  /����{(.+?)}/.exec(alt)[1];
			var l = range.split('-')[0];
			var r = range.split('-')[1];
			if(len < l || len > r) return this.msg.replace('{range}', range);
			return '';
        };

	   /**
		 * Ĭ����֤����(��֤�Ƿ���Ŀ��ֵ��ͬ[һ������ȷ������])
         * @param {Object} ������
         * @param {Object} Validator ����ʵ��
		 */
		this.defaultSameFn = function(e, v){
			var val = e.value;
			if(!val) return '';
			var alt = e.alt;
			var id =  /��ͬ{(.+?)}/.exec(alt)[1];
			if(!$(id)) return '';
			return ($(id).value != val)?this.msg:'';
        };
        
        /**
         * ���ʼ�������ݱ���Ϊ������Ҫ��֤�Ķ�������¼�
         * @param {String} ��id
         */
        this.init = function(id){
			var fm = $(id);
			if(!fm) {
				alert('�� [' + id + '] δ�ҵ���');
				return;
			}
            var fe = fm.elements;
            var fl = fe.length;
            for (var i = 0; i < fl; i++) {
                var cur = fe[i];
                var alt = (cur.alt + '');
                if (alt.indexOf(splitSign) != -1) {
                    cur.onfocus = this.chkFocus;
                    cur.onblur = this.check;
					if (cur.id.toLowerCase() == "door") {
						con_code();
					}
					/**
					 * ��ǰ��ָ�봫�ݸ���������Ա����
					 * @type {Object}
					 */
                    cur.v = this;
                }
            }
			fm.v = this;
            fm.onsubmit = this.checkSubmit;
        };


        /**
         * �жϵ�ǰ��Ҫʹ�ù���Ķ���
         * @param {String} altֵ�е�ǰ������
         * @param {Object} ��ǰ�������ö���
         */
		this.getCur = function(c, conf){
			var cur = conf[c];
			if (c.indexOf('����')!=-1){
				cur = conf['����'];
				cur.fn = this.defaultRangeFn;
			}
			if (c.indexOf('��ͬ')!=-1){
				cur = conf['��ͬ'];
				cur.fn = this.defaultSameFn;
			}
			if(!cur) return null;
			if (!cur.fn) cur.fn = this.defaultRegFn;
			return cur;
		};
        
        /**
         * ���ݶ���alt���Բ������ü�config�����ý��б�Ԫ����֤
         * @param {Object} fireFox ���¼�Դ(��ʱû�õ�)
         * @param {Object} ���ָ���ı�����
         */		
        this.check = function(e, el){
            var el = el || this;
            var v = el.v;
            var o = v.opt;
            var alt = el.alt;
            var args = alt.split(splitSign)[1].split('/');
            var l = args.length;
            for (var i = 0; i < l; i++) {
                var c = args[i];
				var cur = v.getCur(c, o);
                if (cur) {
					try {
						trace(cur.fn);
						var result = cur.fn(el, v);
						if(result == 'custom'){
							break;
						}
						if(result){
							v.showErr(el, result);
							if(result == 'clear') continue;
							return false;
						}
					}catch (e) {
						return false;
					}
                }
            }
			if(result == 'clear') {
				v.showErr(el, result);
			}else {
				v.showErr(el,'hide');
			}
			return true;
        };

        /**
         * �����ȡ����ʱִ�е��¼�
         */
        this.chkFocus = function(){
			if(this.type == 'password' || this.type == 'text') {
				me.focFun(this);
			}
            var el = this;
            var v = el.v;
			var cur = v.opt;
            var alt = el.alt;
			try{
				if(alt.indexOf('focusFn')!= -1){
					if(cur.focusFn) cur.focusFn(el, v);
				}
				try {
					if (el.id == "door") {
						if (!$isVisible($("door_img"))) {
							$show($("door_img"));
							con_code();
						}
					}
				}catch (e) {}
			}catch(e){ alert(e.description);}
        };

        /**
         * �ύʱ������������Ҫ��֤��Ԫ�ض����һ�飬�Ա�֤����ȫ���ϸ�
         */
        this.checkSubmit = function(e){
			var fm = this;
			var v   = fm.v;
			var fe = fm.elements;
			var fl = fe.length;
			var flag = true;
			try{
				for (var i = 0; i < fl; i++) {
						var cur = fe[i];
						var alt = (cur.alt + '');
						if (alt.indexOf(splitSign) != -1){
							if(v.opt.submitFn){
								if(v.opt.submitFn(cur)){
									flag = true;
									continue;
								}
							}
							if (!v.check(e, cur)) {
								flag = false;
								break;
							}
						}
				}
			}catch(e){ 
				flag = false;
			};
			return flag;
        };

		/**
         * ���ݴ���������ʾ��Ӧ�Ĵ�����ʾ
         */					
        this.showErr = function(e, msg){
			var alt	= e.alt.split(splitSign);
			var name = alt[0];
			var args   = alt[1];
			var msg = msg.replace('{name}', name);
			/**
	         *  ����alt�������жϴ�����ʾ�������
	         */
			var eid, errArea ;
			if(args.indexOf('errArea')!=-1) var eid = /errArea{(.+?)}/.exec(alt)[1];
			errArea = $(eid) ? $(eid) : e.parentNode;
			var etips = errArea;
	        /**
	         *  ����msg�ж��Ƿ���ʾ������ʾ
	         */
			switch(msg) {
				case "hide":
					etips.innerHTML = '';
					if(e.type == 'password' || e.type == 'text') {
						this.finFun(e);
					}
					return;
				case "custom":
					etips.innerHTML = "";
					return;
				case "clear":
					etips.innerHTML = "";
					return;
				default:
					etips.innerHTML = '<i class="W_icon icon_rederrorS"></i>'+'<i>'+msg+'</i>';
					document.getElementById("login_err").innerHTML = "";
					if(e.type == 'password' || e.type == 'text') {
						this.errFun(e);
					}
					return;
			}
        };
    };

	/**
	 *  ע��ȫ�ֶ���
	 */	
    if (window.Validator == null) window.Validator = $vdt;
})();
