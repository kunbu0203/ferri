$(function () {
  $('[data-burger]').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('menuOpen');
    $('[data-menu]').fadeToggle();
  });
  $('[data-popup-btn]').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('popupOpen');
    $('[data-popup]').fadeToggle();
  });
});