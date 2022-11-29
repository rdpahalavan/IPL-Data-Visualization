import requests
import pandas as pd
from bs4 import BeautifulSoup

# The same code won't work now because the structure of the website changed in 2022

URL = "https://www.iplt20.com/stats/all-time/most-runs"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

player_name_all = soup.findAll("div", {"class": "top-players__player-name"})
total_runs_all = soup.findAll("td", {"class": "top-players__r"})
total_matches_all = soup.findAll("td", {"class": "top-players__m"})
total_innings_all = soup.findAll("td", {"class": "top-players__inns"})
not_outs_all = soup.findAll("td", {"class": "top-players__no"})
balls_faced_all = soup.findAll("td", {"class": "top-players__b"})
highest_score_all = soup.findAll("td", {"class": "top-players__hs"})
average_runs_all = soup.findAll("td", {"class": "top-players__a"})
strike_rate_all = soup.findAll("td", {"class": "top-players__sr"})
half_centuries_all = soup.findAll("td", {"class": "top-players__50s"})
centuries_score_all = soup.findAll("td", {"class": "top-players__100s"})
total_fours_all = soup.findAll("td", {"class": "top-players__4s"})
total_sixes_all = soup.findAll("td", {"class": "top-players__6s"})
player_team_all = soup.findAll("div", {"class": "top-players__team"})

final_list = []
for i in range(len(player_name_all)):
  player_name = player_name_all[i].getText().replace(" ","")
  player_name = player_name.replace("\n"," ").strip()
  total_runs = total_runs_all[i].getText().replace(" ","")
  total_runs = int(total_runs.replace("\n"," ").strip())
  total_matches = total_matches_all[i].getText().replace(" ","")
  total_matches = int(total_matches.replace("\n"," ").strip())
  total_innings = total_innings_all[i].getText().replace(" ","")
  total_innings = int(total_innings.replace("\n"," ").strip())
  not_outs = not_outs_all[i].getText().replace(" ","")
  not_outs = int(not_outs.replace("\n"," ").strip())
  highest_score = highest_score_all[i].getText().replace(" ","")
  highest_score = highest_score.replace("\n"," ").strip()
  balls_faced = balls_faced_all[i].getText().replace(" ","")
  balls_faced = balls_faced.replace("\n"," ").strip()
  balls_faced = int(balls_faced.replace(',', ''))
  average_runs = average_runs_all[i].getText().replace(" ","")
  average_runs = float(average_runs.replace("\n"," ").strip())
  strike_rate = strike_rate_all[i].getText().replace(" ","")
  strike_rate = float(strike_rate.replace("\n"," ").strip())
  half_centuries = half_centuries_all[i].getText().replace(" ","")
  half_centuries = int(half_centuries.replace("\n"," ").strip())
  centuries_score = centuries_score_all[i].getText().replace(" ","")
  centuries_score = int(centuries_score.replace("\n"," ").strip())
  total_fours = total_fours_all[i].getText().replace(" ","")
  total_fours = int(total_fours.replace("\n"," ").strip())
  total_sixes = total_sixes_all[i].getText().replace(" ","")
  total_sixes = int(total_sixes.replace("\n"," ").strip())
  player_team = str(player_team_all[i])
  if 'CSK' in player_team:
    player_team = 'Chennai Super Kings'
  elif 'KKR' in player_team:
    player_team = 'Kolkata Knight Riders'
  elif 'DC' in player_team:
    player_team = 'Delhi Capitals'
  elif 'RCB' in player_team:
    player_team = 'Royal Challengers Bangalore'
  elif 'RR' in player_team:
    player_team = 'Rajasthan Royals'
  elif 'MI' in player_team:
    player_team = 'Mumbai Indians'
  elif 'SRH' in player_team:
    player_team = 'Sunrisers Hyderabad'
  elif 'PBKS' in player_team:
    player_team = 'Punjab Kings'
  elif 'PWI' in player_team:
    player_team = 'Pune Warriors India'
  elif 'RPS' in player_team:
    player_team = 'Rising Pune Supergiant'
  elif 'GL' in player_team:
    player_team = 'Gujarat Lions'
  elif 'DEC' in player_team:
    player_team = 'Deccan Chargers'
  player_list = [player_name,player_team,total_matches,total_innings,total_runs,average_runs,strike_rate,balls_faced,not_outs,highest_score,half_centuries,centuries_score,total_fours,total_sixes]
  final_list.append(player_list)

