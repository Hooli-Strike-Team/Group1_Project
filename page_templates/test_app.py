import prefix
import os
import sqlite3
import logging

from flask import Flask, url_for, render_template, redirect, session, g, request, jsonify, render_template_string
from functools import wraps
# from flask_sqlalchemy import SQLAlchemy
DATABASE="./SQL/controller_db"
db_path = './SQL/settings_test_db'

# Create app to use in Flask application
app = Flask(__name__)

# Secret key for session object (testing purposes)
# Note: this is a really bad secret key!
app.secret_key = 'Hooli-Strike-Team'

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
    
# Custom decorator to restrict access to specific routes
def login_required(f):
    @wraps(f)
    def require_login(*args, **kwargs):
        if 'username' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return require_login
  
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

        
@app.route('/game_state/<string:username>', methods=['POST', 'GET'])
def game_state(username):
    if request.method == 'GET':
        db = sqlite3.connect(db_path)
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Games_In_Progress WHERE Username = ?", (username,))
        results = cursor.fetchall()
        db.close()
        return jsonify(results)
    
    if request.method == 'POST':
        data = request.get_json()[0]
        db = sqlite3.connect(db_path)
        if data['Update_Type'] == 'New Game':
            with db:
                db.execute('''UPDATE Games_In_Progress SET 'Original_Game' = :Original_Game, 'Game' = :Game, 'Current_Time' = :Current_Time, 'Difficulty' = :Difficulty, 'Mistakes_Count' = :Mistakes_Count WHERE Username=:Username''', data)
                cursor = db.cursor()
                cursor.execute("SELECT * FROM Games_In_Progress WHERE Username = ?", (username,))
                results = cursor.fetchall()
                app.logger.info(results)
        elif data['Update_Type'] == 'Current Game':
            with db:
                db.execute('''UPDATE Games_In_Progress SET 'Game' = :Game, 'Current_Time' = :Current_Time WHERE Username=:Username''', data)
                cursor = db.cursor()
                cursor.execute("SELECT * FROM Games_In_Progress WHERE Username = ?", (username,))
                results = cursor.fetchall()
                app.logger.info(results)
        elif data['Update_Type'] == 'Mistake':
            with db:
                db.execute('''UPDATE Games_In_Progress SET 'Mistakes_Count' = :Mistakes_Count WHERE Username=:Username''', data)
                cursor = db.cursor()
                cursor.execute("SELECT * FROM Games_In_Progress WHERE Username = ?", (username,))
                results = cursor.fetchall()
                app.logger.info(results)
        db.close()
        return 'nothing'

  
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
    # If 'username' is in the session, display the modal window
    if 'username' in session:
        username = session['username']
        db = sqlite3.connect(db_path)
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Games_In_Progress WHERE Username = ?", (username,))
        results = cursor.fetchall()
        db.close()
      
        if results:
          return render_template('home.html', show_logged_in_content=True, show_resume_game=True)
        else:
          return render_template('home.html', show_logged_in_content=True, show_resume_game=False)
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
            with sqlite3.connect(db_path) as con:  # db connection object
                cur = con.cursor()
                ####  NEEDS TO BE TURNED ON FOR EVERY CONNECTION INVOLVING INSERT/DELETE ####
                cur.execute("PRAGMA foreign_keys = ON;") 
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
            with sqlite3.connect(db_path) as con:  # db connection object
                cur = con.cursor()    
                query = cur.execute("""
                SELECT COUNT(*)
                FROM User_Account
                WHERE Username = ? AND Password = ?;
                """, (username, password))
                user_exists = query.fetchone()[0]
                app.logger.info(user_exists)
                app.logger.info(username)
                app.logger.info(password)
                if (int(user_exists)):  # 
                    con.commit()
                    msg = "Record successfully added"
                    session['username'] = request.form['uname_si']
                    return redirect(url_for('main'))
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




@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))




#testing for the Mistakes counter slider in settings 
mistakes_counter = False
resume_game = False


@app.route('/main')
@login_required
def main():
    return render_template('main.html', mistakes_counter=mistakes_counter)

@app.route('/rules')
def show_rules():
    return render_template('rules.html')



