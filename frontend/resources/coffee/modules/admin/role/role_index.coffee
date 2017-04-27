yOSON.AppCore.addModule "role_index", (Sb) ->
	st = {}
	defaults =
		btn_saverole: ".btn_saverole"
		form_create_rol: ".form_create_rol"
		role_header: ".role_header"
		btn_delete: ".btn_delete"
		btn_edit: ".btn_edit"
		btn_new_rol: ".btn_new_rol"
	dom = {}
	catchDom = (st)->
		return
	suscribeEvents = ()->
		functions.build_permitions()
		$(defaults.btn_saverole).on 'click', functions.save_role
		$(document).on 'click', defaults.role_header, functions.toogleRole
		$(document).on 'click', defaults.btn_delete, functions.deleteRole
		$(document).on 'click', defaults.btn_edit, functions.editRole
		$(document).on 'click', defaults.btn_new_rol, functions.newRole
		return
	functions =
		newRole:()->
			$(".content_create_rol").removeClass("hide")
			$(".list_roles").addClass("hide")
			
			return
		editRole: ()->
			id = $(this).closest('li').data("data_role").id
			$.ajax
				method: "GET"
				url: '/api/role/'+id
				beforeSend: ()->
					$(".content_create_rol").removeClass("hide")
					utils.loader $('.form_create_rol'), true
					$(".list_roles").addClass("hide")
					
					return
				success: (json) ->
					$(".content_create_rol h1").text("Editar Rol")
					$(".content_create_rol").data("type","edit")
					$(".content_create_rol").data("id",id)
					
					data = json.data
					$("input[name=name_role]").val data.name
					$("input[name=display_name_role]").val data.display_name
					$("input[name=description_role]").val data.description
					i=0
					k=data.permissions.length
					while(i<k)
						$("input[value="+data.permissions[i].id+"]").prop("checked",true)
						i++
					
					
					return
				complete: (xhr) ->
					$(".content_create_rol").removeClass("hide")
					utils.loader $('.form_create_rol'), false
					return
			
			return false
		deleteRole: ()->
			data = $(this).closest('li').data("data_role")
			alertify.okBtn("Aceptar").cancelBtn("Denegar").confirm "¿Seguro que desea eliminar el rol seleccionado?", ()->
				$.ajax
					method: "DELETE"
					url: '/api/role/' + data.id
					beforeSend: ()->
						return
					success: (json) ->
						location.reload()
						return
					complete: (xhr) ->
						return
				(ev)->
					ev.preventDefault()
					return
			
			return false
		toogleRole: ()->
			$parent = $(this).closest(".opt")
			$()
			if($parent.hasClass("close_opt"))
				$(".opt").removeClass("open_opt").addClass("close_opt")
				$parent.removeClass("close_opt").addClass("open_opt")
				$(this).find("i").removeClass("icon-arrow_down").addClass("icon-arrow_up")
			else
				$parent.addClass("close_opt").removeClass("open_opt")
				$(this).find("i").addClass("icon-arrow_down").removeClass("icon-arrow_up")
			
			
			return
		save_role: (e)->
			e.preventDefault()
			$(defaults.form_create_rol).parsley().validate()
			if($(defaults.form_create_rol).parsley().isValid())
				obj = {}
				obj.name = $("input[name=name_role]").val()
				obj.display_name = $("input[name=display_name_role]").val()
				obj.description = $("input[name=description_role]").val()
				obj.permissions = []
				selects = $("input[name='permisions[]']:checked")
				i = 0
				j = selects.length
				while(i < j)
					obj.permissions.push({"permission_id": $(selects[i]).val()})
					i++
				
				is_edit=if($(".content_create_rol").data("type")=="edit") then true else false
				str_edit=""
				if(is_edit)
					str_edit="/"+$(".content_create_rol").data("id")
				
				$.ajax
					method: if(is_edit)then "PUT" else "POST"
					url: '/api/role'+if(is_edit)then str_edit else ""
					data: obj
					beforeSend: ()->
						utils.loader $('.form_create_rol'), true
						return
					success: (response) ->
						if response.state == 1
							alertify.alert response.msg,
								()->
									location.reload()
									return
						else
							alertify.alert response.msg
						
						return
					complete: (xhr) ->
						utils.loader $('.form_create_rol'), false
						return
			return
		build_permitions: ()->
			$.ajax
				method: "GET"
				url: '/api/role'
				beforeSend: ()->
					return
				success: (json) ->
					data = json.data
					j = 0
					k = data.length
					$list_li = $(".content_roles > ul")
					while(j < k)
						$li = $(document.createElement("li")).data('data_role', data[j]).addClass("opt close_opt")
						$li.append('<div class="role_header"><div class="actions_header"><button class="btn btn_blue_light_2 btn_edit">Editar</button><button class="btn btn_blue_light_2 btn_delete">Eliminar</button></div>   ' + data[j].display_name + '<i class="icon icon-arrow_down"></i></div>')
						$ul = $(document.createElement("ul"))
						m = 0
						n = data[j].permissions.length
						if(n == 0)
							$ul.append($(document.createElement("li")).text("(Este rol no tiene permisos)"))
						else
							while(m < n)
								$ul.append($(document.createElement("li")).text(data[j].permissions[m].display_name))
								m++
						$li.append($ul)
						$list_li.append($li)
						j++
					
					return
				complete: (xhr) ->
					return
			
			
			$.ajax
				method: "GET"
				url: '/api/permission'
				beforeSend: ()->
					return
				success: (json) ->
					data = json.data
					for i of data
						$(defaults.form_create_rol + " .list_perm").append('<h2 class="color_grey_blue">' + i + '</h2>')
						$ul = $(document.createElement("ul"))
						j = 0
						k = data[i].length
						while(j < k)
							$ul.append('<li><input data-parsley-required="true" id="' + 'per' + i + j + '" type="checkbox" name="permisions[]" value="' + data[i][j].id + '" ><span>' + data[i][j].display_name + '</span></li>')
							j++
						$(defaults.form_create_rol + " .list_perm").append($ul)
					return
				complete: (xhr) ->
					return
			
			
			return
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return
	
	return {
		init: initialize
	}
, ["../js/libs/highcharts/highcharts.js"]