df = pd.DataFrame(final_list, columns = ['Name', 'Team', 'Matches All', 'Innings All', 'Runs All', 'Average All', 'Strike Rate All', 'Balls Faced All', 'Not Outs All', 'Highest Score All', 'Half Centuries All', 'Centuries All', 'Fours All', 'Sixes All'])

# data = df.to_json('most_runs.json', orient='index')

df = df.set_index('Name')

for i in range(2008,2022):
  df['Matches '+str(i)], df['Innings '+str(i)], df['Runs '+str(i)], df['Average '+str(i)], df['Strike Rate '+str(i)], df['Balls Faced '+str(i)], df['Not Outs '+str(i)], df['Highest Score '+str(i)], df['Half Centuries '+str(i)], df['Centuries '+str(i)], df['Fours '+str(i)], df['Sixes '+str(i)] = [0,0,0,0.0,0.0,0,0,'0',0,0,0,0]
  
 for jk in range(2008,2022):

  URL = "https://www.iplt20.com/stats/"+str(jk)+"/most-runs"
  page = requests.get(URL)

  soup = BeautifulSoup(page.content, "html.parser")

  player_name_all = soup.findAll("div", {"class": "top-players__player-name"})
  total_runs_all = soup.findAll("td", {"class": "top-players__r"})
  total_matches_all = soup.findAll("td", {"class": "top-players__m"})
  total_innings_all = soup.findAll("td", {"class": "top-players__inns"})
  not_outs_all = soup.findAll("td", {"class": "top-players__no"})
  balls_faced_all = soup.findAll("td", {"class": "top-players__b"})
  highest_score_all = soup.findAll("td", {"class": "top-players__hs"})
  average_runs_all = soup.findAll("td", {"class": "top-players__a"})
  strike_rate_all = soup.findAll("td", {"class": "top-players__sr"})
  half_centuries_all = soup.findAll("td", {"class": "top-players__50s"})
  centuries_score_all = soup.findAll("td", {"class": "top-players__100s"})
  total_fours_all = soup.findAll("td", {"class": "top-players__4s"})
  total_sixes_all = soup.findAll("td", {"class": "top-players__6s"})

  for i in range(len(player_name_all)):
    player_name = player_name_all[i].getText().replace(" ","")
    player_name = player_name.replace("\n"," ").strip()
    if player_name in df.index:
      total_runs = total_runs_all[i].getText().replace(" ","")
      total_runs = total_runs.replace("\n"," ").strip()
      df.at[player_name,'Runs '+str(jk)] = int(total_runs)
      total_matches = total_matches_all[i].getText().replace(" ","")
      total_matches = total_matches.replace("\n"," ").strip()
      df.at[player_name,'Matches '+str(jk)] = int(total_matches)
      total_innings = total_innings_all[i].getText().replace(" ","")
      total_innings = total_innings.replace("\n"," ").strip()
      df.at[player_name,'Innings '+str(jk)] = int(total_innings)
      not_outs = not_outs_all[i].getText().replace(" ","")
      not_outs = not_outs.replace("\n"," ").strip()
      df.at[player_name,'Not Outs '+str(jk)] = int(not_outs)
      highest_score = highest_score_all[i].getText().replace(" ","")
      highest_score = highest_score.replace("\n"," ").strip()
      df.at[player_name,'Highest Score '+str(jk)] = highest_score
      balls_faced = balls_faced_all[i].getText().replace(" ","")
      balls_faced = balls_faced.replace("\n"," ").strip()
      df.at[player_name,'Balls Faced '+str(jk)] = int(balls_faced.replace(',', ''))
      average_runs = average_runs_all[i].getText().replace(" ","")
      average_runs = average_runs.replace("\n"," ").strip()
      if average_runs == '-':
        average_runs = 0.0
      df.at[player_name,'Average '+str(jk)] = float(average_runs)
      strike_rate = strike_rate_all[i].getText().replace(" ","")
      strike_rate = strike_rate.replace("\n"," ").strip()
      df.at[player_name,'Strike Rate '+str(jk)] = float(strike_rate)
      half_centuries = half_centuries_all[i].getText().replace(" ","")
      half_centuries = half_centuries.replace("\n"," ").strip()
      df.at[player_name,'Half Centuries '+str(jk)] = int(half_centuries)
      centuries_score = centuries_score_all[i].getText().replace(" ","")
      centuries_score = centuries_score.replace("\n"," ").strip()
      df.at[player_name,'Centuries '+str(jk)] = int(centuries_score)
      total_fours = total_fours_all[i].getText().replace(" ","")
      total_fours = total_fours.replace("\n"," ").strip()
      df.at[player_name,'Fours '+str(jk)] = int(total_fours)
      total_sixes = total_sixes_all[i].getText().replace(" ","")
      total_sixes = total_sixes.replace("\n"," ").strip()
      df.at[player_name,'Sixes '+str(jk)] = int(total_sixes)
      
