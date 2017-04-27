yOSON.AppCore.addModule "vueDom", (Sb) ->
  category=null
  idCategory=null
  defaults =
    body: 'html'
    vueParent: '.ctn_new_list'
    # template_comment: '#tmp_comment'
    # form_new_comment: ".form_new_comment"
  instanceVue =
    el: defaults.vueParent
    data:
      notes:[
        {
        note: 'primera nota'
        category_id: 1
        }
        {
        note: 'segunda nota'
        category_id: 2
        }
        {
        note: 'tercera nota'
        category_id: 3
        }
        {
        note: 'cuarta nota'
        category_id: 4
        }
        {
        note: 'quinta nota'
        category_id: ''
        }
        ]
      categories:[
        {
          idCategory:1
          name:'category-1'
        }
        {
          idCategory:2
          name:'category-2'
        }
        {
          idCategory:3
          name:'category-3'
        }
        {
          idCategory:4
          name:'category-4'
        }
        ]
    methods: {}
    filters:
      category: {}
  # tmp_comment =
  #   template: defaults.template_comment
  #   props: ["comment", "index"]
  st = {}
  dom = {}
  catchDom = (st)->
    # dom.form_new_comment = $(st.form_new_comment)
    return
  suscribeEvents = ->
    # functions.initComponents()
    functions.getList()
    return
  events = {}
  functions =
    findIdCategory: (items, idCategory) ->
      for item in items
        if item.idCategory == idCategory
          return item
      return null
    filtersVue: (idCategory) ->
      category = functions.findIdCategory(instanceVue.data.categories, idCategory)
      return if category != null then category.name else 'aqui no hay'
    getList: ()->
      instanceVue.filters.category= functions.filtersVue
      new Vue(instanceVue)
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
