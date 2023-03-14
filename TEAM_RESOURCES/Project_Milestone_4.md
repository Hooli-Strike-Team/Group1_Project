## Project Milestone 4: Web Pages Design ##

### Due March 16th, 2023 ###


 You will create a list of descriptions for the pages that will be implemented for your project.
 You must add a file PAGE_TESTING.md to your repository and provide the following for each page (at least 5 independent pages):
  
  * Page Title
    * Sudoku Tutor Welcome/Login Page
  * Page Description (include a mockup or hand drawn image of the page)
    * Tory 
    * Paul
  * Parameters needed for the page
     * Matt
  * Data needed to render the page
     * Ben 
     * Micah
  * Link destinations for the page
     * Micah 
     * Ben
  * List of tests for verifying the rendering of the page
    * Paul
    * Tory

//MESSAGE TO TEAM-MEMBERS: Use the following template to guide your page descriptions

  * Page Title: [WORKING TITLE OF THE PAGE]
  * Page Description (include a mockup or hand drawn image of the page)
    * [WHAT SHOULD THE USER SEE WHEN THEY LAND ON THE PAGE?]
    * [WHAT DO THE VARIOUS PAGE ELEMENTS DO?]
    * [HOW DOES THIS PAGE RELATE TO ALL OF THE OTHER PAGES?]
    * [WHAT MAKES THIS PAGE SPECIAL OR UNIQUE?]
  * Parameters needed for the page
     * [WHAT KIND OF LINKS, ICONS, IMAGES, OR INFORMATION WILL THE PAGE CONTAIN?]
     * [WHAT INFORMATION OR USER ACTIONS WILL BE NEEDED TO INVOKE THE APPLICATION BEHAVIOR?]
  * Data needed to render the page
     * [WHAT DATA WILL WE NEED TO MAKE EACH PAGE DESIGN A REALITY?]
  * Link destinations for the page
     * [IDENTIFY THE ROUTES AND USER OUTCOMES THAT ARE ASSOCIATED WITH THE PAGE]
  * List of tests for verifying the rendering of the page
      [INCLUDE TESTABLE USER STORIES BELOW HERE]
    * Given that I am... [USER CATEGORY DESCRIPTION]...
    * When I... [USER ACTION] ...
    * I... [VERIFIABLE USER OUTCOME]




  * Page Title: SudokuTutor Landing Page
  * Page Description (include a mockup or hand drawn image of the page)
    * When a user opens the Sudoku Tutor application, a landing page is rendered in the user's browser presenting a description of application features and a prompt to "sign-in" or "create an account". 
    * If the user selects "sign in" he/she/they will be directed to the login page
    * If the user selects "create an account" he/she/they will be directed to the "new user sign-up" page.
  * Parameters needed for the page
     * Rolling list dynamic image content for displaying the features and social media reviews for SudokuTutor.
     * The page will include buttons containing hyperlinks to the "login" and "new user sign-up" pages.
  * Data needed to render the page
     * Snapshots of SudokuTutor gameplay.
     * Artificial reviews.
  * Link destinations for the page
     * Existing User Login Page.
     * New User Sign-Up Page.
  * List of tests for verifying the rendering of the page
    * Given that I am... a registered or unregistered user...
    * When I... open the SudokuTutor Game App...
    * I... see dynamically rendered content describing the benefits of SudokuTutor and the option to login or create a user account.
    
    * Given that I am ... a registered user on the SudokuTutor landing page...
    * When I ... click the button that says "log in!"...
    * I... am directed to the login page.
    
    * Given that I am ... an unregistered user on the SudokuTutor landing page...
    * When I ... click the button that says "create an account"...
    * I... am directed to the "new user sign up" page.
    
    
  * Page Title: Existing User Login Page
  * Page Description (include a mockup or hand drawn image of the page)
    * A garden variety user login page complete with left-float positioned infographic and a paragraph field.
    * Username text field.
    * Password text field.
    * Link to the "Create an Account" page.
    * Link to the "Forgot Password?" page.
    * Link for password retrieval.
    * "Sign In" button.
  * Parameters needed for the page
     * A regex-filtered, database-verified "username" field.
     * A regex-filtered, database-verified "password" field that changes each password character into an asterisk '*'.
     * Sign-in button with an interactive press feature, used to run input verification scripts and submit SQL formulated queries against the user database, containing the user's attempted login credentials.
     * A hyperlink-fitted "Forgot Password?" div element (scoll-over feature optional).
     * A hyperlink-fitted "Create Account" div element (scroll-over feature optional).
  * Data needed to render the page
     * Image to be displayed in the welcome blurb.
     * Paragraph text.
     * Icon for the Sign In button.
  * Link destinations for the page
     * Clicking on the "Create Account" div element should redirect the user to the "new user sign up" page.
     * If the user's credentials cannot be verified against the user database, the form will render repeatedly without loss of field data, highlighting the field that could not be verified by the most recent query.
  * List of tests for verifying the rendering of the page
    * Given that I am... a user entering invalid (but honest) login credentials ...
    * When I... enter my presumed username and password ...
    * I... see the login form with my data, highlighting the unaccepted field.
    
    * Given that I am... a malicious user attempting to destroy the user database system ...
    * When I... submit a malicous SQL query in either of the text fields on the sign in page ...
    * I... recieve the same failed login response as a user with incorrect login credentials and fail to break the application.
    
    * Given that I am... a user with valid login credentials ...
    * When I... enter my username and password ...
    * I... am redirected to my user dashboard.
    
    
  * Page Title: New User Sign-Up Page
  * Page Description (include a mockup or hand drawn image of the page)
    * A garden variety user login page complete with left-float positioned infographic and a paragraph field.
    * Username text field.
    * Password text field.
    * Route-fitted "Sign In" element for redirecting users to the login page.
    * "Create Account" Button with an interactive press feature.
  * Parameters needed for the page
     * A regex-filtered, database-verified "username" text field.
     * A regex-filtered, database-verified "email" text field.
     * A regex-filtered, database-verified "password" text field, that changes each password character into an asterisk '*' or a similar character.
     * A route-fitted "Create Account" button with interactive press feature.
  * Data needed to render the page
     * 
  * Link destinations for the page
     * 
  * List of tests for verifying the rendering of the page
    * Given that I am... [USER CATEGORY DESCRIPTION]...
    * When I... [USER ACTION] ...
    * I... [VERIFIABLE USER OUTCOME]