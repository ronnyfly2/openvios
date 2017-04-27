###
Content: Sliders.
@autor Ronny Cabrera
###
yOSON.AppCore.addModule "sliderCarousel", (Sb) ->
	defaults =
		formLogin : '.form_login'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.formLogin = $(st.formLogin)
		return
	suscribeEvents = ->
		events.getSliderIndex()
		return
	events =
		getSliderIndex:(e)->
			$('.slider_top').bxSlider(
				'controls': false
				'infiniteLoop': true
				'mode': 'horizontal'
				'auto': true
				'adaptiveHeight': true
				'pager': true
			)
			if $('.owl-carousel.carousel_box').length > 0 
				$('.owl-carousel.carousel_box').owlCarousel
					items:1
					center: true
					nav: true
					dots:false
					margin: 15
					autoplay:true
					autoplayTimeout:4000
					loop: true
					navText: ['','']
					navClass:['icon icon-arrow_light_left', 'icon icon-arrow_light_right']
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
,["/public/js/libs/bxslider-4/dist/jquery.bxslider.js", "/public/js/libs/owl.carousel/dist/owl.carousel.min.js"]
