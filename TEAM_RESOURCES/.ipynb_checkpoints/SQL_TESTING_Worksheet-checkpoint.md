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
 <img  src="Images_Milestone5/Project_Database_ERD_v4.png">
</p>

## User_Account Table ##
### 'User_Account' Table Description ###

    Name: 
        User_Account
    Description:
        User_Account holds user data tuples containing the attributes: 'Username', 'Password', 'First_Name', 'Last_Name', and 'Email'. 
        User_Account will be populated via a form submission on the Create Account page.
        Username and Password are stored and verified in this table to grant the users with access to the rest of the application.
    Field Descriptions:
        Username, VARCHAR(32) - Primary Key
        Password, VARCHAR(16)
        First_Name, VARCHAR(50)
        Last_Name, VARCHAR(50)
        Email, VARCHAR(320) - UNIQUE
    Tests for Table Verification:
        (see below)
#### 'User_Account' Table Test 1 Description ####

        User_Account Test 1: Insertion of a valid record.
        Use case name:
            "Valid Insert"
        Description:
            Insert a valid record, then retrieve the record(s) to verify the table works as intended.
        Pre-conditions
            The User_Account table must exist.
            User_Account table constraints must be in place.
            Inserted data must agree with the table constraints.
        Test steps
            1. Create the User_Account table (if it does not already exist).
            2. Insert a tuple of valid test data.
            3. '''SELECT * FROM User_Account''' to view the data and verify that the record has been inserted.
        Expected result
            The inserted tuple should be clearly visible from the result of the SELECT query.
        Actual result
            TBD
        Status (Pass/Fail)
            TBD
        Notes
            None.
        Post-conditions
            Tuple exists in the User_Account table.
#### 'User_Account' Table Test 2 Description ####

        User_Account Test 2: Insertion of a duplicate record.
        Use case name:
            "Duplicate Record Insert"
        Description:
            Inserting a duplicate record into the User_Account table should fail.
        Pre-conditions:
            The User_Account table must exist.
            User_Account table constraints must be in place.
            Inserted record must already exist in the User_Account table.
        Test steps:
            1. Insert a valid tuple into the User_Account table.
            2. Re-insert the tuple from step one into the User_Account table.
            3. Observe the result.
        Expected result:
            An error should occur, citing a violation of the User_Account table constraints.
        Actual result:
            TBD
        Status (Pass/Fail):
            TBD
        Notes:
            Insertion of a duplicate record will be rejected by the database API, which may result in unexpected application behavior. As a result, it is probably best to SELECT COUNT the matching records first, then evaluate the results and perform the correct action. If this result is not 0, the record should be refused by the route performing the verification, NOT by the database API itself. 
        Post-conditions:
            None.
#### 'User_Account' Table Test 3 Description ####

        User_Account Test 3: Insertion of a record with a duplicate email address.
        Use case name:
            "Existing Email Insert"
        Description:
            Each account must contain a unique email address. Attempting to create a second account with an existing email address must fail.
        Pre-conditions
            The User_Account table must exist.
            User_Account table constraints must be in place.
            The test record should mimic an attempt to create an account with an existing email address.
        Test steps
            1. Insert a valid record, or choose a valid record from User_Account.
            2. Create a test record containing an existing email address, all other attributes should be valid.
            3. Insert the record from step 2.
            4. Observe the result.
        Expected result
            The insertion should fail based on the UNIQUE attribute constraint placed on "Email".
        Actual result
            TBD
        Status (Pass/Fail)
            TBD
        Notes
            As mentioned before, we should not place undue strain on the API. If necessary, submit a query to gather information about whether the email adress exists inside the User_Account table and then handle the user's request based on this information.
        Post-conditions
            None.

### 'User_Account' Access Method Descriptions ###

#### Method 1: The 'Create_User_Account' Access Method ####

    Name: 
        'Create_User_Account'
    Description:
        Create_User_Account will insert a tuple of new user data into the User_Account table when the user fills in the Create Account form with valid information and clicks the submit button.
    Parameters:
        Username, Password, First_Name, Last_Name, and Email
    Return values:  
        Redirect to the Login page.
    List of tests for verifying each access method: 
        'Create_User_Account' Test 1:
            Use case name:
                "Valid Account Creation"
            Description:
                Verify that entering valid form data into the "Create Account" produces a new record in the User_Account table. This data must be made available to subsequent routes.
            Pre-conditions:
                The User_Account table must exist with the given table constraints.
                The Username test instance must not exist in User_Account.
                The Email test instance must not exist in User_Account.
                Password, First_Name, and Last_Name must be entered as well. 
            Test steps:
                1. Navigate to 'Create an Account' page
                2. Provide a valid username
                3. Provide a password
                4. Provide a first name
                5. Provide a last name
                6. Provide a unique email address
                7. Click the 'Create Account' button
            Expected result:
                A tuple should appear in User_Account describing the new user including his/her login credentials. 
                User should be directed to the 'Login' page following a successful registration.
            Actual result:
                TBD
            Status (Pass/Fail):
                TBD
            Notes:
                Since the user must create an account to possess valid login credentials, it makes sense to perform this test before
                testing User_Account interactions with Login page (discussed next). Attempts to add an account under an existing email address should fail gracefully under this route. Likewise for duplicate record insertions.
            Post-conditions:
                Create Account record must exist and persist in the User_Account table. 

