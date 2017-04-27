yOSON.AppCore.addModule "dashboard", (Sb) ->
  day=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
  months=["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SET","OCT","NOV","DIC"]
  week = ["LU","MA","MI","JU","VI","SA","DO"]
  st = {}
  defaults =
    chart_visits: "#chart_visits"
    chart_publications: "#chart_publications"
    selects: ".content_chart select"
  dom = {}
  catchDom = (st)->
    dom.chart_visits = $(st.chart_visits)
    dom.chart_publications = $(st.chart_publications)
    dom.selects = $(st.selects)
    return
  suscribeEvents = ()->
    functions.init_charts()
    dom.selects.on 'change', functions.changeDataChart
    return
  functions =
    'init_charts': () ->
      dom.chart_visits.highcharts
        chart:
          type: 'line'
        title:
          text: 'Visitas'
        xAxis:
          categories: day
        yAxis:
          title:
            text: 'Num. Visitas'
        plotOptions:
          line:
            dataLabels:
              enabled: true
            enableMouseTracking: false
        series: [
          color: '#0482e4'
          data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]
          showInLegend: false
        ]
        plotOptions: {
          candlestick: {
            lineColor: '#404048'
          }
        }

      dom.chart_publications.highcharts
        chart:
          type: 'line'
        title:
          text: 'Publicaciones'
        xAxis:
          categories: week
        yAxis:
          title:
            text: 'Num. Publicaciones'
        plotOptions:
          line:
            dataLabels:
              enabled: true
            enableMouseTracking: false
        series: [
          color: '#fc4c7a'
          data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2]
          showInLegend: false
        ]
        plotOptions: {
          candlestick: {
            lineColor: '#404048'
          }
        }
      $('text:contains("Highcharts.com")').remove()
      return
    'changeDataChart': () ->
      type_chart = $(this).data("type_chart")
      value = $(this).val()
      if type_chart is "visits"
        if value is "week"
          console.log "cambiar la data de semana visits"
        else if value is "month"
          console.log "cambiar la data de mes  visits"
        else if value is "day"
          console.log "cambiar la data de dia  visits"
      else
        if value is "week"
          console.log "cambiar la data de semana publications"
        else if value is "month"
          console.log "cambiar la data de mes publications"
        else if value is "day"
          console.log "cambiar la data de dia publications"
      return
  initialize = (opts) ->
    st = $.extend({}, defaults, opts)
    catchDom(st)
    suscribeEvents()
    return

  return {
    init: initialize
  }
, ["../js/libs/highcharts/highcharts.js"]
