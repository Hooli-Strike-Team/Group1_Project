import prefix
import datetime

from flask import Flask, abort, redirect, url_for, request, render_template
from markupsafe import escape, Markup

app = Flask(__name__)

# wrapper for handling proxy server in csel.io development environments.
# eventually we will need to migrate this to a production environment and we probably
# want the application to be portable enough to run in local Linux environments as well. 
prefix.use_PrefixMiddleware(app)

@app.route('/prefix_url')
def prefix_url():
    return 'Current prefix url: ' .format(url_for('prefix_url'))

@app.route('/prefix_url/')
def index():
    return render_template('homepage.html')
