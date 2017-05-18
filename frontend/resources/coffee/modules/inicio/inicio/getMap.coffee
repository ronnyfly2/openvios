###
Content: tabs de maps.
@autor Ronny Cabrera
###
yOSON.AppCore.addModule "getMap", (Sb) ->
	defaults =
		btnTab : '.row_contact .list li'
		zoomMap			: 17
		colorMapSilver	: '#C0C0C0'
		saturationMap	: -98
		lightnessMap	: 2
	st = {}
	dom = {}
	latGeo = -12.104190
	longGeo = -76.939422
	urlImgPin = '../public/img/pin.png'
	catchDom = (st)->
		dom.btnTab			= $(st.btnTab)
		return
	suscribeEvents = ->
		dom.btnTab.on "click", events.getMap
		if $('.row_contact').length > 0
			events.getMapBox()
		return
	events =
		getMap:(e)->
			ele = $(this)
			dom.btnTab.removeClass('actived')
			ele.addClass('actived')
			if  ele != undefined
				latGeo = ele.data('lat')
				longGeo = ele.data('long')
				urlImgPin = ele.data('ping')
				events.getMapBox()
			else
				console.log 'nda'
			return
		getMapBox:(map)->
			map = new google.maps.Map $("#map")[0],{
				zoom: st.zoomMap
				center: {
					lat: latGeo
					lng: longGeo
				}
				styles: [{
					stylers: [{
						hue: st.colorSilver
					}
					{
						saturation: st.saturationMap
					}
					{
						lightness: st.lightnessMap
					}	
					]
				}]

			}
			events.getMarker(map)
			return

		getMarker:(map)->
			locationMarker = new google.maps.Marker {
				zoom: st.zoomMap
				position: {
					lat: latGeo
					lng: longGeo
				}
				map : map
				icon: urlImgPin
			}
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
,["https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAi47sP6N9N9vcIQN-CvXvBZKo9ndlvzAU"]
