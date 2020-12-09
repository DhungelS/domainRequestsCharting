
const Main = (() => {

  // const fetchedData = await (await fetch("../data/data.json")).json()

  Highcharts.getJSON(
    "../data/data.json",
    function (data) {

      const requestInput = document.getElementById('requestNumbers')
      const submitBtn = document.getElementById("submit")
      const dateInput = document.getElementById("date")

      let val = 0;
      let date = new Date().getTime();
    
      const store = Store.seriesData
      
      requestInput.addEventListener("keyup", (e) => {
        val = parseInt(e.target.value)
      })

      dateInput.addEventListener("change", (e) => {
        const newDate = new Date(e.target.value).getTime()
        date = newDate
      })


      submitBtn.addEventListener('click', (e) => {
        if (document.getElementById('human').checked) {
         store[0].data.push([date, val])
          chart.series[0].setData(store[0].data, true)
        } else if (document.getElementById('good_bot').checked) {
         store[1].data.push([date, val])
          chart.series[1].setData(store[1].data, true)
        } else if (document.getElementById('bad_bot').checked) {
         store[2].data.push([date, val])
          chart.series[2].setData(store[2].data, true)
        } else if (document.getElementById('whitelist').checked) {
         store[3].data.push([date, val])
          chart.series[3].setData(store[3].data, true)
        }
        e.preventDefault()
      })

      const generateTimestamp = (date) => {
        const splitDate = date.split("-")
        const stamp = new Date(splitDate[0], splitDate[1], splitDate[2])
        return stamp.getTime();
      }
      const dataSource = data.categorized_domain_requests
      dataSource && dataSource.length > 0 && dataSource.map(item => {
       store[0].data.push([generateTimestamp(item.summary_date), item.human_total])
       store[1].data.push([generateTimestamp(item.summary_date), item.good_bot_total])
       store[2].data.push([generateTimestamp(item.summary_date), item.bad_bot_total])
       store[3].data.push([generateTimestamp(item.summary_date), item.whitelist_total])
      })

      const chart = Highcharts.chart('container', {
        chart: {
          zoomType: 'x'
        },
        title: {
          text: 'Categorized Domain Requests'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: 'Requests'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },

        series: store


      });
    }
  );
})()