# data = df.to_json('most_runs.json', orient='index')

import requests
import pandas as pd
from bs4 import BeautifulSoup

URL = "https://www.iplt20.com/stats/all-time/most-wickets"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

player_name_all = soup.findAll("div", {"class": "top-players__player-name"})
total_wickets_all = soup.findAll("td", {"class": "top-players__w"})
total_matches_all = soup.findAll("td", {"class": "top-players__m"})
total_innings_all = soup.findAll("td", {"class": "top-players__inns"})
total_overs_all = soup.findAll("td", {"class": "top-players__ov"})
runs_given_all = soup.findAll("td", {"class": "top-players__r"})
best_bowling_all = soup.findAll("td", {"class": "top-players__bbi"})
average_runs_all = soup.findAll("td", {"class": "top-players__a"})
economy_rate_all = soup.findAll("td", {"class": "top-players__e"})
strike_rate_all = soup.findAll("td", {"class": "top-players__sr"})
four_wickets_all = soup.findAll("td", {"class": "top-players__4w"})
five_wickets_all = soup.findAll("td", {"class": "top-players__5w"})
player_team_all = soup.findAll("div", {"class": "top-players__team"})

final_list = []
for i in range(len(player_name_all)):
  player_name = player_name_all[i].getText().replace(" ","")
  player_name = player_name.replace("\n"," ").strip()
  total_wickets = total_wickets_all[i].getText().replace(" ","")
  total_wickets = int(total_wickets.replace("\n"," ").strip())
  total_matches = total_matches_all[i].getText().replace(" ","")
  total_matches = int(total_matches.replace("\n"," ").strip())
  total_innings = total_innings_all[i].getText().replace(" ","")
  total_innings = int(total_innings.replace("\n"," ").strip())
  total_overs = total_overs_all[i].getText().replace(" ","")
  total_overs = float(total_overs.replace("\n"," ").strip())
  best_bowling = best_bowling_all[i].getText().replace(" ","")
  best_bowling = best_bowling.replace("\n"," ").strip()
  runs_given = runs_given_all[i].getText().replace(" ","")
  runs_given = runs_given.replace("\n"," ").strip()
  runs_given = int(runs_given.replace(',', ''))
  average_runs = average_runs_all[i].getText().replace(" ","")
  average_runs = float(average_runs.replace("\n"," ").strip())
  strike_rate = strike_rate_all[i].getText().replace(" ","")
  strike_rate = float(strike_rate.replace("\n"," ").strip())
  economy_rate = economy_rate_all[i].getText().replace(" ","")
  economy_rate = float(economy_rate.replace("\n"," ").strip())
  four_wickets = four_wickets_all[i].getText().replace(" ","")
  four_wickets = int(four_wickets.replace("\n"," ").strip())
  five_wickets = five_wickets_all[i].getText().replace(" ","")
  five_wickets = int(five_wickets.replace("\n"," ").strip())
  player_team = str(player_team_all[i])
  if 'CSK' in player_team:
    player_team = 'Chennai Super Kings'
  elif 'KKR' in player_team:
    player_team = 'Kolkata Knight Riders'
  elif 'DC' in player_team:
    player_team = 'Delhi Capitals'
  elif 'RCB' in player_team:
    player_team = 'Royal Challengers Bangalore'
  elif 'RR' in player_team:
    player_team = 'Rajasthan Royals'
  elif 'MI' in player_team:
    player_team = 'Mumbai Indians'
  elif 'SRH' in player_team:
    player_team = 'Sunrisers Hyderabad'
  elif 'PBKS' in player_team:
    player_team = 'Punjab Kings'
  elif 'PWI' in player_team:
    player_team = 'Pune Warriors India'
  elif 'RPS' in player_team:
    player_team = 'Rising Pune Supergiant'
  elif 'GL' in player_team:
    player_team = 'Gujarat Lions'
  elif 'DEC' in player_team:
    player_team = 'Deccan Chargers'
  player_list = [player_name,player_team,total_matches,total_innings,total_overs,total_wickets,average_runs,runs_given,strike_rate,economy_rate,best_bowling,four_wickets,five_wickets]
  final_list.append(player_list)

