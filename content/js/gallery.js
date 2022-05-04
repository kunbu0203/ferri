$(function () {
  // 進場
  AOS.init({
    offset: 0,
    duration: 1000,
    once: true
  });
  var swiperPc = new Swiper('[data-swiper="pc"]', {
    slidesPerView: 3,
    slidesPerGroup: 3,
    scrollbar: {
      el: '.swiper-scrollbar'
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next'
    },
    breakpoints: {
      1023: {
        slidesPerView: 2,
        slidesPerGroup: 2
      }
    }
  });
  var swiperMb = new Swiper('[data-swiper="mb"]', {
    direction: 'vertical',
    slidesPerView: 'auto',
    spaceBetween: 16,
    slidesOffsetAfter: 40,
    scrollbar: {
      el: '.swiper-scrollbar'
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next'
    },
    on: {
      init: function init() {
        maskShowHide(this);
      },
      touchMove: function touchMove() {
        maskShowHide(this);
      },
      resize: function resize() {
        this.update();
        maskShowHide(this);
      },
      transitionEnd: function transitionEnd() {
        maskShowHide(this);
      }
    }
  });

  function maskShowHide(swiper) {
    if (swiper.isEnd) {
      $(swiper.el).addClass('pageEnd');
    } else {
      $(swiper.el).removeClass('pageEnd');
    }
  }
});