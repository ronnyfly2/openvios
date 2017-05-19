
/*
Content: activa el link del menu de la pagina.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("activeMenu", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    webView: '.container',
    navLink: 'aside nav li a'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.webView = $(st.webView);
    dom.navLink = $(st.navLink);
  };
  suscribeEvents = function() {
    events.getLink();
  };
  events = {
    getLink: function() {
      var linkActive, page;
      page = dom.webView.data('page');
      log(page);
      linkActive = dom.navLink.data('link');
      $('nav li a[data-link="' + page + '"]').addClass('actived');
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
}, []);


/*
Content: obtiene la imagen.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("getBgImage", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    imgCtn: '.row_banner_top .ctn_img'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.imgCtn = $(st.imgCtn);
  };
  suscribeEvents = function() {
    events.getImage();
  };
  events = {
    getImage: function() {
      var img;
      img = dom.imgCtn.data('bg');
      dom.imgCtn.css({
        "background-image": "url(" + img + ")"
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
}, []);
