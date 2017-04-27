###
Content: tabs de cumpleaños.
@autor Ronny Cabrera
###
yOSON.AppCore.addModule "birtDays", (Sb) ->
	defaults =
		formLogin : '.form_login'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.formLogin = $(st.formLogin)
		return
	suscribeEvents = ->
		events.getScrollBar()
		return
	events =
		getScrollBar:(e)->
			console.log(moment())
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
,["/public/js/libs/moment/moment.js"]
