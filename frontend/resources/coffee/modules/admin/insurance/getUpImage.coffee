###
Content: Efecto ripple (Material design) a los botones.
@autor Ronny Cabrera
###
yOSON.AppCore.addModule "getUpImage", (Sb) ->
	defaults =
		btnRemove: '.remove_img'
		btnRemoveImgBD: '.remove_img_bd'
		imgDefault: 'img/placeholder_img.png'
		urlDomain: window.location.host
		btnImg : '.file_upload'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.btnRemove = $(st.btnRemove)
		dom.btnRemoveImgBD = $(st.btnRemoveImgBD)
		dom.urlImgDefault = 'http://'+ st.urlDomain + '/' + st.imgDefault
		dom.btnImg = $(st.btnImg)
		return
	suscribeEvents = ->
		events.editImage()
		# $('.filer_input_desc').on 'change', events.changeImage
		dom.btnRemove.on 'click', events.removeImage
		dom.btnRemoveImgBD.on 'click', events.removeImgBD
		dom.btnImg.on 'change', events.changeImage
		# $(document).on 'click', '.list-inline li a.icon-jfi-trash', events.captureImageEdit
		# $('.jFiler.jFiler-theme-default').on 'click', events.initSortable
		return
	events =
		readURL : (input)->
			extenxtion  = $('.file_upload').val().split('.').pop().toLowerCase()
			if input.files && input.files[0] and $.inArray(extenxtion,['gif','png','jpg','jpeg']) >-1
				reader = new FileReader
				reader.onload = (e)->
					$('.preview_image').attr('src', e.target.result)
					$('.preview_image').addClass('image_upload')
					$('.img_server').val(e.target.result)
					$('.upload').removeClass('validate')
					$('.btn_upload').text('Volver a cargar nueva Imagen')
					$('.remove_img').show()
					$('.advise').removeClass('error_file')
					return
				reader.readAsDataURL input.files[0]
				return
			else
				$('.remove_img').hide()
				alertify.alert('Error, no es una imagen')
			return
		removeImage: (e)->
			$('.preview_image').attr('src', dom.urlImgDefault)
			$('.file_upload').val('')
			$('.img_server').val('')
			$('.btn_upload').text('Cargar imagen')
			$('.remove_img').hide()
			events.editImage()
			return
		changeImage: (e)->
			events.readURL(this)
			return
		editImage: ()->
			imageDB = $('.img_server').attr('data-image')
			if imageDB != ''
				$('.preview_image').attr('src', imageDB)
				# $('.img_server').val(imageDB)
			else
				$('.preview_image').attr('src', dom.urlImgDefault)
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
,['/js/libs/alertify/dist/js/alertify.js']
