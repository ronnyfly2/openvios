yOSON.AppCore.addModule("addApp", function(Sb) {
  var catchDom, defaults, dom, editForm, events, functions, idApp, initialize, jsonParse, st, suscribeEvents;
  defaults = {
    btnModal: '.js_app',
    btnModalEdit: '.js_edit',
    tplFormEdit: '.tpl_form_edit'
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
      if ($('.add_app_form').parsley().isValid()) {
        utils.loader($('.ctn_form'), true);
      }
    },
    openModal: function(editForm, jsonParse) {
      var createTemplate, source, template;
      createTemplate = $('.tpl_form_app').html();
      template = _.template(createTemplate);
      source = $(this).hasClass('js_app') ? template : editForm;
      $.fancybox({
        content: $(".modal_app").html(source),
        afterLoad: function() {
          $('select').select2();
          $('select').on('select2:open', functions.initSelectsOpen);
          if (source === editForm) {
            $('.edit_form select[name="typedevice"]').val(jsonParse.typedevice).trigger("change");
            $('.edit_form select[name="rule"]').val(jsonParse.rule).trigger("change");
            $('.edit_form select[name="app_version_id"]').val(jsonParse.app_version_id).trigger("change");
            $('.ctn_form.edit_form').parsley().on('form:submit', function(e) {
              e.submitEvent.preventDefault();
              if ($('.edit_form').parsley().isValid()) {
                utils.loader($('.ctn_form'), true);
                functions.getAjaxEdit();
              }
            });
            $('.add_version').on('click', function() {
              if ($('.version_hide').hasClass('show_new')) {
                $('.add_version').text('Nueva versión');
                $('.version_hide').removeClass('show_new');
                $('[name=version_name]').attr('disabled', true).attr('data-parsley-required', false);
                $('[name=version_description]').attr('disabled', true).attr('data-parsley-required', false);
                $('.hidden_version').show();
              } else {
                $('.add_version').text('Cancelar');
                $('.version_hide').addClass('show_new');
                $('[name=version_name]').attr('disabled', false).attr('data-parsley-required', true);
                $('[name=version_description]').attr('disabled', false).attr('data-parsley-required', true);
                $('.hidden_version').hide();
              }
            });
          } else {
            $('.ctn_form.add_app_form').parsley().on('form:submit', events.getParsleySubmit);
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
        url: "/admin/app/" + idApp,
        data: {
          name: $('.edit_form input[name=name]').val(),
          typedevice: $('.edit_form [name=typedevice]').val(),
          rule: $('.edit_form [name=rule]').val(),
          app_version_id: $('.edit_form [name=app_version_id]').val(),
          version_name: $('.edit_form [name=version_name]').val(),
          version_description: $('.edit_form [name=version_description]').val()
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
        url: "/admin/app/" + idApp + "/edit",
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
    },
    initSelectsOpen: function() {
      $('.select2-container--open').css('z-index', '9999');
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


/*
Content: Efecto ripple (Material design) a los botones.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("getUploader", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    btnRemove: '.remove_img',
    btnRemoveImgBD: '.remove_img_bd',
    imgDefault: 'img/placeholder_img.png',
    urlDomain: window.location.host
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.btnRemove = $(st.btnRemove);
    dom.btnRemoveImgBD = $(st.btnRemoveImgBD);
    dom.urlImgDefault = 'http://' + st.urlDomain + '/' + st.imgDefault;
  };
  suscribeEvents = function() {
    events.getUpload();
    dom.btnRemove.on('click', events.removeImage);
    dom.btnRemoveImgBD.on('click', events.removeImgBD);
  };
  events = {
    removeImage: function() {
      $(this).siblings('.img_create').attr('src', '');
      $(this).next().find('.jFiler-item-trash-action').trigger('click');
      $(this).siblings('.image-form').show();
      $(this).siblings('.img_default').show();
      $(this).siblings('.img_create').hide();
      $(this).hide();
      if ($(this).siblings('.image-form').hasClass('principal_imgs')) {
        console.log('La imagen esta');
      } else {
        console.log('no tiene la imagen');
      }
      $(this).siblings('.remove_img_bd').show();
    },
    removeImgBD: function() {
      var idImgBD, inputImg, removeBtn, showImg;
      removeBtn = $(this);
      showImg = removeBtn.siblings('.image-form');
      idImgBD = removeBtn.siblings('.image-form').data('id');
      inputImg = removeBtn.siblings('.jFiler.jFiler-theme-default').find('.filer_input_desc');
      $.ajax({
        method: "DELETE",
        url: '/admin/school/gallery/' + idImgBD,
        data: {
          "_token": $('meta[name=csrf-token]').attr('content')
        },
        beforeSend: function() {
          console.log('borrando imagen');
        },
        success: function(response) {
          if (response.state === 1) {
            showImg.attr('src', dom.urlImgDefault);
            removeBtn.hide();
            inputImg.attr('name', '_gallery[]');
          }
        }
      });
    },
    getUpload: function(e) {
      if ($(".filer_input_desc").length > 0) {
        $('.filer_input_desc').filer({
          showThumbs: true,
          addMore: false,
          extensions: ["jpg", "png", "gif"],
          allowDuplicates: false,
          limit: 1,
          removeConfirmation: false,
          dialogs: {
            alert: function(text) {
              return alertify.alert(text);
            },
            confirm: function(text, callback) {
              callback();
            }
          },
          captions: {
            button: "Subir imagen",
            feedback: "Selecciona una imagen para subir",
            feedback2: "imagen seleccionada",
            drop: "Drop file here to Upload",
            removeConfirmation: "Are you sure you want to remove this file?",
            errors: {
              filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
              filesType: "Extensión de imagen inválida",
              filesSize: "{{fi-name}} es muy pesada! Por favor, subir imagen de {{fi-fileMaxSize}} MB como máximo",
              filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB.",
              folderUpload: "Imagen inválida"
            }
          },
          afterShow: function(elCtnImg) {
            return setTimeout(function() {
              var img;
              img = elCtnImg.find('.jFiler-item-thumb-image img').attr('src');
              elCtnImg.parents('.jFiler.jFiler-theme-default').siblings('.remove_img_bd').hide();
              elCtnImg.parents('.jFiler.jFiler-theme-default').siblings('.image-form').hide();
              elCtnImg.parents('.jFiler.jFiler-theme-default').siblings('.img_default').hide();
              elCtnImg.parents('.jFiler.jFiler-theme-default').siblings('.img_create').attr('src', img).show();
              return elCtnImg.parents('.jFiler.jFiler-theme-default').siblings('.remove_img').show();
            }, 600);
          },
          templates: {
            box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
            item: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-thumb"><div class="jFiler-item-status"></div><div class="jFiler-item-thumb-overlay"><div class="jFiler-item-info"><div style="display:table-cell;vertical-align: middle;"><span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span><span class="jFiler-item-others">{{fi-size2}}</span></div></div></div>{{fi-image}}</div><div class="jFiler-item-assets jFiler-row"><ul class="list-inline pull-left"><li>{{fi-progressBar}}</li></ul><ul class="list-inline pull-right"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></li>',
            itemAppend: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-thumb"><div class="jFiler-item-status"></div><div class="jFiler-item-thumb-overlay"><div class="jFiler-item-info"><div style="display:table-cell;vertical-align: middle;"><span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span><span class="jFiler-item-others">{{fi-size2}}</span></div></div></div>{{fi-image}}</div><div class="jFiler-item-assets jFiler-row"><ul class="list-inline pull-left"><li><span class="jFiler-item-others">{{fi-icon}}</span></li></ul><ul class="list-inline pull-right"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></li>',
            progressBar: '<div class="bar"></div>',
            itemAppendToEnd: true,
            canvasImage: true,
            removeConfirmation: true,
            _selectors: {
              list: '.jFiler-items-list',
              item: '.jFiler-item',
              progressBar: '.bar',
              remove: '.jFiler-item-trash-action'
            }
          }
        });
      }
    },
    captureImageEdit: function() {
      var imgForm;
      imgForm = $(this).parents('ul.list-inline').parents('.jFiler-items').parents('.jFiler');
      console.log($(imgForm).siblings('.image-form').show());
    },
    changeImage: function() {
      var imgForm;
      imgForm = $(this).parents('.jFiler');
      console.log($(imgForm).siblings('.image-form').hide());
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
}, ['../../../js/libs/jquery-filer/js/jquery.filer.js', '../../../js/libs/alertify/dist/js/alertify.js']);
