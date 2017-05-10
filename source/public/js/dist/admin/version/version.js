yOSON.AppCore.addModule("versionApp", function(Sb) {
  var catchDom, defaults, dom, editForm, events, functions, idApp, initialize, jsonParse, st, suscribeEvents;
  defaults = {
    btnModal: '.js_app',
    btnModalEdit: '.js_edit',
    tplFormEdit: '.tpl_form_version_Edit'
  };
  st = {};
  dom = {};
  idApp = null;
  editForm = null;
  jsonParse = null;
  catchDom = function(st) {
    dom.btnModal = $(st.btnModal);
    dom.tplFormEdit = _.template($(st.tplFormEdit).html());
    dom.btnModalEdit = $(st.btnModalEdit);
  };
  suscribeEvents = function() {
    dom.btnModal.on('click', events.openModal);
    $(document).on('click', '.js_edit', functions.getAjax);
  };
  events = {
    getParsleyValidate: function(e) {
      console.log(e);
    },
    getParsleySubmit: function(e) {
      if ($('.add_version_form').parsley().isValid()) {
        utils.loader($('.ctn_form'), true);
      }
    },
    openModal: function(editForm, jsonParse) {
      var createTemplate, source, template;
      createTemplate = $('.tpl_form_version').html();
      template = _.template(createTemplate);
      source = $(this).hasClass('js_app') ? template : editForm;
      $.fancybox({
        content: $(".modal_app").html(source),
        afterLoad: function() {
          if (source === editForm) {
            $('.edit_form input[name="name"]').val(jsonParse.name);
            $('.edit_form textarea[name="description"]').val(jsonParse.description);
            $('.ctn_form.edit_form').parsley().on('form:submit', function(e) {
              e.submitEvent.preventDefault();
              if ($('.edit_form').parsley().isValid()) {
                utils.loader($('.ctn_form'), true);
                functions.getAjaxEdit();
              }
            });
          } else {
            $('.ctn_form.add_version_form').parsley().on('form:submit', events.getParsleySubmit);
          }
        },
        autoSize: true,
        autoResize: true,
        autoWidth: true,
        fitToView: false,
        maxWidth: "100%",
        maxHeight: "610px",
        scrolling: 'auto'
      });
    }
  };
  functions = {
    getAjaxEdit: function(e) {
      $.ajax({
        method: "PUT",
        url: "/admin/version/" + idApp,
        data: {
          name: $('.edit_form input[name=name]').val(),
          description: $('.edit_form [name=description]').val()
        },
        beforeSend: function() {
          utils.loader($('.content_table'), true);
        },
        success: function(json) {
          if (json.state === 1) {
            alertify.confirm(json.msg, function() {
              $.fancybox.close(true);
              location.reload();
            });
            $('.dialog .cancel').hide();
          }
        },
        complete: function(xhr) {
          utils.loader($('.content_table'), false);
        }
      });
    },
    getAjax: function(e) {
      idApp = $(this).parents('td').siblings('.sorting_1').text();
      $.ajax({
        method: "GET",
        url: "/admin/version/" + idApp + "/edit",
        beforeSend: function() {
          utils.loader($('.content_table'), true);
        },
        success: function(json) {
          if (json.state === 1) {
            jsonParse = json.data;
            editForm = dom.tplFormEdit({
              optionsData: jsonParse
            });
            events.openModal(editForm, jsonParse);
          }
        },
        complete: function(xhr) {
          utils.loader($('.content_table'), false);
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
}, ["/js/libs/fancybox/source/jquery.fancybox.js"]);
