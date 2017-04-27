yOSON.AppCore.addModule "versionApp", (Sb) ->
	defaults =
		btnModal: '.js_app'
		btnModalEdit: '.js_edit'
		tplFormEdit: '.tpl_form_version_Edit'
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
			if $('.add_version_form').parsley().isValid()
				utils.loader $('.ctn_form'), true
			return
		openModal: (editForm, jsonParse)->
			createTemplate = $('.tpl_form_version').html()
			template = _.template(createTemplate)
			source = if $(this).hasClass('js_app') then template else editForm
			$.fancybox
				content: $(".modal_app").html(source)
				afterLoad:()->
					if source == editForm
						$('.edit_form input[name="name"]').val(jsonParse.name)
						$('.edit_form textarea[name="description"]').val(jsonParse.description)
						$('.ctn_form.edit_form').parsley().on 'form:submit', (e)->
							e.submitEvent.preventDefault()
							if $('.edit_form').parsley().isValid()
								utils.loader $('.ctn_form'), true
								functions.getAjaxEdit()
							return
					else
						$('.ctn_form.add_version_form').parsley().on 'form:submit', events.getParsleySubmit
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
				url: "/admin/version/"+idApp
				data:
					name:$('.edit_form input[name=name]').val()
					description: $('.edit_form [name=description]').val()
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
				url: "/admin/version/"+idApp+"/edit"
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
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
,["/js/libs/fancybox/source/jquery.fancybox.js"]
