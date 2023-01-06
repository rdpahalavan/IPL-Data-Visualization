var url = new URL(window.location.href);
var player_name = url.searchParams.get("player");
const year_date = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];


// CHART 1

var chartDom1 = document.getElementById('chart1');
var myChart1 = echarts.init(chartDom1);
var option1;
myChart1.showLoading();

// CHART 2

var chartDom2 = document.getElementById('chart2');
var myChart2 = echarts.init(chartDom2);
var option2;
myChart2.showLoading();

// CHART 3

var chartDom3 = document.getElementById('chart3');
var myChart3 = echarts.init(chartDom3);
var option3;
myChart3.showLoading();

// CHART 4

var chartDom4 = document.getElementById('chart4');
var myChart4 = echarts.init(chartDom4);
var option4;
myChart4.showLoading();

// CHART 5

var chartDom5 = document.getElementById('chart5');
var myChart5 = echarts.init(chartDom5);
var option5;
myChart5.showLoading();

// CHART 6

var chartDom6 = document.getElementById('chart6');
var myChart6 = echarts.init(chartDom6);
var option6;
myChart6.showLoading();

// CHART 7

var chartDom7 = document.getElementById('chart7');
var myChart7 = echarts.init(chartDom7);
var option7;
myChart7.showLoading();

// CHART 8

var chartDom8 = document.getElementById('chart8');
var myChart8 = echarts.init(chartDom8);
var option8;
myChart8.showLoading();

// CHART 9

var chartDom9 = document.getElementById('chart9');
var myChart9 = echarts.init(chartDom9);
var option9;
myChart9.showLoading();

// LOADING DATASET

