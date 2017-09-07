/** 
* ABC Perbank QRCode login 
* @author  huadaye
* @date    2017-05-15
* @update  2017-05-15 
*/
(function (root, factory) {
    if (typeof exports === 'object') {
        //CommonJS
        factory(exports);
    }
    else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else {
        // Browser globals
        factory(root);
    }
}(this, function (exports) {
    //constructor
    function QRCode(obj) {
        this._codeId = null;
        this._interval = obj.interval || 3000;
        this._channel = obj.channel || '';
        this._businessType = obj.businessType || '';
        this._token = '';
        this._timer = null;       
        this._newFirst = true;
        this._options = {
            width: 200,
            height: 200,
            logo: ''
        };
    }

    //init
    function _init(options) {
        var self = this;
        _getCode.call(self);
    }

    //get codeid from perapp
    function _getCode() {
        var self = this;
        var sendData = {
            channel: self._channel,
            businessType: self._businessType,
            width: self._options.width,
            height: self._options.height,
            logo: self._options.logo
        };
        var poll = {
            url: 'QRCodeGetAct.do',
            data: sendData,
            type: 'post',
            dataType: 'json',
            successCallback: _handleNew,
            errorCallback: _handleNew
        };
        _sendToHost.call(self, poll);
    }

    //get token
    function _getToken() {
        var self = this;
        return self._token;
    }

    //start polling
    function _startPoll() {
        var self = this;
        var pollData = {
            codeId: self._codeId,
            businessType: self._businessType,
            token: _getToken.call(self)
        };
        var poll = {
            url: 'QRCodeInfoQueryAct.do',
            data: pollData,
            type: 'post',
            dataType: 'json',
            successCallback: _handlePoll,
            errorCallback: _handlePoll
        };
        self._timer = setTimeout(function () {
            _sendToHost.call(self, poll);
        }, self._interval);
    }

    // clear polling
    function _clearPoll() {
        var self = this;
        clearTimeout(self._timer);
    }

    //handle the new
    function _handleNew(data) {
        var self = this;
        if (typeof data !== 'undefined' && data) {
            if (typeof data.state !== 'undefined' && data.state === '00') {
                self._codeId = data.codeId;
                //_handlePoll.call(self, data);
                if (typeof (data.token) !== 'undefined' && data.token) {
                    self._token = data.token;
                }
                if (self._newFirst) {
                    $('#qrcode').prop('src', "data:image/png;base64," + data.codeImg);
                    _startPoll.call(self);
                }
                self._newFirst = false;
            }
            else {
                //error
                _messageShow.call(self, false, '二维码生成失败');
            }
        }
        else {
            //error
            _messageShow.call(self, false, '二维码生成失败');
        }
    }

    //handle the polling
    function _handlePoll(data,poll) {
        var self = this;
        if (typeof data !== 'undefined' && data) {
            if (typeof (data.token) !== 'undefined' && data.token) {
                self._token = data.token;
            }
            if (data.state === '00') {
                //init
                setTimeout(function () {
                    _sendToHost.call(self, poll);
                }, self._interval);
            }
            else if (data.state === '10') {
                //scan succeed
                _messageShow.call(self, true, '扫描成功');
                setTimeout(function () {
                    _sendToHost.call(self, poll);
                }, self._interval);
            }
            else if (data.state === "11") {
                //scan timeout
                _messageShow.call(self, false, '二维码已失效');
                _clearPoll.call(self);
            }
            else if (data.state === '20') {
                //authority succeed
                _messageShow.call(self, true, '授权成功,正在登录...');
                _clearPoll.call(self);
                //login
                if (typeof data.pid !== 'undefined' && typeof data.ticket !== 'undefined' && data.pid && data.ticket) {
                    qrForm.pidReq.value = data.pid;
                    qrForm.ticketReq.value = data.ticket;
                    qrForm.codeIdReq.value = data.codeId;                 
                    qrForm.businessTypeReq.value = data.businessType;
                    var macInfo = qr.getMacInfo();
                    qrForm.plattype.value = qr.getPlattype();
                    qrForm.MachineCode.value = macInfo.machineCode;
                    qrForm.MachineInfo.value = macInfo.machineInfo;
                    qrForm.submit(); 
                }            
            }
            else if (data.state === '21') {
                //authority failed
                _messageShow.call(self, false, '授权失败');
                _clearPoll.call(self);
            }
            else if (data.state === '22') {
                //authority timeout
                _messageShow.call(self, false, '二维码已失效');
                _clearPoll.call(self);
            }
            else if (data.state === '30') {
                //login succeed
            }
            else if (data.state === '31') {
                //login failed
                _messageShow.call(self, false, '登录失败');
                _clearPoll.call(self);
            }
            else if (data.state === '32') {
                //login timeout
                _messageShow.call(self, false, '二维码已失效');
                _clearPoll.call(self);
            }
            else {
                //error
                _messageShow.call(self, false, '二维码已失效');
                _clearPoll.call(self);
            }
        }
        else {
            //error
            _messageShow.call(self, false, '二维码已失效');
            _clearPoll.call(self);
        }
    }

    //show message
    function _messageShow(isSuccess, message) {
        var self = this, content = '';
        $('#qrcodeMask').removeClass('hidden');
        if (isSuccess === true) {
            content += '<div id="qrcodeSuc">'
                        + '<p id="qrcodeSucImg"><img src="' + qr.pathData + '/login/qrcode-suc.png" alt="成功" /></p>'
                        + '<p id="qrcodeSucMsg" style="font-weight:bold;">' + message + '</p>'
                        + '</div>';
            $('#qrcodeInfo').html(content).removeClass('hidden');
        }
        else {
            content += '<div id="qrcodeErr">'
                        + '<p id="qrcodeErrMsg" style="font-weight:bold;">' + message + '</p>'
                        + '<p><button id="qrcodeRefresh" class="btn btn-primary btn-small">刷新</button></p>'
                        + '</div>';
            $('#qrcodeInfo').html(content).removeClass('hidden');
            $('#qrcodeRefresh').click(function () { $('#qrcodeMask').addClass('hidden'); $('#qrcodeInfo').html('').addClass('hidden'); _refresh.call(self); });
        }
    }

    // merge two objects
    function _mergeObject(obj1,obj2) {
        var obj3 = {};
        for(var attr in obj1) obj3[attr]=obj1[attr];
        for(var attr in obj2) obj3[attr]=obj2[attr];
        return obj3;
    }

    //ajax post
    function _sendToHost(poll) {
        var self = this;
        if (typeof (poll.data.token) !== 'undefined' && poll.data.token) {
            poll.data.token = _getToken.call(self);
        }
        $.ajax({
            url: poll.url,
            data: poll.data,
            type: poll.type,
            dataType: poll.dataType,
            success: function (data) {
                if (typeof poll.successCallback === 'function') {
                    poll.successCallback.call(self, data, poll);
                }                    
            },
            error: function (data) {
                if (typeof poll.errorCallback === 'function') {
                    poll.errorCallback.call(self, data, poll);
                }
            }
        });
    }

    //refresh
    function _refresh() {
        var self = this;
        _clearPoll.call(self);
        self._newFirst = true;
        self._timer = null;
        _init.call(self);
    }

    //exit
    function _exit() {
        var self = this;
        _clearPoll.call(self);
        self._timer = null;
        self = null;
    }

    var qrCode = function (obj) {
        if (typeof obj === 'object') {
            if (typeof obj.interval !== 'undefined' && typeof obj.channel !== 'undefined' && typeof obj.businessType !== 'undefined') {
                return new QRCode(obj);
            }
            else {
                throw new Error('There is not a qrcode object.');
            }
        }
        else {
            throw new Error('There is not a qrcode object.');
        }
    };

    //prototype
    qrCode.fn = QRCode.prototype = {
        start: function () {
            _init.call(this);
            return this;
        },
        startPoll: function () {
            _startPoll.call(this);
        },
        clearPoll:function(){
            _clearPoll.call(this);
        },
        exit: function () {
            _exit.call(this);
            return;
        },
        refresh: function () {
            _refresh.call(this);
        },
        setOption:function(option,value){
            this._options[option] = value;
        },
        setOptions:function(options){
           this._options = _mergeObject(this._options,options);
        }
    };

    //output
    exports.qrCode = qrCode;
    return qrCode;
}));
