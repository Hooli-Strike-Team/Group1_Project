import prefix
import os
import sqlite3
import logging

from flask import Flask, url_for, render_template, redirect, session, g, request, jsonify, render_template_string
# from flask_sqlalchemy import SQLAlchemy
DATABASE="./SQL/controller_db"

# Create app to use in Flask application
app = Flask(__name__)
# Secret key for session object
app.secret_key = 'Hooli-Strike-Team'
g
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
db_path = './SQL/settings_test_db'

########## SQLAlchemy Version ####################
# # create the extension
# db = SQLAlchemy()
# # create the app
# app = Flask(__name__)
# # configure the SQLite database, relative to the app instance folder
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + db_path
# # initialize the app with the extension
# db.init_app(app)

############## Striaght SQLite Version ##############
# Flask handler opens and closes connection on teardown

# def get_db():
#     if 'db' not in g:
#         g.db = sqlite3.connect(db_path)

#     return g.db

# @app.teardown_appcontext
# def close_connection(exception):
#     db = getattr(g, '_database', None)
#     if db is not None:
#         db.close()

########## Logging ###################
handler = logging.FileHandler("test.log")  # Create the file logger
app.logger.addHandler(handler)             # Add it to the built-in logger
app.logger.setLevel(logging.DEBUG)         # Set the log level to debug
    
@app.route('/post_achievements', methods=['POST', 'GET'])
def post_achievements():
    error = None
    if request.method == 'POST':
        data = request.get_json()
        db = sqlite3.connect(db_path)
        with db:
                db.execute("UPDATE Achievement_Stats VALUES ();",data)

        db.close()
        app.logger.info(data)
        return 'nothing'
    app.logger.info('not post')
    return "Not POST" 
    
@app.route('/game_state', methods=['POST', 'GET'])
def get_game_state():
    error = None
    if request.method == 'POST':
        data = request.get_json()
        db = sqlite3.connect(db_path)
        with db:
                db.execute('''UPDATE Games_In_Progress SET 'Current_Time' = :Current_Time, 'Game' = :Game WHERE 'Game_ID' = :Game_ID''', data)
                for result in db.execute("SELECT * FROM User_Account;"):
                    results.append(result) 

        db.close()
        app.logger.info(data)
        return 'nothing'
    app.logger.info('not post')
    return "Not POST" 
  
@app.route('/game_settings/<string:username>', methods=['GET', 'POST'])
def game_settings(username):
    if request.method == 'GET':
        db = sqlite3.connect(db_path)
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Game_Settings WHERE Username = ?", (username,))
        results = cursor.fetchall()
        db.close()
        return jsonify(results)

    if request.method == 'POST':
        data = request.get_json()
        db = sqlite3.connect(db_path)

        # Check if record already exists with the given username
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Game_Settings WHERE Username = ?", (username,))
        result = cursor.fetchone()

        if result is None:
            # Record doesn't exist, so insert a new row
            db.execute("INSERT INTO Game_Settings (Username, Show_Clock, Show_Mistakes_Counter) VALUES (?, ?, ?)",
                        (username, data['Show_Clock'], data['Show_Mistakes_Counter']))
            db.commit()
            db.close()
            app.logger.info(data)
            return 'Record inserted successfully'
        else:
            # Record already exists, so update the existing row
            db.execute("UPDATE Game_Settings SET Show_Clock = ?, Show_Mistakes_Counter = ? WHERE Username = ?",
                        (data['Show_Clock'], data['Show_Mistakes_Counter'], username))
            db.commit()
            db.close()
            app.logger.info(data)
            return 'Record updated successfully'
    
@app.route('/test_receive', methods=['POST', 'GET'])
def receive():
    error = None
    if request.method == 'POST':
        data = request.get_json()
        db = sqlite3.connect(db_path)
        with db:
                db.execute("INSERT INTO User_Account VALUES (:User_Account, 'LarBear25','Paul','Schneider','dogluver@email.com');",data)

        db.close()
        app.logger.info(data)
        return 'nothing'
    app.logger.info('not post')
    return "Not POST" 

    
@app.route('/test_get', methods=['POST', 'GET'])
def test_get():
    error = None
    if request.method == 'GET':
        db = sqlite3.connect(db_path)
        results = [] 
        with db:
             # for user in [{'Username':'RandyBoBandy-71'},]:
             #    db.execute("INSERT INTO User_Account VALUES (:Username, 'LarBear25','Paul','Schneider','dogluver@email.com');",user)
                # c.execute("SELECT name FROM sqlite_master WHERE type='table';")
                # for result in db.execute("SELECT * FROM User_Account;"):
                #     results.append(result) 
                for result in db.execute('''SELECT json_group_array( json_object(
                                                    'Username', Username,
                                                    'Password', Password,
                                                    'First_Name', First_Name,
                                                    'Last_Name', Last_Name,
                                                    'Email', Email))
                                          FROM User_Account
                                          '''):
                    results.append(result)
        db.close()

    return results
    
    
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

    
    
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## 
#    AREA BELOW IS UNDER CONSTRUCTION - Micah
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## 
    
