###
Content: ScrollBar.
@autor Ronny Cabrera
###
yOSON.AppCore.addModule "scrollBar", (Sb) ->
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
			$('.scrollBar').slimScroll(
				height: '100%'
				width: '100%'
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
,["/public/js/libs/jquery-slimscroll/jquery.slimscroll.js"]
