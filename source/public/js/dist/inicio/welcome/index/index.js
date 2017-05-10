yOSON.AppCore.addModule("index", function(Sb) {
  var catchDom, defaults, dom, events, functions, initialize, instance_vue, st, suscribeEvents, tmp_bar, tmp_comment;
  defaults = {
    body: 'html',
    id_vue: '#content_comments',
    template_comment: '#tmp_comment',
    template_bar: '#tmp_bar',
    form_new_comment: ".form_new_comment"
  };
  instance_vue = {
    el: defaults.id_vue,
    data: {
      show_hello: true
    },
    methods: {}
  };
  tmp_comment = {
    template: defaults.template_comment,
    props: ["comment", "index"]
  };
  tmp_bar = {
    template: defaults.template_bar,
    props: [],
    methods: {
      notify: function() {
        instance_vue.data.comments = [];
      }
    }
  };
  st = {};
  dom = {};
  catchDom = function(st) {
    dom.form_new_comment = $(st.form_new_comment);
  };
  suscribeEvents = function() {
    functions.initComponents();
    functions.getComments();
  };
  events = {};
  functions = {
    submitNewComment: function() {
      var obj;
      obj = {
        autor: dom.form_new_comment.find("input[name=name]").val(),
        comment: dom.form_new_comment.find("textarea[name=message]").val()
      };
      instance_vue.data.comments.push(obj);
    },
    initComponents: function() {
      Vue.component('comment', tmp_comment);
      Vue.component('bar', tmp_bar);
    },
    getComments: function() {
      $.ajax({
        method: "GET",
        url: '/wservice-client/ubigeo',
        dataType: "JSON",
        success: function(response) {
          var result;
          if (response.status === 1) {
            result = response.data;
            instance_vue.data.comments = result;
            instance_vue.methods.submitNewComment = functions.submitNewComment;
            new Vue(instance_vue);
          }
        }
      });
    }
  };
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    catchDom(st);
    suscribeEvents();
  };
  return {
    init: initialize
  };
}, []);

yOSON.AppCore.addModule("vueDom", function(Sb) {
  var catchDom, category, defaults, dom, events, functions, idCategory, initialize, instanceVue, st, suscribeEvents;
  category = null;
  idCategory = null;
  defaults = {
    body: 'html',
    vueParent: '.ctn_new_list'
  };
  instanceVue = {
    el: defaults.vueParent,
    data: {
      notes: [
        {
          note: 'primera nota',
          category_id: 1
        }, {
          note: 'segunda nota',
          category_id: 2
        }, {
          note: 'tercera nota',
          category_id: 3
        }, {
          note: 'cuarta nota',
          category_id: 4
        }, {
          note: 'quinta nota',
          category_id: ''
        }
      ],
      categories: [
        {
          idCategory: 1,
          name: 'category-1'
        }, {
          idCategory: 2,
          name: 'category-2'
        }, {
          idCategory: 3,
          name: 'category-3'
        }, {
          idCategory: 4,
          name: 'category-4'
        }
      ]
    },
    methods: {},
    filters: {
      category: {}
    }
  };
  st = {};
  dom = {};
  catchDom = function(st) {};
  suscribeEvents = function() {
    functions.getList();
  };
  events = {};
  functions = {
    findIdCategory: function(items, idCategory) {
      var i, item, len;
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        if (item.idCategory === idCategory) {
          return item;
        }
      }
      return null;
    },
    filtersVue: function(idCategory) {
      category = functions.findIdCategory(instanceVue.data.categories, idCategory);
      if (category !== null) {
        return category.name;
      } else {
        return 'aqui no hay';
      }
    },
    getList: function() {
      instanceVue.filters.category = functions.filtersVue;
      new Vue(instanceVue);
    }
  };
  initialize = function(opts) {
    st = $.extend({}, defaults, opts);
    catchDom(st);
    suscribeEvents();
  };
  return {
    init: initialize
  };
}, []);
