//  a jQuery plugin: prevent repetitive submit.

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
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
}(function ($) {
  'use strict';

  $.fn.preRepeSubmit = function (options) {
    var methods = {
      init: function () {
        var setting = $.extend({}, $.fn.preRepeSubmit.defaults, options);
        $(this).data('setting', setting);
        $(this).prop('disabled', false);
        $(this).data("numIndex", 0);
        $(this).on("click", methods.click);
        return this;
      },
      click: function (e) {
        if ($(this).data("numIndex") >= 1) {
          e.stopPropagation();
          return false;
        }
        $(this).prop('disabled', true);
        $(this).data("numIndex", 1);
        var setting = $(this).data('setting');
        if ($(this).is('input'))
            $(this).val(setting.beingText);
        else {
            $(this).html(setting.beingText);
        }
      },
      recover: function () {
        $(this).prop('disabled', false);
        $(this).data("numIndex", 0);
        var setting = $(this).data('setting');
        if ($(this).is('input'))
            $(this).val(setting.recoverText);
        else {
          $(this).html(setting.recoverText);
        }
      },
      checkClick: function () {
        if ($(this).data("numIndex") != 0) {
          return true;
        }
        $(this).data("numIndex", 1);
        return false;
      },
      isClicked: function () {
        return $(this).data("numIndex") > 0;
      }
    };

    if (methods[options]) {
      return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof options === 'object' || !options) {
      this.each(function() {
        return methods.init.apply(this, arguments);
      });
    } else {
      $.error("method " + method + ' does not exist');
    }
  };
  $.fn.preRepeSubmit.defaults = {
    beingText: "正在提交",
    recoverText:"提交"
  };

}));
