yOSON.AppCore.addModule("changeRadioType", function(Sb) {
  var catchDom, defaults, dom, functions, initialize, st, suscribeEvents, valType;
  st = {};
  defaults = {
    typeRadio: "input[name=client_type]"
  };
  dom = {};
  valType = null;
  catchDom = function(st) {
    dom.typeRadio = $(st.typeRadio);
  };
  suscribeEvents = function() {
    if ($('input[name=client_type]').length > 0) {
      functions.loadType();
    }
    dom.typeRadio.on('change', functions.loadType);
  };
  functions = {
    loadType: function() {
      if (parseInt($('input[name=client_type]:checked').val()) > 1) {
        $('fieldset.company').show();
        $('fieldset.company').find('input').attr('data-parsley-required', true);
        $('fieldset.natural_person').hide();
        $('fieldset.natural_person').find('input').attr('data-parsley-required', false);
        $('fieldset.natural_person').find('select').attr('data-parsley-required', false);
      } else {
        $('fieldset.company').hide();
        $('fieldset.company').find('input').attr('data-parsley-required', false);
        $('fieldset.natural_person').show();
        $('fieldset.natural_person').find('input').attr('data-parsley-required', true);
        $('fieldset.natural_person').find('select').attr('data-parsley-required', true);
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
