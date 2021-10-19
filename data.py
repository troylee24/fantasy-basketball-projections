import requests
import pandas as pd
import json
from bs4 import BeautifulSoup
from collections import defaultdict

projections_file = "data/projections.json"
grades_file = "data/grades.json"
url = "https://hashtagbasketball.com/fantasy-basketball-projections"
headers = {
	"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36",
	"X-Requested-With": "XMLHttpRequest"
}

def html_to_projections():
	r = requests.get(url, headers=headers)
	df = pd.read_html(r.text)[2]
	df = df[df.PLAYER != "PLAYER"]
	df.rename(columns={df.columns[4]: "Team", df.columns[5]: "GP"}, inplace=True)
	df.to_json(projections_file, orient="records")

def html_to_grades():
	r = requests.get(url, headers=headers)
	grades = {"elite", "vgood", "good", "bavg", "ngood"}
	cats = {
		"FGP": "FG%",
		"FTP": "FT%",
		"TGM": "3PM",
		"PTS": "PTS",
		"REB": "TREB",
		"AST": "AST",
		"STL": "STL",
		"BLK": "BLK",
		"TUR": "TO"
	}
	soup = BeautifulSoup(r.text, "html.parser")
	tds = soup.find_all('td')
	labeled_tds = defaultdict(dict)

	for td in tds:
		if td.has_attr('class'):
			grade = td['class'][0]
			if td['class'][0] not in grades:
				continue
			input = td.find_all('input')[1]
			id = input.get('id').split('_')
			cat = cats[id[-2][2:]]
			# if cat not in cats: print("ERROR")
			rank = int(id[-1]) + 1
			labeled_tds[rank][cat] = grade
	
	labeled_tds = [dict(labeled_tds)]
	with open(grades_file, 'w') as f:
		json.dump(labeled_tds, f)

def get_projections():
	with open(projections_file, 'r') as f:
		projections = json.load(f)
	with open(grades_file, 'r') as f:
		grades = json.load(f)
	
	return projections, grades

if __name__ == "__main__":
	html_to_projections()
	html_to_grades()
	# get_projections()