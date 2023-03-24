# Customizing Content

To modify the content of a page that extends from the base template, you place 
the desired HTML between the `{% block content %}` and `{% endblock %}` tags in 
the template for that specific page. This is a Jinja template block that allows 
for easy content replacement.

For example, if you want to add a heading and a paragraph to a page, you can 
do the following:

    {% extends "base.html" %}

    {% block content %}
      <h1>Master the Puzzle: Learn, Play, and Conquer Sudoku</h1>
      <p>Unlock the secrets of Sudoku with our interactive web app.</p>
    {% endblock %}

# Adding Icons with Font Awesome and Google Fonts

The stylesheets for Font Awesome and Google Material Icons Outlined have already
been added to the base template.  To use the icons from these libraries, follow 
these steps:

## Font Awesome Icons

1. Visit the [Font Awesome Icons](https://fontawesome.com/icons?d=gallery&p=2) gallery.
2. Find the icon that you want to use and click on it.
3. Copy the HTML code that is provided (e.g., `<i class="fab fa-facebook-f"></i>`).
4. Paste the code in the template where you want the icon to appear.

## Google Material Icons

1. Visit the [Google Material Icons](https://fonts.google.com/icons) gallery.
2. Find the icon that you want to use and click on it.
3. Copy the HTML code that is provided (e.g., `<span class="material-icons-outlined">home</span>`).
4. Paste the code in the template where you want the icon to appear.

**Update**: the stylesheets for the [Montserrat](https://fonts.google.com/specimen/Montserrat) and 
[Open Sans](https://fonts.google.com/specimen/Open+Sans) fonts have been added to the base template.  They are the default fonts for header and content text, respectively.

# Useful Links

- Font Icons: [Font Icons Tutorial](https://www.w3schools.com/icons/default.asp)
- Jinja Templates: [Jinja Templates (Official Documentation)](https://jinja.palletsprojects.com/en/3.1.x/templates/)
- Flexbox: [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- Pseudo-Classes: [CSS Pseudo-Classes](https://www.w3schools.com/css/css_pseudo_classes.asp)

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