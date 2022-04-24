$(function () {
  $('[data-banner-skip]').on('click', function (e) {
    e.preventDefault();
    $('[data-banner]').addClass('animationStop');
  });
});