$(function () {
  //進場動態
  // $('[data-animate-block]').each(function () {
  //     $(this).find('[data-animate]').each(function (index, el) {
  //         var delay = 0.3 * index + 's';
  //         if (index > 0) {
  //             $(this).css('animation-delay', delay);
  //         }
  //     });
  // });
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