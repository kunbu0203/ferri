// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;

  var noop = function noop() {};

  var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'];
  var length = methods.length;
  var console = window.console = window.console || {};

  while (length--) {
    method = methods[length]; // Only stub undefined methods.

    if (!console[method]) {
      console[method] = noop;
    }
  }
})(); // Place any jQuery/helper plugins in here.


(function (targetWidth) {
  var deviceWidth = screen.width;
  var ratio = deviceWidth / targetWidth;
  var viewport = document.querySelector('meta[name="viewport"]');

  if (ratio < 1) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=' + ratio + ', minimum-scale=' + ratio + ', maximum-scale=' + ratio + ', user-scalable=yes');
  }
})(360); // scrollbar


(function ($, undefined) {
  'use strict';

  var pluginName = 'scrollbar';
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
      if (!isMobile()) {
        this.$element.overlayScrollbars({
          overflowBehavior: {
            x: 'hidden'
          }
        });
      }
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

  $('[data-scrollbar]').scrollbar();
})(jQuery); // 錨點


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

function isMobile() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}