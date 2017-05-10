
/*
Content: Efecto ripple (Material design) a los botones.
@autor Ronny Cabrera
 */
yOSON.AppCore.addModule("getUpImage", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, st, suscribeEvents;
  defaults = {
    btnRemove: '.remove_img',
    btnRemoveImgBD: '.remove_img_bd',
    imgDefault: 'img/placeholder_img.png',
    urlDomain: window.location.host,
    btnImg: '.file_upload'
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.btnRemove = $(st.btnRemove);
    dom.btnRemoveImgBD = $(st.btnRemoveImgBD);
    dom.urlImgDefault = 'http://' + st.urlDomain + '/' + st.imgDefault;
    dom.btnImg = $(st.btnImg);
  };
  suscribeEvents = function() {
    events.editImage();
    dom.btnRemove.on('click', events.removeImage);
    dom.btnRemoveImgBD.on('click', events.removeImgBD);
    dom.btnImg.on('change', events.changeImage);
  };
  events = {
    readURL: function(input) {
      var extenxtion, reader;
      extenxtion = $('.file_upload').val().split('.').pop().toLowerCase();
      if (input.files && input.files[0] && $.inArray(extenxtion, ['gif', 'png', 'jpg', 'jpeg']) > -1) {
        reader = new FileReader;
        reader.onload = function(e) {
          $('.preview_image').attr('src', e.target.result);
          $('.preview_image').addClass('image_upload');
          $('.img_server').val(e.target.result);
          $('.upload').removeClass('validate');
          $('.btn_upload').text('Volver a cargar nueva Imagen');
          $('.remove_img').show();
          $('.advise').removeClass('error_file');
        };
        reader.readAsDataURL(input.files[0]);
        return;
      } else {
        $('.remove_img').hide();
        alertify.alert('Error, no es una imagen');
      }
    },
    removeImage: function(e) {
      $('.preview_image').attr('src', dom.urlImgDefault);
      $('.file_upload').val('');
      $('.img_server').val('');
      $('.btn_upload').text('Cargar imagen');
      $('.remove_img').hide();
      events.editImage();
    },
    changeImage: function(e) {
      events.readURL(this);
    },
    editImage: function() {
      var imageDB;
      imageDB = $('.img_server').attr('data-image');
      if (imageDB !== '') {
        $('.preview_image').attr('src', imageDB);
      } else {
        $('.preview_image').attr('src', dom.urlImgDefault);
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
}, ['/js/libs/alertify/dist/js/alertify.js']);


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
    console.log('ronnt');
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
}, ['/js/libs/jquery-filer/js/jquery.filer.js', '/js/libs/alertify/dist/js/alertify.js']);
