yOSON.AppCore.addModule "initAlert", (Sb) ->
	defaults =
		bntUnlock: '.icon.icon-adm_lock, a.icon-adm_pen'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.bntUnlock = $(st.bntUnlock)
		return
	suscribeEvents = ()->
		functions.initAlert()
		$(document).on 'click','form.btn_state input', events.changeState
		$(document).on 'click','form.btn_remove input', events.deleteItem
		return
	functions =
		initAlert: ()->
			txtAlert= $('ul.alert li').text()
			if txtAlert != ''
				alertify.alert txtAlert
			return
	events =
		changeState: (ev)->
			ev.preventDefault()
			$this = $(this)
			parentForm = $this.parents('form')
			alertify.okBtn("Aceptar").cancelBtn("Denegar").confirm "¿Seguro que desea cambiar de estado?", ()->
				parentForm.submit()
				(ev)->
					ev.preventDefault()
					alertify.error("cancelado")
					return
		deleteItem: (ev)->
			ev.preventDefault()
			$this = $(this)
			parentForm = $this.parents('form')
			alertify.okBtn("Aceptar").cancelBtn("Denegar").confirm "¿Seguro que desea eliminar el registro seleccionado?", ()->
				parentForm.submit()
				(ev)->
					ev.preventDefault()
					alertify.error("cancelado")
					return
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
,["/js/libs/alertify/dist/js/alertify.js"]
