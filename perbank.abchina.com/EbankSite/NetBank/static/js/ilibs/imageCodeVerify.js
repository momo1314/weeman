(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = function(root, jQuery) {
      if (jQuery === undefined) {
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  'use strict';
  $.fn.checkPicCode = function(options) {
    var defaults = {
      target: 'picCode',
      infoShow: '',//展示是否正确的元素，一般包含一个图片
      rightClass: 'right',
      wrongClass: 'wrong'
    };
    var settings;
    var methods = {
      verify: function(e) {
          var $el = $(e.target);
          if ((e.type == "keyup" && $el.val().length == 4) || e.type == "blur") {
              $.get("VerifyPicCodeAct.do", { picCode: $el.val(),r:Math.random() }, function (data) {
                  if (data) {
                      var returnCode = data.errorCode;
                      if (returnCode == "0000") {
                          $("#" + settings.infoShow).addClass(settings.rightClass).removeClass(settings.wrongClass);
                          $el.data('isPassed', 'true');
                          $('#' + settings.target).val($el.val());
                      } else {
                          $("#" + settings.infoShow).addClass(settings.wrongClass).removeClass(settings.rightClass);
                          $el.data('isPassed', 'false');
                      }
                  } else {
                      $("#" + settings.infoShow).addClass(settings.wrongClass).removeClass(settings.rightClass);
                      $el.data('isPassed', 'false');
                  }
              }, 'json');
          }
      },
      showError: function () {
          var settings = $(this).data("options");
          $("#" + settings.infoShow).addClass(settings.wrongClass).removeClass(settings.rightClass);
      }
    };


    if (typeof options === 'object') {
        settings = $.extend(defaults, options);
        $(this).data("options", settings);
      return this.each(function () {
        $(this).bind('blur', function (e) { methods.verify(e); });
        $(this).bind('keyup', function (e) { methods.verify(e); });
      });
    } else if (typeof options === 'string' && options == "isPassed") {
      var $eel = $(this);
      var result = $eel.data('isPassed');
      return result ? result : "false";
    }
    else if (typeof options === 'string' && options == "showError") {

        methods[options].apply(this);
    }
  };
}));
