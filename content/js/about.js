// 錨點
(function ($, undefined) {
  'use strict';

  var pluginName = 'anchor';
  var defaults = {};

  function Plugin(element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend(true, {}, defaults, options, this.$element.data());
    delete this.options[pluginName];
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
    this.$element.data('plugin_' + pluginName, this);
  }

  $.extend(Plugin.prototype, {
    init: function init() {
      var $this = this,
          $com = this.$element;
      var headerHeight = 100; // 頁面滾動

      $this.scroll($com); // 點擊按鈕滑動至指定區塊

      $('[data-anchor-btn]').off('click.anchor').on('click.anchor', function (e) {
        e.preventDefault();
        var activeBlock = $(this).data('anchor-btn');
        $('body').removeClass('menuOpen');
        $('[data-menu]').fadeOut();
        $('html, body').animate({
          scrollTop: $('[data-anchor-block="' + activeBlock + '"]').offset().top - headerHeight
        }, 400, function () {
          $this.scroll($com);
        });
        $(window).off('scroll.anchor');
      });
    },
    scroll: function scroll($com) {
      $(window).off('scroll.anchor').on('scroll.anchor', function () {
        var windowHeight = $(window).height(); // 滾到區塊亮相對應按鈕

        $('[data-anchor-block]').each(function () {
          var triggerTop = $(this).offset().top - windowHeight / 4,
              triggerBottom = triggerTop + $(this).outerHeight(),
              comBottom = $('[data-anchor]').offset().top + $com.outerHeight();

          if (comBottom > triggerTop && comBottom < triggerBottom) {
            var blockName = $(this).data('anchor-block');
            $('[data-anchor-btn]').removeClass('active');
            $('[data-anchor-btn="' + blockName + '"]').addClass('active');
            $('[data-anchor-text]').text($('[data-anchor-btn="' + blockName + '"]').find('span').text());
          }
        });
      }).trigger('scroll.anchor');
    }
  });

  $.fn[pluginName] = function (methodOrOptions) {
    return this.each(function () {
      var plugin = $.data(this, 'plugin_' + pluginName) || new Plugin(this, methodOrOptions);

      if (typeof methodOrOptions === 'string' && plugin[methodOrOptions]) {
        plugin[methodOrOptions].apply(plugin, Array.prototype.slice.call(arguments, 1));
      }
    });
  };

  $('[data-anchor]').anchor();
})(jQuery);

$(function () {
  //進場動態
  $(window).scroll(function () {
    var scrollT = $(this).scrollTop(),
        halfScreenH = $(window).height() / 1.5;
    $('[data-animate-block]').each(function (index, el) {
      if (scrollT > $(el).offset().top - halfScreenH) {
        $(el).attr('data-animate-block', 'active');
      }
    });
  }).trigger('scroll');
});