$.get('dataset/most_wickets.json',
  function (most_wickets) {
    myChart1.hideLoading();
    myChart2.hideLoading();
    myChart3.hideLoading();
    myChart4.hideLoading();
    myChart5.hideLoading();
    myChart6.hideLoading();
    myChart7.hideLoading();
    myChart8.hideLoading();
    myChart9.hideLoading();

    // DATA INITIALIZATION

    array1=[];
    array2=[];
    array3=[];
    array4=[];
    array5=[];
    array6=[];
    array7=[];
    array8=[];
    array9=[];
    array10=[];

    year_date.forEach(function (item, index) {
      array1.push(most_wickets[player_name]["Wickets "+item.toString()])
      array2.push(most_wickets[player_name]["Average "+item.toString()])
      array3.push(most_wickets[player_name]["Economy "+item.toString()])
      array4.push(most_wickets[player_name]["Matches "+item.toString()])
      array5.push(most_wickets[player_name]["Innings "+item.toString()])
      value19 = (most_wickets[player_name]["Overs "+item.toString()]).toString().split('.')
      if(value19.length==2){
        array6.push([item,(parseInt(value19[0])*6+parseInt(value19[1]))])
      }
      else{
        array6.push([item,(parseInt(value19[0])*6)])
      }
      array7.push([item,most_wickets[player_name]["Runs Given "+item.toString()]])
      value15 = most_wickets[player_name]["Four Wickets "+item.toString()]
      value16 = most_wickets[player_name]["Five Wickets "+item.toString()]
      array8.push(value15+value16)
      array9.push(most_wickets[player_name]["Four Wickets "+item.toString()])
      array10.push(most_wickets[player_name]["Five Wickets "+item.toString()])
    });

    value5 = most_wickets[player_name]["Wickets All"];
    value6 = most_wickets[player_name]["Dot Balls All"];
    value7 = most_wickets[player_name]["Overs All"].toString().split('.');
    if(value7.length==2){
      value7 = (parseInt(value7[0])*6+parseInt(value7[1]))-(value5+value6);
    }
    else{
      value7 = (parseInt(value7[0])*6)-(value5+value6);
    }

    value8 = most_wickets[player_name]["Maiden Overs All"];
    value9 = most_wickets[player_name]["Four Wickets All"];
    value10 = most_wickets[player_name]["Five Wickets All"];

    function calculateTotal(data) {
      let total = 0;
      for (var i = 0; i < data.length; i++) {
        total += data[i][1];
      }
      return (total);
    }

    // CHART 1 OPTION

    option1 = {
        tooltip: {
            trigger: 'axis',
            formatter: 'Wickets Taken : {c}'
      },
      xAxis: {
        type: 'category',
        data: year_date
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: array1,
          type: 'line'
        },
        
      ]
    };
    myChart1.setOption(option1);

   // CHART 2 OPTION 

    option2 = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Average', 'Economy']
      },
      
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: year_date
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Average',
          type: 'line',
          
          
          data: array2,
          smooth: true
        },
        {
          name: 'Economy',
          type: 'line',
          
          
          data: array3,
          smooth: true
        }
      ]
    };
    myChart2.setOption(option2);

    // // CHART 3 OPTION

    option3 = {
    
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: year_date
      },
      
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Matches',
          type: 'bar',
          color: '#ee6666',
          data: array4
        },
        {
          name: 'Innings',
          type: 'bar',
          color: '#3ba272',
          data: array5
        }
      ]
    };
        myChart3.setOption(option3);

    // CHART 4 OPTION

    option4 = {
      series: [
        {
          type: 'gauge',
          progress: {
            show: true,
            width: 18
          },
          axisLine: {
            lineStyle: {
              width: 18
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            length: 10,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 10
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
              borderColor: "#5470c6"
            }
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            fontSize: 50,
            offsetCenter: [0, '95%']
          },
          data: [
            {
              value: most_wickets[player_name]["Strike Rate All"]
            }
          ],
          min: 0,
          max: 40,
          splitNumber: 10,
          color: '#5470c6'
        
        }
      ]
    };
        myChart4.setOption(option4);

    // CHART 5 OPTION

    option5 = {
      series: [
        {
          type: 'gauge',
          progress: {
            show: true,
            width: 18
          },
          axisLine: {
            lineStyle: {
              width: 18
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            length: 10,
            lineStyle: {
              width: 1,
              color: '#999'
            }
          },
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 10
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10,
              borderColor: "#91cc75"
            }
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            fontSize: 50,
            offsetCenter: [0, '95%']
          },
          data: [
            {
              value: most_wickets[player_name]["Average All"]
            }
          ],
          min: 0,
          max: 40,
          splitNumber: 10,
          color: '#91cc75'
        
        }
      ]
    };
        myChart5.setOption(option5);

    // CHART 6 OPTION

    const scatterOption = (option = {
      tooltip: {
            trigger: 'item'
          },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        scale: true
      },
      series: [
        {
          type: 'scatter',
          id: 'Runs Given',
          color: '#fc8452',
          dataGroupId: 'Runs Given',
          universalTransition: {
            enabled: true,
            delay: function (idx, count) {
              return Math.random() * 400;
            }
          },
          data: array7
        },
        {
          type: 'scatter',
          id: 'Balls Bowled',
          color: '#9a60b4',
          dataGroupId: 'Balls Bowled',
          universalTransition: {
            enabled: true,
            delay: function (idx, count) {
              return Math.random() * 400;
            }
          },
          data: array6
        }
      ]
    });
    const barOption = {
      xAxis: {
        type: 'category',
        data: ['Balls Bowled','Runs Given']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          id: 'total',
          data: [
            {
              value: calculateTotal(array6),
              itemStyle: {
                color: '#9a60b4'
              },
              groupId: 'Balls Bowled'
            },
            {
              value: calculateTotal(array7),
              itemStyle: {
                color: '#fc8452'
              },
              groupId: 'Runs Given'
            }
          ],
          universalTransition: {
            enabled: true,
            seriesKey: ['Runs Given','Balls Bowled'],
            delay: function (idx, count) {
              return Math.random() * 400;
            }
          }
        }
        
      ]
    };
    let currentOption = scatterOption;
    setInterval(function () {
      currentOption = currentOption === scatterOption ? barOption : scatterOption;
      myChart6.setOption(currentOption, true);
    }, 2000);

    // CHART 7 OPTION

    option7 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Total',
          type: 'pie',
          top: '10%',
          color: ['#9a60b4','#fac858','#73c0de'],
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          
          labelLine: {
            show: false
          },
          data: [
            { value: value5, 
              name: 'Wicket Balls',
            },
            { value: value6, name: 'Dot Balls' },
            { value: value7, name: 'Other Balls' }
          ]
        }
      ]
    };
    myChart7.setOption(option7);

    // CHART 8 OPTION

    option8 = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Total',
          type: 'pie',
          top: '10%',
          color: ['#fc8452','#ea7ccc','#91cc75'],
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          
          labelLine: {
            show: false
          },
          data: [
            { value: value8, 
              name: 'Maiden Overs',
            },
            { value: value9, name: '4 Wickets' },
            { value: value10, name: '5 Wickets' }
          ]
        }
      ]
    };
    myChart8.setOption(option8);

    // CHART 9 OPTION

    option9 = {
      color: ['#80FFA5', '#37A2FF'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Four Wickets', 'Five Wickets']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: year_date
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Four Wickets',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgba(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: array9
        },
        {
          name: 'Five Wickets',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgba(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: array10
        }
      ]
    };
    myChart9.setOption(option9);

    document.getElementById("value17").innerHTML = player_name;
    document.getElementById("value18").innerHTML = most_wickets[player_name]['Team'];
    document.getElementById("value1").innerHTML = most_wickets[player_name]['Wickets All'];
    document.getElementById("value2").innerHTML = most_wickets[player_name]['Matches All'];
    document.getElementById("value3").innerHTML = most_wickets[player_name]['Economy All'];
    document.getElementById("value4").innerHTML = most_wickets[player_name]['Best Bowling All'];
    document.getElementById("value11").innerHTML = year_date[array1.indexOf(Math.max(...array1))];
    document.getElementById("value12").innerHTML = year_date[array3.indexOf(Math.min.apply(null, array3.filter(Boolean)))];
    document.getElementById("value13").innerHTML = year_date[array2.indexOf(Math.min.apply(null, array2.filter(Boolean)))];
    document.getElementById("value14").innerHTML = Math.max(...array8)>0?year_date[array8.indexOf(Math.max(...array8))]:'N/A';
}
);
