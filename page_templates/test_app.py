import prefix

from flask import Flask, url_for, render_template, request, session, redirect

# Create app to use in Flask application
app = Flask(__name__)
# Set secret key for session use
app.secret_key = 'hooli-strike-team'

# Insert wrapper for handling PROXY when using csel.io virtual machine
prefix.use_PrefixMiddleware(app)   

# Test route to show prefix settings
@app.route('/prefix_url')  
def prefix_url():
    return 'The URL for this page is {}'.format(url_for('prefix_url'))

@app.route('/')
def home():
    if session.get('logged_in'):
        return redirect(url_for('show_difficulty', from_home=True))
    else:
        return render_template('home.html')

@app.route('/create-account')
def create_account():
    return render_template('create-account.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        
        # TODO: Check for username and password
        
        # Set logged_in key to True to demo redirect functionality (see below)
        session['logged_in'] = False
        # Redirect user to difficulty page with "welcome back" message
        return redirect(url_for('show_difficulty', from_home=True))
    
    # If request method is not POST, render login form
    else:
        return render_template('login.html')

@app.route('/main')
def main():
    return render_template('main.html')

@app.route('/difficulty')
def show_difficulty():
    from_home = request.args.get('from_home')
    if from_home:
        message = 'Welcome back!'
    else:
        message = ''
    return render_template('difficulty.html', message=message)

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
# Testing redirect from home page to difficulty page:
#
#   1. /login - when the user submits the form by clicking the "Login" button,
#               the form data is sent to the login() function in Flask code as
#               part of a POST request
#
#   2. /logout - removes the logged_in key from the session dictionary when a 
#                user navigates to the route
#

@app.route('/logout')
def logout():
    # Remove the logged_in key from the session dictionary
    session.pop('logged_in', None)
    
    # Redirect the user to the home page
    return redirect(url_for('home'))

################################################################################

if __name__ == '__main__':
  # app.run(host='0.0.0.0', port=3308)
    app.run(host='localhost', port=3308, debug=True)