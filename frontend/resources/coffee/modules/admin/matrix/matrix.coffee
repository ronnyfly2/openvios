array_usecars=[]
array_classcars=[]
array_departments=[]
array_brands=[]
array_models=[]
yOSON.AppCore.addModule "matrix", (Sb) ->
	defaults =
		matrix_id: 'input[name=matrix_id]'
		list_uses:'.list_uses'
		ctn_modal:'.ctn_modal'
		template_modal: '#ctnFormModal'
		select_category: '#select_category'
		select_brands: '#select_mark'
		select_models: '#select_models'
		btn_add_use: '.btn_add_use'
		btn_add_category: '.btn_add_category'
		input_company_usecar: 'input[name=company_usecar]'
		select_modalitymodel: '#select_modalitymodel'
		select_modalityprice: '#select_modalityprice'
		select_model_total: '#select_model_total'
		btn_add_model_total: '.btn_add_model_total'
		btn_addCategory:'.btn_addCategory'
		form_add_category : ".form_add_category"
		btn_add_more: '.btn_add_more'
		template_modal_use: '#ctnFormModalAddUse'
		ctn_modal_use: '.ctn_modal_use'
		select_list_uses:'#select_list_uses'
		form_add_use: '.form_add_use'
		btn_save_use: '.btn_save_use'
		btn_removeCategory: '.btn_removeCategory'
		btn_edit_category: '.btn_edit_category'
		input_id_matrix: "input[name=id_matrix]"
		btn_assign_price: '.btn_assign_price'
		ctn_modal_assign_price: '.ctn_modal_assign_price'
		template_modal_assign:'#ctnFormModalAsignePrice'
		select_deparments:'#select_deparments'
		btn_add_item_price: '.btn_add_item_price'
		list_items_price: '.list_items_price'
		input_price_addModal: '#price_add'
		delete_item_price: '.delete_item_price'
		btn_save_price: '.btn_save_price'
		form_assign_price: '.form_assign_price'
		content_price_national: '.content_price_national'
		input_price_national: '#price_national'
		input_price_lima:'#input_price_lima'
		input_price_province: '#input_price_province'
		content_lima_others: '.content_lima_others'
		btn_delete_category: '.btn_delete_category'
		content_modality_modles:'.content_modality_modles'
	st = {}
	dom = {}
	catchDom = (st)->
		return
	suscribeEvents = ()->
		events.loadMatrix()
		$(document).on 'change',defaults.select_brands, functions.updateSelectModel
		$(document).on 'click',defaults.btn_save_use, functions.saveUse
		$(document).on 'click',defaults.btn_add_category, functions.saveCategory
		$(document).on 'click',defaults.btn_add_model_total, functions.addModelsToTotal
		$(document).on 'click', defaults.btn_addCategory, functions.openSaveMatrix
		$(document).on 'click',defaults.btn_add_more, functions.showListHideModel
		$(document).on 'click', defaults.btn_add_use, functions.openSaveUse
		$(document).on 'click', defaults.btn_removeCategory, functions.deleteUse
		$(document).on 'click', defaults.btn_edit_category, functions.editCategory
		$(document).on 'click', defaults.btn_assign_price, functions.assignPrice
		$(document).on 'click', defaults.btn_add_item_price, functions.addItemPrice
		$(document).on 'click', defaults.delete_item_price, functions.deleteItem
		$(document).on 'click', defaults.btn_save_price, functions.savePrice
		$(document).on 'change', defaults.select_modalityprice, functions.changeModalityPrice
		$(document).on 'click', defaults.btn_delete_category, functions.deleteCategory
		$(document).on 'change', defaults.select_modalitymodel, functions.changeModalityModel
		
		return
	functions=
		changeModalityModel:()->
			if(parseInt($(this).val())==2)
				$(defaults.content_modality_modles).addClass("hide")
				$(defaults.select_model_total).attr("data-parsley-required",false)
			else
				$(defaults.content_modality_modles).removeClass("hide")
				$(defaults.select_model_total).attr("data-parsley-required",true)
				
			return
		deleteCategory:()->
			#/api/matrix/{company_usecar}/{matrix}
			button_data=$(this).data()
			$.ajax
				method: 'DELETE'
				url: '/api/matrix/'+button_data.company_usecar_id+"/"+button_data.id
				contentType: "application/json"
				beforeSend: ()->
					utils.loader $(defaults.form_add_use), true
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
				complete: ()->
					utils.loader $(defaults.form_add_use), false
					return
			return
		changeModalityPrice:()->
			$(defaults.input_price_national).val("")
			value=parseInt($(this).val())
			if(value==0)
				$(defaults.content_price_national).removeClass("hide")
				$(defaults.content_lima_others).addClass("hide")
				$(defaults.input_price_national).attr("data-parsley-required",true)
				$(defaults.input_price_lima).attr("data-parsley-required",false)
				$(defaults.input_price_province).attr("data-parsley-required",false)
			else if(value==2)
					$(defaults.content_lima_others).removeClass("hide")
					$(defaults.content_price_national).addClass("hide")
					$(defaults.input_price_lima).attr("data-parsley-required",true)
					$(defaults.input_price_province).attr("data-parsley-required",true)
					$(defaults.input_price_national).attr("data-parsley-required",false)
				else
					$(defaults.content_lima_others).addClass("hide")
					$(defaults.content_price_national).addClass("hide")
					$(defaults.input_price_lima).attr("data-parsley-required",false)
					$(defaults.input_price_province).attr("data-parsley-required",false)
					$(defaults.input_price_national).attr("data-parsley-required",false)
				
			return
		savePrice:()->
			$(defaults.form_assign_price).parsley().validate()
			if($(defaults.form_assign_price).parsley().isValid())
				list_item_price=$(defaults.list_items_price+ " .item_price")
				i=0
				l=list_item_price.length
				prices=[]
				while(i<l)
					ubigeos=$(list_item_price[i]).find("select").val().map((num) ->
						{
							ubigeo_id:num
						}
					)
					prices[i]=
						id: if($(list_item_price[i]).data("price_id") == undefined ) then null else $(list_item_price[i]).data("price_id")
						price:$(list_item_price[i]).find("input[name=price]").val()
						ubigeos:ubigeos
					i++
				$.ajax
					method: 'PUT'
					url: '/api/matrix-price/'+$(".asign_price "+defaults.input_id_matrix).val()
					contentType: "application/json"
					data: JSON.stringify({prices:prices,company_id:$(defaults.matrix_id).val()})
					beforeSend: ()->
						utils.loader $(defaults.form_add_use), true
						return
					success: (response) ->
						$.fancybox.close( true )
						if response.state == 1
							alertify.alert response.msg,
								()->
									location.reload()
							return
						else
							alertify.alert response.msg
						return
					complete: ()->
						utils.loader $(defaults.form_add_use), false
						return
			
			return
		deleteItem:()->
			$(this).closest(".item_price").remove()
			return
		addItemPrice:()->
			item=$($.parseHTML('<div class="item_price"><div class="row_col2"><div><fieldset><select data-parsley-required="true" multiple="multiple" style="width: 100%" ></select></fieldset></div><div><fieldset><input data-parsley-required="true" type="text" data-parsley-min="1" data-parsley-max="1000"  name="price" placeholder="Precio" ><button class="delete_item_price">X</button></fieldset></div></div></div>'))
			item.find("select").html($(defaults.select_deparments).html())
			item.find("select").val($(defaults.select_deparments).val()).trigger('change')
			item.find('input').val($(defaults.input_price_addModal).val())
			$(defaults.list_items_price).prepend(item)
			$('select').select2()
			
			$(defaults.select_deparments).val("").trigger("change")
			$(defaults.input_price_addModal).val("")
			$(defaults.list_items_price).scrollTop(0)
			return
		assignPrice:()->
			data_button=$(this).data()
			
			$.fancybox
				content: $(defaults.ctn_modal_assign_price).html($(defaults.template_modal_assign).html())
				autoSize: true
				autoResize: true
				autoWidth: true
				afterShow: (e) ->
					$('body').addClass('open_modal')
					$(".asign_price "+defaults.input_id_matrix).val(data_button.id+"")
					str_li = ''
					for i of array_departments
						str_li = str_li + "<option value='" + i + "'>" + array_departments[i] + "</option>"
					$(defaults.select_deparments).html str_li
					$('.asign_price .head_modal h2').text('Asignar precios')
					$('select').select2()
					$.ajax
						method: "GET"
						url: '/api/matrix-price/'+data_button.id
						beforeSend: ()->
							return
						success: (json) ->
							data=json.data
							prices=data.prices
							i=0
							l=prices.length
							while(i<l)
								item=$($.parseHTML('<div class="item_price"><div class="row_col2"><div><fieldset><select data-parsley-required="true" multiple="multiple" style="width: 100%" ></select></fieldset></div><div><fieldset><input data-parsley-required="true" data-parsley-min="1" data-parsley-max="1000" type="text" name="price" placeholder="Precio" ><button class="delete_item_price">X</button></fieldset></div></div></div>'))
								item.data("price_id",prices[i].id)
								item.find('input').val(prices[i].price)
								item.find("select").html($(defaults.select_deparments).html())
								values_item=prices[i].ubigeos.map((num) ->
									num.id
								)
								item.find("select").val(values_item).trigger('change')
								$(defaults.list_items_price).append(item)
								$('select').select2()
								i++
							return
						complete: (xhr) ->
							return
										
					return
				helpers:
					overlay:
						closeClick: false
						showEarly: true
			
			return
		fillSelectsModalCategory:()->
			str_li = '<option value="">Selecciona una categoría</option>'
			for i of array_classcars
				str_li = str_li + "<option value='" + i + "'>" + array_classcars[i] + "</option>"
			$(defaults.select_category).html str_li
			str_li = '<option value="">Selecciona una marca</option>'
			for i of array_brands
				str_li = str_li + "<option value='" + i + "'>" + array_brands[i] + "</option>"
			$(defaults.select_brands).html str_li
			str_li = '<option value="">Selecciona un modelo</option>'
			$(defaults.select_models).html str_li
			$('select').select2()
			return
		editCategory:()->
			data_button=$(this).data()
			$.fancybox
				content: $(defaults.ctn_modal).html($(defaults.template_modal).html())
				autoSize: true
				autoResize: true
				autoWidth: true
				afterShow: (e) ->
					$('body').addClass('open_modal')
					$(".new_matrix "+defaults.input_id_matrix).val(data_button.id)
					functions.fillSelectsModalCategory()
					$(".new_matrix .head_modal h2").text("Editar clase");
					$(".new_matrix .head_modal h2").data("status","edit");
					#EDIT
					$(defaults.input_company_usecar).val(data_button.company_usecar_id)
					$(defaults.select_category).val(data_button.classcar_id).trigger("change")
					$(defaults.select_modalitymodel).val(data_button.modalitymodel).trigger("change")
					$(defaults.select_modalityprice).val(data_button.modalityprice).trigger("change")
					$(defaults.input_price_national).val(data_button.price)
					
					if(parseInt(data_button.modalityprice)==2)
						$(defaults.input_price_lima).val(data_button.prices[0].price).data("id",data_button.prices[0].id)
						$(defaults.input_price_province).val(data_button.prices[1].price).data("id",data_button.prices[1].id)
					
					add_models=data_button.models
					i=0
					l=add_models.length
					while(i<l)
						$(defaults.select_model_total).append(functions.getElement("option").attr('value',add_models[i].id).text(add_models[i].name))
						$(defaults.select_model_total).select2().val([add_models[i].id].concat($(defaults.select_model_total).val())).trigger("change")
						i++
					
					return
				helpers:
					overlay:
						closeClick: false
						showEarly: true
			return
		deleteUse:()->
			id_use=$(this).data().company_usecar
			alertify.confirm '¿Está seguro que desea eliminar la categoría?', (->
				$.ajax
					method: 'DELETE'
					url: '/api/matrix/'+id_use
					contentType: "application/json"
					beforeSend: ()->
						utils.loader $(defaults.list_uses), true
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
					complete: ()->
						utils.loader $(defaults.list_uses), false
						return
				return
			), ->
				
				return
			
			return
		openSaveUse:()->
			$.fancybox
				content: $(defaults.ctn_modal_use).html($(defaults.template_modal_use).html())
				autoSize: true
				autoResize: true
				autoWidth: true
				afterShow: (e) ->
					$('body').addClass('open_modal')
					str_li = '<option value="">Selecciona un uso</option>'
					for i of array_usecars
						str_li = str_li + "<option value='" + i + "'>" + array_usecars[i] + "</option>"
					$(defaults.select_list_uses).html str_li
					
					$('select').select2()
					return
				helpers:
					overlay:
						closeClick: false
						showEarly: true
			return
		showListHideModel:()->
			if(!$(this).hasClass('show_list_models'))
				$(this).text("-")
				$(this).addClass('show_list_models').closest('.content_list_models').find('.hide_model').addClass('show_model_list')
			else
				$(this).text("+")
				$(this).removeClass('show_list_models').closest('.content_list_models').find('.show_model_list').removeClass('show_model_list')
			return
		addModelsToTotal:()->
			add_models=$(defaults.select_models+ " option:selected")
			i=0
			l=add_models.length
			while(i<l)
				current=$(add_models[i])
				if($(defaults.select_model_total).val() == null || $(defaults.select_model_total).val().indexOf(current.val())==-1)
					$(defaults.select_model_total).append(functions.getElement("option").attr('value',current.val()).text(current.text()))
					$(defaults.select_model_total).select2().val([current.val()].concat($(defaults.select_model_total).val())).trigger("change")
				i++
			$(defaults.select_models).val("").trigger("change")
			return
		saveCategory:(e)->
			$(defaults.form_add_category).parsley().validate()
			if($(defaults.form_add_category).parsley().isValid())
				models=null
				if(parseInt($(defaults.select_modalitymodel).val())!=2)
					models=$(defaults.select_model_total).val().map((num) ->
						{
							model_id : num
						}
					)
				data=
					company_usecar:$(defaults.input_company_usecar).val()
					classcar_id: $(defaults.select_category).val()
					modalitymodel: $(defaults.select_modalitymodel).val()
					modalityprice: $(defaults.select_modalityprice).val()
					price: if(parseInt($(defaults.select_modalityprice).val())==0)then $(defaults.input_price_national).val() else null
					prices: if(parseInt($(defaults.select_modalityprice).val())==2)then [{id:$(defaults.input_price_lima).data("id"), price:$(defaults.input_price_lima).val()},{id:$(defaults.input_price_province).data("id") ,price:$(defaults.input_price_province).val()}] else null
					models:models
				data_head=$(".new_matrix .head_modal h2").data("status");
				
				method=""
				url=""
				if (data_head=="new")
					method="POST"
					url='/api/matrix'
				else
					method="PUT"
					url='/api/matrix/'+$(".new_matrix "+defaults.input_id_matrix).val()
				$.ajax
					method: method
					url: url
					contentType: "application/json"
					data: JSON.stringify(data)
					beforeSend: ()->
						utils.loader $(defaults.form_add_category), true
						return
					success: (response) ->
						$.fancybox.close( true )
						if response.state == 1
							alertify.alert response.msg,
								()->
									location.reload()
							return
						else
							alertify.alert response.msg
						return
					complete: ()->
						utils.loader $(defaults.form_add_category), false
						return
			return
		saveUse:()->
			$(defaults.form_add_use).parsley().validate()
			if($(defaults.form_add_use).parsley().isValid())
				data=
					company_id: $(defaults.matrix_id).val()
					usecar_id: $(defaults.select_list_uses).val()
				
				$.ajax
					method: 'POST'
					url: '/api/matrix/companyusercar'
					contentType: "application/json"
					data: JSON.stringify(data)
					beforeSend: ()->
						utils.loader $(defaults.form_add_use), true
						return
					success: (response) ->
						$.fancybox.close( true )
						if response.state == 1
							alertify.alert response.msg,
								()->
									location.reload()
							return
						else
							alertify.alert response.msg
						return
					complete: ()->
						utils.loader $(defaults.form_add_use), false
						return
				
			return
		loadData:(brand_id,callback)->
			$.ajax
				method: "GET"
				url: '/api/matrix/?company_id='+$(defaults.matrix_id).val()+'&brand_id='+brand_id
				beforeSend: ()->
					return
				success: (json) ->
					data=json.data
					functions.updateDataMoldal(data.usecars,data.classcars,data.departments,data.brands,data.models)
					callback()
					return
				complete: (xhr) ->
					return
			return
		updateSelectModel:()->
			functions.loadData($(defaults.select_brands).val(),
				()->
					str_li = ''
					for i of array_models
						str_li = str_li + "<option value='" + i + "'>" + array_models[i] + "</option>"
					$(defaults.select_models).html str_li
					$('select').select2()
					return
			)
			return
		updateDataMoldal:(usecars,classcars,departments,brands,models)->
			array_usecars=usecars
			array_classcars=classcars
			array_departments=departments
			array_brands=brands
			array_models=models
			return
		getElement:(sel)->
			return $(document.createElement(sel))
		openSaveMatrix:()->
			data_button=$(this).data()
			$.fancybox
				content: $(defaults.ctn_modal).html($(defaults.template_modal).html())
				autoSize: true
				autoResize: true
				autoWidth: true
				afterShow: (e) ->
					$('body').addClass('open_modal')
					$(defaults.input_company_usecar).val(data_button.company_usecar)
					$(".new_matrix .head_modal h2").text("Agrega una clase");
					$(".new_matrix .head_modal h2").data("status","new")
					functions.fillSelectsModalCategory()
					return
				helpers:
					overlay:
						closeClick: false
						showEarly: true
			return
	events =
		loadMatrix: (e)->
			functions.loadData("",
				()->
					return
			)
			$.ajax
				method: "GET"
				url: '/api/matrix/'+$(defaults.matrix_id).val()
				beforeSend: ()->
					return
				success: (json) ->
					data=json.data
					array_new_usecars=data.usecars
					$list=$(defaults.list_uses)
					i=0
					l=array_new_usecars.length
					while (i<l)
						table=''
						if(array_new_usecars[i].matrices.length >0 )
							table=functions.getElement('tablet').addClass('table_simple').append('<thead><tr><td>categoría</td><td>m. de modelo</td><td>modelos</td><td>m. para precio</td><td>acciones</td></tr></thead><tbody></tbody>')
							j=0
							k=array_new_usecars[i].matrices.length
							tbody=table.find('tbody')
							while(j<k)
								el=array_new_usecars[i].matrices[j];
								text_modalitymodel=''
								switch parseInt(el.modalitymodel)
									when 0
										text_modalitymodel = 'Excluir'
									when 1
										text_modalitymodel = 'Incluir'
									when 2
										text_modalitymodel = 'Todas las marcas'
								text_modalityprice=''
								switch parseInt(el.modalityprice)
									when 0
										text_modalityprice = 'Nacional'
									when 1
										text_modalityprice = 'Por departamentos'
									when 2
										text_modalityprice = 'Lima y provincias'
								z=0
								x=el.models.length
								max_items=11
								content_list_models=functions.getElement('div').addClass('content_list_models')
								while(z<x)
									content_list_models.append(functions.getElement('span').text(el.models[z].name).addClass(if (z>=max_items) then 'hide_model' else ''))
									z++
								if(x > max_items)
									content_list_models.append(functions.getElement('button').addClass('btn btn_add_more').text('+'))
								
								btn_price=""
								if(parseInt(el.modalityprice)==1)
									btn_price=functions.getElement('button').addClass('btn btn_blue_light_2 btn_assign_price').text('Precios').data(el)
									
								tbody.append(functions.getElement('tr').
									append(functions.getElement('td').text(el.classcar.name)).
									append(functions.getElement('td').text(text_modalitymodel)).
									append(functions.getElement('td').append(content_list_models).css("width","500px")).
									append(functions.getElement('td').text(text_modalityprice)).
									append(functions.getElement('td').append(btn_price).append(functions.getElement('button').addClass('btn btn_blue_light_2 btn_edit_category').text('Editar').data(el)).append(functions.getElement('button').addClass('btn btn_blue_light_2 btn_delete_category').text('Eliminar').data(el)))
								)
								j++
						btn_delete=functions.getElement('button').addClass('btn btn_removeCategory').text('Eliminar').data(array_new_usecars[i])
						
						if(array_new_usecars[i].matrices.length!=0)
							btn_delete=''
						$list.append(functions.getElement('div').addClass('item_list_uses').append(
							functions.getElement('div').text(array_new_usecars[i].name).append(
								functions.getElement('div').addClass('group_button_header')
									.append(functions.getElement('button').addClass('btn btn_addCategory').text('Agregar una clase').data(array_new_usecars[i]))
									.append(btn_delete)
								).append(table)
							
							))
						
						i++
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
,["/js/libs/fancybox/source/jquery.fancybox.pack.js"]
