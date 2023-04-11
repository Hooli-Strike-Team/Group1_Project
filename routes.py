import prefix
import datetime

from flask import Flask, abort, redirect, url_for, request, render_template
from markupsafe import escape, Markup

app = Flask(__name__)

# Eventually we need to migrate our application to a production environment (e.g. Heroku or AWS)
# We probably want the application to remain portable enough to run in a local Linux environment as well. 

# wrapper for handling proxy server in the csel.io development environment. Has no effect in a locally-hosted server. 
prefix.use_PrefixMiddleware(app)

@app.route('/prefix_url')
def prefix_url():
    return 'Current prefix url: ' .format(url_for('prefix_url'))

@app.route('/prefix_url/')
def index():
    return render_template('homepage.html')


# Login page route
# source: https://realpython.com/introduction-to-flask-part-2-creating-a-login-page/
@app.route('/prefix_url/login', methods=['GET', 'POST'])
def login():
    # route needs DB access to perform its' primary function(s)
    error = None
    if request.method == 'POST':
        # introduce server-side logic to validate user credentials via Db query.
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:
            return redirect(url_for('home'))
    return render_template('login.html', error=error)  # return an error message if exists.


# Create Account page route
def create_account('/prefix_url/create_account', methods=['POST']):
    # route needs DB access to perform its' primary function
    return render_template('create_account.html')



<!--ADD NEW ROUTES ABOVE THIS LINE-->


if __name__ == '__main__'
    <!--Allows app to be hosted on the embedded csel server.-->
    app.run(host='0.0.0.0', port 3308)

