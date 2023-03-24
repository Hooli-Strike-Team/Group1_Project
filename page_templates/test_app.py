import prefix

from flask import Flask, url_for, render_template, redirect, session

# Create app to use in Flask application
app = Flask(__name__)
# Secret key for session object
app.secret_key = 'Hooli-Strike-Team'

################################################################################
## Global flag that simulates a logged in state for testing the modal window
## for the home page.
##
##   1. Set logged_in to either True or False
##   2. Navigate to home page:
##     a. When logged_in is set to True, the modal window is displayed
##     b. When logged_in is set to False, no modal window is displayed
##
## Note: to ensure that the correct page content is displayed, re-run
##       test_app.py whenever the value of logged_in is changed
##
logged_in = True

# Insert wrapper for handling PROXY when using csel.io virtual machine
prefix.use_PrefixMiddleware(app)   

# Test route to show prefix settings
@app.route('/prefix_url')  
def prefix_url():
    return 'The URL for this page is {}'.format(url_for('prefix_url'))

@app.route('/')
def home():
    # If login has been simulated, display modal window
    if logged_in:
        return render_template('home.html', show_logged_in_content=True)
    else:
        return render_template('home.html', show_logged_in_content=False)

@app.route('/create-account')
def create_account():
    return render_template('create-account.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/difficulty')
def show_difficulty():
    return render_template('difficulty.html')

@app.route('/rules')
def show_rules():
    return render_template('rules.html')

@app.route('/achievements')
def show_achievements():
    return render_template('achievements.html')

@app.route('/settings')
def show_settings():
    return render_template('settings.html')

################################################################################

if __name__ == '__main__':
  # app.run(host='0.0.0.0', port=3308)
    app.run(host='localhost', port=3308)