#### Method 2: The 'User_Login' Access Method ####

    Name: 
        'User_Login'
    Description:
        The User_Login access method should verify that the user's login credentials exist in the User_Account table and, if so, 
        direct the user to the game page.
    Parameters:
        Username, Password
    Return values:
        None.
    List of tests for verifying each access method: 
        User_Login Test 1:
        Use case name:
            "Successful Login"
        Description:
            Verify that a user with valid login credentials is granted access to the application. 
        Pre-conditions:
            The user must be registered via the 'Create Account' page, and must provide valid login credentials.
        Test steps:
            1. Navigate to the Login page
            2. Provide valid user name
            3. Provide valid password
            4. Click 'Sign In' button
        Expected result:
            If the user provided a valid Username and Password combination, they should be directed to the Game page.
            If the user provides a faulty Username/Password combination, the rendered view should not change.
        Actual result:
            TBD
        Status (Pass/Fail):
            TBD
        Notes:
            Attempts to login with invalid username and password should fail. Form fields in the Login page should be in all ways protected from SQL injection attacks. This means using fixed length form fields and possibly screening the user's input prior to making an API request.
        Post-conditions:
            User is directed to the game page.

     
## Achievement_Stats Table ##
### 'Achievement_Stats' Table Description ###

    Name: 
        Achievement_Stats
    Description:
        Achievement_Stats holds usesr account data for stored for triggering achievements
        Achievement_Stats attributes: 'Username', 'EasyGamesCompleted', 'MedGamesCompleted', 'HardGamesCompleted',
            'Best_Time_Easy', 'Best_Time_Med', 'Best_Time_Hard', and 'AccountLevel'
        Achievement_Stats entries will initialized with creation of a user account and given AccountLevel = 0, with other fields null. 
        Any updates to a user's Achievement_Stats entry will trigger a check to update the user's User_Achievements entry.
    Field Descriptions:
        Username, VARCHAR(32) - Primary Key, Foreign Key
        EasyGamesCompleted, INT
        MedGamesCompleted, INT
        HardGamesCompleted, INT
        Best_Time_Easy, FLOAT
        Best_Time_Med, FLOAT
        Best_Time_Hard, FLOAT
        AccountLevel, FLOAT
    Tests for Table Verification:
        (see below)

#### 'Achievement_Stats' Table Test 1 Description ####

    Achievement_Stats Test 1: Creation of User Stats Entry .
    Use case name:
        "User Stats Creation"
    Description:
        Updating any of the Best_Time fields should fail if the entry is larger than the current entry.
    Pre-conditions:
        The User_Account table must exist.
        The Achievement_Stats table must exist.
        Achievement_Stats trigger must have been created.
    Test steps
        1. Insert a tuple of valid data into User_Account with specified username
        2. '''SELECT * FROM Achievement_Stats WHERE Username = username''' to view the data and verify that the record has been inserted.
        3. Ensure Username = username, AccountLevel = 0, GamesComleted fields = 0, and Best_Time fields = NULL
    Expected result
        The Achievement_Stats table should contain an intialzed (empty) stats tuple corresponding to the user added to User_Account.
    Actual result
        TBD
    Status (Pass/Fail)
        TBD
    Notes
        None.
    Post-conditions
        Properly initialized entry exists in the Achievement_Stats table.    
        
