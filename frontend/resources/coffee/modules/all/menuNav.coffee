yOSON.AppCore.addModule "menuNav", (Sb) ->
	defaults =
		openListMenu : 'li.menu_dropdown > a'
		lnkActives : '.dropdown_list li.item_active'
	st = {}
	dom = {}
	catchDom = (st)->
		dom.openListMenu = $(st.openListMenu)
		dom.lnkActives= $(st.lnkActives)
		return
	suscribeEvents = ->
		dom.openListMenu.on 'click', events.openList
		return
	events=
		openList : (e, animate)->
			arrow = $(this).children('div.icon')
			isAnimate= (typeof animate != 'undefined') ? animate : true
			if $(arrow).hasClass('icon-arrow_right')
				$(arrow).removeClass('icon-arrow_right')
				$(arrow).addClass('icon-arrow_down')
				if isAnimate
					$(this).siblings('ul.dropdown_list').show('slow')
				else
					$(this).siblings('ul.dropdown_list').show()
				$(this).addClass('open_a')
			else
				$(arrow).removeClass('icon-arrow_down')
				$(arrow).addClass('icon-arrow_right')
				if isAnimate
					$(this).siblings('ul.dropdown_list').hide('slow')
				else
					$(this).siblings('ul.dropdown_list').hide()
				$(this).removeClass('open_a')
			return
	functions=
		activeMenus: ->
			if $('.open_a').length > 0
				$('.dropdown_list li.item_active').each ->
					$this= $(this)
					parentset= $this.parents('.dropdown_list')
					parentset.show('slow')
					sibls = parentset.siblings('.open_a').find('div.icon')
					sibls.addClass('icon-arrow_down')
					sibls.removeClass('icon-arrow_right')
			return
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		functions.activeMenus()
		suscribeEvents()
		return

	return {
		init: initialize
	}
,[]
