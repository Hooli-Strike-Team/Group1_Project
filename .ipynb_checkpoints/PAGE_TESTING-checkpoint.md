# Project Milestone 4: Web Pages Design 

----------

### Main Page (Matt) ###

* Requirements 

    * Parameters needed for the page
       * Account Info
       * Puzzle Difficulty
       * Setting Selections
       
    * Data needed to render the page
       * Sudoku Data
       
    * Link destinations for the page
        * Splash Page (from top left icon)
        * Difficulty Selection Page
        * Rules Page
        * Achievements Page
        * Settings Page
        * Statistics Page
        
    * List of tests for verifying the rendering of the page
        * 9x9 Sudoku empty table displayed
        * Account information displayed if user is signed in
        * Difficulty set to easy if user not signed in, or last setting specified by user account
        * Clicking "Difficulty" should link to Difficulty Setting page
        * "New Puzzle" button clears any input and displays a set of starting values of specified difficulty
        * "Mistakes" button toggles highlighting of incorrect inputs on/off
        * "Hints" button triggers display of a contextual hint based on selected cell
        * "Notes" button toggles entry of notes in cells instead of answers
        * "Erase" button clears all user entry
        * "Undo" button clears last user entry
        * Number buttons enter specified value into a highlighted sudoku cell
        * "Rules" button links to Rules page
        * "Achievments" button links to Achievments page
        * "Settings" button links to settings page
        * Clicking the top-left icon should take you to the Splash Page

<img src="TEAM_RESOURCES/Images_Milestone4/main.png" alt="Main Page" width="500">

-----------

### Login Page (Micah/Ben) ###

* Requirements 

    * Parameters needed for the page
        
    * Data needed to render the page
    
    * Link destinations for the page

    * List of tests for verifying the rendering of the page

<img src="TEAM_RESOURCES/Images_Milestone4/login.png" alt="Login Page" width="500">

-----------

### Registration Page (Micah/Ben) ###

* Requirements 

    * Parameters needed for the page
        * WebApp Logo/name/tagline
        * Objectives with formatting 
        * Create Account Div 
        * Error messages when creating is not successful appropriate to each situation 
    * Data needed to render the page
         * HTML/CSS templates 
         * Database of users and associated information  
         * Objectives (Are these linked to achievements?)
    * Link destinations for the page
        * WebApp upper-left logo returns to homepage 
        * "Already Have An Account?" text links to login page  
        * "sign in Button" redirects to login homepage with user entered credentials
        * "Create Account" returns to main page with login status if info in valid
        * "Create Account" if account exists or does not follow username/email/pw protocol, refresh page with appropriate message 
    * List of tests for verifying the rendering of the page
        * Test page appears correct to formatting 
        * Test that all routes work correctly, including route to login page 
        * Test that users cannot create more than one account with the same credentials
        * Test new accounts are correctly logged into database 
        * Test objectives appear correctly as shown and are the correct objectives 
<img src="TEAM_RESOURCES/Images_Milestone4/register.png" alt="Registration Page" width="500">

-----------

### Home Page (Tory/Paul) ###

* Page Description

    * Header with the web app logo, name, and navigation links to the Create Account and Sign In pages
    * Web app tagline and a brief description of the product
    * Several feature icons with short descriptions
    * "Create Account" button and "Sign In" link in a prominent location
    *  Footer with contact information

* Requirements 

    *  Parameters needed for the page
        * Web app logo
        * Web app name
        * Web app tagline
        * Product description
        * Feature icons
        * Feature descriptions
        * "Create Account" button/link
        * "Sign In" button/link
        * Footer contact information

    *  Data needed to render the page
        * HTML template and CSS file  
        * Web app logo and feature icon image files
        * Text headings, descriptions

    * Link destinations for the page
        * "Create Account" button/link: directs the user to the Create Account Page
        * "Sign In" button/link: directs the user to the Sign In Page
        * Web app logo/name: directs the user to the Home Page (i.e., reloads the Home Page)

    * List of tests for verifying the rendering of the page
        * Check that the page loads quickly and all elements are displayed correctly
        * Check that all links are working and direct users to the correct pages
        * Check that the web app logo and name are displayed in the header and are hyperlinked to the Home Page
        * Check that the web app tagline and product description are easy to read and provide accurate information
        * Check that the feature icons and descriptions are clearly visible and provide accurate information
        * Check that the "Create Account" button and "Sign In" link are prominently displayed and functional
        * Check that the contact information in the footer is correct and that any "mailto" links are working properly
        * Test the page across multiple devices and platforms to verify that it is responsive and that the content is displayed properly

<img src="TEAM_RESOURCES/Images_Milestone4/home.png" alt="Home Page" width="500">

-----------

### Achievement Page (Tory/Paul) ###

* Requirements 

    * Parameters needed for the page
       * Available Badges 
       * Progress Meter
       * Logo 
       * User ID/Account info
    
    * Data needed to render the page
       * Updated User progress on earning indivdual badges 
       * Text Descriptions of Badges
       * Updated number of badges earned sense last visit
    
    * Link destinations for the page
      * Home 
      * Settings
      * Rules 
      * Achievement (reloads page) 

    * List of tests for verifying the rendering of the page
      * All possible badges displayed 
      * Unearned badges are greyed out 
      * Earned badges are brightened 
      * Progress meter correctly shows how close the user is to earning a particular badge 
      * Clicking the web logo take users back to the "Home" page
      * Clicking the settings logo takes users to the "Settings" page 
      * Clicking the rules logo takes user to the "Rules" page 
      * Clicking the achievements logo reloads the current page
      

<img src="TEAM_RESOURCES/Images_Milestone4/achievements-badges-earned.png" alt="Achievement Page" width="500">

-----------
