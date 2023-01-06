var url = new URL(window.location.href);
var stadium_name = url.searchParams.get("stadium");
const year_date = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];


var overall = 1;
var total_matches=0;
var total_matches_team=0;
var year_a = '08';
var year_b = '08';
var year_c = '08';
var year_d = '08';
var year_e = '08';
var year_f = '08';
var year_g = '08';
var a_count = 0;
var b_count = 0;
var c_count = 0;
var d_count = 0;
var e_count = 0;
var f_count = 0;
var g_count = 0;
var a_arr=[];
var b_arr=[];
var c_arr=[];
var d_arr=[];
var e_arr=[];
var f_arr=[];
var g_arr=[];
var total_winning=0;
var total_toss_team=0;
// LOADING DATASET

var chartDom1 = document.getElementById('chart1');
var myChart1 = echarts.init(chartDom1);
var option1;
myChart1.showLoading();

function loadOnceAgain(team_name1, team_name2){
$.get('dataset/venues.json',
  function (most_runs) {
    myChart1.hideLoading();

    a_arr = [];
    b_arr = [];
    c_arr = [];
    d_arr = [];
    e_arr = [];
    f_arr = [];
    g_arr = [];
    a_count = 0;
    b_count = 0;
    c_count = 0;
    d_count = 0;
    e_count = 0;
    f_count = 0;
    g_count = 0;
    year_a = '08';
    year_b = '08';
    year_c = '08';
    year_d = '08';
    year_e = '08';
    year_f = '08';
    year_g = '08';

    
    var id_list = Object.values(most_runs).map(el=> el['Id']);
    var stadium_list = Object.values(most_runs).map(el=> el['Venue']);
    var city_list = Object.values(most_runs).map(el=> el['City']);
    var date_list = Object.values(most_runs).map(el=> el['Date']);
    var team_1 = Object.values(most_runs).map(el=> el['Team1']);
    var team_2 = Object.values(most_runs).map(el=> el['Team2']);
    var toss_list = Object.values(most_runs).map(el=> el['Toss Decision']);
    var toss_winner = Object.values(most_runs).map(el=> el['Toss Winner']);
    var winner_list = Object.values(most_runs).map(el=> el['Winner']);
    var result_list = Object.values(most_runs).map(el=> el['Result']);

    let unique = toss_list.filter((item, i, ar) => ar.indexOf(item) === i);
    console.log(unique);
    
    
    for(i=0; i<id_list.length; i++){
    if(stadium_list[i]==stadium_name){
      city = city_list[i];

      if(team_1[i]==team_name1 || team_2[i]==team_name1 || team_1[i]==team_name2 || team_2[i]==team_name2 || overall==1){
        year = date_list[i].slice(-2);
        if(year_a!=year){
          a_arr.push(a_count);
          for(j=parseInt(year_a);j<parseInt(year)-1;j++){
            a_arr.push(0);
          }
          a_count = 0;
          year_a = year;
        }
        a_count++;  
      }
      
      if(toss_winner[i]==team_name1 || toss_winner[i]==team_name2 || overall==1){
        year = date_list[i].slice(-2);
        if(year_b!=year){
          b_arr.push(b_count);
          for(j=parseInt(year_b);j<parseInt(year)-1;j++){
            b_arr.push(0);
          }
          b_count = 0;
          year_b = year;
        }
        b_count++;  
      }     

    if(winner_list[i]==team_name1 || winner_list[i]==team_name2 || overall==1){
      year = date_list[i].slice(-2);
      if(year_c!=year){
        c_arr.push(c_count);
        for(j=parseInt(year_c);j<parseInt(year)-1;j++){
          c_arr.push(0);
        }
        c_count = 0;
        year_c = year;
      }
      c_count++;  
    }   

    if(team_1[i]==toss_winner[i]){
      toss_win1 = team_1[i];
      toss_lost1 = team_2[i];
    }
    if(team_2[i]==toss_winner[i]){
      toss_win1 = team_2[i];
      toss_lost1 = team_1[i];
    }

    if((toss_list[i]=='bat' && (toss_win1==team_name1 || toss_win1==team_name2 || overall==1)) || (toss_list[i]=='field' && (toss_lost1==team_name1 || toss_lost1==team_name2))){
      year = date_list[i].slice(-2);
      if(year_d!=year){
        d_arr.push(d_count);
        for(j=parseInt(year_d);j<parseInt(year)-1;j++){
          d_arr.push(0);
        }
        d_count = 0;
        year_d = year;
      }
      d_count++;  
    }   

    if((toss_list[i]=='field' && (toss_win1==team_name1 || toss_win1==team_name2 || overall==1)) || (toss_list[i]=='bat' && (toss_lost1==team_name1 || toss_lost1==team_name2))){
      year = date_list[i].slice(-2);
      if(year_e!=year){
        e_arr.push(e_count);
        for(j=parseInt(year_e);j<parseInt(year)-1;j++){
          e_arr.push(0);
        }
        e_count = 0;
        year_e = year;
      }
      e_count++;  
    }   

    if(result_list[i]=='wickets' && (winner_list[i]==team_name1 || winner_list[i]==team_name2 || overall==1)){
      year = date_list[i].slice(-2);
      if(year_f!=year){
        f_arr.push(f_count);
        for(j=parseInt(year_f);j<parseInt(year)-1;j++){
          f_arr.push(0);
        }
        f_count = 0;
        year_f = year;
      }
      f_count++;  
    }   

    if(result_list[i]=='runs' && (winner_list[i]==team_name1 || winner_list[i]==team_name2 || overall==1)){
      year = date_list[i].slice(-2);
      if(year_g!=year){
        g_arr.push(g_count);
        for(j=parseInt(year_g);j<parseInt(year)-1;j++){
          g_arr.push(0);
        }
        g_count = 0;
        year_g = year;
      }
      g_count++;  
    }   
  }

    if(i==id_list.length-1){
      year = date_list[i].slice(-2);
      a_arr.push(a_count);
      b_arr.push(b_count);
      c_arr.push(c_count);
      d_arr.push(d_count);
      e_arr.push(e_count);
      f_arr.push(e_count);
      g_arr.push(g_count);
      for(j=parseInt(year_a);j<parseInt(year);j++){
        a_arr.push(0);
      }
      for(j=parseInt(year_b);j<parseInt(year);j++){
        b_arr.push(0);
      }
      for(j=parseInt(year_c);j<parseInt(year);j++){
        c_arr.push(0);
      }
      for(j=parseInt(year_d);j<parseInt(year);j++){
        d_arr.push(0);
      }
      for(j=parseInt(year_e);j<parseInt(year);j++){
        e_arr.push(0);
      }
      for(j=parseInt(year_f);j<parseInt(year);j++){
        f_arr.push(0);
      }
      for(j=parseInt(year_g);j<parseInt(year);j++){
        g_arr.push(0);
      }
      a_count = 0;
      b_count = 0;
      c_count = 0;
      d_count = 0;
      e_count = 0;
      f_count = 0;
      g_count = 0;
    }
  }

    option1 = {
      legend: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#283b56'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: year_date
      },
      yAxis: {
        type: 'value',
        minInterval: 1
      },
      series: [
        {
          name: 'Total Matches',
          data: a_arr,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        },
        {
          name: 'Match Win',
          type: 'line',
          data: c_arr
        }
      ]
    };

    myChart1.setOption(option1);

    document.getElementById("value17").innerHTML = stadium_name;
    document.getElementById("value18").innerHTML = city;
}
);
}

