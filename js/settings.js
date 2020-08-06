$(function () {
  if ($('.main-slider').length) {
    $('.main-slider').slick({
      autoplay: true,
      arrows: true,
      nextArrow: '.main-slider__next',
      prevArrow: '.main-slider__prev',
      dots: true,
      dotsClass: 'main-slider__dots',
      zIndex: 0,
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }]
    });
  }

  if ($('.section__select').length) {
    $('.section__select').selectric();
  }


  $('.file').niceScroll({
    cursorcolor: "#00a9fc",
    background: "#fff",
    cursorwidth: 10,
    cursorborderradius: 100,
    autohidemode: false,
    railpadding: {
      top: 0,
      right: -15,
      left: 0,
      bottom: 0
    },
    zindex: 1
  });

  /*$('#popup_upload .popup__content').niceScroll({
    cursorcolor: "#00a9fc",
    background: "#fff",
    cursorwidth: 10,
    cursorborderradius: 100,
    autohidemode: false,
    railpadding: { top: 0, right: -15, left: 0, bottom: 0 },
    zindex: 1
  });*/
  /*$('.file-placeholder').niceScroll('.files-list',{
    cursorcolor: "#00a9fc",
    background: "#fff",
    cursorwidth: 10,
    cursorborderradius: 100,
    autohidemode: false,
    railpadding: { top: 0, right: -15, left: 0, bottom: 0 },
    zindex: 1
  });*/

  $('.region').niceScroll({
    cursorcolor: "#00a9fc",
    background: "#fff",
    cursorwidth: 10,
    cursorborderradius: 100,
    autohidemode: false,
    zindex: 1
  });

  $('.popup__order-list').niceScroll({
    cursorcolor: "#00a9fc",
    background: "transparent",
    cursorwidth: 10,
    cursorborderradius: 100,
    autohidemode: false,
    zindex: 1
  });

  $('input[type="tel"]').inputmask({
    mask: "+7 (999) 999-99-99",
    showMaskOnHover: false,
    clearMaskOnLostFocus: true,
    clearIncomplete: true,
  });

  // $('input[type="email"]').inputmask({
  //   alias: "email"
  // });


  if ($('.detail-slider').length) {
    $('.detail-slider').each(function () {
      var prev = $(this).find('.section-slider__prev');
      var next = $(this).find('.section-slider__next');

      var slider = $(this).find('.section-slider');
      slider.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: next,
        prevArrow: prev,
        responsive: [{
            breakpoint: 1700,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2
            }
          },
          {
            breakpoint: 544,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    });
  };


  if ($('.order-product__info').length) {
    $('.order-product__info').tooltipster({
      contentCloning: false,
      theme: ['tooltipster-light', 'tooltipster-light-custom']
    });
  };

  if ($('.agree__info').length) {
    $('.agree__info').tooltipster({
      contentCloning: false,
      theme: ['tooltipster-light', 'tooltipster-light-custom'],
    });
  };

  if ($('.config__select').length) {
    $('.config__select').selectric();
  }

  if ($('.config-slider').length) {
    $('.config-slider').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      nextArrow: '.config__arrow_next',
      prevArrow: '.config__arrow_prev'
    });
    $('.config-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      console.log(nextSlide);
    });
  }

  if ($('.news-select').length) {
    $('.news-select').selectric();
  }


  if ($('.detail').length) {
    $('.detail-slider_big').not('.slick-initialized').slick({
      lazyLoad: 'ondemand',
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      nextArrow: '.detail-slider__next_big',
      prevArrow: '.detail-slider__prev_big',
      asNavFor: '.detail-slider_small'
    });

    $('.detail-slider_small').slick({
      lazyLoad: 'ondemand',
      infinite: false,
      slidesToShow: 7,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: '.detail-slider__next_small',
      prevArrow: '.detail-slider__prev_small',
      asNavFor: '.detail-slider_big',
      focusOnSelect: true,
      responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            arrows: false
          }
        }
      ]
    });
  }

  if ($('.section__select').length) {
    $('.section__select').selectric();
  }

});
