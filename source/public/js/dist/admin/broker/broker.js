yOSON.AppCore.addModule("broker_index", function(Sb) {
  var catchDom, defaults, dom, functions, initialize, st, suscribeEvents;
  defaults = {
    btnModal: '.js_app'
  };
  st = {};
  dom = {};
  catchDom = function(st) {};
  suscribeEvents = function() {
    functions.changeState();
    $('select[name=broker_typeperson]').on('change', functions.changeState);
  };
  functions = {
    filterTable: function(e) {},
    changeState: function(e) {
      console.log(parseInt($('select[name=broker_typeperson]').val()));
      if ($('select[name=broker_typeperson]').val() === '1') {
        $('fieldset.broker_type_box').hide();
      } else {
        $('fieldset.broker_type_box').show();
      }
    }
  };
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    catchDom(st);
    suscribeEvents();
  };
  return {
    init: initialize
  };
}, []);
