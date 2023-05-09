
# 3308 Project Group 1


Project Title: 
    
    Sudoku Sage

Team Number: 

    Team #1; 

Team/Product: 
    
    "Hooli-Strike Team"
    
Team members (list the name, git username, and email for each member): 

    Paul  PaulMSchneider  Paul.Schneider-1@colorado.edu 
    Tory Swensen  vswensen  visw4412@colorado.edu
    Benjamin Allen  BenJimAllen beal2144@colorado.edu
    Matthew Tuttle  Mst263  matt.tutt@gmail.com
    Micah Simmerman  Micah614  jasi9001@colorado.edu


Vision statement: 
    
    Sudoku Sage features a variety of Sudoku puzzles with varying degrees of difficulty, accessible tutorials, and practical tools such as error checking, notes, a timer, and the ability to return to in-progress games. We also implemented an achievements system to encourage and reward users for their progress.

    The goal of Sudoku Sage is to create a supportive and user-friendly web-based Sudoku platform that would enhance the enjoyment and understanding of the classic puzzle experience for players of all levels.


  
Motivation: 

    1.) The project accommodates the varied skill sets and experience levels of the Hooli-Strike Team. 
        It also offers ample opportunity for team members to expand their programming knowledge.
       
    2.) Logic games such as Sudoku and Chess are difficult to master on one’s own. Computer-assisted
        learning technologies help users to improve their problem-solving abilities and use specialized
        tools to provide them with instant mistake idenfication, note taking capabilities, and achievement features.
        
        
 Usage:
 
     The latest version of Sudoku Sage is available at https://sudoku-sage.onrender.com/. 

    Step 1: Creating an Account
    When you reach the landing page, click the Create Account button located at the top right corner of the page (also found under the introduction summary of the landing page). Provide a username, password, first name, last name, and email address. Note that the Username and email must be unique and cannot exist within the system (i.e., no duplicate accounts are permitted). If you have entered the account details correctly, you will be directed to the login page. 

    Step 2: Signing In
    Enter the username and password you created in step 1, and then click the sign-in button. If the username and password are entered incorrectly, the form will be redisplayed. Entering the correct username and password combination will direct you to the game page.

    Step 3: Select Game Difficulty
    Upon reaching the game page, you will be presented with a set of difficulty options (i.e., EASY, HARD, or EXPERT). The game session starts after a difficulty setting has been selected.

    Step 4: Using the Controls
    A new Sudoku board will be displayed based on the game difficulty you selected in step 3. Click a cell, then select a number from the keypad to populate the selected cell. If you wish to delete a value from the board, simply highlight the cell you wish to delete and click the backspace button located at the base of the keypad.
    If you get stuck or need a hint, clicking the "Mistakes" button will highlight the areas of improvement in your current game. You may restart the current game by clicking the "Restart" button, or load a new game by clicking "New Game". Clicking the "Tutorial" button will open a new tab where strategies for completing a game of sudoku can be found

    Step 5: Rules, Settings, and Achievements
    The rules of sudoku can be viewed by clicking the "Rules" icon in the top right corner. You can view your list of achievements at any time by clicking "Achievements" icon (also in the top right corner of the page). Requirements for earning achievement badges can be found in this video: https://drive.google.com/file/d/1nLWjcoDy0myOwdbQO-rEm0BkM0qFK8o8/view?usp=sharing. The gear icon in the upper righthand corner of the page can be used to display/hide the game clock and mistake counter on the game page.

    Step 6: Sigining Out
    Sign out of the application by clicking the "Sign Out" hyperlink, located to the right of the username display (at the top of the keypad). Clicking this link will terminate the browser session and redirect you to the landing page. 


