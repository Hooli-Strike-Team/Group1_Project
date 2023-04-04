Instructions:

You will create a list of descriptions for tables and functions being created for the project.
You must add a file SQL_TESTING.md to your repository and provide the following for each table (at least 3 tables):

Table Name
Table Description
For each field of the table, provide name and short description.
List of tests for verifying each table
You must also provide the following (in SQL_TESTING.md)for each data access method (at least one access method for each table or query required to get the data to display):

Name
Description
Parameters
return values
List of tests for verifying each access method
Here is a format that can be used for describing each test:

            Use case name
                Verify login with valid user name and password
            Description
                Test the Google login page
            Pre-conditions
                User has valid user name and password
            Test steps
                1. Navigate to login page
                2. Provide valid user name
                3. Provide valid password
                4. Click login button
            Expected result
                User should be able to login
            Actual result
                User is navigated to dashboard with successful login
            Status (Pass/Fail)
                Pass
            Notes
                N/A
            Post-conditions
                User is validated with database and successfully signed into their account.
                The account session details are logged in database. 
                
                
----------------------------------------------------------------------------------------------------------
Potential ERD - https://lucid.app/lucidchart/3d3e38d0-96ce-46d4-a9d2-875a429e5f47/edit?viewport_loc=51%2C-43%2C3072%2C1577%2C0_0&invitationId=inv_8d986d0b-7302-4dbf-a142-bce282110cbb

JoinID:
WGL R4C

<p align="center">
 <img  src="Images_Milestone5/ProjectDatabaseERD.png">
</p>

### User_Account ###
Table Name: User_Account

Table Description:
    Holds user account data tuples containing: 'Username', 'Password', 'First_Name', 'Last_Name', and 'Email'. 
    User_Account is populated by the submission form on the Create Account page.
    Username and Password are verified in this table to grant the user access to the rest of the application.
    
Fields:
    Username, VARCHAR(32) - Primary Key
    Password, VARCHAR(16)
    First_Name, VARCHAR(50)
    Last_Name, VARCHAR(50)
    Email, VARCHAR(320) - UNIQUE

Test: INTERACTION WITH THE 'CREATE ACCOUNT' PAGE
    Use case name
        'Create Account' form submission inserts valid record into User_Account.
    Description
        Verify that valid form data entered in the "Create an Account" page produces a record in the User_Account database table.
    Pre-conditions
        User must provide a valid Username that does not exist in the User_Account table, as well as Password, First_Name,
        Last_Name, and Email. Email address must be unique.
    Test steps
        1. Navigate to 'Create an Account' page
        2. Provide a valid user name
        3. Provide a valid password
        4. Provide a first name
        5. Provide a last name
        6. Provide an email address that does not currently exist in User_Account
        4. Click Create Account button
    Expected result
        A tuple should appear in User_Account describing the new user, including his/her login credentials. 
        User should be directed to the 'Login' page.
    Actual result
        TBD
    Status (Pass/Fail)
        TBD
    Notes
        Since the user must create an account to possess valid login credentials, it would make sense to test perform this test before
        testing the db's interaction with the Login page.
    Post-conditions
        Create Account record exists in User_Account.

Test: INTERACTION WITH THE 'LOGIN' PAGE
    Use case name
        TO-DO
    Description
        TO-DO
    Pre-conditions
        TO-DO
    Test steps
        1. Navigate to the Login page
        2. Provide valid user name
        3. Provide valid password
        4. Click 'Sign In' button
    Expected result
        A tuple should be entered registering the new user, including his/her login credentials.
    Actual result
        TBD
    Status (Pass/Fail)
        TBD
    Notes
        Since the user must create an account to possess valid login credentials, it would make sense to test perform this test before
        testing the db's interaction with the Login page.
    Post-conditions
        TO-DO


User_Account Access Methods:
    ###
    Name: Create_Account_Table
    Description:  Add new AccountName/Password to table.
    Parameters:  Generate once using Admin_credentials?
    return values:  None. Results in Account table creation.
    List of tests for verifying each access method: ...
    ###
    Name: Create_Account
    Description: Add new AccountName/Password to table
    Parameters: 
    Return values: 
    List of tests for verifying each access method: ...
    ### 
    Name: Login - Check input data against table AccountName/Password
    Description
    Parameters
    return values
    List of tests for verifying each access method
    

     

