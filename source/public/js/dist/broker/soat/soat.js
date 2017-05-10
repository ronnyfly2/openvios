yOSON.AppCore.addModule("soat_index", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  st = {};
  defaults = {
    btn_import_soat: ".excel_import",
    ctn_modal: ".ctn_modal",
    template_modal: "#ctnFormModal",
    btn_import_excel: ".btn_import_excel",
    form_import_excel: "#form_import_excel",
    ctn_input_file: ".input_file input"
  };
  dom = {};
  catchDom = function(st) {};
  suscribeEvents = function() {
    $(defaults.btn_import_soat).on('click', functions.initImport);
    $(document).on('click', defaults.btn_import_excel, functions.importExcel);
    $(document).on('change', defaults.ctn_input_file, functions.changeInput);
  };
  events = functions = {
    changeInput: function() {
      $(this).parent().find("p").text($(this).val());
    },
    importExcel: function() {
      $(defaults.form_import_excel).parsley().validate();
      if ($(defaults.form_import_excel).parsley().isValid()) {
        $(defaults.form_import_excel).submit();
      }
    },
    initImport: function(e) {
      e.preventDefault();
      $.fancybox({
        content: $(defaults.ctn_modal).html($(defaults.template_modal).html()),
        autoSize: true,
        autoResize: true,
        autoWidth: true,
        afterShow: function(e) {
          console.log('abriendo !');
        },
        helpers: {
          overlay: {
            closeClick: false,
            showEarly: true
          }
        }
      });
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
}, ["/js/libs/fancybox/source/jquery.fancybox.pack.js"]);

yOSON.AppCore.addModule("validatesPendingsBrokerSoat", function(Sb) {
  var catchDom, dateFormat, defaults, dom, events, functions, initialize, selectBrand, st, suscribeEvents;
  st = {};
  defaults = {
    input_start_day: "#start_day",
    input_end_day: "#end_day",
    input_start_day_2: "#start_day_2",
    input_end_day_2: "#end_day_2",
    inputDateDefault: "#dateInput",
    brandSelect: "select[name=brand_id]",
    dataModel: ".ctn_locked select[name=model_id]",
    hourInput: "input[name=hour]"
  };
  dom = {};
  dateFormat = 'yy-mm-dd';
  selectBrand = $('.ctn_locked select[name=brand_id]').val();
  catchDom = function(st) {
    dom.brandSelect = $(st.brandSelect);
    dom.hourInput = $(st.hourInput);
    dom.dataModel = $(st.dataModel).data('model');
  };
  suscribeEvents = function() {
    functions.initDateDefault(2);
    functions.initTime(2);
    functions.initTimeTwo(2);
    dom.brandSelect.on('change', events.getModel);
    events.getHour();
    if (parseInt(dom.dataModel) > 0) {
      events.getModel();
    }
  };
  events = {
    getHour: function() {
      dom.hourInput.timepicker({
        showTime: true,
        timeFormat: 'HH:mm'
      });
    },
    getModel: function() {
      $.ajax({
        method: "GET",
        url: '/api/brand/' + dom.brandSelect.val(),
        beforeSend: function() {
          utils.loader($('.ctn_locked'), true);
        },
        success: function(json) {
          var htmlSelects, schedule, tplSel, tplToCompileSel;
          if (json.state === 1) {
            schedule = json.data;
            tplSel = $('#tplModel').html();
            tplToCompileSel = _.template(tplSel);
            htmlSelects = tplToCompileSel({
              models: json.data
            });
            $('.ctn_locked select[name=model_id]').html(htmlSelects);
            if (selectBrand === dom.brandSelect.val()) {
              if (parseInt(dom.dataModel) > 0) {
                $('.ctn_locked select[name=model_id]').val(dom.dataModel);
              }
            }
          }
        },
        complete: function(xhr) {
          utils.loader($('.ctn_locked'), false);
        }
      });
    }
  };
  functions = {
    initDateDefault: function() {
      $(defaults.inputDateDefault).datepicker({
        changeMonth: true,
        dateFormat: dateFormat,
        changeYear: true
      });
    },
    initTime: function(opt) {
      var from, getDate, to;
      $(defaults.input_start_day).datepicker("destroy");
      $(defaults.input_end_day).datepicker("destroy");
      if (opt === 1) {
        $(defaults.input_start_day).datepicker({
          changeMonth: true,
          dateFormat: dateFormat,
          changeYear: true
        });
      } else if (opt === 2) {
        from = $(defaults.input_start_day).datepicker({
          changeMonth: true,
          dateFormat: dateFormat,
          changeYear: true
        }).on('change', function() {
          to.datepicker('option', 'minDate', getDate($(this)));
        });
        $(defaults.input_end_day).datepicker("destroy");
        to = $(defaults.input_end_day).datepicker({
          changeMonth: true,
          dateFormat: dateFormat,
          changeYear: true
        }).on('change', function() {
          from.datepicker('option', 'maxDate', getDate($(this)));
        });
        getDate = function(element) {
          var date;
          date = $.datepicker.parseDate(dateFormat, element.val());
          return date;
        };
      }
    },
    initTimeTwo: function(opt) {
      var from, getDate, to;
      $(defaults.input_start_day_2).datepicker("destroy");
      $(defaults.input_end_day_2).datepicker("destroy");
      if (opt === 1) {
        $(defaults.input_start_day_2).datepicker({
          changeMonth: true,
          dateFormat: dateFormat,
          changeYear: true
        });
      } else if (opt === 2) {
        from = $(defaults.input_start_day_2).datepicker({
          changeMonth: true,
          dateFormat: dateFormat,
          changeYear: true
        }).on('change', function() {
          to.datepicker('option', 'minDate', getDate($(this)));
        });
        $(defaults.input_end_day_2).datepicker("destroy");
        to = $(defaults.input_end_day_2).datepicker({
          changeMonth: true,
          dateFormat: dateFormat,
          changeYear: true
        }).on('change', function() {
          from.datepicker('option', 'maxDate', getDate($(this)));
        });
        getDate = function(element) {
          var date;
          date = $.datepicker.parseDate(dateFormat, element.val());
          return date;
        };
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
}, ["/js/libs/jquery-ui/jquery-ui.min.js", "/js/libs/jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon.min.js", "/js/libs/jquery-ui/ui/i18n/datepicker-es.js", "/js/libs/jqueryui-timepicker-addon/dist/i18n/jquery-ui-timepicker-es.js"]);
