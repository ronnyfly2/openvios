yOSON.AppCore.addModule "changeRadioType", (Sb) ->
	st = {}
	defaults =
		typeRadio: "input[name=client_type]"
	dom = {}
	valType = null
	catchDom = (st)->
		dom.typeRadio = $(st.typeRadio)
		return
	suscribeEvents = ()->
		if $('input[name=client_type]').length > 0
			functions.loadType()
		dom.typeRadio.on 'change', functions.loadType
		return
	functions =
		loadType:()->
			if parseInt($('input[name=client_type]:checked').val()) > 1
				$('fieldset.company').show()
				$('fieldset.company').find('input').attr('data-parsley-required', true)
				$('fieldset.natural_person').hide()
				$('fieldset.natural_person').find('input').attr('data-parsley-required', false)
				$('fieldset.natural_person').find('select').attr('data-parsley-required', false)
			else
				$('fieldset.company').hide()
				$('fieldset.company').find('input').attr('data-parsley-required', false)
				$('fieldset.natural_person').show()
				$('fieldset.natural_person').find('input').attr('data-parsley-required', true)
				$('fieldset.natural_person').find('select').attr('data-parsley-required', true)
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
