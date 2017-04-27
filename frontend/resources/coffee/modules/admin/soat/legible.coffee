yOSON.AppCore.addModule "legible", (Sb) ->
	defaults =
		checkLock: 'input[name=unreadable]'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.checkLock = $(st.checkLock)
		return
	suscribeEvents = ()->
		events.locked()
		dom.checkLock.on 'change', events.locked
		return
	functions =
		locddked: ()->
			return
	events =
		locked: (e)->
			required = $('[data-parsley-required]')
			if(this.checked || dom.checkLock.is(':checked'))
				required.attr 'data-parsley-required', false
				utils.block $('.ctn_locked'), true
				$('form.ctn-form').parsley().reset()
			else
				utils.block $('.ctn_locked'), false
				required.attr 'data-parsley-required', true
			return
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
,[]
