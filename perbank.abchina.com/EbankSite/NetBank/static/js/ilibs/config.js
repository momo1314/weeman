(function (window, $) {
    $.extend({
        /* 页面JS跳转请调用此方法 */
        /* pos格式：账户/我的账户  */
        setPosInfo: function (pos) {
            if (typeof pos != 'undefined' && pos) {
                var posArr = pos.split('/');
                var posContent = [];
                posContent.push('<span class="location-now">您现在的位置：');
                for (var i = 0, plen = posArr.length; i < plen; i++) {
                    if (i == 0) posContent.push(posArr[i]);
                    else posContent.push('&nbsp;&gt;&nbsp;' + posArr[i]);
                }
                posContent.push('</span>');
                if ($('#navPos').length > 0) {
                    $('.location-wrap').removeClass('hide');
                    var tmp = posContent.join('');
                    $('#navPos').html(posContent.join(''));
                } else if ($('#navPos', window.parent.document).length > 0) {
                    $('.location-wrap', window.parent.document).removeClass('hide');
                    $('#navPos', window.parent.document).html(posContent.join(''));
                } else {
                    return false;
                }
            }
        },
            backToIndex: function(target) {
                if (target) {
                    window.location.href = target;
                } else {
                    $('.location-wrap', window.parent.document).addClass('hide');
                    $("#slide-list").addClass("hide");
                    window.location.href = "index.do"; //返回首页
                }
            }
        });

  window.backToIndex = $.backToIndex;

  $(function() {
    /* 页面超链接跳转“当前位置”信息更新 */
    /* data-pos格式：账户/我的账户  */
    $('a[data-pos], input[data-pos], button[data-pos]').on('click', function() {
      $.setPosInfo($(this).attr('data-pos'));
      var src = "index.do";
      var src1 = $(this).prop("href");
      if (src1.indexOf(src) > -1) {
        if ($('#slide-list').length > 0) $("#slide-list").addClass("hide");
        if ($('#slide-list', window.parent.document).length > 0) $("#slide-list", window.parent.document).addClass("hide");
      } else {
        if ($('#slide-list').length > 0) $("#slide-list").removeClass("hide");
        if ($('#slide-list', window.parent.document).length > 0) $("#slide-list", window.parent.document).removeClass("hide");
      }
    });

    $('.warningclose').on('click', function () {
        $('.browserupgrade').addClass("hide");
    });
  });
}(window, jQuery));
