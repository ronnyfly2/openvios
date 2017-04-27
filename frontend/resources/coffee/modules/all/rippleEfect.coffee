###
Content: Efecto ripple (Material design) a los botones.
@autor Ronny Cabrera
###

yOSON.AppCore.addModule "rippleEfect", (Sb) ->
	defaults =
		btnRipple : '.ripple'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.btnRipple = $(st.btnRipple)
		return
	suscribeEvents = ->
		dom.btnRipple.on 'click', events.getEfectRipple
		return
	events =
		getEfectRipple:(event)->
			$div = $('<div/>')
			btnOffset = $(this).offset()
			xPos = event.pageX - btnOffset.left
			yPos = event.pageY - btnOffset.top
			$div.addClass('ripple_effect')
			$ripple = $(".ripple_effect")
			$ripple.css "height", $(this).height()
			$ripple.css "width", $(this).height()
			$div.css(
				top: yPos - ($ripple.height()/2)
				left: xPos - ($ripple.width()/2)
				background: $(this).data("ripple-color")
				).appendTo($(this))
			window.setTimeout ()->
				$div.remove()
			, 1000
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
