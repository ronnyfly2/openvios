yOSON.AppCore.addModule "initDatePicker", (Sb) ->
	st = {}
	defaults =
		inputDateDefault: ".datepicker"
	dom = {}
	dateFormat = 'yy-mm-dd'
	catchDom = (st)->
		dom.inputDateDefault = $(st.inputDateDefault)
		return
	suscribeEvents = ()->
		functions.initDateDefault()
		return
	functions =
		initDateDefault:()->
			dom.inputDateDefault.datepicker
				changeMonth: true,
				changeYear: true,
				dateFormat: "yy-mm-dd",
				yearRange: "1950:2006"
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
    "/js/libs/jquery-ui/ui/i18n/datepicker-es.js"]