# Folder Tree
```
project/
├── static/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   ├── achievements/
│   │   │   ├── conqueror.png
│   │   │   ├── inquisitor.png
│   │   │   ├── lone_wolf.png
│   │   │   ├── puzzle_master.png
│   │   │   ├── risk_taker.png
│   │   │   └── speed_runner.png
│   │   ├── create_account/
│   │   ├── difficulty/
│   │   ├── home/
│   │   │   └── alt_img_green.png
│   │   ├── login/
│   │   ├── logo_weights/
│   │   │   ├── logo_12px.png
│   │   │   ├── logo_16px_green_dash.png
│   │   │   ├── logo_16px.png
│   │   │   ├── logo_8px.png
│   │   │   └── logo_base.png
│   │   ├── main/
│   │   ├── rules/
│   │   └── settings/
│   └── javascript/
├── templates/
│   ├── achievements.html
│   ├── base.html
│   ├── create-account.html
│   ├── difficulty.html
│   ├── home.html
│   ├── login.html
│   ├── main.html
│   ├── rules.html
│   └── settings.html
├── color_palette_hex.png
├── prefix.py
├── README.md
├── setup.cmds
└── test_app.py
```
                                                      
| Directory or Filename                      | &emsp;&emsp; | Description                                              |
|--------------------------------------------|--------------|----------------------------------------------------------|
| project/                                   |              | Project root directory                                   |
| &nbsp;&ensp;static/                        |              | Static file directories and files                        |
| &nbsp;&emsp;css/                           |              | CSS stylesheets                                          |
| &nbsp;&emsp;&ensp;styles.css               |              | Stylesheet shared by all pages of the website            |
| &nbsp;&emsp;images/                        |              | Image directories and files for each page of the website |
| &nbsp;&emsp;&ensp;achievements/            |              | Images for the Achievements page                         |
| &nbsp;&emsp;&emsp;conqueror.png            |              | "Conqueror" badge                                        |
| &nbsp;&emsp;&emsp;inquisitor.png           |              | "Inquisitor" badge                                       |
| &nbsp;&emsp;&emsp;lone_wolf.png            |              | "Lone Wolf" badge                                        |
| &nbsp;&emsp;&emsp;puzzle_master.png        |              | "Puzzle Master" badge                                    |
| &nbsp;&emsp;&emsp;risk_taker.png           |              | "Risk Taker" badge                                       |
| &nbsp;&emsp;&emsp;speed_runner.png         |              | "Speed Runner" badge                                     |
| &nbsp;&emsp;&ensp;home/                    |              | Images for the Achievements page                         | 
| &nbsp;&emsp;&emsp;alt_img_green.png        |              | Main image for the Home page                             |
| &nbsp;&emsp;&ensp;logo_weights/            |              | Logo images with varying line thickness                  |
| &nbsp;&emsp;&emsp;logo_12px.png            |              | Weight(logo_base.png) + 12px                             |
| &nbsp;&emsp;&emsp;logo_16px_green_dash.png |              | Weight(logo_base.png) + 16px, with light green dashes    |
| &nbsp;&emsp;&emsp;logo_16px.png            |              | Weight(logo_base.png) + 16px                             |
| &nbsp;&emsp;&emsp;logo_8px.png             |              | Weight(logo_base.png) + 8px                              |
| &nbsp;&emsp;&emsp;logo_base.png            |              | Original logo image file                                 |
| &nbsp;&emsp;&emsp; ...                     |              |                                                          |  
| &nbsp;&emsp;javascript/                    |              | JavaScript files                                         |
| &nbsp;&ensp;templates/                     |              | Jinja templates for each page of the website             |
| &nbsp;&emsp; ...                           |              |                                                          |  
| &nbsp;&emsp;base.html                      |              | Base template                                            |
| &nbsp;&emsp; ...                           |              |                                                          |
| &nbsp;&ensp;color_palette_hex.png          |              | Color palette for the website                            |
| &nbsp;&ensp;prefix.py                      |              | Provide prefix for URLs in the csel.io environment       |
| &nbsp;&ensp;README.md                      |              | Current markdown file                                    |
| &nbsp;&ensp;setup.cmds                     |              | Commands to set up the shell to run a Flask app          |
| &nbsp;&ensp;test_app.py                    |              | Start the Flask development web server                   |



