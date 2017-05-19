
/*
Content: tabs de maps.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("getMap", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, latGeo, longGeo, st, suscribeEvents, urlImgPin;
  defaults = {
    btnTab: '.row_contact .list li',
    zoomMap: 17,
    colorMapSilver: '#C0C0C0',
    saturationMap: -98,
    lightnessMap: 2
  };
  st = {};
  dom = {};
  latGeo = -12.10419;
  longGeo = -76.939422;
  urlImgPin = '../img/pin.png';
  catchDom = function(st) {
    dom.btnTab = $(st.btnTab);
  };
  suscribeEvents = function() {
    dom.btnTab.on("click", events.getMap);
    if ($('.row_contact').length > 0) {
      events.getMapBox();
    }
  };
  events = {
    getMap: function(e) {
      var ele;
      ele = $(this);
      dom.btnTab.removeClass('actived');
      ele.addClass('actived');
      if (ele !== void 0) {
        latGeo = ele.data('lat');
        longGeo = ele.data('long');
        urlImgPin = ele.data('ping');
        events.getMapBox();
      } else {
        console.log('no hiciste nada');
      }
    },
    getMapBox: function(map) {
      map = new google.maps.Map($("#map")[0], {
        zoom: st.zoomMap,
        center: {
          lat: latGeo,
          lng: longGeo
        },
        styles: [
          {
            stylers: [
              {
                hue: st.colorSilver
              }, {
                saturation: st.saturationMap
              }, {
                lightness: st.lightnessMap
              }
            ]
          }
        ]
      });
      events.getMarker(map);
    },
    getMarker: function(map) {
      var locationMarker;
      locationMarker = new google.maps.Marker({
        zoom: st.zoomMap,
        position: {
          lat: latGeo,
          lng: longGeo
        },
        map: map,
        icon: urlImgPin
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
}, ["https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAi47sP6N9N9vcIQN-CvXvBZKo9ndlvzAU"]);


/*
Content: obtiene el Tab.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("getTab", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    tabItem: '.list_numbers li'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.tabItem = $(st.tabItem);
  };
  suscribeEvents = function() {
    dom.tabItem.on('click', events.getTabActive);
  };
  events = {
    getTabActive: function() {
      dom.tabItem.removeClass('actived');
      $(this).addClass('actived');
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
