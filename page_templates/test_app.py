import prefix

from flask import Flask, url_for, render_template, redirect, session

# Create app to use in Flask application
app = Flask(__name__)
# Secret key for session object
app.secret_key = 'Hooli-Strike-Team'

################################################################################
## Global flag that simulates a logged in state for testing the redirection from 
## the home page to the difficulty page.
##
##   1. Set logged_in to either True or False
##   2. Navigate to home page:
##     a. When logged_in is set to True, the view function for the home page 
##        redirects to the difficulty page
##     b. When logged_in is set to False, the home page is displayed
##
## Note: to ensure that the correct pages and page content are displayed,
##       re-run test_app.py after changes have been made to the value of 
##       logged_in.
##
logged_in = False

# Insert wrapper for handling PROXY when using csel.io virtual machine
prefix.use_PrefixMiddleware(app)   

# Test route to show prefix settings
@app.route('/prefix_url')  
def prefix_url():
    return 'The URL for this page is {}'.format(url_for('prefix_url'))

@app.route('/')
def home():
    # If login has been simulated, redirect user to difficulty page
    if logged_in:
        # Set flag to indicate redirect from home page
        session['redirected_from_home'] = True 
        return redirect(url_for('show_difficulty'))
    # Otherwise, display home page
    else:
        return render_template('home.html')

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
    # Get flag and remove it from session
    redirected_from_home = session.pop('redirected_from_home', False)
    # If user has been redirected from home page, display "welcome back" message
    if redirected_from_home:
        return render_template('difficulty.html', redirected_from_home=True)
    # Otherwise, display difficulty page without "welcome back" message
    else:
        return render_template('difficulty.html', redirected_from_home=False)

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