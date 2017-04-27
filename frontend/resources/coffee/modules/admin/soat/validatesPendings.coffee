yOSON.AppCore.addModule "validatesPendings", (Sb) ->
	st = {}
	defaults =
		input_start_day: "#start_day"
		input_end_day: "#end_day"
		input_start_day_2: "#start_day_2"
		input_end_day_2: "#end_day_2"
		inputDateDefault: "#dateInput"
		brandSelect: "select[name=brand_id]"
		dataModel: ".ctn_locked select[name=model_id]"
		hourInput: "input[name=hour]"
	dom = {}
	dateFormat = 'yy-mm-dd'
	selectBrand = $('.ctn_locked select[name=brand_id]').val()
	catchDom = (st)->
		dom.brandSelect = $(st.brandSelect)
		dom.hourInput = $(st.hourInput)
		dom.dataModel = $(st.dataModel).data('model')
		return
	suscribeEvents = ()->
		functions.initDateDefault(2)
		functions.initTime(2)
		functions.initTimeTwo(2)
		dom.brandSelect.on 'change', events.getModel
		events.getHour()
		if parseInt(dom.dataModel) > 0
			events.getModel()
		return
	events =
		getHour:()->
			dom.hourInput.timepicker(
				showTime: true,
				timeFormat: 'HH:mm'
			)
			return
		getModel:()->
			$.ajax
				method: "GET"
				url: '/api/brand/'+ dom.brandSelect.val()
				beforeSend: ()->
					utils.loader $('.ctn_locked'), true
					return
				success: (json) ->
					if json.state == 1
						schedule = json.data
						tplSel = $('#tplModel').html()
						tplToCompileSel = _.template(tplSel)
						htmlSelects = tplToCompileSel
							models: json.data
						$('.ctn_locked select[name=model_id]').html htmlSelects
						if selectBrand == dom.brandSelect.val()
							if parseInt(dom.dataModel) > 0
								$('.ctn_locked select[name=model_id]').val(dom.dataModel)
					return
				complete: (xhr) ->
					utils.loader $('.ctn_locked'), false
					return
			return
	functions =
		initDateDefault:()->
			$(defaults.inputDateDefault).datepicker(
				changeMonth: true
				dateFormat: dateFormat
				changeYear: true
			)
			return
		initTime:(opt)->
			$(defaults.input_start_day).datepicker("destroy")
			$(defaults.input_end_day).datepicker("destroy")
			if (opt==1)
				$(defaults.input_start_day).datepicker(
					changeMonth: true
					dateFormat: dateFormat
					changeYear: true
				)
			else if (opt==2)
				from = $(defaults.input_start_day).datepicker(
					changeMonth: true
					dateFormat: dateFormat
					changeYear: true).on('change', ->
					to.datepicker 'option', 'minDate', getDate($(this))
					return
				)
				$(defaults.input_end_day).datepicker("destroy")
				to = $(defaults.input_end_day).datepicker(
					changeMonth: true
					dateFormat: dateFormat
					changeYear: true).on('change', ->
					from.datepicker 'option', 'maxDate', getDate($(this))
					return
				)
				getDate = (element) ->
					date= $.datepicker.parseDate(dateFormat, element.val())
					return date
			return
		initTimeTwo:(opt)->
			$(defaults.input_start_day_2).datepicker("destroy")
			$(defaults.input_end_day_2).datepicker("destroy")
			if (opt==1)
				$(defaults.input_start_day_2).datepicker(
					changeMonth: true
					dateFormat: dateFormat
					changeYear: true
				)
			else if (opt==2)
				from = $(defaults.input_start_day_2).datepicker(
					changeMonth: true
					dateFormat: dateFormat
					changeYear: true).on('change', ->
					to.datepicker 'option', 'minDate', getDate($(this))
					return
				)
				$(defaults.input_end_day_2).datepicker("destroy")
				to = $(defaults.input_end_day_2).datepicker(
					changeMonth: true
					dateFormat: dateFormat
					changeYear: true).on('change', ->
					from.datepicker 'option', 'maxDate', getDate($(this))
					return
				)
				getDate = (element) ->
					date= $.datepicker.parseDate(dateFormat, element.val())
					return date
			return
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
, ["/js/libs/jquery-ui/jquery-ui.min.js",
    "/js/libs/jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon.min.js",
    "/js/libs/jquery-ui/ui/i18n/datepicker-es.js",
    "/js/libs/jqueryui-timepicker-addon/dist/i18n/jquery-ui-timepicker-es.js"]