df = pd.DataFrame(final_list, columns = ['Name', 'Team', 'Matches All', 'Innings All', 'Overs All', 'Wickets All', 'Average All', 'Runs Given All', 'Strike Rate All', 'Economy All', 'Best Bowling All', 'Four Wickets All', 'Five Wickets All'])

# data = df.to_json('most_runs.json', orient='index')


URL = "https://www.iplt20.com/stats/all-time/most-maidens"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

player_name_all = soup.findAll("div", {"class": "top-players__player-name"})
total_dots_all = soup.findAll("td", {"class": "top-players__maid"})

final_list = []
for i in range(len(player_name_all)):
  player_name = player_name_all[i].getText().replace(" ","")
  player_name = player_name.replace("\n"," ").strip()
  if player_name in df.index:
    total_dots = total_dots_all[i].getText().replace(" ","")
    total_dots = int(total_dots.replace("\n"," ").strip())
    df.at[player_name,'Maiden Overs All'] = total_dots

# df = pd.DataFrame(final_list, columns = ['Name', 'Team', 'Matches All', 'Innings All', 'Overs All', 'Wickets All', 'Average All', 'Runs Given All', 'Strike Rate All', 'Economy All', 'Best Bowling All', 'Four Wickets All', 'Five Wickets All'])

# data = df.to_json('most_runs.json', orient='index')

df = df.set_index('Name')
df['Dot Balls All'] = 0
df['Maiden Overs All'] = 0

