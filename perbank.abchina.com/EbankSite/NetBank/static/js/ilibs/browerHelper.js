;
(function(win, doc, $) {
  $.extend({
    /**
 * os version
 */
    os: function(c) {
      var d = "";
      if (/windows|win32/i.test(c)) {
        d = "windows";
      } else if (/macintosh|mac_powerpc/i.test(c)) {
        d = "macintosh";
      } else if (/symbos/i.test(c)) {
        d = "symbos";
      } else if (/linux/i.test(c)) {
        d = "linux";
      } else if (/rhino/i.test(c)) {
        d = "rhino";
      } else if (/Android/i.test(c)) {
        d = "android";
      } else if (/ipad/i.test(c)) {
        d = "ipad";
      } else if (/iphone/i.test(c)) {
        d = "iphone";
      }
      return d;
    }(navigator.userAgent),

/**
 * browder version
 */
    browser: function(c) {
      var b = "";
      var d = {
        android: /(Android)(\s+([\d.]+))*/i.test(c),
        ipad: /(iPad).*OS\s([\d_]+)/i.test(c),
        webos: /(webOS|hpwOS)[\s\/]([\d.]+)/i.test(c),
        kindle: /Kindle\/([\d.]+)/i.test(c),
        silk: /Silk\/([\d._]+)/i.test(c),
        blackberry: /(BlackBerry).*Version\/([\d.]+)/i.test(c),
        bb10: /(BB10).*Version\/([\d.]+)/i.test(c),
        rimtabletos: /(RIM\sTablet\sOS)\s([\d.]+)/i.test(c),
        playbook: /PlayBook/i.test(c),
        chrome: /chrome\/(\d+\.\d+)/i.test(c) ? +RegExp.$1 : b,
        firefox: /firefox\/(\d+\.\d+)/i.test(c) ? +RegExp.$1 : b,
        ie: /msie (\d+\.\d+)/i.test(c) ? doc.documentMode || +RegExp.$1 : b,
        edge: /Trident\/.+?rv:(([\d.]+))/i.test(c) || /Edge\/([\d.]+)/.test(c),
        isGecko: /gecko/i.test(c) && !/like gecko/i.test(c),
        isStrict: "CSS1Compat" === doc.compatMode,
        isWebkit: /webkit|KHTML/i.test(c),
        opera: /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(c) ? +(RegExp.$6 || RegExp.$2) : b
      };
      d.iphone = !d.ipad && /(iPhone\sOS)\s([\d_]+)/i.test(c), d.touchpad = d.webos && /TouchPad/.test(c), d.tablet = !!(d.ipad || d.playbook || d.android && !/Mobile/.test(c) || d.firefox && /Tablet/.test(c)), d.phone = !(d.tablet || !(d.android || d.iphone || d.webos || d.blackberry || d.bb10 || d.chrome && /Android/.test(c) || d.chrome && /CriOS\/([\d.]+)/.test(c) || d.firefox && /Mobile/.test(c)));
      try {
        /(\d+\.\d+)/.test(window.getAttribute("external.max_version")) && (d.maxthon = +RegExp.$1);
      } catch(ee) {
      }
      return d.mobile = d.tablet || d.phone || d.touchpad, d.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(c) && !/chrome/i.test(c) ? +(RegExp.$1 || RegExp.$2) : b, d.isSupportFixed = !d.ie || d.ie >= 7, d;
    }(navigator.userAgent)
  });
})(window, document, $);
