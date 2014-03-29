//jquery插件 -- lazyload原理实现
(function($) {
  // $下定义一个自己的命名空间
  $.xy = $.xy || {};
  $.xy.imgLazyLoad = function(options){
    // 构造最终参数(默认参数设置与自定义参数合并)
    var settings = $.extend({
          lazySrcName : "srcattr",//存储img src的自定义属性名称
          scrollStep: 200//滚动步长
        }, options)   
     , imgLoadStatus = 0
     , $window = $(window);
    var _lazyLoad = function(){
      // 要延迟加载的img数组。
      var defObj = $("img["+settings.lazySrcName+"]");
      // 图片加载的范围
      var pageTop = function () {
        return $(window).height() + $(window).scrollTop();
      };
      _imgLoad(defObj, pageTop());
      var scrollCount = 0;
      // 绑定滚动事件。
      $window.bind("scroll", function () {
        // 往回移动就是负数
        var moved = Math.abs($window.scrollTop() - scrollCount);
        // 累计滚动达到一定的值再去加载图片
        if (moved >= settings.scrollStep) {
          _imgLoad(defObj, pageTop());
          if (imgLoadStatus == 1) {
            scrollCount += settings.scrollStep;
            imgLoadStatus = 0;
          }
        }
      });
    },
    _imgLoad = function(defObj, pageTop) {
      // 防止页面有新的图片元素
      defObj = $("img["+settings.lazySrcName+"]");
        defObj.each(function () {
          var srcattr = $(this).attr(settings.lazySrcName);
          if (srcattr) {
            // var imgTop = _getPosition($(this)[0]).y;
            var imgTop = $(this).offset().top;
            // 如果当前图片 的 top 值 在最大加载范围内。
            if (imgTop <= pageTop
            // 如果当前图片的底边位置值大于滚动条滚动的距离
            && (imgTop + $(this).height()) >= $window.scrollTop()) {
              // 将srcattr的值载入src，并且移除srcattr属性。
              $(this).attr("src", srcattr).removeAttr(settings.lazySrcName);
            }
          }
        });
        imgLoadStatus = 1;
    };
    _lazyLoad();
  }
})(jQuery);
