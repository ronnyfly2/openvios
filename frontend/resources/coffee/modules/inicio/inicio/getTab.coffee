###
Content: obtiene el Tab.
@autor Ronny Cabrera
###
yOSON.AppCore.addModule "getTab", (Sb) ->
	defaults =
		tabItem : '.list_numbers li'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.tabItem = $(st.tabItem)
		return
	suscribeEvents = ->
		dom.tabItem.on 'click', events.getTabActive
		return
	events =
		getTabActive:()->
			dom.tabItem.removeClass('actived')
			$(this).addClass('actived')
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
,[]
