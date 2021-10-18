from flask import *
import pandas as pd
from main import get_projections

app = Flask(__name__)

@app.route('/')
def index():
    
    projections = get_projections()
    return render_template('index.html', projections=projections)

if __name__ == "__main__":
    app.run(debug=True)