loadOnceAgain('CSK', 'CSK', 'Total Matches');

function changeLine(val, com){
  if(com==3){document.getElementById("value3").innerHTML =val+" &#9662;";document.getElementById("value4").innerHTML ='Match Win'+" &#9662;";overall = 0;}
  if(com==4){document.getElementById("value4").innerHTML =val+" &#9662;";}
  switch(val){
    case 'Chennai Super Kings': 
      loadOnceAgain('Chennai Super Kings', 'Chennai Super Kings');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Chennai Super Kings';
      break;
    case 'Mumbai Indians': 
      loadOnceAgain('Mumbai Indians', 'Mumbai Indians');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Mumbai Indians';
      break;
    case 'Royal Challengers Bangalore': 
      loadOnceAgain('Royal Challengers Bangalore', 'Royal Challengers Bangalore');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Royal Challengers Bangalore';
      break;
    case 'Delhi Capitals': 
      loadOnceAgain('Delhi Capitals', 'Delhi Daredevils');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Delhi Capitals';
      break;
      case 'Kolkata Knight Riders': 
      loadOnceAgain('Kolkata Knight Riders', 'Kolkata Knight Riders');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Kolkata Knight Riders';
      break;
      case 'Punjab Kings': 
      loadOnceAgain('Punjab Kings', 'Kings XI Punjab');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Punjab Kings';
      break;
      case 'Rajasthan Royals': 
      loadOnceAgain('Rajasthan Royals', 'Rajasthan Royals');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Rajasthan Royals';
      break;
      case 'Sunrisers Hyderabad': 
      loadOnceAgain('Sunrisers Hyderabad', 'Sunrisers Hyderabad');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Sunrisers Hyderabad';
      break;
      case 'Deccan Chargers': 
      loadOnceAgain('Deccan Chargers', 'Deccan Chargers');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Deccan Chargers';
      break;
      case 'Gujarat Lions': 
      loadOnceAgain('Gujarat Lions', 'Gujarat Lions');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Gujarat Lions';
      break;
      case 'Pune Warriors India': 
      loadOnceAgain('Pune Warriors India', 'Pune Warriors');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Pune Warriors India';
      break;
      case 'Rising Pune Supergiant': 
      loadOnceAgain('Rising Pune Supergiant', 'Rising Pune Supergiants');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Rising Pune Supergiant';
      break;
      case 'Kochi Tuskers Kerala': 
      loadOnceAgain('Kochi Tuskers Kerala', 'Kochi Tuskers Kerala');
      option1["series"][0]["data"]=a_arr;
      myChart1.setOption(option1);
      document.getElementById("value1").innerHTML ='Kochi Tuskers Kerala';
      break;
      case 'Toss Win': 
      option1["series"][1]["data"]=b_arr;
      option1["series"][1]["name"]='Toss Win';
      myChart1.setOption(option1);
      break;
      case 'Match Win': 
      option1["series"][1]["data"]=c_arr;
      option1["series"][1]["name"]='Match Win';
      myChart1.setOption(option1);
      break;
      case 'Batting First': 
      option1["series"][1]["data"]=d_arr;
      if(overall==0){option1["series"][1]["name"]='Batting First';}
      else{option1["series"][1]["name"]='Win Toss and Batting First';}
      myChart1.setOption(option1);
      break;
      case 'Bowling First': 
      option1["series"][1]["data"]=e_arr;
      if(overall==0){option1["series"][1]["name"]='Bowling First';}
      else{option1["series"][1]["name"]='Win Toss and Bowling First';}
      myChart1.setOption(option1);
      break;
      case 'Chasing Win': 
      option1["series"][1]["data"]=f_arr;
      option1["series"][1]["name"]='Chasing Win';
      myChart1.setOption(option1);
      break;
      case 'Defending Win': 
      option1["series"][1]["data"]=g_arr;
      option1["series"][1]["name"]='Defending Win';
      myChart1.setOption(option1);
      break;
    
  }
}

function myFunction(myDropdown) {
  document.getElementById(myDropdown).classList.toggle("show");
}

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
document.getElementById('value4').style.backgroundColor = '#4CAF50';

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
