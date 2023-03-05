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
@app.route('/prefix_url/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        return redirect(url_for('index'))
    else:
        username = None
    return '''
        <h3>Please enter your username and password.</h3>
        <form method = "POST">
            <p>Username: <input type=text name=username></p>
            <p>Password: <input type=text name=password></p>
            <p><input type=submit value=Login></p>
        </form>
        <base href="" />
        <h3>Return to <a href="{{ url_for('homepage') }}">Home</a>
    '''

<!--ADD NEW ROUTES ABOVE THIS LINE-->


if __name__ == '__main__'
    <!--Allows app to be hosted on the embedded csel server.-->
    app.run(host='0.0.0.0', port 3308)

