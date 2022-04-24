$(function () {
  $('[data-collapse-btn]').on('click', function (e) {
    e.preventDefault();
    $('[data-collapse]').toggleClass('isOpen');
  });
});