#### 'Achievement_Stats' Table Test 2 Description ####

    Achievement_Stats Test 2: Slower Time Update
    Use case name:
        "Slower Time"
    Description:
        Insert a new user in User_Account with username USERNAME, then retrieve the record with priamry key USERNAME to verify initialization.
    Pre-conditions
        The Achievement_Stats table must exist.
        Achievement_Stats constraints must be implemented.
        User Stats entry created for user.
        Best_Time_Easy, Best_Time_Med, and Best_Time_Hard have been updated from initialized NULL value for the given user.
    Test steps
        1. '''SELECT * FROM Achievement_Stats WHERE Username = username''' to view the data.
        2. Select new times to insert such that newTimeEasy > Best_Time_Easy, newTimeMed >Best_Time_Med, and newTimeHard > Best_Time_Hard
        3.  Run update query:
            '''UPDATE AchievementStats
              SET Best_Time_Easy=newTimeEasy,
                  Best_Time_Med=newTimeMed,
                  Best_Time_Hard=newTimeHard,
              WHERE Username = username
           ''' 
        4. '''SELECT * FROM Achievement_Stats WHERE Username = username''' to view the data again.
        5. Ensure no field has been changed from the original Select query in step 1.
        
    Expected result
        The Achievement_Stats table should not update Best_Time fields if the updated times are greater than current values.
    Actual result
        TBD
    Status (Pass/Fail)
        TBD
    Notes
        This condidition should likely also be checked by logic in the web page before attempting to update the database.
    Post-conditions
        There should be no change to the Achievement_Stats table.    
        
### 'Achievement_Stats' Access Method Descriptions ###

#### 'Achievement_Stats' Access Method 1 Description ####

    Name: 
        'getStats'
    Description:
        The getStats method should return a list the values for all fields of Achievement_Stats for a given user 
    Parameters:
        Username
    Return values:
        [EasyGamesCompleted, MedGamesCompleted, HardGamesCompleted, Best_Time_Easy, Best_Time_Med, Best_Time_Hard, AccountLevel]
    List of tests for verifying each access method: 
        getStats Test 1:
        Use case name:
            "Check Stats"
        Description:
            Verify that getStats produces the same output as an SQL query for the username provided. 
        Pre-conditions:
            The user must have an entry created in User_Account.
        Test steps:
            1. Call function user_stats = getStats(username)
            2. Run query '''SELECT * FROM Achievement_Stats WHERE Username = username'''
            3. Verify values in user_stats match output from query
        Expected result:
            Values in user_stats should match output from SQL selection query
        Actual result:
            TBD
        Status (Pass/Fail):
            TBD
        Notes:
            This access method will be used for displaying stats and possibly for updating User_Achievements through javascript.
        Post-conditions:
            List of achievement stats has been passed from the fuction.

        
### Table 3 ###

Table Name: Achievements

Table Description:
   * Holds flags for user achievements
    
Fields:
   * `Username`, BOOLEAN - Primary and Foriegn Key
   * `Inquisitor`, BOOLEAN - flag if user has used more than 5 hints in a game
   * `LoneWolf`, BOOLEAN- flag if user has completed a puzzle without using hints
   * `PuzzleMaster`, BOOLEAN - flag if user account has reached max level
   * `RiskTaker`, BOOLEAN - flag if user has completed 3 hard puzzles
   * `SpeedRunner`, BOOLEAN - flag if user has completed a hard puzzle in less than 10 minutes
   * `Conqueror`, BOOLEAN - flag if user has completed a puzzle of each difficulty
   
Tests: 

1. Create a new user 
2. No flags should be raised for (all badges should be locked) 
    
    `Inquisitor` 
    `LoneWolf`
    `PuzzleMaster`
    `RiskTaker`
    `SpeedRunner`
    `Conqueror`
    
3. Logout of user account, then return 
4. Flags that have been previously raised should remain True
5. Flags that were not previously raised should remain False 

     
#### Data Access Methods

*Access Method 1*        
        
Name `flagInquisitor`
Description: checks whether criteria is met to raise flag for the Inquisitor badge 
Parameters: 
* `Show_Conflicts` BOOLEAN
* `Candidate_Mode` BOOLEAN
* `Inquisitor` BOOLEAN
* `Game_ID` INT 


return values: none

Tests:

      Use case name
          Verify flagInquisitor is flagged when a user meets the achievement criteria
      Description
          Test that the Inquistor icon is revealed if flag is raised 
      Pre-conditions
          User must have an active account with the website 
      Test steps
          1. Start a new game by giving Game_ID default values
          2. Activate the Show_Conflict or Candidate_Mode fields a grand total of 5 times 
      Expected result
          The Inquisitor field should be flagged 
      Actual result
          N/A
      Status (Pass/Fail)
          Pass
      Notes
          N/A
      Post-conditions
          The Inquisitor icon should appear to the user on the Achievements page


*Access Method 2*        


Name `flagLoneWolf`
Description: checks whether criteria is met to raise flag for the LoneWolf badge 
Parameters: 
* `Game_ID` INT 
* `LoneWolf` BOOLEAN

return values: none

