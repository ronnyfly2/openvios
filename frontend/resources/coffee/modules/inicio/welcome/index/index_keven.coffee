yOSON.AppCore.addModule "index", (Sb) ->
  defaults =
    body: 'html'
    id_vue: '#content_comments'
    template_comment: '#tmp_comment'
    template_bar: '#tmp_bar'
    form_new_comment: ".form_new_comment"
  instance_vue =
    el: defaults.id_vue
    data: {show_hello: true}
    methods: {}
  tmp_comment =
    template: defaults.template_comment
    props: ["comment", "index"]
  tmp_bar =
    template: defaults.template_bar
    props: []
    methods:
      notify: ()->
        instance_vue.data.comments = []
        return
  st = {}
  dom = {}
  catchDom = (st)->
    dom.form_new_comment = $(st.form_new_comment)
    return
  suscribeEvents = ->
    functions.initComponents()
    functions.getComments()
    return
  events = {}
  functions =
    submitNewComment: () ->
      obj =
        autor: dom.form_new_comment.find("input[name=name]").val()
        comment: dom.form_new_comment.find("textarea[name=message]").val()
      instance_vue.data.comments.push obj
      return
    initComponents: () ->
      Vue.component 'comment', tmp_comment
      Vue.component 'bar', tmp_bar
      return
    getComments: ()->
      $.ajax
        method: "GET"
        url: '/wservice-client/ubigeo'
        dataType: "JSON"
        success: (response)->
          if response.status is 1
            result = response.data
            instance_vue.data.comments = result
            instance_vue.methods.submitNewComment = functions.submitNewComment
            new Vue(instance_vue)
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
, []
