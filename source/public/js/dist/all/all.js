
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
Content: obtiene la imagen del banner.
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
      log('ksjdskjdk');
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

yOSON.AppCore.addModule("initAlert", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    bntUnlock: '.icon.icon-adm_lock, a.icon-adm_pen'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.bntUnlock = $(st.bntUnlock);
  };
  suscribeEvents = function() {
    functions.initAlert();
    $(document).on('click', 'form.btn_state input', events.changeState);
    $(document).on('click', 'form.btn_remove input', events.deleteItem);
  };
  functions = {
    initAlert: function() {
      var txtAlert;
      txtAlert = $('ul.alert li').text();
      if (txtAlert !== '') {
        alertify.alert(txtAlert);
      }
    }
  };
  events = {
    changeState: function(ev) {
      var $this, parentForm;
      ev.preventDefault();
      $this = $(this);
      parentForm = $this.parents('form');
      return alertify.okBtn("Aceptar").cancelBtn("Denegar").confirm("¿Seguro que desea cambiar de estado?", function() {
        parentForm.submit();
        return function(ev) {
          ev.preventDefault();
          alertify.error("cancelado");
        };
      });
    },
    deleteItem: function(ev) {
      var $this, parentForm;
      ev.preventDefault();
      $this = $(this);
      parentForm = $this.parents('form');
      return alertify.okBtn("Aceptar").cancelBtn("Denegar").confirm("¿Seguro que desea eliminar el registro seleccionado?", function() {
        parentForm.submit();
        return function(ev) {
          ev.preventDefault();
          alertify.error("cancelado");
        };
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
}, ["/js/libs/alertify/dist/js/alertify.js"]);


/*
Content: Efecto ripple (Material design) a los botones.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("initDataTable", function(Sb) {
  var catchDom, defaults, dom, functions, initialize, language, st, suscribeEvents;
  defaults = {
    table: '.js-datatable',
    search: ".search",
    btnSelect: ".select"
  };
  st = {};
  dom = {};
  language = {
    "sProcessing": "<div class='loader'><span></span></div>",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "Ningún dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
      "sFirst": "Primero",
      "sLast": "Ultimo",
      "sNext": "Siguiente",
      "sPrevious": "Anterior"
    },
    "oAria": {
      "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
      "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
  };
  window.table = {};
  catchDom = function(st) {
    dom.table = $(st.table);
    dom.search = $(st.search);
    dom.btnSelect = $(st.btnSelect);
  };
  suscribeEvents = function() {
    if (dom.table.length > 0) {
      functions.makeTables();
    }
    dom.btnSelect.on('click', functions.openChangeStyle);
  };
  functions = {
    openChangeStyle: function() {
      $('.select2-dropdown').addClass('select2_open');
    },
    makeTables: function() {
      var array, columns, i, id, input_search, j, key, obj, table, url;
      i = 0;
      j = dom.table.length;
      while (i < j) {
        table = $(dom.table[i]);
        input_search = $(dom.search[i]);
        columns = table.attr("data-cols");
        url = table.attr("data-url");
        id = table.attr("id");
        array = columns.split(",");
        obj = [];
        for (key in array) {
          obj.push({
            data: array[key],
            name: array[key]
          });
        }
        if (table.hasClass("no-sort")) {
          window.table[id] = table.DataTable({
            rowCallback: function(row, data, index) {
              $(row).attr("data-id", data.id);
            },
            oLanguage: language,
            processing: true,
            serverSide: true,
            searching: true,
            bLengthChange: false,
            autoWidth: false,
            scrollX: false,
            ajax: {
              "url": url
            },
            columns: obj,
            columnDefs: [
              {
                'targets': 'no_sort',
                'orderable': false
              }, {
                'targets': 'no_search',
                'searchable': false
              }
            ]
          });
        } else {
          window.table[id] = table.DataTable({
            rowCallback: function(row, data, index) {
              $(row).attr("data-id", data.id);
            },
            oLanguage: language,
            processing: true,
            serverSide: true,
            ordering: false,
            searching: true,
            bLengthChange: false,
            autoWidth: false,
            scrollX: false,
            ajax: {
              "url": url
            },
            columns: obj
          });
        }
        input_search.on('keyup', function() {
          if ($(this).data("table") != null) {
            window.table[$(this).data("table")].search($(this).val()).draw();
          } else {
            window.table[id].search($(this).val()).draw();
          }
        });
        $('.js-filter').on('change', function() {
          var arr_filters, filtro, str_params, u, x;
          arr_filters = $('.js-filter');
          if (arr_filters.length > 0) {
            u = 0;
            x = arr_filters.length;
            str_params = "?";
            while (u < x) {
              filtro = $(arr_filters[u]).attr('name');
              str_params = str_params + filtro + "=" + $(arr_filters[u]).val().toString() + (u < (x - 1) ? "&" : "");
              u++;
            }
            console.log(str_params);
            window.table[id].ajax.url(url + str_params).load();
          }
        });
        i++;
        $('.btn_filter').on('click', function() {
          var filterUrl, finishDateVal, startDateVal, valueInputsFilters;
          startDateVal = $('input[name=start_date]');
          finishDateVal = $('input[name=end_date]');
          valueInputsFilters = $('.ctn_form_filters form input');
          filterUrl = 0;
          [].forEach.call(valueInputsFilters, function(itm, idx, obj) {
            var ele;
            ele = $(itm);
            if (ele.val() !== '') {
              ele.removeClass('parsley-error');
              return filterUrl = url + "?date_init=" + $('input[name=start_date]').val().toString() + "&date_finish=" + $('input[name=end_date]').val();
            } else {
              ele.addClass('parsley-error');
              return filterUrl = 0;
            }
          });
          if (filterUrl !== 0) {
            return window.table[id].ajax.url(filterUrl).load();
          } else {
            return console.log(filterUrl, 'uhmm');
          }
        });
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
}, ['/js/libs/datatables/js/jquery.dataTables.min.js']);

yOSON.AppCore.addModule("initDatePicker", function(Sb) {
  var catchDom, dateFormat, defaults, dom, functions, initialize, st, suscribeEvents;
  st = {};
  defaults = {
    inputDateDefault: ".datepicker"
  };
  dom = {};
  dateFormat = 'yy-mm-dd';
  catchDom = function(st) {
    dom.inputDateDefault = $(st.inputDateDefault);
  };
  suscribeEvents = function() {
    functions.initDateDefault();
  };
  functions = {
    initDateDefault: function() {
      dom.inputDateDefault.datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "yy-mm-dd",
        yearRange: "1950:2006"
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
}, ["/js/libs/jquery-ui/jquery-ui.min.js", "/js/libs/jquery-ui/ui/i18n/datepicker-es.js"]);


/*
Content: Inicia el Select2
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("initSelect", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    btnRipple: '.ripple'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.btnRipple = $(st.btnRipple);
  };
  suscribeEvents = function() {
    events.getSelect();
  };
  events = {
    getSelect: function(event) {
      log('wsadkaskdjsalkd');
      $('.select_lightblue').select2({
        language: "es",
        minimumResultsForSearch: 10
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
}, ["/public/js/libs/select2/dist/js/select2.min.js", "/public/js/libs/select2/dist/js/i18n/es.js"]);

yOSON.AppCore.addModule("initUbigeo", function(Sb) {
  var catchDom, defaults, dom, functions, initialize, selectDepartament, st, suscribeEvents;
  st = {};
  defaults = {
    department: "select[name=department]",
    dataProvince: ".ctn_locked select[name=province]",
    dataDistrict: ".ctn_locked select[name=ubigeo_id]"
  };
  dom = {};
  selectDepartament = $('select[name=department]').val();
  catchDom = function(st) {
    dom.department = $(st.department);
    dom.dataProvince = $(st.dataProvince).data('province');
    dom.dataDistrict = $(st.dataDistrict).data('district');
  };
  suscribeEvents = function() {
    if (parseInt(dom.dataProvince) > 0) {
      functions.loadProvinces();
    }
    dom.department.on('change', functions.loadProvinces);
  };
  functions = {
    loadProvinces: function() {
      $.ajax({
        method: "GET",
        url: '/api/ubigeo/province/' + dom.department.val(),
        beforeSend: function() {
          utils.loader($('.ctn_locked'), true);
        },
        success: function(json) {
          var htmlSelects, schedule, tplSel, tplToCompileSel;
          if (json.state === 1) {
            schedule = json.data;
            tplSel = $('#tplProvince').html();
            tplToCompileSel = _.template(tplSel);
            htmlSelects = tplToCompileSel({
              provinces: json.data
            });
            $('.ctn_locked select[name=province]').html(htmlSelects);
            $('select[name=province]').on('change', functions.loadDistricts);
            if (selectDepartament === dom.department.val()) {
              if (parseInt(dom.dataProvince) > 0) {
                $('.ctn_locked select[name=province]').val(dom.dataProvince);
                functions.loadDistricts();
              }
            } else {
              $('.ctn_locked select[name=province]').val('');
              $('.ctn_locked select[name=ubigeo_id]').val('').trigger("change");
            }
          }
        },
        complete: function(xhr) {
          utils.loader($('.ctn_locked'), false);
        }
      });
    },
    loadDistricts: function() {
      $.ajax({
        method: "GET",
        url: '/api/ubigeo/district/' + $('select[name=province]').val(),
        beforeSend: function() {
          utils.loader($('.ctn_locked'), true);
        },
        success: function(json) {
          var htmlSelects, schedule, tplSel, tplToCompileSel;
          if (json.state === 1) {
            schedule = json.data;
            tplSel = $('#tplDistrict').html();
            tplToCompileSel = _.template(tplSel);
            htmlSelects = tplToCompileSel({
              districts: json.data
            });
            $('.ctn_locked select[name=ubigeo_id]').html(htmlSelects);
            if (selectDepartament === dom.department.val()) {
              if (parseInt(dom.dataDistrict) > 0) {
                $('.ctn_locked select[name=ubigeo_id]').val(dom.dataDistrict);
              }
            } else {
              $('.ctn_locked select[name=ubigeo_id]').val('');
            }
          }
        },
        complete: function(xhr) {
          utils.loader($('.ctn_locked'), false);
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
}, ['/js/libs/underscore/underscore.js']);

yOSON.AppCore.addModule("initValidate", function(Sb) {
  var catchDom, defaults, dom, events, initialize, st, suscribeEvents;
  st = {};
  defaults = {
    formValidate: ".content_form form",
    btnForm: ".content_form form .btn_submit[type=submit]",
    btnBack: ".link_btn",
    txtNoSpace: ".no_space"
  };
  dom = {};
  catchDom = function(st) {
    dom.btnForm = $(st.btnForm);
    dom.formValidate = $(st.formValidate);
    dom.btnBack = $(st.btnBack);
    dom.txtNoSpace = $(st.txtNoSpace);
  };
  suscribeEvents = function() {
    $('input').on('keyup', events.pressEnter);
    dom.btnBack.on('click', events.linkBack);
    dom.txtNoSpace.on('input', events.noSpace);
    $('.upercase input[type=text]').on('input', events.upPercase);
    if (dom.formValidate.length > 0) {
      dom.formValidate.parsley().on('form:submit', events.getParsleySubmit);
      dom.formValidate.parsley().on('form:validate', events.getParsleyValidate);
    }
  };
  events = {
    upPercase: function() {
      var textChange;
      textChange = $(this).val();
      $(this).val(textChange.toUpperCase());
    },
    noSpace: function() {
      var noSpaceIn;
      noSpaceIn = $(this).val();
      noSpaceIn = noSpaceIn.replace(/\s/g, "");
      $(this).val(noSpaceIn);
    },
    getParsleyValidate: function(e) {
      var imageDB;
      if ($('.img_server').length > 0) {
        imageDB = $('.img_server').attr('data-image');
        if (imageDB !== '') {
          $('.file_upload').attr('data-parsley-required', 'false');
        } else {
          events.initValidateImg(e);
        }
      }
    },
    getParsleySubmit: function(e) {
      if (dom.formValidate.parsley().isValid()) {
        utils.loader($('.content_form'), true);
      }
    },
    pressEnter: function(e) {
      if (e.which === 13) {
        $(e.target).blur();
      }
    },
    initValidateImg: function(e) {
      if ($('.img_server').val() !== '') {
        $('.img_server').parents('.upload').siblings('.advise').removeClass('error_file');
      } else {
        e.submitEvent.preventDefault();
        utils.loader($('.content_form'), false);
        $('.img_server').parents('.upload').siblings('.advise').addClass('error_file');
      }
    },
    linkBack: function() {
      var arrTemporal, newUrlPage, protocol, temporal, urlAbsolute, urlPage;
      urlAbsolute = window.location.href;
      temporal = urlAbsolute.split('//');
      protocol = temporal[0];
      urlPage = temporal[1];
      arrTemporal = urlPage.split('/');
      if (urlPage.split('/').pop() === 'edit') {
        arrTemporal.length = arrTemporal.length - 2;
        newUrlPage = arrTemporal.join('/');
        window.location = 'http://' + newUrlPage;
      } else {
        arrTemporal.length = arrTemporal.length - 1;
        newUrlPage = arrTemporal.join('/');
        window.location = 'http://' + newUrlPage;
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
}, ["/js/libs/parsleyjs/dist/parsley.js", "/js/libs/parsleyjs/src/i18n/es.js", "/js/libs/jq-utils/jq-utils.js"]);

yOSON.AppCore.addModule("menuNav", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    openListMenu: 'li.menu_dropdown > a',
    lnkActives: '.dropdown_list li.item_active'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.openListMenu = $(st.openListMenu);
    dom.lnkActives = $(st.lnkActives);
  };
  suscribeEvents = function() {
    dom.openListMenu.on('click', events.openList);
  };
  events = {
    openList: function(e, animate) {
      var arrow, isAnimate, ref;
      arrow = $(this).children('div.icon');
      isAnimate = (ref = typeof animate !== 'undefined') != null ? ref : {
        animate: true
      };
      if ($(arrow).hasClass('icon-arrow_right')) {
        $(arrow).removeClass('icon-arrow_right');
        $(arrow).addClass('icon-arrow_down');
        if (isAnimate) {
          $(this).siblings('ul.dropdown_list').show('slow');
        } else {
          $(this).siblings('ul.dropdown_list').show();
        }
        $(this).addClass('open_a');
      } else {
        $(arrow).removeClass('icon-arrow_down');
        $(arrow).addClass('icon-arrow_right');
        if (isAnimate) {
          $(this).siblings('ul.dropdown_list').hide('slow');
        } else {
          $(this).siblings('ul.dropdown_list').hide();
        }
        $(this).removeClass('open_a');
      }
    }
  };
  functions = {
    activeMenus: function() {
      if ($('.open_a').length > 0) {
        $('.dropdown_list li.item_active').each(function() {
          var $this, parentset, sibls;
          $this = $(this);
          parentset = $this.parents('.dropdown_list');
          parentset.show('slow');
          sibls = parentset.siblings('.open_a').find('div.icon');
          sibls.addClass('icon-arrow_down');
          return sibls.removeClass('icon-arrow_right');
        });
      }
    }
  };
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    catchDom(st);
    functions.activeMenus();
    suscribeEvents();
  };
  return {
    init: initialize
  };
}, []);


/*
Content: Efecto ripple (Material design) a los botones.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("rippleEfect", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    btnRipple: '.ripple'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.btnRipple = $(st.btnRipple);
  };
  suscribeEvents = function() {
    dom.btnRipple.on('click', events.getEfectRipple);
  };
  events = {
    getEfectRipple: function(event) {
      var $div, $ripple, btnOffset, xPos, yPos;
      $div = $('<div/>');
      btnOffset = $(this).offset();
      xPos = event.pageX - btnOffset.left;
      yPos = event.pageY - btnOffset.top;
      $div.addClass('ripple_effect');
      $ripple = $(".ripple_effect");
      $ripple.css("height", $(this).height());
      $ripple.css("width", $(this).height());
      $div.css({
        top: yPos - ($ripple.height() / 2),
        left: xPos - ($ripple.width() / 2),
        background: $(this).data("ripple-color")
      }).appendTo($(this));
      window.setTimeout(function() {
        return $div.remove();
      }, 1000);
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

yOSON.AppCore.addModule("selectTwoInit", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  st = {};
  defaults = {
    selects: "select"
  };
  dom = {};
  catchDom = function(st) {
    dom.selects = $(st.selects);
  };
  suscribeEvents = function() {
    functions.initSelects();
    dom.selects.on('select2:open', events.initSelectsOpen);
  };
  functions = {
    'initSelects': function() {
      if (dom.selects.length > 0) {
        dom.selects.select2({
          minimumResultsForSearch: 5
        });
      }
    }
  };
  events = {
    'initSelectsOpen': function(e) {}
  };
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    catchDom(st);
    suscribeEvents();
  };
  return {
    init: initialize
  };
}, ["/js/libs/select2/dist/js/select2.min.js", "/js/libs/select2/dist/js/i18n/es.js"]);
