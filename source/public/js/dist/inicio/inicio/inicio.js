
/*
Content: tabs de cumpleaños.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("birtDays", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    formLogin: '.form_login'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.formLogin = $(st.formLogin);
  };
  suscribeEvents = function() {
    events.getScrollBar();
  };
  events = {
    getScrollBar: function(e) {
      console.log(moment());
    }
  };
  functions = {};
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    catchDom(st);
    suscribeEvents();
  };
  return {
    init: initialize
  };
}, ["/public/js/libs/moment/moment.js"]);


/*
Content: ScrollBar.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("scrollBar", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    formLogin: '.form_login'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.formLogin = $(st.formLogin);
  };
  suscribeEvents = function() {
    events.getScrollBar();
  };
  events = {
    getScrollBar: function(e) {
      $('.scrollBar').slimScroll({
        height: '100%',
        width: '100%'
      });
    }
  };
  functions = {};
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    catchDom(st);
    suscribeEvents();
  };
  return {
    init: initialize
  };
}, ["/public/js/libs/jquery-slimscroll/jquery.slimscroll.js"]);


/*
Content: Sliders.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("sliderCarousel", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    formLogin: '.form_login'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.formLogin = $(st.formLogin);
  };
  suscribeEvents = function() {
    events.getSliderIndex();
  };
  events = {
    getSliderIndex: function(e) {
      $('.slider_top').bxSlider({
        'controls': false,
        'infiniteLoop': true,
        'mode': 'horizontal',
        'auto': true,
        'adaptiveHeight': true,
        'pager': true
      });
      if ($('.owl-carousel.carousel_box').length > 0) {
        $('.owl-carousel.carousel_box').owlCarousel({
          items: 1,
          center: true,
          nav: true,
          dots: false,
          margin: 15,
          autoplay: true,
          autoplayTimeout: 4000,
          loop: true,
          navText: ['', ''],
          navClass: ['icon icon-arrow_light_left', 'icon icon-arrow_light_right']
        });
      }
    }
  };
  functions = {};
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    catchDom(st);
    suscribeEvents();
  };
  return {
    init: initialize
  };
}, ["/public/js/libs/bxslider-4/dist/jquery.bxslider.js", "/public/js/libs/owl.carousel/dist/owl.carousel.min.js"]);
