import prefix

from flask import Flask, url_for, render_template, request

# Create app to use in Flask application
app = Flask(__name__)

# Insert wrapper for handling PROXY when using csel.io virtual machine
prefix.use_PrefixMiddleware(app)   

# Test route to show prefix settings
@app.route('/prefix_url')  
def prefix_url():
    return 'The URL for this page is {}'.format(url_for('prefix_url'))

@app.route('/')
def home():
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