for i in range(2008,2022):
  df['Matches '+str(i)], df['Innings '+str(i)], df['Overs '+str(i)], df['Wickets '+str(i)], df['Average '+str(i)], df['Runs Given '+str(i)], df['Strike Rate '+str(i)], df['Economy '+str(i)], df['Best Bowling '+str(i)], df['Four Wickets '+str(i)], df['Five Wickets '+str(i)] = [0,0,0.0,0,0.0,0,0.0,0.0,'0',0,0]
  
 for i in range(2008,2022):
  df['Dot Balls '+str(i)], df['Maiden Overs '+str(i)] = [0,0]
  
 for jk in range(2008,2022):

  URL = "https://www.iplt20.com/stats/"+str(jk)+"/most-wickets"
  page = requests.get(URL)

  soup = BeautifulSoup(page.content, "html.parser")

  player_name_all = soup.findAll("div", {"class": "top-players__player-name"})
  total_wickets_all = soup.findAll("td", {"class": "top-players__w"})
  total_matches_all = soup.findAll("td", {"class": "top-players__m"})
  total_innings_all = soup.findAll("td", {"class": "top-players__inns"})
  total_overs_all = soup.findAll("td", {"class": "top-players__ov"})
  runs_given_all = soup.findAll("td", {"class": "top-players__r"})
  best_bowling_all = soup.findAll("td", {"class": "top-players__bbi"})
  average_runs_all = soup.findAll("td", {"class": "top-players__a"})
  economy_rate_all = soup.findAll("td", {"class": "top-players__e"})
  strike_rate_all = soup.findAll("td", {"class": "top-players__sr"})
  four_wickets_all = soup.findAll("td", {"class": "top-players__4w"})
  five_wickets_all = soup.findAll("td", {"class": "top-players__5w"})

  for i in range(len(player_name_all)):
    player_name = player_name_all[i].getText().replace(" ","")
    player_name = player_name.replace("\n"," ").strip()
    if player_name in df.index:
      total_wickets = total_wickets_all[i].getText().replace(" ","")
      total_wickets = total_wickets.replace("\n"," ").strip()
      df.at[player_name,'Wickets '+str(jk)] = int(total_wickets)
      total_matches = total_matches_all[i].getText().replace(" ","")
      total_matches = total_matches.replace("\n"," ").strip()
      df.at[player_name,'Matches '+str(jk)] = int(total_matches)
      total_innings = total_innings_all[i].getText().replace(" ","")
      total_innings = total_innings.replace("\n"," ").strip()
      df.at[player_name,'Innings '+str(jk)] = int(total_innings)
      total_overs = total_overs_all[i].getText().replace(" ","")
      total_overs = total_overs.replace("\n"," ").strip()
      df.at[player_name,'Overs '+str(jk)] = float(total_overs)
      best_bowling = best_bowling_all[i].getText().replace(" ","")
      best_bowling = best_bowling.replace("\n"," ").strip()
      df.at[player_name,'Best Bowling '+str(jk)] = best_bowling
      runs_given = runs_given_all[i].getText().replace(" ","")
      runs_given = runs_given.replace("\n"," ").strip()
      df.at[player_name,'Runs Given '+str(jk)] = int(runs_given.replace(',', ''))
      average_runs = average_runs_all[i].getText().replace(" ","")
      average_runs = average_runs.replace("\n"," ").strip()
      if average_runs == '-':
        average_runs = 0.0
      df.at[player_name,'Average '+str(jk)] = float(average_runs)
      strike_rate = strike_rate_all[i].getText().replace(" ","")
      strike_rate = strike_rate.replace("\n"," ").strip()
      if strike_rate == '-':
        strike_rate = 0.0
      df.at[player_name,'Strike Rate '+str(jk)] = float(strike_rate)
      economy_rate = economy_rate_all[i].getText().replace(" ","")
      economy_rate = economy_rate.replace("\n"," ").strip()
      df.at[player_name,'Economy '+str(jk)] = float(economy_rate)
      four_wickets = four_wickets_all[i].getText().replace(" ","")
      four_wickets = four_wickets.replace("\n"," ").strip()
      df.at[player_name,'Four Wickets '+str(jk)] = int(four_wickets)
      five_wickets = five_wickets_all[i].getText().replace(" ","")
      five_wickets = five_wickets.replace("\n"," ").strip()
      df.at[player_name,'Five Wickets '+str(jk)] = int(five_wickets)
      
 for jk in range(2008,2022):

  URL = "https://www.iplt20.com/stats/"+str(jk)+"/most-maidens"
  page = requests.get(URL)

  soup = BeautifulSoup(page.content, "html.parser")

  player_name_all = soup.findAll("div", {"class": "top-players__player-name"})
  total_wickets_all = soup.findAll("td", {"class": "top-players__maid"})

  for i in range(len(player_name_all)):
    player_name = player_name_all[i].getText().replace(" ","")
    player_name = player_name.replace("\n"," ").strip()
    if player_name in df.index:
      total_wickets = total_wickets_all[i].getText().replace(" ","")
      total_wickets = total_wickets.replace("\n"," ").strip()
      df.at[player_name,'Maiden Overs '+str(jk)] = int(total_wickets)
      
 
# data = df.to_json('most_wickets.json', orient='index')
