yOSON.AppCore.addModule "selectTwoInit", (Sb) ->
	st = {}
	defaults =
		selects: "select"
	dom = {}
	catchDom = (st)->
		dom.selects = $(st.selects)
		return
	suscribeEvents = ()->
		functions.initSelects()
		dom.selects.on 'select2:open', events.initSelectsOpen
		return
	functions =
		'initSelects': () ->
			if dom.selects.length > 0
				dom.selects.select2({
					minimumResultsForSearch: 5
				})
			return
	events=
		'initSelectsOpen': (e) ->
			# setTimeout ()->
			# 	$(window).scrollTop $(e.target).offset().top - 107
			# 	, 800
			return
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
,["/js/libs/select2/dist/js/select2.min.js", "/js/libs/select2/dist/js/i18n/es.js"]
