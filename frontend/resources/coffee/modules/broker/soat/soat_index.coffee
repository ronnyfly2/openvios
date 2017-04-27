yOSON.AppCore.addModule "soat_index", (Sb) ->
	st = {}
	defaults =
		btn_import_soat: ".excel_import"
		ctn_modal: ".ctn_modal"
		template_modal : "#ctnFormModal"
		btn_import_excel: ".btn_import_excel"
		form_import_excel: "#form_import_excel"
		ctn_input_file: ".input_file input"
	dom = {}
	catchDom = (st)->
		return
	suscribeEvents = ()->
		$(defaults.btn_import_soat).on 'click' , functions.initImport
		$(document).on 'click', defaults.btn_import_excel, functions.importExcel
		$(document).on 'change', defaults.ctn_input_file, functions.changeInput
		
		return
	events =
	functions =
		changeInput:()->
			$(this).parent().find("p").text($(this).val())
			return
		importExcel:()->
			$(defaults.form_import_excel).parsley().validate()
			if($(defaults.form_import_excel).parsley().isValid())
				$(defaults.form_import_excel).submit()
			return
		initImport:(e)->
			e.preventDefault()
			$.fancybox
				content: $(defaults.ctn_modal).html($(defaults.template_modal).html())
				autoSize: true
				autoResize: true
				autoWidth: true
				afterShow: (e) ->
					console.log 'abriendo !'
					return
				helpers:
					overlay:
						closeClick: false
						showEarly: true
			return
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return
	return {
		init: initialize
	}
, ["/js/libs/fancybox/source/jquery.fancybox.pack.js"]
