var url = new URL(window.location.href);
var player_name1 = url.searchParams.get("player1");
var player_name2 = url.searchParams.get("player2");
var color1 = '#5470c6';
var color2 = '#91cc75';
var smooth_v = true;
const year_date = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];


// CHART 1

var chartDom1 = document.getElementById('chart1');
var myChart1 = echarts.init(chartDom1);
var option1;
myChart1.showLoading();


// LOADING DATASET

$.get('dataset/most_runs.json',
  function (most_runs) {
    myChart1.hideLoading();

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
    array11=[];
    array12=[];
    array13=[];
    array14=[];
    array15=[];
    array16=[];
    array17=[];
    array18=[];

    year_date.forEach(function (item, index) {
      array1.push(most_runs[player_name1]["Runs "+item.toString()])
      array2.push(most_runs[player_name2]["Runs "+item.toString()])
      array3.push(most_runs[player_name1]["Average "+item.toString()])
      array4.push(most_runs[player_name2]["Average "+item.toString()])
      array5.push(most_runs[player_name1]["Strike Rate "+item.toString()])
      array6.push(most_runs[player_name2]["Strike Rate "+item.toString()])
      array7.push(most_runs[player_name1]["Matches "+item.toString()])
      array8.push(most_runs[player_name2]["Matches "+item.toString()])
      array9.push(most_runs[player_name1]["Balls Faced "+item.toString()])
      array10.push(most_runs[player_name2]["Balls Faced "+item.toString()])
      array11.push(most_runs[player_name1]["Fours "+item.toString()])
      array12.push(most_runs[player_name2]["Fours "+item.toString()])
      array13.push(most_runs[player_name1]["Sixes "+item.toString()])
      array14.push(most_runs[player_name2]["Sixes "+item.toString()])
      array15.push(most_runs[player_name1]["Half Centuries "+item.toString()])
      array16.push(most_runs[player_name2]["Half Centuries "+item.toString()])
      array17.push(most_runs[player_name1]["Centuries "+item.toString()])
      array18.push(most_runs[player_name2]["Centuries "+item.toString()])
    });

    // CHART 1 OPTION

    option1 = {
      tooltip: {
          trigger: 'axis'
    },
    legend: {
     data: [player_name1,player_name2]
    },
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
        name: player_name1,
        data: array1,
        type: 'line',
        color: color1,
        smooth: smooth_v
      },
      {
        name: player_name2,
        data: array2,
        type: 'line',
        color: color2,
        smooth: smooth_v
      }
      
    ]
  };

  myChart1.setOption(option1);


    document.getElementById("value2").innerHTML = player_name1+" / "+player_name2;
    document.getElementById("value1").innerHTML ='Total Runs Per Season';
}
);

function changeSmooth(val){
    document.getElementById("value4").value=val=='Smooth'?'Rough':'Smooth';
    option1["series"][0]["smooth"]=val=='Smooth'?false:true;
    option1["series"][1]["smooth"]=val=='Smooth'?false:true;
    myChart1.setOption(option1);
}

function changeLine(val){
  document.getElementById("value3").innerHTML =val+" &#9662;";
  switch(val){
    case 'Runs': 
      option1["series"][0]["data"]=array1;
      option1["series"][1]["data"]=array2;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Total Runs Per Season';
      break;
    case 'Average': 
      option1["series"][0]["data"]=array3;
      option1["series"][1]["data"]=array4;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Batting Average Per Season';
      break;
    case 'Strike Rate': 
      option1["series"][0]["data"]=array5;
      option1["series"][1]["data"]=array6;
      document.getElementById("value1").innerHTML ='Strike Rate Per Season';
      myChart1.setOption(option1);
      break;
    case 'Matches': 
      option1["series"][0]["data"]=array7;
      option1["series"][1]["data"]=array8;
      document.getElementById("value1").innerHTML ='Matches Played Per Season';
      myChart1.setOption(option1);
      break;
    case 'Balls': 
      option1["series"][0]["data"]=array9;
      option1["series"][1]["data"]=array10;
      document.getElementById("value1").innerHTML ='Balls Faced Per Season';
      myChart1.setOption(option1);
      break;
    case 'Fours': 
      option1["series"][0]["data"]=array11;
      option1["series"][1]["data"]=array12;
      document.getElementById("value1").innerHTML ='Total Fours Per Season';
      myChart1.setOption(option1);
      break;
    case 'Sixes': 
      option1["series"][0]["data"]=array13;
      option1["series"][1]["data"]=array14;
      document.getElementById("value1").innerHTML ='Total Sixes Per Season';
      myChart1.setOption(option1);
      break;
    case 'Half Centuries': 
      option1["series"][0]["data"]=array15;
      option1["series"][1]["data"]=array16;
      document.getElementById("value1").innerHTML ='Total Half Centuries Per Season';
      myChart1.setOption(option1);
      break;
    case 'Centuries': 
      option1["series"][0]["data"]=array17;
      option1["series"][1]["data"]=array18;
      document.getElementById("value1").innerHTML ='Total Centuries Per Season';
      myChart1.setOption(option1);
      break;
  }
}


function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

document.getElementById("linecolor1").addEventListener('change', (event) => {
  color1 = event.target.value;
  option1["series"][0]["color"]=color1;
  myChart1.setOption(option1);
});

document.getElementById("linecolor2").addEventListener('change', (event) => {
  color2 = event.target.value;
  option1["series"][1]["color"]=color2;
  myChart1.setOption(option1);
});
