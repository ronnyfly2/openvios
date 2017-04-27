yOSON.AppCore.addModule "actionMessage", (Sb) ->
	st = {}
	defaults =
		typeRadio: "input[name=target_message]"
	dom = {}
	valType = null
	catchDom = (st)->
		dom.typeRadio = $(st.typeRadio)
		return
	suscribeEvents = ()->
		if $('input[name=target_message]').length > 0
			functions.loadType()
		dom.typeRadio.on 'change', functions.loadType
		return
	functions =
		loadType:()->
			console.log(parseInt($('input[name=target_message]:checked').val()), $(this))
			if parseInt($('input[name=target_message]:checked').val()) > 1
				$('select[name=seller]').select2('open')
				$('select[name=seller]').attr('data-parsley-required', true)
			else
				$('select[name=seller]').attr('data-parsley-required', false)
			return
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
, []
