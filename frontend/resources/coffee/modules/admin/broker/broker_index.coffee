yOSON.AppCore.addModule "broker_index", (Sb) ->
  defaults =
    btnModal: '.js_app'
  st = {}
  dom = {}
  catchDom = (st)->
    return
  suscribeEvents = ()->
    functions.changeState()
    $('select[name=broker_typeperson]').on('change', functions.changeState)
    return
  functions =
    filterTable : (e)->
      return
    changeState : (e)->
      console.log parseInt $('select[name=broker_typeperson]').val()
      if $('select[name=broker_typeperson]').val() == '1'
        $('fieldset.broker_type_box').hide()
      else
        $('fieldset.broker_type_box').show()
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
