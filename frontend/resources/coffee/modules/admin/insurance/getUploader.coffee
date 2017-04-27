###
Content: Efecto ripple (Material design) a los botones.
@autor Ronny Cabrera
###

yOSON.AppCore.addModule "getUploader", (Sb) ->
	defaults =
		btnRemove: '.remove_img'
		btnRemoveImgBD: '.remove_img_bd'
		imgDefault: 'img/placeholder_img.png'
		urlDomain: window.location.host
	st = {}
	dom = {}
	catchDom = (st)->
		dom.btnRemove = $(st.btnRemove)
		dom.btnRemoveImgBD = $(st.btnRemoveImgBD)
		dom.urlImgDefault = 'http://'+ st.urlDomain + '/' + st.imgDefault
		return
	suscribeEvents = ->
		console.log 'ronnt'
		events.getUpload()
		# $('.filer_input_desc').on 'change', events.changeImage
		dom.btnRemove.on 'click', events.removeImage
		dom.btnRemoveImgBD.on 'click', events.removeImgBD
		# $(document).on 'click', '.list-inline li a.icon-jfi-trash', events.captureImageEdit
		# $('.jFiler.jFiler-theme-default').on 'click', events.initSortable
		return
	events =
		removeImage: ()->
			$(this).siblings('.img_create').attr('src', '')
			$(this).next().find('.jFiler-item-trash-action').trigger('click')
			$(this).siblings('.image-form').show()
			$(this).siblings('.img_default').show()
			$(this).siblings('.img_create').hide()
			$(this).hide()
			if $(this).siblings('.image-form').hasClass('principal_imgs')
				console.log 'La imagen esta'
			else
				console.log 'no tiene la imagen'
			$(this).siblings('.remove_img_bd').show()
			return
		removeImgBD: ()->
			removeBtn = $(this)
			showImg = removeBtn.siblings('.image-form')
			idImgBD = removeBtn.siblings('.image-form').data('id')
			inputImg = removeBtn.siblings('.jFiler.jFiler-theme-default').find('.filer_input_desc')
			# parentLoad = $(this).parents('.ctnGallery')
			# console.log utils.loader parentLoad, true
			$.ajax
				method: "DELETE"
				url: '/admin/school/gallery/'+ idImgBD
				data: "_token":$('meta[name=csrf-token]').attr('content')
				beforeSend: ()->
					console.log 'borrando imagen'
					return
				success: (response)->
					if response.state is 1
						showImg.attr('src',dom.urlImgDefault)
						removeBtn.hide()
						inputImg.attr('name','_gallery[]')
					return
			return
		getUpload:(e)->
			if $(".filer_input_desc").length > 0
				$('.filer_input_desc').filer(
					showThumbs: true
					addMore: false
					extensions: ["jpg", "png", "gif"]
					allowDuplicates: false
					limit: 1
					removeConfirmation: false
					dialogs:
						alert: (text)->
							return alertify.alert(text)
						confirm: (text, callback)->
							callback()
							return
					captions:
						button: "Subir imagen",
						feedback: "Selecciona una imagen para subir",
						feedback2: "imagen seleccionada",
						drop: "Drop file here to Upload",
						removeConfirmation: "Are you sure you want to remove this file?",
						errors:
							filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
							filesType: "Extensión de imagen inválida",
							filesSize: "{{fi-name}} es muy pesada! Por favor, subir imagen de {{fi-fileMaxSize}} MB como máximo",
							filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB.",
							folderUpload: "Imagen inválida"
					afterShow: (elCtnImg)->
						setTimeout ()->
							img = elCtnImg.find('.jFiler-item-thumb-image img').attr('src')
							elCtnImg.parents('.jFiler.jFiler-theme-default').siblings('.remove_img_bd').hide()
							elCtnImg.parents('.jFiler.jFiler-theme-default').siblings('.image-form').hide()
							elCtnImg.parents('.jFiler.jFiler-theme-default').siblings('.img_default').hide()
							elCtnImg.parents('.jFiler.jFiler-theme-default').siblings('.img_create').attr('src', img).show()
							elCtnImg.parents('.jFiler.jFiler-theme-default').siblings('.remove_img').show()
						, 600
					templates:
						box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>'
						item: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-thumb"><div class="jFiler-item-status"></div><div class="jFiler-item-thumb-overlay"><div class="jFiler-item-info"><div style="display:table-cell;vertical-align: middle;"><span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span><span class="jFiler-item-others">{{fi-size2}}</span></div></div></div>{{fi-image}}</div><div class="jFiler-item-assets jFiler-row"><ul class="list-inline pull-left"><li>{{fi-progressBar}}</li></ul><ul class="list-inline pull-right"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></li>'
						itemAppend: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-thumb"><div class="jFiler-item-status"></div><div class="jFiler-item-thumb-overlay"><div class="jFiler-item-info"><div style="display:table-cell;vertical-align: middle;"><span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span><span class="jFiler-item-others">{{fi-size2}}</span></div></div></div>{{fi-image}}</div><div class="jFiler-item-assets jFiler-row"><ul class="list-inline pull-left"><li><span class="jFiler-item-others">{{fi-icon}}</span></li></ul><ul class="list-inline pull-right"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></li>'
						progressBar: '<div class="bar"></div>'
						itemAppendToEnd: true
						canvasImage: true
						removeConfirmation: true
						_selectors:
							list: '.jFiler-items-list'
							item: '.jFiler-item'
							progressBar: '.bar'
							remove: '.jFiler-item-trash-action'
					)
			return
		captureImageEdit: ()->
			imgForm = $(this).parents('ul.list-inline').parents('.jFiler-items').parents('.jFiler')
			console.log $(imgForm).siblings('.image-form').show()
			# lastArray = imgForm.split('/')
			# lastArrayUse = lastArray[lastArray.length - 1]
			# console.log lastArrayUse
			return
		changeImage: ()->
			imgForm = $(this).parents('.jFiler')
			console.log $(imgForm).siblings('.image-form').hide()
			return
	functions = {}
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
,['/js/libs/jquery-filer/js/jquery.filer.js', '/js/libs/alertify/dist/js/alertify.js']
