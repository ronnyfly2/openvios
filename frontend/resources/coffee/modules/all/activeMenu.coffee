###
Content: activa el link del menu de la pagina.
@autor Ronny Cabrera
###
yOSON.AppCore.addModule "activeMenu", (Sb) ->
	defaults =
		webView : '.container'
		navLink : 'aside nav li a'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.webView = $(st.webView)
		dom.navLink = $(st.navLink)
		return
	suscribeEvents = ->
		events.getLink()
		return
	events =
		getLink:()->
			page = dom.webView.data('page')
			log page
			linkActive = dom.navLink.data('link')
			$('nav li a[data-link="' + page + '"]').addClass 'actived'
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
