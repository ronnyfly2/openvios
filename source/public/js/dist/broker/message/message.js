yOSON.AppCore.addModule("actionMessage", function(Sb) {
  var catchDom, defaults, dom, functions, initialize, st, suscribeEvents, valType;
  st = {};
  defaults = {
    typeRadio: "input[name=target_message]"
  };
  dom = {};
  valType = null;
  catchDom = function(st) {
    dom.typeRadio = $(st.typeRadio);
  };
  suscribeEvents = function() {
    if ($('input[name=target_message]').length > 0) {
      functions.loadType();
    }
    dom.typeRadio.on('change', functions.loadType);
  };
  functions = {
    loadType: function() {
      console.log(parseInt($('input[name=target_message]:checked').val()), $(this));
      if (parseInt($('input[name=target_message]:checked').val()) > 1) {
        $('select[name=seller]').select2('open');
        $('select[name=seller]').attr('data-parsley-required', true);
      } else {
        $('select[name=seller]').attr('data-parsley-required', false);
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
