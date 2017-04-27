yOSON.AppCore.addModule "initUbigeo", (Sb) ->
	st = {}
	defaults =
		department: "select[name=department]"
		dataProvince: ".ctn_locked select[name=province]"
		dataDistrict: ".ctn_locked select[name=ubigeo_id]"
	dom = {}
	selectDepartament = $('select[name=department]').val()
	catchDom = (st)->
		dom.department = $(st.department)
		dom.dataProvince = $(st.dataProvince).data('province')
		dom.dataDistrict = $(st.dataDistrict).data('district')
		return
	suscribeEvents = ()->
		if parseInt(dom.dataProvince) > 0
			functions.loadProvinces()
		dom.department.on 'change',functions.loadProvinces
		return
	functions =
		loadProvinces: ()->
			$.ajax
				method: "GET"
				url: '/api/ubigeo/province/'+ dom.department.val()
				beforeSend: ()->
					utils.loader $('.ctn_locked'), true
					return
				success: (json) ->
					if json.state == 1
						schedule = json.data
						tplSel = $('#tplProvince').html()
						tplToCompileSel = _.template(tplSel)
						htmlSelects = tplToCompileSel
							provinces: json.data
						$('.ctn_locked select[name=province]').html htmlSelects
						$('select[name=province]').on 'change', functions.loadDistricts
						if selectDepartament == dom.department.val()
							if parseInt(dom.dataProvince) > 0
								$('.ctn_locked select[name=province]').val(dom.dataProvince)
								functions.loadDistricts()
						else
							$('.ctn_locked select[name=province]').val('')
							$('.ctn_locked select[name=ubigeo_id]').val('').trigger("change")
					return
				complete: (xhr) ->
					utils.loader $('.ctn_locked'), false
					return
			return
		loadDistricts: ()->
			$.ajax
				method: "GET"
				url: '/api/ubigeo/district/'+ $('select[name=province]').val()
				beforeSend: ()->
					utils.loader $('.ctn_locked'), true
					return
				success: (json) ->
					if json.state == 1
						schedule = json.data
						tplSel = $('#tplDistrict').html()
						tplToCompileSel = _.template(tplSel)
						htmlSelects = tplToCompileSel
							districts: json.data
						$('.ctn_locked select[name=ubigeo_id]').html htmlSelects
						if selectDepartament == dom.department.val()
							if parseInt(dom.dataDistrict) > 0
								$('.ctn_locked select[name=ubigeo_id]').val(dom.dataDistrict)
						else
							$('.ctn_locked select[name=ubigeo_id]').val('')
					return
				complete: (xhr) ->
					utils.loader $('.ctn_locked'), false
					return
			return
	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
, ['/js/libs/underscore/underscore.js']