@app.route('/achievements', methods=['POST', 'GET'])
@login_required
def show_achievements():
    ## Pull from database to set flags
    ## Select Query
    risk_taker = False
    speed_runner = False # if the user has met the requirements for the Speed Runner badge
    conqueror = False # if the user has met the requirements for the Conqueror badge
    lone_wolf = False # if the user has met the requirements for the Lone Wolf badge 
    strategist = False # if the user has met the requirements for the Inquisitor badge
    puzzle_master = False # if the user has met the requirements for the Puzzle Master badge
    
    risk_flag = 0
    speed_flag = 0 
    wolf_flag = 0
    strat_flag = 0 
    master_flag = 0
    conqueror_flag = 0
    
    error = None

    if request.method == 'GET':
        
        # Added session check
        if 'username' in session:
            username = session['username']
            db = sqlite3.connect(db_path)
            with db:
                for result in db.execute("SELECT * FROM User_Achievements WHERE Username = ?", (username,)):
                    strat_flag = result[1] 
                    wolf_flag = result[2] 
                    master_flag = result[3] 
                    risk_flag = result[4] 
                    speed_flag = result[5] 
                    conqueror_flag = result[6] 
                    print(result) 

                if (strat_flag == 1):
                    strategist = True
                    print("strategist", strategist) 
                if (speed_flag == 1):
                    speed_runner = True
                    print("Speed_Runner", speed_runner) 
                if (wolf_flag == 1):
                    lone_wolf = True
                    print("Lone_Wolf", lone_wolf) 
                if(master_flag == 1): 
                    puzzle_master = True
                    print("Puzzle_Master", puzzle_master) 
                if(risk_flag == 1):
                    risk_taker = True 
                    print("Risk_Taker", risk_taker) 
                if(conqueror_flag == 1):
                    conqueror = True
                    print("Conqueror", conqueror) 
            db.close() 
    
    return render_template('achievements.html', risk_taker=risk_taker, lone_wolf=lone_wolf, puzzle_master=puzzle_master, 
                           speed_runner=speed_runner, strategist=strategist, conqueror=conqueror)
   

@app.route('/record', methods=['POST', 'GET'])    
def record_stats():
    difficulty = ""
    timer = 0 
    best_time_hard = 50000 # TODO: CHANGE VALUE
    
    hard = 0
    med = 0 
    easy = 0
    no_mistakes = 0
    speed = 0 
    notes = 0
    
    if request.method == 'POST':
         if 'username' in session:
            username = session['username']
            data = request.get_json()
            db = sqlite3.connect(db_path)
            with db:



                db.execute('''UPDATE Games_In_Progress SET 
                            'Current_Time' = :Current_Time,
                            'Difficulty' = :Difficulty,
                            'Mistakes_Checked' = :Mistakes_Checked,
                            'Notes_Checked' = :Notes_Checked
                             WHERE Username=:Username''', data)

                for result in db.execute("SELECT * FROM Games_In_Progress WHERE Username = ?", (username,)):
                        print("Difficulty", result[5])
                        print("Timer", result[2])
                        print("Mistakes Made", result[8]) 
                        print("Notes_Checked", result[7]) 

                        difficulty = result[5]
                        timer = result[2] 


               # # Update Games completed on Hard # #
                if difficulty == "Hard":  
                    db.execute('''
                            UPDATE Achievement_Stats SET HardGamesCompleted = HardGamesCompleted + 1 WHERE Username=:Username''', data)


                    for result in db.execute("SELECT * FROM Achievement_Stats WHERE Username = ?", (username,)):
                            print("Hard Games Completed", result[3]) 



                # # Update Best_Time_Hard # #
                ## TODO: if None insert, else if newtime < oldtime insert ## 
                ## Matt is going to initialize "Best_Time" to none. 
                    if (best_time_hard > timer):

                        db.execute('''
                                UPDATE Achievement_Stats SET Best_Time_Hard = :Current_Time WHERE Username=:Username''', data)

                    elif ( best_time_hard < timer):
                        print("Current time is not better than best time on hard")
                        for result in db.execute("SELECT * FROM Achievement_Stats WHERE Username = ?", (username,)):
                                print("Best_Time_Hard", result[6])
               # Update Games completed on medium      
                elif difficulty == "Medium":
                    db.execute('''
                            UPDATE Achievement_Stats SET MedGamesCompleted = MedGamesCompleted + 1 WHERE Username=:Username''', data)


               # Update Games completed on Easy          
                elif difficulty == "Easy":
                    db.execute('''
                            UPDATE Achievement_Stats SET EasyGamesCompleted = EasyGamesCompleted + 1 WHERE Username=:Username''', data)




              ####### LOGIC #######              

                for result in db.execute("SELECT * FROM Achievement_Stats WHERE Username = ?", (username,)):
                    print("EasyGamesCompleted", result[1]) 
                    print("MedGamesCompleted", result[2])     
                    print("HardGamesCompleted", result[3])
                    easy = result[1]
                    med = result[2]
                    hard = result[3]

                    # # If Users completed at least three hard games, unlock Risk Taker Badge # #      
                    if (hard >= 3): 
                        db.execute('''
                            UPDATE User_Achievements SET RiskTaker = 1 WHERE Username=:Username''', data)
                            

                        for result in db.execute("SELECT * FROM User_Achievements WHERE Username = ?", (username,)):
                            print("Risk_Taker", result[4]) 


                    # # If User beats a hard game under 10 minutes Speed_Runner is unlocked 

                    print("Best_Time_Hard", result[6]) 
                    speed = result[6]

                    ## 600 seconds is the same as 10 minutes 
                    if (hard >= 1 and speed <= 600):
                        db.execute('''
                            UPDATE User_Achievements SET SpeedRunner = 1 WHERE Username=:Username''', data)
                         
                        for result in db.execute("SELECT * FROM User_Achievements WHERE Username = ?", (username,)):
                            print("Speed Runner", result[5]) 


                    # # If user completes one puzzle on each difficulty # # 

                    if (1 <= hard and 1 <= med and 1 <= hard):
                        db.execute('''
                            UPDATE User_Achievements SET Conqueror = 1 
                            WHERE Username=:Username''', data) 
                        
                        for result in db.execute("SELECT * FROM User_Achievements WHERE Username = ?", (username,)):
                            print("Conqueror", result[6]) 



                for result in db.execute("SELECT * FROM Games_In_Progress WHERE Username = ?", (username,)):
                    no_mistakes = result[8]
                    notes = result[7] 
                    # Even though the feature is a toggle, were looking for zero click or toggles 
                    if (no_mistakes < 1):
                        db.execute('''
                            UPDATE User_Achievements SET LoneWolf = 1 WHERE Username=:Username''', data)
                            
                        for result in db.execute("SELECT * FROM User_Achievements WHERE Username = ?", (username,)):
                            print("LoneWolf", result[2]) 


                    # 6 clicks about for the fact that the feature is a toggle
                    # 6 clicks is the same as 3 full toggles 
                    if (notes >= 6):
                        db.execute('''
                            UPDATE User_Achievements SET Inquisitor = 1 WHERE Username=:Username''', data)
                             
                        for result in db.execute("SELECT * FROM User_Achievements WHERE Username = ?", (username,)):
                            print("strategist", result[1]) 




            db.commit()    
            db.close() 
        
    return "Achievement Stats Updated" 


