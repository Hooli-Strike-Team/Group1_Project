#!/usr/bin/python3 

#Authors: Paul Schneider TEST
#Date: April 2023
#Purpose: Create a database for the website 

import sqlite3 
           
def create(db_filename):
    conn = sqlite3.connect(db_filename) 
    c = conn.cursor() 
    
    #Create User_Account Table
    c.execute("""
            CREATE TABLE IF NOT EXISTS User_Account(
                Username VARCHAR(32),
                Password VARCHAR(16),
                First_Name VARCHAR(50),
                Last_Name VARCHAR(50),
                Email VARCHAR(320) UNIQUE, 
                PRIMARY KEY(Username))""")

    
    
    #Create User_Achievements Table
    c.execute("""
    
            CREATE TABLE IF NOT EXISTS User_Achievements(
                Username VARCHAR(32),
                Inquisitor BOOLEAN,
                LoneWolf BOOLEAN,
                PuzzleMaster BOOLEAN,
                RiskTaker BOOLEAN,
                SpeedRunner BOOLEAN,
                Conqueror BOOLEAN,
                PRIMARY KEY(Username), 
                CONSTRAINT fk_user_achievements 
                    FOREIGN KEY(Username) REFERENCES User_Account(Username)
                    ON DELETE CASCADE)
                    
            """)
    
    
    #Create Puzzle_Master Table
    c.execute("""
    
            CREATE TABLE IF NOT EXISTS Puzzle_Master(
                Username VARCHAR(32),
                Game1_Easy BOOLEAN,
                Game2_Easy BOOLEAN,
                Game3_Easy BOOLEAN,
                Game4_Easy BOOLEAN,
                Game1_Med BOOLEAN, 
                Game2_Med BOOLEAN,
                Game3_Med BOOLEAN,
                Game4_Med BOOLEAN,
                Game1_Hard BOOLEAN,
                Game2_Hard BOOLEAN,
                Game3_Hard BOOLEAN,
                Game4_Hard BOOLEAN,
                PRIMARY KEY(Username), 
                CONSTRAINT fk_puzzle_master
                    FOREIGN KEY(Username) REFERENCES User_Account(Username)
                    ON DELETE CASCADE)
                    
            """)
    
    #Create Achievement_Stats Table 
    c.execute("""
    
            CREATE TABLE IF NOT EXISTS Achievement_Stats(
                Username VARCHAR(32),
                EasyGamesCompleted INT,
                MedGamesCompleted INT,
                HardGamesCompleted INT,
                Best_Time_Easy FLOAT,
                Best_Time_Med FLOAT,
                Best_Time_Hard FLOAT,
                PRIMARY KEY(Username),
                CONSTRAINT fk_achievement_stats
                    FOREIGN KEY(Username) REFERENCES User_Account(Username)
                    ON DELETE CASCADE)
                    
            """)
    
    #Create Games_In_Progress Table
    c.execute("""
    
            CREATE TABLE IF NOT EXISTS Games_In_Progress(
                Username VARCHAR(32),
                Game_ID INT,
                Current_Time INT,
                Game VARCHAR(100),
                Difficulty VARCHAR(6),
                Mistakes_Checked INT,
                Notes_Checked INT,
                PRIMARY KEY(Username), 
                CONSTRAINT fk_games_in_progress
                    FOREIGN KEY(Username) REFERENCES User_Account(Username)
                    ON DELETE CASCADE)

            """)
    
    #Create Game_Settings Table 
    c.execute("""
            
            CREATE TABLE IF NOT EXISTS Game_Settings(
                Username INT,
                Show_Clock BOOLEAN,
                Show_Mistakes_Counter BOOLEAN,
                PRIMARY KEY(Username), 
                CONSTRAINT fk_game_settings
                    FOREIGN KEY(Username) REFERENCES User_Account(Username)
                    ON DELETE CASCADE)
            
            """)
    
    conn.commit()
    conn.close()
    
                
def print_tables(db_filename): # Prints information in tables to be used for debugging 
    conn = sqlite3.connect(db_filename)
    c = conn.cursor()
    c.execute("SELECT name FROM sqlite_master WHERE type='table';")
    
    print("\nTables:")
    for t in c.fetchall() :
        print("\t[%s]"%t[0])
        
        print ("\tColumns of", t[0])
        c.execute("PRAGMA table_info(%s);"%t[0])
        for attr in c.fetchall() :
            print ("\t\t", attr)

            
def delete_tables(db_filename):
    conn = sqlite3.connect(db_filename) 
    with sqlite3.connect(db_filename) as conn:
        c = conn.cursor() 
        #Create User_Account Table
        c.execute("DROP TABLE IF EXISTS User_Account;")
        c.execute("DROP TABLE IF EXISTS User_Achievements;")
        c.execute("DROP TABLE IF EXISTS Achievement_Stats;")
        c.execute("DROP TABLE IF EXISTS Puzzle_Master;")
        c.execute("DROP TABLE IF EXISTS Games_In_Progress;")
        c.execute("DROP TABLE IF EXISTS Game_Settings;")
        conn.commit()
        
