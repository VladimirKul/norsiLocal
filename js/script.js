$(function () {
  function scroll_to_elem(elem, speed) {
    setTimeout(function () {
      var destination = $(elem).offset().top;
      $("html,body").animate({
        scrollTop: destination
      }, speed);
    }, 500);

  }
  // menu
  const tabOpen = function () {
    if (!$(this).hasClass('active')) {
      $('.submenu-tab').removeClass('active');
      $(this).addClass('active');
      const index = $(this).index(),
        blockWrap = $(this).parents('.header-submenu__wrap');
      $(blockWrap).find('.header-submenu__content').removeClass('active');
      $(blockWrap).find('.header-submenu__content').eq(index).addClass('active');
    }
  };

  const openSubmenu = function () {
    $(this).find('.header-menu__link').addClass('active');

    $(this).find('.header-submenu__wrap').addClass('active');
    if ($(this).find('.header-submenu__tabs').length) {
      $(this).find('.submenu-tab').removeClass('active');
      $(this).find('.header-submenu__content').removeClass('active');
      $(this).find('.submenu-tab').eq(0).addClass('active');
      $(this).find('.header-submenu__content').eq(0).addClass('active');
      $(this).on('mouseenter', '.submenu-tab', tabOpen);
    }

    if (!$(this).find('.submenu_tab').length) {
      let left = $(this).offset().left + $(this).outerWidth();
      $(this).find('.header-submenu__content').css('left', left);
    }
  };

  const closeSubmenu = function () {
    $(this).find('.header-menu__link').removeClass('active');
    $(this).find('.header-submenu__wrap').removeClass('active');
  };

  $('.header-menu__item').on({
    mouseenter: openSubmenu,
    mouseleave: closeSubmenu
  });

  // поиск в шапке
  $('.header-search').on('click', function () {
    $('.search__wrap').addClass('active');
  });

  $('.search__close').on('click', function () {
    $('.search__wrap').removeClass('active');
  });

  // работа бургер меню
  $('.header-menu__burger').on('click', function () {
    $('.burger-menu__wrap').addClass('active');
  });

  $('.burger-menu__close').on('click', function () {
    $('.burger-menu__wrap').removeClass('active');
  });

  $('.burger-menu__item').on('click', function () {
    $(this).parent().toggleClass('active');
  });
  $('.burger-sub__title').on('click', function () {
    $(this).parent().toggleClass('active');
  });

  // табы на странице
  const tabSection = function () {
    if (!$(this).hasClass('active')) {
      $('.section-tab').removeClass('active');
      $(this).addClass('active');
      const index = $(this).index(),
        blockWrap = $(this).parents('.section-partnerlist');
      $(blockWrap).find('.section-tab__content').removeClass('active');
      $(blockWrap).find('.section-tab__content').eq(index).addClass('active');
    }
  };
  $('.section-tab').on('click', tabSection);

  if ($('.section-slider').length) {
    $('.section-tab__content').each(function () {
      var prev = $(this).find('.section-slider__prev');
      var next = $(this).find('.section-slider__next');

      var slider = $(this).find('.section-slider');
      slider.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: next,
        prevArrow: prev,
        responsive: [{
            breakpoint: 1200,
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
  }

  // вход в лк
  $('.login .form').on('submit', function () {
    $('.error').css('display', 'flex');
  });

  // форма регистрации
  $('.form__input').on('change', function () {
    if ($(this).val() !== '') {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  $('.form__textarea').on('change', function () {
    if ($(this).val() !== '') {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  const formSmall = function (id) {
    const formSub = '#' + 'form_' + id,
      popup = '#' + id,
      popupThanks = '#' + id + '_thanks';
    $(formSub).on('submit', function () {
      $(popup).removeClass('active');
      $(popupThanks).addClass('active');
    });
  };

  formSmall('registration');
  formSmall('call');

  // появление подробной информации о партнеру на мобильном
  if ($(window).width() < 768) {
    $('.partner-info__item').on('click', function () {
      if ($(this).hasClass('active')) {
        $(this).find('.partner-info__content').stop().slideUp();
        $(this).removeClass('active');
      } else {
        $('.partner-info__item').removeClass('active');
        $('.partner-info__item').find('.partner-info__content').stop().slideUp();
        $(this).find('.partner-info__content').stop().slideDown();
        $(this).addClass('active');
      }
    });
  }

  // затемнение селекта когда не выбрано ничего
  const sectionSelestDisable = function () {
    let col = 0;
    $('.section-table__check_item input').each(function () {
      if ($(this).prop('checked')) {
        col += 1;
      }
    });
    if ($('.section__select').length && $('.section__select').val() !== '' && col > 0) {
      $('.section__select-wrap .selectric').css('opacity', '1');
      $('.section__select-wrap .btn').css('opacity', '1');
      $('.section__select-wrap .btn').removeClass('disable');
    } else {
      $('.section__select-wrap .selectric').css('opacity', '0.6');
      $('.section__select-wrap .btn').css('opacity', '0.6');
      $('.section__select-wrap .btn').addClass('disable');
    }
  };

  if ($('.section__select').length) {
    $(window).on('load', function () {
      sectionSelestDisable();
    });

    $('.section__select').on('selectric-init', function () {
      // на лк
      sectionSelestDisable();
      // на странице-форме
      if ($('.form-big .section__select').val() === '') {
        $('.form-big .selectric').removeClass('active');
      } else {
        $('.form-big .selectric').addClass('active');
      }
    });

    // выбор селекта
    $('.section__select').on('change', function () {
      // в лк
      sectionSelestDisable();

      // на странице-форме
      if ($('.form-big .section__select').val() === '') {
        $('.form-big .selectric').removeClass('active');
      } else {
        $('.form-big .selectric').addClass('active');
      }
    });
  };

  // Работа чекбоксов на списке
  if ($('.section-table').length) {

    // выбрать/убрать все
    $('.section-table__check_all input').on('click', function () {

      if ($('.section-table__check_all input').prop('checked')) {
        $('.section-table__check_item input').prop('checked', true);
        $('.section-table__item').addClass('active');
        sectionSelestDisable();
      } else {
        $('.section-table__check_item input').prop('checked', false);
        $('.section-table__item').removeClass('active');
        sectionSelestDisable();
      }
    });

    // проставить нижний чекбокс (выбрать/убрать все), когда все отмечены
    const inp = $('.section-table__check_item input').length;

    $('.section-table__check_item input').on('click', function () {
      // выделение документа
      if ($(this).prop('checked')) {
        $(this).parents('.section-table__item').find('.config__select').prop('selectedIndex', 1).val(1).selectric('refresh');
        $(this).closest('.section-table__item').addClass('active');
      } else {
        $(this).parents('.section-table__item').find('.config__select').prop('selectedIndex', 0).val(0).selectric('refresh');
        $(this).closest('.section-table__item').removeClass('active');
      }

      let col = 0;
      $('.section-table__check_item input').each(function () {
        if ($(this).prop('checked')) {
          col += 1;
        }
      });

      if (col === inp) {
        $('.section-table__check_all input').prop('checked', true);
      } else {
        $('.section-table__check_all input').prop('checked', false);
      }

      sectionSelestDisable();

    });
  };

  // действия с документом
  $(document).on('click', function (e) {
    // клик по бургеру
    if ($(e.target).closest('.section-table__menu').length) {
      // если открыт
      if ($(e.target).closest('.section-table__menu').hasClass('active')) {
        $(e.target).closest('.section-table__menu').removeClass('active');
        $(e.target).closest('.section-table__menu').next('.doc-menu').fadeOut();
      } else {
        // если закрыт
        $('.section-table__menu').removeClass('active');
        $('.doc-menu').fadeOut();
        $(e.target).closest('.section-table__menu').addClass('active');
        $(e.target).closest('.section-table__menu').next('.doc-menu').fadeIn();
      }
    } else if (!$(e.target).closest('.doc-menu').length) {
      // клик мимо
      $('.section-table__menu').removeClass('active');
      $('.doc-menu').fadeOut();
    }
  });

  if ($('.page-inner__search').length) {
    // поиск по документам
    $('.page-inner__search').on('click', function (e) {
      if (!$(this).hasClass('active')) {
        e.preventDefault();
        $(this).addClass('active');
        $(this).find('.btn').removeClass('btn-o');
        let widthInput = $('.page-inner__content').width() - 400;
        console.log('widthInput: ', widthInput);
        $(this).find('.search__input').css('width', widthInput);
      }
    });
    // отмена
    $('.page-inner__search .search__clean').on('click', function () {
      $('.page-inner__search').find('.search__input').val('');
      $('.search__clean').css('opacity', '0');
      $('.section-table__path').css('display', 'none');
    });

    // работа поиска (начало)
    $('.page-inner__search .search__input').on('input', function () {
      if ($(this).val() !== '') {
        $('.search__clean').css('opacity', '1');
        // $('.section-table__path').css('display', 'block');
        // $('.section-table__wrap').show();
        // $('.pagination').show();
      } else {
        $('.search__clean').css('opacity', '0');
        // $('.section-table__path').css('display', 'none');
        // $('.section-table__wrap').show();
        // $('.pagination').show();
      }
    });
  }

  // popup
  $('a[data-popup]').on('click', function () {
    let href = $(this).attr('href');
    $('body').css('overflow', 'hidden');
    $(document).find(href).addClass('active');
  });

  $('a[data-popup-img]').on('click', function (e) {
    e.preventDefault();
    let href = $(this).attr('href');
    $('body').css('overflow', 'hidden');
    console.log(href);
    if (!$('#popup-img').length) {
      const popupImg = $('<div>', {
          id: 'popup-img',
          'class': 'popup active',
        }),
        popupImgContent = $('<div>', {
          'class': 'popup__content'
        }),
        popupImgClose = $('<div>', {
          'class': 'popup__close'
        }),
        imgPopup = $('<img>', {
          src: href,
          alt: 'Изображение'
        });
      console.log(popupImg);
      $(popupImgContent).append(imgPopup);
      $(popupImgContent).append(popupImgClose);
      $(popupImg).append(popupImgContent);
      $('body').append(popupImg);
    } else {
      $('#popup-img').find('img').attr('src', href);
      $('#popup-img').addClass('active');
    }
  });

  $(document).on('click touchend', function (e) {
    if (!$(e.target).closest('.popup__content').length || $(e.target).closest('.popup__close').length || $(e.target).closest('.popup__bottom .btn_close').length) {
      $(e.target).closest('.popup').removeClass('active');
      $('body').css('overflow', 'auto');
    }
  });

  // боковое меню
  const sideSubOpen = function () {
    if ($(this).parent().hasClass('active')) {
      $(this).parent().next('.sidebar-submenu').stop().slideDown();
    }
  };

  $('.sidebar-submenu__title svg').each(sideSubOpen);
  $('.sidebar-submenu__item_sub svg').each(sideSubOpen);

  const sideSubToggle = function () {
    $(this).parent().toggleClass('active');
    $(this).parent().next('.sidebar-submenu').stop().slideToggle();
  };

  $('.sidebar-submenu__title svg').on('click', sideSubToggle);
  $('.sidebar-submenu__item_sub svg').on('click', sideSubToggle);

  const formAjax = function () {
    $.ajax({
      type: "POST",
      url: $(this).attr('action'),
      data: $(this).serialize(),
      success: function () {
        $('.popup-form__good').addClass('active');
      }
    });
  };

  const validForm = function (form) {
    if ($(form).length) {
      $(form).validate({
        highlight: function (element) {
          $(element).add($(element).parents('.form__item')).addClass("error");
        },
        unhighlight: function (element) {
          $(element).add($(element).parents('.form__item')).removeClass("error");
        },
        errorClass: 'error__text',
        submitHandler: formAjax()
      });
    }
  };

  validForm('#form_partner');
  validForm('#form_partner-proiz');
  validForm('#form_order');


  // регион в форме
  if ($('#user__reg').length) {
    $('#user__reg').select2({
      placeholder: "Выбрать",
      language: 'ru',
      width: 'style'
    });
  };

  // корзина на мобилке
  if ($('.order-step').length) {
    $('.order-step__arrow').on('click', function () {
      if ($('.order-step').hasClass('active')) {
        $('.order-step').removeClass('active');
      } else {
        $('.order-step').addClass('active');
      }
    });
    if ($(window).width() < 1200) {
      let heightStep = 0;
      $('.order-step__item').each(function () {
        if ($(this).hasClass('active') || $(this).hasClass('done')) {
          heightStep++;
        }
      });
      $('.order-step').css('height', heightStep * 45);
      if ($('.order-step__item').length - 1 === heightStep) {
        $('.order-step__arrow').css('display', 'none');
      }
    }
  }
  // корзина секрии
  if ($('.series').length) {
    if ($(window).width() < 1200) {
      $('.series__main .btn').text('Просмотр');
    }
  }

  // корзина списки продуктов
  if ($('.order-product').length) {
    // основное
    $('.order-product__arrow, .order-product__name').on('click', function () {
      let product = $(this).parents('.order-product');
      if ($(product).hasClass('active')) {
        $(product).removeClass('active');
        $(product).find('.order-product__content').stop().slideUp();
      } else {
        $('.order-product').removeClass('active');
        $('.order-product__content').stop().slideUp();
        $(product).addClass('active');
        $(product).find('.order-product__content').stop().slideDown();
      }
    });
    // подпунткты
    $('.order-product__subtitle').on('click', function () {
      let product = $(this).parents('.order-product__charact');
      if ($(product).hasClass('active')) {
        $(product).removeClass('active');
        $(product).find('.order-product__block').stop().slideUp();
      } else {
        $('.order-product__charact').removeClass('active');
        $('.order-product__block').stop().slideUp();
        $(product).addClass('active');
        $(product).find('.order-product__block').stop().slideDown();
      }
    });

    // действия продектом
    const productAmount = function () {
      let amount = $('.order-product__menu.active').next().find('.product-count__main').val();
      $('.order-product__menu.active').parents('.order-product__title').find('.order-product__name-amount').text(amount + ' шт.');
    };
    $(document).on('click', function (e) {
      // клик по бургеру
      if ($(e.target).closest('.order-product__menu').length) {
        // если открыт
        if ($(e.target).closest('.order-product__menu').hasClass('active')) {
          productAmount();
          $(e.target).closest('.order-product__menu').removeClass('active');
          $(e.target).closest('.order-product__menu').next('.product-menu').fadeOut();
        } else {
          // если закрыт
          $('.order-product__menu').removeClass('active');
          $('.product-menu').fadeOut();
          $(e.target).closest('.order-product__menu').addClass('active');
          $(e.target).closest('.order-product__menu').next('.product-menu').fadeIn();
        }
      } else if (!$(e.target).closest('.product-menu').length) {
        // клик мимо
        productAmount();
        $('.order-product__menu').removeClass('active');
        $('.product-menu').fadeOut();
      }
    });

    $('.product-count__minus').on('click', function () {
      let count = $(this).parent().find('.product-count__main'),
        num = +$(count).val();
      if (num > 1) {
        $(count).val(num - 1);
      }
    });

    $('.product-count__plus').on('click', function () {
      let count = $(this).parent().find('.product-count__main'),
        num = +$(count).val();
      if (num < 50) {
        $(count).val(num + 1);
      }
    });

    $('.product-count__main').on('input', function () {
      const maxCount = +$(this).attr('max'),
        minCount = +$(this).attr('min');
      if ($(this).val() > maxCount) {
        $(this).val(maxCount);
      }
      if ($(this).val() < minCount) {
        $(this).val(minCount);
      }
    });

  }

  // табы конфигурации
  $('.config__block').on('click', function () {
    let tab = $(this).data('config'),
      tabContent = '.config__content[data-config-content="' + tab + '"]',
      tabAmount = $('.config__block').length;
    if (!$('.page-order').find(tabContent).hasClass('active')) {
      $('.config__content').removeClass('active');
      $('.page-order').find(tabContent).addClass('active');
      $('.config__block').removeClass('active');
      $(this).addClass('active');
      if (tab === 1 && !$('.config__arrow_prev').hasClass('disable')) {
        $('.config__arrow_prev').addClass('disable');
      } else if (tab === tabAmount && !$('.config__arrow_next').hasClass('disable')) {
        $('.config__arrow_next').addClass('disable');
      } else {
        $('.config__arrow').removeClass('disable');
      }
    }
  });

  $('.config__arrow').on('click', function (e) {
    let tab = $('.config__block.active').data('config'),
      tabAmount = $('.config__block').length;
    if ($(e.target).closest('.config__arrow_prev').length) {
      tab--;
    } else {
      tab++;
    }

    const tabContent = '.config__content[data-config-content="' + tab + '"]',
      tabNow = '.config__block[data-config="' + tab + '"]';
    if (!$('.page-order').find(tabContent).hasClass('active')) {
      $('.config__content').removeClass('active');
      $('.page-order').find(tabContent).addClass('active');
      $('.config__block').removeClass('active');
      $(tabNow).addClass('active');
      if (tab === 1 && !$('.config__arrow_prev').hasClass('disable')) {
        $('.config__arrow_prev').addClass('disable');
      } else if (tab === tabAmount && !$('.config__arrow_next').hasClass('disable')) {
        $('.config__arrow_next').addClass('disable');
      } else {
        $('.config__arrow').removeClass('disable');
      }
    }
  });

  // радио в таблице
  $('.section-table__radio input').on('click', function () {
    // выделение документа
    if ($(this).prop('checked')) {
      $(this).parents('.section-table').find('.section-table__item').removeClass('active');
      $(this).parents('.section-table').find('.config__select').prop('selectedIndex', 0).val(0).selectric('refresh');

      $(this).closest('.section-table__item').addClass('active');
      $(this).parents('.section-table__item').find('.config__select').prop('selectedIndex', 1).val(1).selectric('refresh');
    }
  });

  $('.config__next').on('click', function () {
    $('.config__arrow_next').trigger('click');
  });

  // закрытиые ошибки
  $('.config-error__close').on('click', function () {
    $(this).parent().removeClass('active');
  });

  // список заказа в попапе
  $('.order-list').on('click', function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').text('Список оборудования');
      $('.popup__order-list').stop().slideUp();
    } else {
      $(this).addClass('active').text('Свернуть список');
      $('.popup__order-list').stop().slideDown();
    }
  });

  // табы в решениях
  if ($('.page-solution').length) {
    if ($(window).width() < 1200) {
      // изменение структуры для мобильного
      $('.solution__tab').each(function () {
        let tabData = $(this).data('solution'),
          tabContent = '.solution__content[data-solution-content="' + tabData + '"]';
        $(this).after($(tabContent));
      });
      // работа табов
      $('.page-solution').find('.solution__content.active').addClass('active').stop().slideDown();

      $('.solution__tab').on('click', function () {
        let tab = $(this).data('solution'),
          tabContent = '.solution__content[data-solution-content="' + tab + '"]';
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $('.page-solution').find(tabContent).removeClass('active').stop().slideUp();
        } else {
          $('.solution__tab').removeClass('active');
          $('.solution__content').removeClass('active').stop().slideUp();
          $(this).addClass('active');
          $('.page-solution').find(tabContent).addClass('active').stop().slideDown();
          tableBig();
        }
      });
    } else {
      $('.solution__tab').on('click', function () {
        let tab = $(this).data('solution'),
          tabContent = '.solution__content[data-solution-content="' + tab + '"]';
        if (!$('.page-solution').find(tabContent).hasClass('active')) {
          $('.solution__content').removeClass('active');
          $('.solution__tab').removeClass('active');
          $(this).addClass('active');
          $('.page-solution').find(tabContent).addClass('active');
        }
        tableBig();
      });
    }
  }



  const tableBig = function () {
    if ($('.catalog-detail__config_big-wrap').length) {
      $('.catalog-detail__config_big-wrap').niceScroll({
        cursorcolor: "#00a9fc",
        background: "#fff",
        cursorwidth: 10,
        cursorborderradius: 100,
        autohidemode: false,
        //zindex: 1,
        //touchbehavior: true
      });
    }
  };
  jQuery(document).ready(function () {
    tableBig();
  })
  // замена фона на мобильном
  if ($('.catalog').length && $(window).width() < 768) {
    $('.catalog').each(function () {
      let bg = 'url(' + $(this).data('src-mobile') + ')';
      $(this).css('background-image', bg);
    });
  }

  // карточка модели конфигурация на мобильном
  // if ($('.catalog-detail__config-select').length) {
  //   $('.catalog-detail__config-select').selectric();
  //   const showTable = function () {
  //     let tableConfig = $('.catalog-detail__config-select').val(),
  //       tableClose = '.catalog-detail__config_small:not(' + tableConfig + ')';
  //     $(tableClose).stop().slideUp();
  //     $(tableConfig).stop().delay(500).slideDown();
  //   };

  //   showTable();

  //   $('.catalog-detail__config-select').on('change', function () {
  //     showTable();
  //   });
  // }

  if ($('.map-solution').length) {
    $('.map-solution__title').hover(function () {
      let bg = 'url(' + $(this).data('bg') + ')';
      $(this).css('background-image', bg);
    }, function () {
      if (!$(this).parent().hasClass('active')) {
        $(this).css('background-image', 'none');
      }
    });

    $('.map-solution__title').on('click', function () {
      //close all
      $('.map-solution__item.active').find('.map-solution__title').each(function (i, obj) {
        $(obj).parent().removeClass('active');
        $(obj).next('.map-solution__content').stop().slideUp();
        if ($(window).width() < 1200) {
          $(obj).css('background-image', 'none');
        }
      });

      let bg = 'url(' + $(this).data('bg') + ')';
      if ($(this).parent().hasClass('active')) {
        $(this).parent().removeClass('active');
        $(this).next('.map-solution__content').stop().slideUp();
        if ($(window).width() < 1200) {
          $(this).css('background-image', 'none');
        }
      } else {
        // $('.map-solution__item').removeClass('active');
        // $('.map-solution__content').stop().slideUp();
        // $('.map-solution__title').css('background-image', 'none');
        $(this).parent().addClass('active');
        $(this).css('background-image', bg);
        $(this).next('.map-solution__content').stop().slideDown();
        scroll_to_elem($(this).parent(), 500);
      }
    });
  }

  $('.section__img__block_btn .btn').on('click', function () {
    let src = $(this).data('src'),
      blockImg = $(this).parents('.section__img__block').find('.block_pic-1');
    //console.log(src);
    $(blockImg).attr('src', src);
  });
});

$(window).on('load', function () {
  $('#preloader').delay(550).removeClass('active');
  $('.form__item .file-selectdialog-switcher').trigger('click');
  $('.popup .file-selectdialog-switcher').trigger('click');

  if ($('.detail-slider_small').length) {
    $('.detail-slider__arrow').on('click', function () {
      const slideCount = $('.detail-slider_small').find('.detail-slider__item').length;
      if (($(window).width() > 1200 && slideCount <= 7) || ($(window).width() < 1200 && $(window).width() > 767 && slideCount <= 5) || ($(window).width() < 768 && slideCount <= 3)) {
        $('.detail-slider_small').find('.slick-track').css('transform', 'translate3d(0px, 0px, 0px) ');
      }
    });
  };

  if ($('.map-solution').length) {
    const title = $('.map-solution__item.active').find('.map-solution__title');
    let bg = 'url(' + $(title).data('bg') + ')';
    $(title).css('background-image', bg);
    $(title).next('.map-solution__content').stop().slideDown();
  };

});
