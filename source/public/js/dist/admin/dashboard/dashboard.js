yOSON.AppCore.addModule("dashboard", function(Sb) {
  var catchDom, day, defaults, dom, functions, initialize, months, st, suscribeEvents, week;
  day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SET", "OCT", "NOV", "DIC"];
  week = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];
  st = {};
  defaults = {
    chart_visits: "#chart_visits",
    chart_publications: "#chart_publications",
    selects: ".content_chart select"
  };
  dom = {};
  catchDom = function(st) {
    dom.chart_visits = $(st.chart_visits);
    dom.chart_publications = $(st.chart_publications);
    dom.selects = $(st.selects);
  };
  suscribeEvents = function() {
    functions.init_charts();
    dom.selects.on('change', functions.changeDataChart);
  };
  functions = {
    'init_charts': function() {
      dom.chart_visits.highcharts({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Visitas'
        },
        xAxis: {
          categories: day
        },
        yAxis: {
          title: {
            text: 'Num. Visitas'
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        },
        series: [
          {
            color: '#0482e4',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
            showInLegend: false
          }
        ],
        plotOptions: {
          candlestick: {
            lineColor: '#404048'
          }
        }
      });
      dom.chart_publications.highcharts({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Publicaciones'
        },
        xAxis: {
          categories: week
        },
        yAxis: {
          title: {
            text: 'Num. Publicaciones'
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            },
            enableMouseTracking: false
          }
        },
        series: [
          {
            color: '#fc4c7a',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2],
            showInLegend: false
          }
        ],
        plotOptions: {
          candlestick: {
            lineColor: '#404048'
          }
        }
      });
      $('text:contains("Highcharts.com")').remove();
    },
    'changeDataChart': function() {
      var type_chart, value;
      type_chart = $(this).data("type_chart");
      value = $(this).val();
      if (type_chart === "visits") {
        if (value === "week") {
          console.log("cambiar la data de semana visits");
        } else if (value === "month") {
          console.log("cambiar la data de mes  visits");
        } else if (value === "day") {
          console.log("cambiar la data de dia  visits");
        }
      } else {
        if (value === "week") {
          console.log("cambiar la data de semana publications");
        } else if (value === "month") {
          console.log("cambiar la data de mes publications");
        } else if (value === "day") {
          console.log("cambiar la data de dia publications");
        }
      }
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
}, ["../js/libs/highcharts/highcharts.js"]);
