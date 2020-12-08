
const main = ( async () => {

// const fetchedData = await (await fetch("../data/data.json")).json()

const seriesData = [
  {name: 'Human requests', data: [] },
{name: 'Good Bot requests', data: [] },
{name: 'Bad Bot requests', data: [] },
{name: 'Whitelist requests', data: [] },
]


Highcharts.getJSON(
  "../data/data.json",
    function (data) {

      const generateTimestamp = (date) => {
        const splitDate = date.split("-")
        const stamp = new Date(splitDate[0], splitDate[1], splitDate[2])
        return stamp.getTime();
      }
      const dataSource = data.categorized_domain_requests
       dataSource && dataSource.length > 0 && dataSource.map(item => {
        seriesData[0].data.push([generateTimestamp(item.summary_date), item.human_total])
        seriesData[1].data.push([generateTimestamp(item.summary_date), item.good_bot_total])
        seriesData[2].data.push([generateTimestamp(item.summary_date), item.bad_bot_total])
        seriesData[3].data.push([generateTimestamp(item.summary_date), item.whitelist_total])
      })

      Highcharts.chart('container', {
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
  
        series: seriesData

        
      });
    }
  );
})()