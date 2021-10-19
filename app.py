from flask import *
import pandas as pd
from data import get_projections

app = Flask(__name__)

@app.route('/')
def index():
    
    projections, grades = get_projections()
    return render_template('index.html', projections=projections, grades=grades)

if __name__ == "__main__":
    app.run(debug=True)