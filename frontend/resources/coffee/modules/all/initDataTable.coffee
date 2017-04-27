###
Content: Efecto ripple (Material design) a los botones.
@autor Ronny Cabrera
###
yOSON.AppCore.addModule "initDataTable", (Sb) ->
	defaults =
		table: '.js-datatable'
		search: ".search"
		btnSelect: ".select"
	st = {}
	dom = {}
	language=
		"sProcessing":     "<div class='loader'><span></span></div>",
		"sLengthMenu":     "Mostrar _MENU_ registros",
		"sZeroRecords":    "No se encontraron resultados",
		"sEmptyTable":     "Ningún dato disponible en esta tabla",
		"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
		"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix":    "",
		"sSearch":         "Buscar:",
		"sUrl":            "",
		"sInfoThousands":  ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate":
			"sFirst":    "Primero",
			"sLast":     "Ultimo",
			"sNext":     "Siguiente",
			"sPrevious": "Anterior"
		"oAria": {
			"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		}
	window.table = {}
	catchDom = (st)->
		dom.table= $(st.table)
		dom.search=$(st.search)
		dom.btnSelect=$(st.btnSelect)
		return
	suscribeEvents = ()->
		if dom.table.length > 0
			functions.makeTables()
		dom.btnSelect.on 'click', functions.openChangeStyle
		return
	functions =
		openChangeStyle:()->
			# if $('.select2-dropdown').hasClass('select2_open')
			# 	console.log('')
			# else
			$('.select2-dropdown').addClass('select2_open')
			return
		makeTables: ()->
			i=0
			j=dom.table.length
			while (i<j)
				table= $(dom.table[i])
				input_search= $(dom.search[i])
				columns= table.attr "data-cols"
				url =  table.attr "data-url"
				id = table.attr "id"
				array= columns.split ","
				obj= []
				for key of array
					obj.push
						data: array[key]
						name: array[key]
			
				if table.hasClass "no-sort"
					window.table[id] = table.DataTable
						rowCallback:(row, data, index )->
							$(row).attr("data-id",data.id)
							return
						oLanguage: language
						processing: true
						serverSide: true
						searching: true
						bLengthChange: false
						autoWidth:false
						scrollX: false
						ajax:
							"url": url
						columns: obj
						columnDefs: [
							{
								'targets': 'no_sort'
								'orderable': false
							}
							{
								'targets': 'no_search'
								'searchable':false
							}
						]
				else
					window.table[id] = table.DataTable
						rowCallback:(row, data, index )->
							$(row).attr("data-id",data.id)
							return
						oLanguage:language
						processing: true
						serverSide: true
						ordering: false
						searching: true
						bLengthChange: false
						autoWidth:false
						scrollX: false
						ajax:
							"url": url
						columns: obj

				input_search.on 'keyup', ()->
					if $(this).data("table")?
						window.table[$(this).data("table")].search($(this).val()).draw()
					else
						window.table[id].search($(this).val()).draw()
					return
				
				
			
				$('.js-filter').on 'change', ()->
					arr_filters=$('.js-filter');
					if arr_filters.length > 0
						u=0
						x=arr_filters.length
						str_params="?"
						while(u<x)
							filtro = $(arr_filters[u]).attr('name')
							str_params=str_params+filtro+"="+$(arr_filters[u]).val().toString()+if(u<(x-1))then "&" else ""
							u++
						console.log str_params
						window.table[id].ajax.url( url+str_params ).load()
					return
				i++
				$('.btn_filter').on 'click', ()->
					startDateVal = $('input[name=start_date]')
					finishDateVal = $('input[name=end_date]')
					valueInputsFilters = $('.ctn_form_filters form input')
					filterUrl = 0
					[].forEach.call valueInputsFilters, (itm, idx, obj)->
						ele = $(itm)
						if ele.val() != ''
							ele.removeClass('parsley-error')
							filterUrl = url+"?date_init="+$('input[name=start_date]').val().toString()+"&date_finish="+$('input[name=end_date]').val()
						else
							ele.addClass('parsley-error')
							filterUrl = 0
					if filterUrl != 0
						window.table[id].ajax.url( filterUrl ).load()
					else
						console.log filterUrl, 'uhmm'
			return

	initialize = (opts) ->
		st = $.extend({}, defaults, opts)
		catchDom(st)
		suscribeEvents()
		return

	return {
		init: initialize
	}
,['/js/libs/datatables/js/jquery.dataTables.min.js']
