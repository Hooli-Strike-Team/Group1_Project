#!/usr/bin/python3 

#Authors: Paul Schneider
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
                Email VARCHAR(320), 
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
                FOREIGN KEY(Username) REFERENCES User_Account(Username)) 
                
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
                AccountLevel FLOAT,
                PRIMARY KEY(Username),
                FOREIGN KEY(Username) REFERENCES User_Account(Username)) 
                
            """)
    
    #Create Games_In_Progress Table
    c.execute("""
    
            CREATE TABLE IF NOT EXISTS Games_In_Progress(
                Username VARCHAR(32),
                Game_ID INT,
                Current_Time TEXT,
                Game BLOB,
                PRIMARY KEY(Game_ID), 
                FOREIGN KEY(Username) REFERENCES User_Account(Username)) 

            """)
    
    #Create Game_Settings Table 
    c.execute("""
            
            CREATE TABLE IF NOT EXISTS Game_Settings(
                Username INT,
                Show_Mistakes BOOLEAN,
                Show_Clock BOOLEAN,
                Show_Hints BOOLEAN,
                Candidate_Mode BOOLEAN,
                Show_Mistakes_Counter BOOLEAN,
                Difficulty VARCHAR(6),
                PRIMARY KEY(Username), 
                FOREIGN KEY(Username) REFERENCES Games_In_Progress(Username)) 
            
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
    