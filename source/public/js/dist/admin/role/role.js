yOSON.AppCore.addModule("role_index", function(Sb) {
  var catchDom, defaults, dom, functions, initialize, st, suscribeEvents;
  st = {};
  defaults = {
    btn_saverole: ".btn_saverole",
    form_create_rol: ".form_create_rol",
    role_header: ".role_header",
    btn_delete: ".btn_delete",
    btn_edit: ".btn_edit",
    btn_new_rol: ".btn_new_rol"
  };
  dom = {};
  catchDom = function(st) {};
  suscribeEvents = function() {
    functions.build_permitions();
    $(defaults.btn_saverole).on('click', functions.save_role);
    $(document).on('click', defaults.role_header, functions.toogleRole);
    $(document).on('click', defaults.btn_delete, functions.deleteRole);
    $(document).on('click', defaults.btn_edit, functions.editRole);
    $(document).on('click', defaults.btn_new_rol, functions.newRole);
  };
  functions = {
    newRole: function() {
      $(".content_create_rol").removeClass("hide");
      $(".list_roles").addClass("hide");
    },
    editRole: function() {
      var id;
      id = $(this).closest('li').data("data_role").id;
      $.ajax({
        method: "GET",
        url: '/api/role/' + id,
        beforeSend: function() {
          $(".content_create_rol").removeClass("hide");
          utils.loader($('.form_create_rol'), true);
          $(".list_roles").addClass("hide");
        },
        success: function(json) {
          var data, i, k;
          $(".content_create_rol h1").text("Editar Rol");
          $(".content_create_rol").data("type", "edit");
          $(".content_create_rol").data("id", id);
          data = json.data;
          $("input[name=name_role]").val(data.name);
          $("input[name=display_name_role]").val(data.display_name);
          $("input[name=description_role]").val(data.description);
          i = 0;
          k = data.permissions.length;
          while (i < k) {
            $("input[value=" + data.permissions[i].id + "]").prop("checked", true);
            i++;
          }
        },
        complete: function(xhr) {
          $(".content_create_rol").removeClass("hide");
          utils.loader($('.form_create_rol'), false);
        }
      });
      return false;
    },
    deleteRole: function() {
      var data;
      data = $(this).closest('li').data("data_role");
      alertify.okBtn("Aceptar").cancelBtn("Denegar").confirm("¿Seguro que desea eliminar el rol seleccionado?", function() {
        $.ajax({
          method: "DELETE",
          url: '/api/role/' + data.id,
          beforeSend: function() {},
          success: function(json) {
            location.reload();
          },
          complete: function(xhr) {}
        });
        return function(ev) {
          ev.preventDefault();
        };
      });
      return false;
    },
    toogleRole: function() {
      var $parent;
      $parent = $(this).closest(".opt");
      $();
      if ($parent.hasClass("close_opt")) {
        $(".opt").removeClass("open_opt").addClass("close_opt");
        $parent.removeClass("close_opt").addClass("open_opt");
        $(this).find("i").removeClass("icon-arrow_down").addClass("icon-arrow_up");
      } else {
        $parent.addClass("close_opt").removeClass("open_opt");
        $(this).find("i").addClass("icon-arrow_down").removeClass("icon-arrow_up");
      }
    },
    save_role: function(e) {
      var i, is_edit, j, obj, selects, str_edit;
      e.preventDefault();
      $(defaults.form_create_rol).parsley().validate();
      if ($(defaults.form_create_rol).parsley().isValid()) {
        obj = {};
        obj.name = $("input[name=name_role]").val();
        obj.display_name = $("input[name=display_name_role]").val();
        obj.description = $("input[name=description_role]").val();
        obj.permissions = [];
        selects = $("input[name='permisions[]']:checked");
        i = 0;
        j = selects.length;
        while (i < j) {
          obj.permissions.push({
            "permission_id": $(selects[i]).val()
          });
          i++;
        }
        is_edit = $(".content_create_rol").data("type") === "edit" ? true : false;
        str_edit = "";
        if (is_edit) {
          str_edit = "/" + $(".content_create_rol").data("id");
        }
        $.ajax({
          method: is_edit ? "PUT" : "POST",
          url: '/api/role' + (is_edit ? str_edit : ""),
          data: obj,
          beforeSend: function() {
            utils.loader($('.form_create_rol'), true);
          },
          success: function(response) {
            if (response.state === 1) {
              alertify.alert(response.msg, function() {
                location.reload();
              });
            } else {
              alertify.alert(response.msg);
            }
          },
          complete: function(xhr) {
            utils.loader($('.form_create_rol'), false);
          }
        });
      }
    },
    build_permitions: function() {
      $.ajax({
        method: "GET",
        url: '/api/role',
        beforeSend: function() {},
        success: function(json) {
          var $li, $list_li, $ul, data, j, k, m, n;
          data = json.data;
          j = 0;
          k = data.length;
          $list_li = $(".content_roles > ul");
          while (j < k) {
            $li = $(document.createElement("li")).data('data_role', data[j]).addClass("opt close_opt");
            $li.append('<div class="role_header"><div class="actions_header"><button class="btn btn_blue_light_2 btn_edit">Editar</button><button class="btn btn_blue_light_2 btn_delete">Eliminar</button></div>   ' + data[j].display_name + '<i class="icon icon-arrow_down"></i></div>');
            $ul = $(document.createElement("ul"));
            m = 0;
            n = data[j].permissions.length;
            if (n === 0) {
              $ul.append($(document.createElement("li")).text("(Este rol no tiene permisos)"));
            } else {
              while (m < n) {
                $ul.append($(document.createElement("li")).text(data[j].permissions[m].display_name));
                m++;
              }
            }
            $li.append($ul);
            $list_li.append($li);
            j++;
          }
        },
        complete: function(xhr) {}
      });
      $.ajax({
        method: "GET",
        url: '/api/permission',
        beforeSend: function() {},
        success: function(json) {
          var $ul, data, i, j, k;
          data = json.data;
          for (i in data) {
            $(defaults.form_create_rol + " .list_perm").append('<h2 class="color_grey_blue">' + i + '</h2>');
            $ul = $(document.createElement("ul"));
            j = 0;
            k = data[i].length;
            while (j < k) {
              $ul.append('<li><input data-parsley-required="true" id="' + 'per' + i + j + '" type="checkbox" name="permisions[]" value="' + data[i][j].id + '" ><span>' + data[i][j].display_name + '</span></li>');
              j++;
            }
            $(defaults.form_create_rol + " .list_perm").append($ul);
          }
        },
        complete: function(xhr) {}
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
}, ["../js/libs/highcharts/highcharts.js"]);
