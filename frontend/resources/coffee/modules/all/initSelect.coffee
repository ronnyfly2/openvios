###
Content: Inicia el Select2
@autor Ronny Cabrera
###

yOSON.AppCore.addModule "initSelect", (Sb) ->
	defaults =
		btnRipple : '.ripple'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.btnRipple = $(st.btnRipple)
		return
	suscribeEvents = ->
		events.getSelect()
		return
	events =
		getSelect:(event)->
			log 'wsadkaskdjsalkd'
			$('.select_lightblue').select2(
				language: "es"
				minimumResultsForSearch: 10
			)
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
,["/public/js/libs/select2/dist/js/select2.min.js", "/public/js/libs/select2/dist/js/i18n/es.js"]
