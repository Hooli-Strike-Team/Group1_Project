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

### User_Account Table ###
Name: User_Account
Description:
    Holds user account data tuples containing: 'Username', 'Password', 'First_Name', 'Last_Name', and 'Email'. 
    User_Account is populated from the submission form on the Create Account page.
    Username and Password are verified in this table to grant the user access to the rest of the application.
Field Descriptions:
    Username, VARCHAR(32) - Primary Key
    Password, VARCHAR(16)
    First_Name, VARCHAR(50)
    Last_Name, VARCHAR(50)
    Email, VARCHAR(320) - UNIQUE
Tests for Table Verification:


## USER_ACCOUNT ACCESS METHODS ##
Create_User_Account Access Method
    Name: 'Create_User_Account'
    Description:  Insert a tuple of new user data into the User_Account table. 
    Parameters:  Username (UNIQUE, PK), Password, First_Name, Last_Name, and Email (UNIQUE)
    return values:  None.
    List of tests for verifying each access method: 
    
#=====BEGIN 'Create_User_Account' ACCESS METHOD TEST DESCRIPTIONS====#

Test 1: 'Create_User_Account' submits records
    Use case name:
        Verify 'Create Account' form submission inserts valid record into User_Account.
    Description:
        Verify that valid form data entered in the "Create an Account" page produces a record in the User_Account database table.
    Pre-conditions
        User must provide a Username that does not exist in the User_Account table.
        Email address must be unique to each account.
        Password, First_Name, Last_Name, and Email must also be entered. 
    Test steps
        1. Navigate to 'Create an Account' page
        2. Provide a valid user name
        3. Provide a valid password
        4. Provide a first name
        5. Provide a last name
        6. Provide an email address that does not currently exist in the User_Account table
        4. Click the 'Create Account' button
    Expected result
        A tuple should appear in User_Account describing the new user, including his/her valid login credentials. 
        User should be directed to the 'Login' page after registering.
    Actual result
        TBD
    Status (Pass/Fail)
        TBD
    Notes
        Since the user must create an account to possess valid login credentials, it makes sense to test perform this test before
        testing the db's interaction with the Login page (next test).
    Post-conditions
        Create Account record exists in User_Account.
#=====END 'User_Account_Test_1' TEST DESCRIPTION====#

#=====BEGIN 'Login_User' TEST DESCRIPTION====#
    Name: Login_User
    Description: Add new AccountName/Password to table
    Parameters: 
    Return values: 
    List of tests for verifying each access method:
    
User_Account_Test_2: Login_User, test interaction with the Login Page
    Use case name
        'Login' page verifies user login information via User_Account table
    Description
        Verify that a user providing valid login details is given access to the application. 
    Pre-conditions
        The user must be registered (i.e., via 'Create Account'), and must furnish valid login credentials.
    Test steps
        1. Navigate to the Login page
        2. Provide valid user name
        3. Provide valid password
        4. Click 'Sign In' button
    Expected result
        The Username and Password should be verified and the user should be sent to the Game page.
    Actual result
        TBD
    Status (Pass/Fail)
        TBD
    Notes
        Since the user must create an account to possess valid login credentials, it would make sense to test perform this test before
        testing the db's interaction with the Login page.
    Post-conditions
        User is directed to the dashboard/game page.
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
    Holds flags for user achievments
    
Fields:
    AccountName - Primary and Foriegn Key
    Inquisitor - flag if user has used more than 5 hints in a game
    LoneWolf - flag if user has completed a puzzle without using hints
    PuzzleMaster - flag if user account has reached max level
    RiskTaker - flag if user has completed 3 hard puzzles
    SpeedRunner - flag if user has completed a hard puzzle in less than 10 minutes
    Conqueror - flag if user has completed a puzzle of each difficulty
    
Tests:
    /* todo */
    
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