$(function () {
  // 進場
  AOS.init({
    offset: 200,
    duration: 1500,
    once: true
  });
  $('[data-tab-select]').on('change', function (e) {
    e.preventDefault();
    var val = $(this).val();
    $('[data-aos]').removeClass('aos-animate');
    $('html, body').scrollTop(0);
    $('[data-tab-content]').addClass('hidden');
    $('[data-tab-content="' + val + '"]').removeClass('hidden');
    AOS.refreshHard();
  });
});