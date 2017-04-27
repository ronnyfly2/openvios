yOSON.AppCore.addModule "addApp", (Sb) ->
	defaults =
		btnModal: '.js_app'
		btnModalEdit: '.js_edit'
		tplFormEdit: '.tpl_form_edit'
	st = {}
	dom = {}
	idApp = null
	editForm = null
	jsonParse = null
	catchDom = (st)->
		dom.btnModal = $(st.btnModal)
		dom.tplFormEdit = _.template $(st.tplFormEdit).html()
		dom.btnModalEdit = $(st.btnModalEdit)
		return
	suscribeEvents = ()->
		dom.btnModal.on 'click', events.openModal
		$(document).on 'click', '.js_edit', functions.getAjax
		return
	events =
		getParsleyValidate: (e)->
			console.log(e)
			return
		getParsleySubmit:(e)->
			if $('.add_app_form').parsley().isValid()
				utils.loader $('.ctn_form'), true
			return
		openModal: (editForm, jsonParse)->
			createTemplate = $('.tpl_form_app').html()
			template = _.template(createTemplate)
			source = if $(this).hasClass('js_app') then template else editForm
			$.fancybox
				content: $(".modal_app").html(source)
				afterLoad:()->
					$('select').select2()
					$('select').on 'select2:open', functions.initSelectsOpen
					if source == editForm
						$('.edit_form select[name="typedevice"]').val(jsonParse.typedevice).trigger("change")
						$('.edit_form select[name="rule"]').val(jsonParse.rule).trigger("change")
						$('.edit_form select[name="app_version_id"]').val(jsonParse.app_version_id).trigger("change")
						$('.ctn_form.edit_form').parsley().on 'form:submit', (e)->
							e.submitEvent.preventDefault()
							if $('.edit_form').parsley().isValid()
								utils.loader $('.ctn_form'), true
								functions.getAjaxEdit()
							return
						$('.add_version').on 'click', ()->
							if $('.version_hide').hasClass('show_new')
								$('.add_version').text('Nueva versión')
								$('.version_hide').removeClass('show_new')
								$('[name=version_name]').attr('disabled',true).attr('data-parsley-required', false)
								$('[name=version_description]').attr('disabled',true).attr('data-parsley-required', false)
								$('.hidden_version').show()
							else
								$('.add_version').text('Cancelar')
								$('.version_hide').addClass('show_new')
								$('[name=version_name]').attr('disabled',false).attr('data-parsley-required', true)
								$('[name=version_description]').attr('disabled',false).attr('data-parsley-required', true)
								$('.hidden_version').hide()
							return
					else
						$('.ctn_form.add_app_form').parsley().on 'form:submit', events.getParsleySubmit
					return
				autoSize: true
				autoResize: true
				autoWidth: true
				fitToView: false
				maxWidth: "100%"
				maxHeight:"610px"
				scrolling: 'auto'
			return
	functions =
		getAjaxEdit : (e)->
			$.ajax
				method: "PUT"
				url: "/admin/app/"+idApp
				data:
					name:$('.edit_form input[name=name]').val()
					typedevice: $('.edit_form [name=typedevice]').val()
					rule: $('.edit_form [name=rule]').val()
					app_version_id: $('.edit_form [name=app_version_id]').val()
					version_name: $('.edit_form [name=version_name]').val()
					version_description: $('.edit_form [name=version_description]').val()
				beforeSend: ()->
					utils.loader $('.content_table'), true
					return
				success: (json) ->
					if json.state == 1
						alertify.confirm json.msg,
							()->
								$.fancybox.close(true)
								location.reload()
								return
						$('.dialog .cancel').hide()
					return
				complete: (xhr) ->
					utils.loader $('.content_table'), false
					return
			return
		getAjax : (e) ->
			idApp = $(this).parents('td').siblings('.sorting_1').text()
			$.ajax
				method: "GET"
				url: "/admin/app/"+idApp+"/edit"
				beforeSend: ()->
					utils.loader $('.content_table'), true
					return
				success: (json) ->
					if json.state == 1
						jsonParse = json.data
						editForm = dom.tplFormEdit
							optionsData : jsonParse
						events.openModal(editForm, jsonParse)
					return
				complete: (xhr) ->
					utils.loader $('.content_table'), false
					return
			return
		initSelectsOpen: ()->
			$('.select2-container--open').css('z-index', '9999')
			return
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
,["/js/libs/fancybox/source/jquery.fancybox.js"]