Tests:

      Use case name
          Verify flagLoneWolf is flagged when a user meets the achievement criteria
      Description
          Test that the LoneWolf icon is revealed when flag is raised 
      Pre-conditions
          User must have an active account with the website 
      Test steps
          1. Start a new game by giving Game_ID default values 
          2. Complete game without activating the Show_Conflict or Candidate_Mode fields
      Expected result 
          The LoneWolf field should be flagged 
      Actual result
          N/A
      Status (Pass/Fail)
          Pass
      Notes
          N/A
      Post-conditions
          The LoneWolf icon should appear to the user on the Achievements page

        
*Access Method 3*        


Name `flagConqueror`
Description: checks whether criteria is met to raise flag for the Conqueror badge 
Parameters: 
* `Conqueror` BOOLEAN
* `Difficulty` VARCHAR(6)
* `Game_ID` INT 

return values: none

Tests:

      Use case name
          Verify flagConqueror is flagged when a user meets the achievement criteria
      Description
          Test that the Conqueror icon is revealed when flag is raised 
      Pre-conditions
          User must have an active account with the website 
      Test steps
          1. Start a new game by giving Game_ID default values
          2. Set Difficulty to "Easy"
          3. Complete Game
          4. Start another new game 
          5. Set Difficulty to "Medium
          6. Complete Game 
          7. Start another new game 
          8. Set Difficulty to "Hard"
          9. Complete Game 
          
      Expected result 
          The Conqueror field should be flagged 
      Actual result
          N/A
      Status (Pass/Fail)
          Pass
      Notes
          N/A
      Post-conditions
          The Conqueror icon should appear to the user on the Achievements page

        
        
### Table 4 ###

#### Table Information

Table Name: `Game_Settings` <br>
Table Description: holds the settings options for a Sudoku game instance

Fields:

|   | Field | Description |
|---|-------|-------------|
| PK/FK | `Game_ID` INT | Uniquely identifies a Sudoku game instance |
|   | `Show_Conflicts` BOOLEAN | If true, highlights conflicting entries |
|   | `Show_Clock` BOOLEAN | If true, displays the timer on the game board |
|   | `Candidate_Mode` BOOLEAN | If true, automatically displays candidates in empty fields |
|   | `Difficulty` VARCHAR(6)  | Indicates the difficulty level of the Sudoku game |  

Tests:

1. Add a new entry with valid data for all fields <br>
2. Update an existing entry with valid data for all fields<br>
3. Retrieve an existing entry by `Game_ID`<br>
4. Delete an existing entry by `Game_ID`<br>
5. Add a new entry with an invalid `Game_ID` (e.g., contains more than `MAX` number of characters)

#### Data Access Methods

*Access Method 1*

Name: `getSettings` <br>
Description: retrieves all fields from the `Settings` table for a given `Game_ID` <br>
Parameters: `Game_ID` INT <br>
Return values: all fields for the given `Game_ID`

Tests:

      Use case name
          Verify getSettings when a user returns to an in-progress Sudoku game
      Description
          Test the getSettings method when a user returns to an in-progress Sudoku game
      Pre-conditions
          Game_ID is valid, and the Settings table has an entry for Game_ID that corresponds to an in-progress Sudoku game
      Test steps
          1. Call the getSettings method with Game_ID
      Expected result
          The method should return all fields for Game_ID
      Actual result
          All fields for Game_ID are returned
      Status (Pass/Fail)
          Pass
      Notes
          N/A
      Post-conditions
          The correct settings for Game_ID are retrieved from the Settings table, which allows the user to continue their game with the previous settings  

*Access Method 2*

Name: `updateSettings` <br> 
Description: updates the settings for a given `Game_ID`

Parameters:

* `Game_ID` INT
* `Show_Conflicts` BOOLEAN
* `ShowClock` BOOLEAN
* `Candidate_Mode` BOOLEAN
* `Difficulty` VARCHAR(6)

Return values: `None` (changes are made directly in the database)

Tests:

      Use case name
          Verify updateSettings when a user changes settings while playing a Sudoku game
      Description
          Test the updateSettings method when a user changes the settings while playing a Sudoku game
      Pre-conditions
          Game_ID is valid, and the Settings table has an entry for Game_ID that corresponds to an in-progress Sudoku game
      Test steps
          1. Call the updateSettings method with a valid Game_ID and valid settings values
          2. Retrieve the updated settings for Game_ID using the getSettings method
      Expected result
          The method should update the settings for Game_ID, and the retrieved settings should match the updated values. The in-progress Sudoku game should reflect the updated settings
      Actual result
          The settings for Game_ID are updated, and the retrieved settings match the updated values. The in-progress Sudoku game reflects the updated settings
      Status (Pass/Fail)
          Pass
      Notes
          N/A
      Post-conditions
          The settings for Game_ID are successfully updated in the Settings table, which allows to user to continue playing the Sudoku game with the updated settings
          
