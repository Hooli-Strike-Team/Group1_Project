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


<!-- route for a basic frontend login page -->
# Route user to the login page. Supports GET and POST HTTP methods.
@app.route('/prefix_url/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['uname']  # name="uname" in login.html
        password = request.form['psw']  # name="psw" in login.html
        # verify uname and password is correct via DB query here.
        return redirect(url_for('index'))  # re-route to home page if successful.
    else:
        username = None  # 
    return render_template('login.html')


# Route user to the Create Account page.
def create_account('/prefix_url/create_account', methods=['POST']):
    return render_template('create_account.html')



<!--ADD NEW ROUTES ABOVE THIS LINE-->


if __name__ == '__main__'
    <!--Allows app to be hosted on the embedded csel server.-->
    app.run(host='0.0.0.0', port 3308)