### Table 2 ###
Table Name: Statistics

Table Description:
    Holds account statistics for calculating achievements and displaying for users
    
Fields:
    AccountName - Primary and Foriegn Key
    EasyGamesCompleted
    MedGamesCompleted
    EasyTime
    MedTime
    HardTime
    AccountLevel
    
Tests:
    /* todo */
    
Access Methods:
    getStats - return all fields for display
        '''
        Name
        Description
        Parameters
        return values
        List of tests for verifying each access method
        '''
    
    calcAchievements - update Achievements table based on current account stats
        '''
        Name
        Description
        Parameters
        return values
        List of tests for verifying each access method
        '''
        
### Table 3 ###

Table Name: Achievements

Table Description:
   * Holds flags for user achievements
    
Fields:
   * Username, BOOLEAN - Primary and Foriegn Key
   * Inquisitor, BOOLEAN - flag if user has used more than 5 hints in a game
   * LoneWolf, BOOLEAN- flag if user has completed a puzzle without using hints
   * PuzzleMaster, BOOLEAN - flag if user account has reached max level
   * RiskTaker, BOOLEAN - flag if user has completed 3 hard puzzles
   * SpeedRunner, BOOLEAN - flag if user has completed a hard puzzle in less than 10 minutes
   * Conqueror, BOOLEAN - flag if user has completed a puzzle of each difficulty
    
Tests: INTERACTION WITH THE 'ACHIEVEMENTS' PAGE
   * Use case name 
       * Verify that a user's achievements are unlocked when completing challenges 
   * Description
       * Test that icons are revealed when criteria is met 
   * Pre-conditions 
       * User must have an active account on the webpage 
   * Tests
       * Test 1: Inquisitor
             * Navigate to the Main Page 
             * Start a new game 
             * Click the 'hint' button 5 times 
             * Navigate to the Achievements page
       * Test 2: LoneWolf 
             * Navigate to the Main Page 
             * Start a new game 
             * Finish a puzzle, at any difficulty, without using hints
             * Navigate to the Achievements page 
       * Test 3: PuzzleMaster 
             * Navigate to the user-account 
             * Set user level to max
             * Navigate to the Achievements page
       * Test 4: RiskTaker 
             * Navigate to the Main Page
             * Start a new game 
             * Complete three puzzles on Hard 
             * Navigate to the Achievements page 
       * Test 5: SpeedRunner 
             * Navigate to the Main Page
             * Start a new game 
             * Complete a Hard Puzzle in less than 10 minutes 
             * Navigate to the Achievements page
       * Test 6: Conqueror 
             * Navigate to the Main Page 
             * Start a new game 
             * Complete a puzzle at each difficulty 
             * Navigate to the Achievements page
    * Expected Result
        * The specific badge icons are displayed for each unlockable achievement
        * None of the badges should be locked 
    * Actual Result
        * TBD
    * Status (Pass/Fail)
        * TBD 
    * Notes 
        * Earning a badge should stay permanently flagged unless user resets awards 
    * Post-Conditions 
        * Badges are unlocked as user meets specific criterias for challenges 
        * User is notified when they have unlocked a badge 
Access Methods:
Access Methods:
    getAchievements - return all fields, use for displaying achievements
        '''
        Name
        Description
        Parameters
        return values
        List of tests for verifying each access method
        '''
        
### Table 4 ###

Table Name: Settings

Table Description:
    Holds settings options for user
    
Fields:
    AccountName - Primary and Foriegn Key
    ShowConflicts - Boolean, if true highlight conflicts if entered
    ShowClock - Boolean, if true display timer on game board
    CandidateMode - Boolean, if true automatically dispaly candidates in empty fields
    
Tests:
    /* todo */
    
Access Methods:
    getSettings - return all fields, use for displaying game board and settings page
        '''
        Name
        Description
        Parameters
        return values
        List of tests for verifying each access method
        '''

### Table 5 ###

Table Name: Games

Table Description:
    Holds saved games for users
    
Fields:
    GameID - Primary key generated for game
    AccountName - Foriegn Key
    GameState - string with data for game state
    
Tests:
    /* todo */
    
Access Methods:
    getSettings - return all fields, use for displaying game board and settings page
        '''
        Name
        Description
        Parameters
        return values
        List of tests for verifying each access method