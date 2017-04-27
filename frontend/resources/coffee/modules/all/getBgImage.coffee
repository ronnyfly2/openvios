###
Content: obtiene la imagen del banner.
@autor Ronny Cabrera
###
yOSON.AppCore.addModule "getBgImage", (Sb) ->
	defaults =
		imgCtn : '.row_banner_top .ctn_img'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.imgCtn = $(st.imgCtn)
		return
	suscribeEvents = ->
		events.getImage()
		return
	events =
		getImage:()->
			log	'ksjdskjdk'
			img = dom.imgCtn.data('bg')
			dom.imgCtn.css(
				"background-image": "url("+img+")"
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
,[]
