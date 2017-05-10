yOSON.AppCore.addModule("createMenu", function(Sb) {
  var arr_controllers, catchDom, defaults, dom, functions, initialize, optionsPlus, st, suscribeEvents, type_menu;
  type_menu = [];
  arr_controllers = [];
  optionsPlus = {
    insertZonePlus: true,
    isAllowed: function(cEl, hint, target) {
      if ($(target).closest("li").parent().hasClass("sTreePlus") || $(hint).parent().hasClass("sTreePlus")) {
        return true;
      } else {
        return false;
      }
    },
    placeholderCss: {
      'background-color': '#5D338E'
    },
    hintCss: {
      'background-color': '#00D5F8'
    },
    ignoreClass: 'clickable'
  };
  ({
    opener: {
      active: true,
      as: 'html',
      close: '<i class="fa fa-minus "></i>',
      open: '<i class="fa fa-plus"></i>'
    }
  });
  defaults = {
    form_add_menu: ".form_add_menu",
    btn_new_menu: '.new_menu',
    btn_save_menu: '.save_menu',
    select_save_menu: 'select[name=roles]',
    list_menu: '#sTreePlus',
    base_list_menu: '#menu_container',
    ctn_modal: '.ctn_modal',
    template_modal: '#ctnFormModal',
    route_type: "#route_type",
    div_controller: ".div_controller",
    div_action: ".div_action",
    div_link: ".div_link",
    classes_type: "select[name=classes_type]",
    btn_add_item: ".btn_add_item",
    name_menu: "input[name=name_menu]",
    input_link: "input[name=link]",
    select_controller_type: "#controller_type",
    btn_delete_item: ".item_main button"
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.btn_new_menu = $(st.btn_new_menu);
    dom.btn_save_menu = $(st.btn_save_menu);
  };
  suscribeEvents = function() {
    functions.loadRoles();
    $(defaults.select_save_menu).on('change', functions.loadMenu);
    $(document).on('click', defaults.btn_add_item, functions.addItemMenu);
    $(document).on('change', defaults.div_controller + " select", functions.loadActions);
    $(document).on('change', defaults.route_type, functions.loadRouteType);
    dom.btn_new_menu.on('click', functions.addMenu);
    dom.btn_save_menu.on('click', functions.saveMenu);
    return $(document).on('click', defaults.btn_delete_item, functions.deleteItemMenu);
  };
  functions = {
    deleteItemMenu: function() {
      var $this;
      $this = $(this);
      alertify.confirm('Esta seguro que desea eliminar el item.', function() {
        console.log($this.closest("li").remove());
      });
      return false;
    },
    addItemMenu: function() {
      console.log($(defaults.form_add_menu).parsley().isValid());
      $(defaults.form_add_menu).parsley().validate();
      if ($(defaults.form_add_menu).parsley().isValid()) {
        $.fancybox.close(true);
        alertify.confirm('¿Está seguro que desea agregar un elemento al menu?', function() {
          var data_obj, list_new, opt;
          data_obj = {};
          data_obj.class_id = $(defaults.classes_type).val() === "" ? null : $(defaults.classes_type).val();
          data_obj.name = $(defaults.name_menu).val();
          data_obj.route_type = $(defaults.route_type).val();
          opt = parseInt($(defaults.route_type).val());
          if (opt === 1) {
            data_obj.route = $(defaults.div_controller + " select").val();
          }
          if (opt === 2) {
            data_obj.route = $(defaults.div_controller + " select").val() + "@" + $(defaults.div_action + " select").val();
          }
          if (opt === 3) {
            data_obj.route = $(defaults.input_link).val();
          }
          list_new = "<li id='menu_" + new Date().valueOf() + "'>" + functions.getStringItem(data_obj) + "</li>" + $(defaults.list_menu).html();
          $(defaults.base_list_menu).html("<ol id='sTreePlus' class='sTreePlus'>" + list_new + "</ol>");
          $(defaults.list_menu).sortableLists(optionsPlus);
        }, function() {});
      }
    },
    loadActions: function() {
      var i, id_controller, j, str_li;
      id_controller = $(defaults.div_controller + " select").val();
      for (i in arr_controllers) {
        if (arr_controllers[i].name === id_controller) {
          str_li = '<option value="">Selecciona una acción</option>';
          for (j in arr_controllers[i].actions) {
            str_li = str_li + "<option value='" + arr_controllers[i].actions[j].name + "'>" + arr_controllers[i].actions[j].description.trim() + "</option>";
          }
          $(defaults.div_action + " select").html(str_li);
          $('select').select2();
        }
      }
    },
    loadRouteType: function() {
      var id_rol, id_type;
      id_rol = $(defaults.select_save_menu).val();
      id_type = $(defaults.route_type).val();
      if (parseInt(id_type) === 3) {
        $(defaults.div_link).removeClass('hide');
        $(defaults.div_controller).addClass('hide');
        $(defaults.div_action).addClass('hide');
        $(defaults.input_link).attr("data-parsley-required", true);
        $(defaults.div_controller + " select").attr("data-parsley-required", false);
        $(defaults.div_action + " select").attr("data-parsley-required", false);
      } else {
        $.ajax({
          method: "GET",
          url: '/api/menu/' + id_rol + '/' + id_type,
          success: function(json) {
            var i, str_li, types;
            if (json.state === 1) {
              types = json.data;
              arr_controllers = types;
              if (parseInt($(defaults.route_type).val()) === 1) {
                str_li = '<option value="">Selecciona un controlador</option>';
                for (i in types) {
                  str_li = str_li + "<option value='" + types[i].name + "' data-name='" + types[i].name + "'>" + types[i].display_name + "</option>";
                }
                $(defaults.div_controller + " select").html(str_li);
                $('select').select2();
                $(defaults.div_controller).removeClass('hide');
                $(defaults.div_link).addClass('hide');
                $(defaults.div_action).addClass('hide');
                $(defaults.input_link).attr("data-parsley-required", false);
                $(defaults.div_controller + " select").attr("data-parsley-required", true);
                $(defaults.div_action + " select").attr("data-parsley-required", false);
              }
              if (parseInt($(defaults.route_type).val()) === 2) {
                str_li = '<option value="">Selecciona un controlador</option>';
                for (i in types) {
                  str_li = str_li + "<option value='" + types[i].name + "' data-name='" + types[i].name + "'>" + types[i].display_name + "</option>";
                }
                $(defaults.div_controller + " select").html(str_li);
                str_li = '<option value="">Selecciona un acción</option>';
                $(defaults.div_action + " select").html(str_li);
                $('select').select2();
                $(defaults.div_controller).removeClass('hide');
                $(defaults.div_link).addClass('hide');
                $(defaults.div_action).removeClass('hide');
                $(defaults.input_link).attr("data-parsley-required", false);
                $(defaults.div_controller + " select").attr("data-parsley-required", true);
                $(defaults.div_action + " select").attr("data-parsley-required", true);
              }
            }
          }
        });
      }
    },
    saveMenu: function() {
      var item_new_menu;
      item_new_menu = {};
      item_new_menu.role_id = $(defaults.select_save_menu).val();
      item_new_menu.menus = $(defaults.list_menu).sortableListsToHierarchy();
      if (item_new_menu.role_id && item_new_menu.menus) {
        $.ajax({
          method: 'POST',
          url: '/api/menu',
          contentType: "application/json",
          data: JSON.stringify(item_new_menu),
          beforeSend: function() {
            utils.loader($('#menu_container'), true);
          },
          success: function(response) {
            if (response.state === 1) {
              alertify.alert(response.msg, function() {
                return location.reload();
              });
              return;
            } else {
              alertify.alert(response.msg);
            }
          },
          complete: function() {
            utils.loader($('#menu_container'), false);
          }
        }).fail(function(xhr) {
          return alertify.alert(xhr.responseJSON.msg);
        });
      } else {
        alertify.alert("Debe previamente seleccionar un rol.");
      }
    },
    addMenu: function() {
      $.fancybox({
        content: $(defaults.ctn_modal).html($(defaults.template_modal).html()),
        autoSize: true,
        autoResize: true,
        autoWidth: true,
        afterShow: function(e) {
          var i, str_li;
          $('body').addClass('open_modal');
          str_li = '<option value="">Selecciona un tipo</option>';
          for (i in type_menu.route_type) {
            str_li = str_li + "<option value='" + type_menu.route_type[i].id + "'>" + type_menu.route_type[i].name + "</option>";
          }
          $(defaults.route_type).html(str_li);
          str_li = '<option value="">Selecciona una clase</option>';
          for (i in type_menu.classes) {
            str_li = str_li + "<option value='" + type_menu.classes[i].id + "'>" + type_menu.classes[i].name + "</option>";
          }
          $(defaults.classes_type).html(str_li);
          $('select').select2();
          $(defaults.form_add_menu).parsley();
        },
        helpers: {
          overlay: {
            closeClick: false,
            showEarly: true
          }
        }
      });
    },
    loadRoles: function() {
      $.ajax({
        method: "GET",
        url: '/api/menu/',
        beforeSend: function() {},
        success: function(json) {
          var i, options, roles;
          if (json.state === 1) {
            roles = json.data.roles;
            type_menu = json.data;
            options = '<option value="">Selecciona un rol</option> ';
            $(defaults.select_save_menu).empty();
            for (i in roles) {
              options = options + "<option value='" + roles[i].id + "'>" + roles[i].display_name + "</option>";
            }
            $(defaults.select_save_menu).html(options);
            $(defaults.select_save_menu).select2();
          }
        },
        complete: function(xhr) {}
      });
    },
    getStringItem: function(data) {
      return "<div class='item_main' data-class_id='" + data.class_id + "' data-route='" + data.route + "' data-name='" + data.name + "' data-route_type='" + data.route_type + "'>" + data.name + "<button class='clickable btn_delete'>x</button></div>";
    },
    loadMenu: function() {
      var id_rol;
      id_rol = $(defaults.select_save_menu).val();
      if (parseInt(id_rol) !== "") {
        $(defaults.btn_new_menu).removeClass("hide");
        $.ajax({
          method: "GET",
          url: '/api/menu/' + id_rol,
          beforeSend: function() {},
          success: function(json) {
            var content, menus, x, y;
            if (json.state === 1) {
              menus = json.data;
              content = "<ol id='sTreePlus' class='sTreePlus'>";
              $(defaults.base_list_menu).empty();
              for (x in menus) {
                content = content + "<li id='menu_" + x + "'>" + functions.getStringItem(menus[x]);
                if (menus[x].children.length !== 0) {
                  content = content + '<ol>';
                  for (y in menus[x].children) {
                    content = content + "<li id='menu_" + x + '' + y + "'>" + functions.getStringItem(menus[x].children[y]) + "</li>";
                  }
                  content = content + '</ol>';
                }
                content = content + '</li>';
              }
              $(defaults.base_list_menu).html(content + "</ol>");
              $(defaults.list_menu).sortableLists(optionsPlus);
            }
          }
        });
      } else {
        $(defaults.btn_new_menu).addClass("hide");
        $(defaults.base_list_menu).empty();
        $(defaults.base_list_menu).html('<ol id="sTreePlus" class="sTreePlus"><p class="color_grey_blue">No se ha seleccionado ningun rol</p></ol>');
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
}, ["/js/libs/jquery-sortable-lists/jquery-sortable-lists.custom.js", "/js/libs/fancybox/source/jquery.fancybox.pack.js"]);