@app.route('/Master', methods=['POST', 'GET'])
def Puzzle_Master_Badge():
    error = None
    puzzle_master = 0

    if request.method == 'GET':
        if 'username' in session:
            username = session['username']
            db = sqlite3.connect(db_path)
            results = []
            with db: 
                for result in db.execute("SELECT * FROM Puzzle_Master WHERE Username = ?", (username,)):
                    results.append(result) 
                    print("result of Puzzle Master", results) 



            db.close() 
            return jsonify(results)
    
    if request.method == 'POST':
        if 'username' in session:
            username = session['username']
            data = request.get_json()
            db = sqlite3.connect(db_path)
            with db:

                db.execute('''UPDATE Puzzle_Master SET 
                            'Game1_Easy' = :Game1_Easy,
                            'Game2_Easy' = :Game2_Easy,
                            'Game3_Easy' = :Game3_Easy,
                            'Game4_Easy' = :Game4_Easy,
                            'Game1_Med' = :Game1_Med,
                            'Game2_Med' = :Game2_Med,
                            'Game3_Med' = :Game3_Med,
                            'Game4_Med' = :Game4_Med, 
                            'Game1_Hard' = :Game1_Hard,
                            'Game2_Hard' = :Game2_Hard, 
                            'Game3_Hard' = :Game3_Hard, 
                            'Game4_Hard' = :Game4_Hard
                             WHERE Username=:Username''', data)

                i = 1 
                for master in db.execute("SELECT * FROM Puzzle_Master WHERE Username = ?", (username,)):
                    print(master) 
                    while (i < 13):
                        if(master[i] == 1): 
                            puzzle_master = puzzle_master + 1 

                        i = i + 1 


                    if (puzzle_master == 12): 
                        db.execute('''
                            UPDATE User_Achievements SET PuzzleMaster = 1 
                            WHERE Username = ? 
                            ''', (username,))
                        for result in db.execute("SELECT * FROM User_Achievements WHERE Username = ?", (username,)):
                            print("strategist", result[3]) 

            db.commit()
            db.close()

            return "Puzzle Master Achievement Updated" 

        return "Nothing"



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