# = = = = = = = = CREATE ACCOUNT = = = = = = = = = = #
@app.route('/create-account', methods = ['POST', 'GET'])
def create_account():
    if request.method == 'POST':
        try:
            username = str(request.form['uname'])
            session['username'] = request.form['uname']
            password = str(request.form['psw'])
            session['password'] = request.form['psw']
            firstname = str(request.form['fname'])
            session['firstname'] = request.form['fname']
            lastname = str(request.form['lname'])
            session['lastname'] = request.form['lname']
            email = str(request.form['email']) 
            session['email'] = request.form['email']
            with sqlite3.connect(DATABASE) as con:  # db connection object
                cur = con.cursor()
                cur.execute("""
                INSERT INTO User_Account
                (Username,Password,First_Name,Last_Name,Email) 
                VALUES (?,?,?,?,?);
                """, (username, password, firstname, lastname, email))
                con.commit()
                msg = "Record successfully added"
                return redirect('login')
        except:
            con.rollback()
            con.close()
            msg = "Error in insert operation"
            return render_template('create-account.html', msg=msg)
    else:
        return render_template('create-account.html')

    
# = = = = = = = = LOGIN = = = = = = = = = = #
@app.route('/login', methods = ['POST', 'GET'])
def login():
    if request.method == 'POST':
        try:
            username = str(request.form['uname_si'])
            password = str(request.form['psw_si'])
            with sqlite3.connect(DATABASE) as con:  # db connection object
                cur = con.cursor()    
                query = cur.execute("""
                SELECT COUNT(*)
                FROM User_Account
                WHERE Username = ? AND Password = ?;
                """, (username, password))
                user_exists = query.fetchone()
                app.logger.info(user_exists)
                app.logger.info(username)
                app.logger.info(password)
                if (int(user_exists)):  # 
                    con.commit()
                    msg = "Record successfully added"
                    return redirect('main')
                else:
                    return render_template('login.html')
        except:
            con.rollback()
            con.close()
            msg = "Error in insert operation"
            return render_template('login.html', msg=msg)
    else:
        return render_template('login.html')


## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## 
#    AREA ABOVE IS UNDER CONSTRUCTION - Micah
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## 







#testing for the Mistakes counter slider in settings 
mistakes_counter = False 


@app.route('/main')
def main():
    return render_template('main.html', mistakes_counter=mistakes_counter)

@app.route('/difficulty')
def show_difficulty():
    return render_template('difficulty.html')

@app.route('/rules')
def show_rules():
    return render_template('rules.html')

lone_wolf = False # if the user has met the requirements for the Lone Wolf badge 
puzzle_master = False # if the user has met the requirements for the Puzzle Master badge
speed_runner = False # if the user has met the requirements for the Speed Runner badge
inquisitor = False # if the user has met the requirements for the Inquisitor badge
conqueror = False # if the user has met the requirements for the Conqueror badge 

@app.route('/achievements', methods=['POST', 'GET'])
def show_achievements():
    ## Pull from database to set flags
    ## Select Query
    risk_taker = False
    test = 0 

    if request.method == 'GET':
        db = sqlite3.connect(db_path)
                
        for result in db.execute("SELECT * FROM Achievement_Stats;"):
                 
            app.logger.info("HardGamesCompleted", result[3])
            test = result[3]
                    
            if (test >= 3): 
                risk_taker = True 
                print("Risk_Taker",type(risk_taker))
                print("Result_1",test)
                    
        db.close()

    print("Result_2",test)
    print("Risk_Taker",risk_taker)
    
    return render_template('achievements.html', risk_taker=risk_taker, lone_wolf=lone_wolf, puzzle_master=puzzle_master, 
                           speed_runner=speed_runner, inquisitor=inquisitor, conqueror=conqueror)
   

@app.route('/record', methods=['POST', 'GET'])    
def record_stats():
    if request.method == 'POST':
        data = request.get_json()
        db = sqlite3.connect(db_path)
        with db:
    
            #db.execute("INSERT INTO Achievement_Stats VALUES (:Username, 0, 0, 0, 0, 0, 0, 0);",data)
        
            #db.execute("INSERT INTO Games_In_Progress VALUES (:Username, 0, 0, 'null', 'null');",data)
            
          
            db.execute('''UPDATE Games_In_Progress SET 
                        'Username' = :Username,
                        'Current_Time' = :Current_Time,
                        'Difficulty' = :Difficulty
                        
                        ''', data)
            
            for result in db.execute("SELECT * FROM Games_In_Progress;"):
                    print("Time", result[2])
                    print("Difficulty", result[4])
    
            db.execute('''
                    UPDATE Achievement_Stats SET HardGamesCompleted = HardGamesCompleted + 1 
                    ''') 
            
            db.commit() 
            
            
            for result in db.execute("SELECT * FROM Achievement_Stats;"):
                    print("Hard Games Completed", result[3]) 
            
        db.commit()    
        db.close() 
        
    return "Achievement Stats Updated" 



@app.route('/settings')
def show_settings():
    return render_template('settings.html')
  
@app.route('/tutorial')
def show_tutorial():
    return render_template('tutorial.html')

################################################################################

if __name__ == '__main__':
  # app.run(host='0.0.0.0', port=3308)
    app.run(host='localhost', port=3308)