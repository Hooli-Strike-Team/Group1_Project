
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