*Access Method 3*

Name: `createSettings` <br> 
Description: creates a new settings entry for a given Game_ID using default values  <br> 
Parameters: `Game_ID` INT <br> 
Return values: `None` (a new entry is created in the database)

Tests:

      Use case name
          Verify createSettings when a user begins a new Sudoku game
      Description
          Test the createSettings method when a user begins a new Sudoku game
      Pre-conditions
          A unique Game_ID is generated for the new Sudoku game, and the Settings table does not already have an entry for that Game_ID
      Test steps
          1. Call the createSettings method with Game_ID
          2. Retrieve the created settings for Game_ID using the getSettings method
      Expected result
          The method should create a new settings entry with default values for Game_ID, and the retrieved settings should match the default values. The default settings should be applied to the new Sudoku game
      Actual result
          A new settings entry is created with default values for Game_ID, and the retrieved settings match the default values. The default settings are applied to the new Sudoku game
      Status (Pass/Fail)
          Pass
      Notes
          N/A
      Post-conditions
          A new settings entry with default values is created successfully in the Settings table for the new Game_ID, which allows the user to start a new Sudoku game with default settings

### Table 5 ###

Table Name: Games

Table Description:
    Holds saved games for users
    
Fields:
    GameID, STRING - Primary key generated for game 
    AccountName, STRING - Foriegn Key
    GameState, STRING - string with data for game state
    
Tests:
    1. Saving a game adds a new game file to database 
    2. Recalling a game retrieves correct game file in database
    3. Saving a retrieved game overwrites correct game file 
    4. Only correct accounts can retrive their respective games  
    5. AccountName files that do not match existing accounts will not be saved 
    
Access Methods:
    *Access Method 1*

Name: `saveGame` <br>
Description: updates a specific game by recording the game state with a string <br>

Parameters:

* `GameID` STRING
* `AccountName` STRING
* `GameState` STRING

Return values: none 

Tests:
    
      Use case name
          Verify that a data entry is updated with correct GameState string, AccountName, and GameID
      Description
          Test that the game is saved correctly in the table 
      Pre-conditions
          AccountName is valid, GameID created and valid, 
      Test steps
          1. Check to see if there is another table entry with the same GameID. 
          2a. If so, overwite the table entry with the new GameState
          2b. If not, create new table entry with respective parameters 
          3. Verify new table entry 
      Expected result
          There should be a new entry in the table for the game 
      Actual result
          N/A
      Status (Pass/Fail)
          N/A
      Notes
          N/A
      Post-conditions
          The new entry in the table should remain stable and retrieveable for other tests 
          
*Access Method 2*

Name: `recallGame` <br> 
Description: retrieves a Games entry and populates the game based on the GameState string. 

Parameters:

* `GameID` STRING
* `AccountName` STRING

Return values: `GameState` STRING

Tests:

      Use case name
          Verify a game is retrieved correctly from the table 
      Description
          Test the load game procedure works correctly 
      Pre-conditions
          AccountName is valid, GameID is valid and both correspond to a table entry within Games table 
      Test steps
          1. Verify GameId exists
          2. Verify the AccountName for table entry matches the AccountName retrieving the table entry 
          3. Change Sudoku board appearance based on GameState STRING
      Expected result
          The board state changes based on the table entry accessed, matching a previously saved entry 
      Actual result
          N/A
      Status (Pass/Fail)
          Pass
      Notes
          N/A
      Post-conditions
          The user is now able to continue to change the gamestate and resume completing the sudoku puzzle 
          
*Access Method 3*

Name: `recallGame` <br> 
Description: verifies that only the corresponding account may access the saved game state. 

Parameters:

* `GameID` STRING
* `AccountName` STRING

Return values: `None`

Tests:

      Use case name
          Verify an invalid user cannot access a table entry 
      Description
          Tests that when a user tries to select GameID that does not correspond to their AccountName, the user is denied 
      Pre-conditions
          Valid Games Table entry, with an incorrect AccountName for the entry. 
      Test steps
          1. Retrieve a game table entry as in recallGame above. 
          2. Provide a valid GameID, GameState, and an invalid AccountName
          3. The AccountName provided will not match the table entry 
          4. The action is canceled as a result 
      Expected result
          Nothing will occur, error message for user, no changes to games table 
      Actual result
          N/A
      Status (Pass/Fail)
          N/A
      Notes
          N/A
      Post-conditions
          No changes, the user is successfully blocked from modifying a game that they do not have access to. 