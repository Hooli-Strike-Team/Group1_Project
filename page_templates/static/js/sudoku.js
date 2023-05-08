// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## 
// #    Front End and Back End Functions                    ##
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##

// generalized post
function http_post(route,json_body) {
    //const url = "https://coding.csel.io/user/matu8568/proxy/3308/"
    const xhr = new XMLHttpRequest();
    xhr.open("POST", route);
    xhr.setRequestHeader("Content-Type", "application/json");
    const body = JSON.stringify(json_body);
    xhr.onload = () => {
      if (xhr.readyState == 4 && xhr.status == 201) {
        console.log(JSON.parse(xhr.responseText));
      } else {
        console.log(`Error: ${xhr.status}`);
      }
    };
    xhr.send(body);
    return
}

// generalized get
function http_get(route) {
    //const url = "https://coding.csel.io/user/matu8568/proxy/3308/"
    const XHR = new XMLHttpRequest();
    XHR.open("GET",  route);
    XHR.send();
    XHR.responseType = "json";
    XHR.onload = () => {
      if (XHR.readyState == 4 && XHR.status == 200) {
        const data = JSON.parse(XHR.response);
        console.log(data)
        return data
      } else {
        console.log(`Error: ${XHR.status}`);
        return
      }
    };

}

// Get initial settings values from DB
// Modified function from settings-modal.js, not sure if can import from and use file at same time
function get_settings_values(username) { 
  fetch('game_settings/' + username)
  .then(response => response.json())
  .then(data => {
    // Save clock setting
    var is_clock_on = data[0][1]; 
    // Save mistakes setting
    var is_mistakes_on = data[0][2];
    console.log("mistake_toggle: ",is_mistakes_on)

    return is_mistakes_on
  })
  .catch(error => console.error(error));
    // does there need to be a return if error?
}

async function http_get_saved(route) {


    try {
        const response = await fetch(route, {
            method: 'GET',
        });
        const data = await response.json();
        console.log(data) 
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function loadGameData(username) {
    const game_json_data = await http_get_saved('game_state/'+username)
    console.log('inside loadGame', game_json_data)
    return game_json_data
}

// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## 
// #    Sudoku Board Functions                              ##
// ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##

class Sudoku {
    constructor() {
        this.blank_board = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.board = Helper.clone(this.blank_board);
        this.set_original_board(this.blank_board);
    }

    set_as_start_point() {
        this.set_original_board(this.board);
    }

    set_board(board_string) {
        if ( ! board_string ) {
            return false;
        }

        if ( ! board_string.match(/^[0-9*_.]{81}$/m) ) {
            return false;
        }

        // TODO: foreach getBoardSquares
        for ( let row = 0; row <= 8; row++ ) {
            for ( let column = 0; column <= 8; column++ ) {
                let char = board_string.charAt(row * 9 + column);
                if ( char == '*' || char == '_' || char == '.' ) {
                    char = 0;
                }
                this.board[row][column] = parseInt(char);
            }
        }

        this.set_original_board(this.board);

        return true;

        /*
        if ( ! this.puzzle_is_valid() ) {
            this.board = Helper.clone(this.blank_board);
            return;
        }
        */
    }
    
    set_original_board_from_string(board_string) {
        if ( ! board_string ) {
            return false;
        }

        if ( ! board_string.match(/^[0-9*_.]{81}$/m) ) {
            return false;
        }

        // TODO: foreach getBoardSquares
        for ( let row = 0; row <= 8; row++ ) {
            for ( let column = 0; column <= 8; column++ ) {
                let char = board_string.charAt(row * 9 + column);
                if ( char == '*' || char == '_' || char == '.' ) {
                    char = 0;
                }
                this.original_board[row][column] = parseInt(char);
            }
        }

        return true;
    }

    get_board() {
        return this.board;
    }

    get_original_board() {
        return this.original_board;
    }
    
    get_original_board_string() {
        let str = '';
        for ( let row = 0; row <= 8; row++ ) {
            for ( let col = 0; col <= 8; col++ ) {
                str += this.original_board[row][col];
            }
        }
        return str;
    }

    get_string() {
        let str = '';
        for ( let row = 0; row <= 8; row++ ) {
            for ( let col = 0; col <= 8; col++ ) {
                str += this.board[row][col];
            }
        }
        return str;
    }

    // Method for debugging purposes
    set_original_board(obj) {
        this.original_board = Helper.clone(obj);
    }

    restart_puzzle() {
        this.board = Helper.clone(this.original_board);
    }

    make_move(row, col, value, timer, difficulty) {
        if ( value === '' ) {
            value = 0;
        }
        this.board[row][col] = value;
        
        var game_state = this.get_string();
        var original_board = this.get_original_board_string();
        // doesn't actually stop timer, just retrieves time
        var current_time = timer.end()
        
        // send to database
        var game_json = [{'Update_Type':'Current Game','Username':sessionUsername,'Game_ID':1,'Current_Time':current_time,'Game':game_state, 'Original_Game':original_board,'Difficulty':difficulty}]
        http_post('game_state/'+sessionUsername,game_json)
    }

    add_note(inputEl, newDigit) {
        // Get notes container for current cell input
        const notesDiv = inputEl.nextElementSibling;

        // Get current notes for cell
        const currentNotes = inputEl.getAttribute("data-notes");

        if ( currentNotes.includes(newDigit) ) {
            inputEl.setAttribute("data-notes", currentNotes.replace(newDigit, ""));
        } else {
            inputEl.setAttribute("data-notes", currentNotes + newDigit);
        }

        // Update notes container with new notes
        const notesArray = inputEl.getAttribute("data-notes").split("");
        // Clear notes container
        notesDiv.innerHTML = "";

        notesArray.forEach((note, index) => {
            const noteElem = document.createElement("div");
            // Set text content of note element
            noteElem.textContent = note;
            noteElem.classList.add("note" + note);
            // Add note element to notes container
            notesDiv.appendChild(noteElem);
        });

        // Clear input value of cell
        inputEl.value = "";
    }
    
    clear_notes(inputEl) {
        // Get notes container for current cell input
        const notesDiv = inputEl.nextElementSibling;

        inputEl.setAttribute("data-notes", "");

        // Clear notes container
        notesDiv.innerHTML = "";
    }
    // Input to another cell clears all highlights 
    clear_mistakes(sudoku_squares, invalid_tag) {
        for ( let row = 0; row <= 8; row++ ) {
            for ( let col = 0; col <= 8; col++ ) {
                sudoku_squares[row][col].classList.remove(invalid_tag);

            }
        }
    }

    is_valid_input(value) {
        const regex = new RegExp('^[1-9]$');
        if ( ! regex.test(value) ) {
            console.log("not number")
            return false;
        }
        return true;
    }

    is_legal_move(row, col, value) {
        var strvalue = toString(value);
        const regex = new RegExp('^[1-9]$');

        // Check for non-numbers
        if ( ! regex.test(value) ) {
            console.log("not number")
            return false;
        }

        // Check row
        // TODO: foreach getRowSquares
        for ( let i = 0; i <= 8; i++ ) {
            if ( value == this.board[row][i] ) {
                console.log("duplicate row")
                return false;
            }
        }

        // Check column
        // TODO: foreach getColumnSquares
        for ( let i = 0; i <= 8; i++ ) {
            if ( value == this.board[i][col] ) {
                console.log("duplicate col")
                return false;
            }
        }

        // Check 3x3 grid
        // TODO: foreach getBoxSquares
        const row_offset = Math.floor(row / 3) * 3;
        const col_offset = Math.floor(col / 3) * 3;
        for ( let i = 0 + row_offset; i <= 2 + row_offset; i++ ) {
            for ( let j = 0 + col_offset; j <= 2 + col_offset; j++ ) {
                if ( value == this.board[i][j] ) {
                    console.log("duplicate square")
                    return false;
                }
            }
        }

        return true;
    }

    board_state(sudoku_squares, invalid_tag) {
        const regex = new RegExp('^[1-9]$');
        var is_legal = true;
        var is_finished = true;

        // Run check for every cell
        for ( let row = 0; row <= 8; row++ ) {
            for ( let col = 0; col <= 8; col++ ) {

                // Check if any squares are blank
                if ( this.board[row][col] == 0 ) {
                    is_finished = false;
                }

                // Zeros are non-entries and should not be compared
                else {
                    // Clear any previous flags
                    sudoku_squares[row][col].classList.remove(invalid_tag);

                    // Check row
                    for (let i = 0; i <= 8; i++) {
                        if ( this.board[row][col] == this.board[row][i] && col != i ) {
                            sudoku_squares[row][col].classList.add(invalid_tag);
                            is_legal = false;
                        }
                    }

                    // Check column
                    // TODO: foreach getColumnSquares
                    for ( let i = 0; i <= 8; i++ ) {
                        if ( this.board[row][col] == this.board[i][col] && row != i ) {
                            sudoku_squares[row][col].classList.add(invalid_tag);
                            is_legal = false;
                        }
                    }

                    // Check 3x3 grid
                    // TODO: foreach getBoxSquares
                    const row_offset = Math.floor(row / 3) * 3;
                    const col_offset = Math.floor(col / 3) * 3;
                    for ( let i = 0 + row_offset; i <= 2 + row_offset; i++ ) {
                        for ( let j = 0 + col_offset; j <= 2 + col_offset; j++ ) {
                            if ( this.board[row][col] == this.board[i][j] && !(row == i && col == j) ) {
                                sudoku_squares[row][col].classList.add(invalid_tag);
                                is_legal = false;
                            }
                        }
                    }
                }
            }
        }
        // Returns object with is_legal and is_finished as attributes
        return { is_legal, is_finished };
    }

}

class SudokuSquare {
    constructor(row, col, value = 0) {
        this.row = parseInt(row);
        this.col = parseInt(col);
        this.value = parseInt(value);
    }

    getSquare() {
        return [this.row, this.col];
    }

    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    getValue() {
        return this.value;
    }

    setValue(row, col) {
        this.row = row;
        this.col = col;
    }
}

class SudokuDOM {
    static display_board(
        sudoku_object,
        sudoku_squares,
        change_square_color = true
    ) {
        const board = sudoku_object.get_board();
        console.log(board)
        this.clear_board(sudoku_squares, change_square_color);
        for ( let row = 0; row <= 8; row++ ) {
            for ( let col = 0; col <= 8; col++ ) {
                const input = sudoku_squares[row][col];
                input.classList.remove('hint');
                input.classList.remove('invalid');
                input.disabled = false;

                if ( board[row][col] != 0 ) {
                    input.value = board[row][col];
                    if ( change_square_color ) {
                        input.classList.add('imported-square');
                        input.disabled = true;
                    }
                }
            }
        }
    }
    
    static display_in_progress_board(
    sudoku_object,
    sudoku_squares,
    change_square_color = true,
    ) {
        const board = sudoku_object.get_board();
        const original_board = sudoku_object.get_original_board();
        console.log(board)
        console.log(original_board)
        this.clear_board(sudoku_squares, change_square_color);
        for ( let row = 0; row <= 8; row++ ) {
            for ( let col = 0; col <= 8; col++ ) {
                const input = sudoku_squares[row][col];
                input.classList.remove('hint');
                input.classList.remove('invalid');
                input.disabled = false;

                if ( board[row][col] != 0 ) {
                    input.value = board[row][col];
                    if ( change_square_color && original_board[row][col] != 0) {
                        input.classList.add('imported-square');
                        input.disabled = true;
                    }
                }
            }
        }
    }
        //SudokuDOM.display_string(sudoku_object, string_box, sudoku_wiki_link);
    

    // static display_string(sudoku_object, string_box, sudoku_wiki_link) {
    //     string_box.value = sudoku_object.get_string();
    //     sudoku_wiki_link.href = 'https://www.sudokuwiki.org/sudoku.htm?bd=' + sudoku_object.get_string();
    // }

    static clear_board(sudoku_squares, change_square_color = true) {
        for ( let row = 0; row <= 8; row++ ) {
            for ( let col = 0; col <= 8; col++ ) {
                sudoku_squares[row][col].value = "";
                if ( change_square_color ) {
                    sudoku_squares[row][col].classList.remove('imported-square');
                }
            }
        }
    }

    static highlight_illegal_move(obj) {
        // obj.classList.remove("selected-square");
        obj.classList.add('invalid');
        setTimeout(function () {
            obj.classList.remove('invalid');
        }, 2000);
    }

    static highlight_hint(obj) {
        obj.classList.add('hint');
        setTimeout(function () {
            obj.classList.remove('hint');
        }, 2000);
    }

}

// DOMContentLoaded event occurs when all HTML is loaded and scripts are executed
window.addEventListener('DOMContentLoaded', (e) => {
    // DOM elements stored as constants
    const sudoku_table = document.getElementById('sudoku-board');
    const restart_button = document.getElementById('restart-button');
    const hint_button = document.getElementById('hints-button');
    const new_button = document.getElementById('new-game-button');
    const xbutton = document.querySelector(".x-button");
    let settings_mistakes = document.getElementById('settings-mistakes'); // Needs to be changed later
    const difficulty_span = document.getElementById('difficulty-span');
    
    // *************************** FIX *************************** 
    // Pull Session Data
    console.log("sesssion data", sessionUsername)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let newGame = urlParams.get('new');
    // *************************** FIX ***************************
    
    // Call Sudoku constructor 
    const game1 = new Sudoku();
    
    const mistakes_button = document.getElementById('mistakes-button');
    const notes_button = document.getElementById('notes-button');
    const sudoku_squares = Helper.createArray(9, 9);
    const keypad = Helper.createArray(9);
    // Real constants (MACRO_CASE)
    // const CUSTOM_PUZZLE_SELECTEDINDEX = 3;
    // const DEFAULT_PUZZLE_SELECTEDINDEX = 6;
    const PUZZLE_SIZE = 9;
    
    // Begins timer 
    const callback = () => {
            console.log('timer initiated');
        }

    const timer = new Timer();
        timer.set(0, 'timer1', callback);
        // set limit after which callback function should be called, 12 hours = 43200 seconds 
        timer.setTimeLimit(43200); 
        // start the timer 
        timer.start('COUNT_UP');

    // Tags can be edited based on "Mistakes"/"Hint" button flags to 
    // add/remove CSS
    let invalid_tag = "null" 
    const hint_tag = "invalid"

    // Flag for turning notes mode on and off
    let notes_mode = false;
    
    // Flag for turning mistakes mode on and off
    let mistakes_mode = false;
    
    // Flag to check the difficulty 
    let difficulty_check = "none" 
    
    // counts the number of times mistakes button is clicked 
    let mistakes_count = 0 
    

    // counts the number of times the notes button is toggled loadGame
    let notes_count = 0 


    // Store all the Sudoku square <input type="text"> elements in variables for 
    // quick access
    for ( let row = 0; row < PUZZLE_SIZE; row++ ) {
        for ( let col = 0; col < PUZZLE_SIZE; col++ ) {
            sudoku_squares[row][col] = sudoku_table.children[col + row * PUZZLE_SIZE].children[0];
        }
    }

    // Store all the keypad button elements in variables for quick access
    // Note: index off by 1 relative to value
    for ( let i = 1; i < 10; i++ ) {
        keypad[i - 1] = document.getElementById('digit-' + i)
    }

    // Set board with stored game if not new
    var saved_game_promise = loadGameData(sessionUsername);
    // Entire rest of logic has to be inside promise
    saved_game_promise.then((saved_game_json_data) => { 
      
        // no game data found, set newGame flag to true
        if (saved_game_json_data.length == 0) {
          newGame = true;
        }
      
        console.log("newgame flag", newGame);
      
        if (!newGame) {
            var game_string = saved_game_json_data[0][3];
            var original_game_string = saved_game_json_data[0][4];
            var saved_time = saved_game_json_data[0][2];
            var saved_difficulty = 
            console.log('in newgame', game_string, original_game_string)
            
            // set initial mistakes count from saved data
            document.getElementById('strike-counter').innerHTML = saved_game_json_data[0][8];
            
            // Reset board based on values in database
            game1.set_board(game_string);
            game1.set_original_board_from_string(original_game_string)
            console.log('original board:', game1.orginal_board)
            SudokuDOM.display_in_progress_board(game1, sudoku_squares, true);
            
            // Reset time based on time of last move in database
            timer.set(saved_time, 'timer1', callback);
            
            // Change Difficulty label based on game difficulty in database
            difficulty_span.textContent= saved_game_json_data[0][5]
        }
    
        // Sudoku Cell Listener adds input to board
        for ( let row = 0; row < PUZZLE_SIZE; row++ ) {
            for ( let col = 0; col < PUZZLE_SIZE; col++ ) {
                sudoku_squares[row][col].addEventListener('input', function (e) {
                    // Clear highlights when you select cell
                    e.target.classList.remove(invalid_tag);
                    e.target.classList.remove(hint_tag);


                    // target.value tracks all inputs since page load unless cleared
                    let str_input = e.target.value.toString()
                    if ( str_input.length > 1 ) {
                        e.target.value = str_input[1]
                    }

                    var input = e.target.value
                    console.log('input', input)


                    // Check whether input is valid number and check entire 
                    // board state
                    if ( game1.is_valid_input(input) ) {

                        if ( notes_mode ) {
                            game1.add_note(e.target, input);
                        }
                        // ##  ##  ##  ## ## ## ## MAKE MOVE FROM KEYBOARD ##  ##  ##  ## ## ## ##
                        else {
                            console.log("timer",timer.end())
                            game1.clear_notes(e.target);
                            game1.make_move(row, col, input, timer,difficulty_check);
                            console.log(game1.board);
                            var state = game1.board_state(sudoku_squares, invalid_tag)
                            var is_mistakes_counter_on = settings_mistakes.checked
                            console.log("on move, mistakes counter is:", is_mistakes_counter_on)
                            console.log("on move, mistakes mode is:", mistakes_mode)

                            // clear all highlighted mistakes 
                            game1.clear_mistakes(sudoku_squares, invalid_tag)

                            // Check if Mistakes Toggle is off
                            if (!is_mistakes_counter_on) {


                                // If the mistakes toggle is on, highlight invalid cells 
                                if (!state.is_legal && mistakes_mode == true)  {
                                    let state = game1.board_state(sudoku_squares, "invalid");
                                    //console.log("Default Mistakes Mode On"); 
                                }
                                else if (state.is_legal && mistakes_mode == true) {

                                    game1.clear_mistakes(sudoku_squares, "invalid")
                                    //console.log("Clear All mistakes");

                                }

                                // If the mistakes toggle is off, clear all highlights   
                                if (mistakes_mode == false) {
                                    game1.clear_mistakes(sudoku_squares, "invalid");
                                    //console.log("Default Mistakes Mode Off"); 
                                }
                            }
                            // Mistakes Toggle is On
                            else {
                                // Remove Highlight as soon as move is made
                                game1.clear_mistakes(sudoku_squares, "invalid");
                            }


                            console.log("Legal", state.is_legal);
                            console.log("Complete", state.is_finished);
                            // Check to see if game is completed correctly
                            if ( state.is_legal && state.is_finished ) {
                                // Get string of the most recently completed game 
                                just_finished = game1.get_string() 
                                console.log(just_finished) 

                                // Function to flag completed games for the Puzzle Master Badge 
                                PuzzleMaster(just_finished); 


                                // Do game end actions
                                console.log("game complete");
                                completedmodal();
                                console.log("timer ended"); 
                                timer.stop(); //ends timer at game completion
                                end = timer.end() // Send to Current_Time SQL 
                                console.log("Timer Ended At:", end) 
                                console.log("The difficulty was", difficulty_check) 
                                // *************************** TODO  ***************************
                                // run update query for game completion at difficulty
                                    // POST to route, run update query
                                // run update query for time completion at difficulty

                                if (difficulty_check == "Hard") { // Finish a Game on Expert - Send info to database 
                                       const xhr = new XMLHttpRequest();
                                        xhr.open("POST", "record");
                                        xhr.setRequestHeader("Content-Type", "application/json");
                                        const body = JSON.stringify({
                                          Username: sessionUsername,
                                          Current_Time: end,
                                          Difficulty: "Hard",
                                          Mistakes_Checked: mistakes_count,
                                          Notes_Checked: notes_count,

                                        });
                                        xhr.onload = () => {
                                          if (xhr.readyState == 4 && xhr.status == 201) {
                                            console.log(JSON.parse(xhr.responseText));
                                          } else {
                                            console.log(`Error: ${xhr.status}`);
                                          }
                                        };
                                        xhr.send(body);
                                }

                                else if (difficulty_check == "Medium") { // Finish a Game on Hard - Send info to database

                                       const xhr = new XMLHttpRequest();
                                        xhr.open("POST", "record");
                                        xhr.setRequestHeader("Content-Type", "application/json");
                                        const body = JSON.stringify({
                                          Username: sessionUsername,
                                          Current_Time: end,
                                          Difficulty: "Medium", 
                                          Mistakes_Checked: mistakes_count,
                                          Notes_Checked: notes_count,

                                        });
                                        xhr.onload = () => {
                                          if (xhr.readyState == 4 && xhr.status == 201) {
                                            console.log(JSON.parse(xhr.responseText));
                                          } else {
                                            console.log(`Error: ${xhr.status}`);
                                          }
                                        };
                                        xhr.send(body);

                                }

                                else if(difficulty_check == "Easy") { // Finish a Game on Easy - Send info to database 

                                       const xhr = new XMLHttpRequest();
                                        xhr.open("POST", "record");
                                        xhr.setRequestHeader("Content-Type", "application/json");
                                        const body = JSON.stringify({
                                          Username: sessionUsername,
                                          Current_Time: end,
                                          Difficulty: "Easy", 
                                          Mistakes_Checked: mistakes_count,
                                          Notes_Checked: notes_count,

                                        });
                                        xhr.onload = () => {
                                          if (xhr.readyState == 4 && xhr.status == 201) {
                                            console.log(JSON.parse(xhr.responseText));
                                          } else {
                                            console.log(`Error: ${xhr.status}`);
                                          }
                                        };
                                        xhr.send(body);

                                }

                            }

                        }
                    }
                    else {
                        // clear input and update board state with non-entry
                        e.target.value = "";
                        game1.make_move(row, col, 0, timer,difficulty_check);
                        console.log(game1.board);
                        game1.board_state(sudoku_squares, invalid_tag)
                    }

                })

                sudoku_squares[row][col].addEventListener("mousedown", function (e) {
                    // Search for old highlited cell and remove it if it exists
                    let element = document.querySelector(".selected-square");
                    if ( element ) {
                        element.classList.remove("selected-square");
                    }
                    // Add highlight css for clicked cell
                    sudoku_squares[row][col].classList.add('selected-square');

                });

                // Check whether key pressed is backspace, and if in notes mode, 
                // delete notes
                sudoku_squares[row][col].addEventListener('keydown', function (e) {
                    let element = document.querySelector(".selected-square");

                    if ( element ) {
                        const key = e.keyCode || e.charCode;

                        if ( (key == 8 || key == 46) && notes_mode ) {
                            game1.clear_notes(element);
                        }
                    }
                });
            }
        }

        // Create listener for each keypad button and input value in display and array 
        // Note: index off by 1 relative to value
        for ( let i = 1; i < 10; i++ ) {
            keypad[i - 1].addEventListener('click', function (e) {
                let key_num = this.getAttribute('data-digit')
                let element = document.querySelector('.selected-square');
                if ( element ) {
                    element.value = key_num
                    let cell_name = element.id
                    let cell_num = cell_name.split('-')[1]
                    let row = Math.floor(cell_num / PUZZLE_SIZE)
                    let col = cell_num % PUZZLE_SIZE

                    if ( notes_mode ) {
                        game1.add_note(element, key_num);
                    } 
                    // ##  ##  ##  ## ## ## ## MAKE MOVE FROM KEYPAD ##  ##  ##  ## ## ## ##
                    else {
                        game1.make_move(row, col, this.getAttribute('data-digit'),timer,difficulty_check);
                        game1.clear_notes(element);
                        
                        // clear all highlighted mistakes 
                        game1.clear_mistakes(sudoku_squares, invalid_tag)
                        console.log(game1.board)
                    }
                }
            })
        }

        // Keypad Backspace
        xbutton.addEventListener('click', function (e) {
            let element = document.querySelector('.selected-square');
            if ( element ) {
                element.value = ""
                let cell_name = element.id
                let cell_num = cell_name.split('-')[1]
                let row = Math.floor(cell_num / PUZZLE_SIZE)
                let col = cell_num % PUZZLE_SIZE

                if ( notes_mode ) {
                    game1.clear_notes(element);
                } else {
                    game1.make_move(row, col, 0, timer,difficulty_check);
                }
            }
        })

        /*
         // Create New Game (temporarily read from string)
         new_button.addEventListener('click', function(e) {
             beginner = "080100007000070960026900130000290304960000082502047000013009840097020000600003070"
             game1.set_board(beginner);
             SudokuDOM.display_board(game1, sudoku_squares, true);
             // Reset mistakes counter
             document.getElementById('strike-counter').innerHTML = " 0 / 10";
             m = 0
         })
         */

        // Toggle notes mode when notes button is clicked
        notes_button.addEventListener('click', function (e) {
            e.target.classList.toggle('active');
            notes_mode = !notes_mode;

            notes_count = notes_count + 1; // Interates the number of times the notes feature is used 
            console.log("Notes Count", notes_count) 

        });

        /* Mistakes Handling */
      
        mistakes_button.addEventListener('click', function(e) {
          settings_mistakes = document.getElementById('settings-mistakes');

          // Mistakes setting is ON
          if (settings_mistakes.checked) {
            invalid_tag = "invalid";
            
            // Add active class to mistakes button to "highlight" it
            e.target.classList.add('active');
            
            // Show mistakes on board in red
            let result = game1.board_state(sudoku_squares, invalid_tag);

            // Remove active class from mistakes button click
            setTimeout(function () {
              e.target.classList.remove('active');
            }, 100);
            
            // Get current game data
            loadGameData(sessionUsername).then((game_json_data) => {
                m = game_json_data[0][8]; // get mistake count
                m = m + 1;

                // Update mistake count in database
                var mistakes_json = [{'Update_Type':'Mistake', 'Username':sessionUsername, 'Mistakes_Count':m}];
                http_post('game_state/'+sessionUsername, mistakes_json);

                // Update counter
                document.getElementById('strike-counter').innerHTML = m;

                // If 10 mistakes has been reached, game is over
                if ( m == 10 ) {
                  rendermodal();
                }
            });

          } else {
            e.target.classList.toggle('active');
            mistakes_mode = !mistakes_mode;
            
            // Only increment mistakes count if toggling button ON
            if (e.target.classList.contains('active')) {
              mistakes_count = mistakes_count + 1;
            }
            
            if (mistakes_mode) {
              game1.board_state(sudoku_squares, "invalid");
            } else {
              game1.clear_mistakes(sudoku_squares, "invalid");
            }
            
          }
        });
      
        // If mistakes settings change while playing game, reset 
        // mistake features
        settings_mistakes.addEventListener('change', function() {
          mistakes_button.classList.remove('active');
          mistakes_mode = false;
          game1.clear_mistakes(sudoku_squares, "invalid");
        });

        // Render modal window for the mistakes counter warning     
        function rendermodal(event) {
            // Show modal window when page loads
            var modal_mistakes = document.getElementById('mistake-limit-model');
          
            modal_mistakes.style.display = 'block';
            modal_mistakes.addEventListener('click', hidemistakes)
        }

        // Code for clicking out of mistakes modal window
        function hidemistakes(event) {
            // Get modal window element by ID
            var modal_mistakes = document.getElementById('mistake-limit-model');
          
            // Get content of modal window
            var content_mistakes = document.querySelector('.modal-mistakes-content');

            // Check if element that is clicked on is either modal window background 
            // or not a child of content
            if ( event.target == modal_mistakes || !content_mistakes.contains(event.target) ) {
                // Hide modal window
                modal_mistakes.style.display = 'none';
              
                m = 0;
                var mistakes_json = [{'Update_Type':'Mistake','Username':sessionUsername,'Mistakes_Count':m}]
                http_post('game_state/'+sessionUsername,mistakes_json);

                // Reset mistakes counter
                document.getElementById('strike-counter').innerHTML = "0";
              
                // Show user difficulty modal window
                openModal() 

            }
        }
      
      
        /* Code for End of Game Notification Modal Window */

        // Render modal window for completed game
        function completedmodal(event) {
            // Show modal window when page loads

            var modal = document.getElementById('completed-game-model');

            modal.style.display = 'block';
            modal.addEventListener('click', hidecompleted)
        }
      
        // Code for clicking out of completed game modal
        function hidecompleted(event) {
            // Get modal window element by ID
            var modal = document.getElementById('completed-game-model');
            // Get content of modal window
            var content = document.querySelector('.modal-completed-content');

            // Check if element that is clicked on is either modal window background 
            // or not a child of content
            if ( event.target == modal || !content.contains(event.target) ) {
                // Hide modal window
                modal.style.display = 'none';

                // Reset mistakes counter
                m = 0
                document.getElementById('strike-counter').innerHTML = "0";

                // Show user back to difficulty modal window
                openModal() 

            }

        }

        /* Code for difficulty modal window */

        // Get difficulty modal window and its elements
        const modal = document.getElementById('difficultyModal');
        const closeButton = document.querySelector('.close');
        const expertButton = document.getElementById('expert');
        const easyButton = document.getElementById('easy'); 
        const hardButton = document.getElementById('hard'); 

        // Get any parameters from URL
            // Moved to start of listener
        // const queryString = window.location.search;
        // const urlParams = new URLSearchParams(queryString);
        // const newGame = urlParams.get('new'); 

        if (newGame)
          openModal();
        
        // PUZZLES TAKEN FROM 
            // Staurt , Andrew. “Sudoku Solver.” Sudoku Solver by Andrew Stuart, 28 May 2005, https://www.sudokuwiki.org/sudoku.htm. 

        /* HardCode Easy Sudoku Games */
        const easy_game_1 = "000004028406000005100030600000301000087000140000709000002010003900000507670400000";
                // Start:    000004028406000005100030600000301000087000140000709000002010003900000507670400000
                // Solution: 735164928426978315198532674249381756387256149561749832852617493914823567673495281  

        const easy_game_2 = "690000140700080000002070060400703000001000300000901004050010600000040002073000058";
                // Start:    690000140700080000002070060400703000001000300000901004050010600000040002073000058
                // Solution: 698532147715684923342179865486723591921458376537961284254817639869345712173296458

        const easy_game_3 = "000004076705000009300010200000907000041000780000103000006030001500000604820400000";
                // Start:    000004076705000009300010200000907000041000780000103000006030001500000604820400000
                // Solution: 182594376765328419394716258238947165941652783657183942476235891513879624829461537

        const easy_game_4 = "850000370200040000006010050400109000003000100000307004060070200000080007041000096";
                // Start:    850000370200040000006010050400109000003000100000307004060070200000080007041000096
                // Solution: 854692371217543968936718452482169735673854129195327684568971243329486517741235896



        /* HardCode Hard Sudoku Games */ 
        const hard_game_1 = "309000400200709000087000000750060230600904008028050041000000590000106007006000104"; 
                // Start:    309000400200709000087000000750060230600904008028050041000000590000106007006000104
                // Solution: 369218475215749863487635912754861239631924758928357641173482596542196387896573124

        const hard_game_2 = "401000600700601000095000000140050820800409006032060057000000780000907002004000903";
                // Start:    401000600700601000095000000140050820800409006032060057000000780000907002004000903
                // Solution: 421375698783691245695284371146753829857429136932168457219536784368947512574812963

        const hard_game_3 = "000081074000304900400200501090040060000605000070090010907008006008502000320760000";
                // Start:    000081074000304900400200501090040060000605000070090010907008006008502000320760000
                // Solution: 532981674761354982489276531895147263143625897276893415957418326618532749324769158

        const hard_game_4 = "000067023000205800600800709010090070000506000060040090105002004009403000470180000";
                // Start:    000067023000205800600800709010090070000506000060040090105002004009403000470180000
                // Solution: 851967423947235816623814759514398672798526341362741598135672984289453167476189235

        /* HardCode expert Sudoku Games */ 
        const expert_game_1 = "000704005020010070000080002090006250600070008053200010400090000030060090200407000";

                // Start:      000704005020010070000080002090006250600070008053200010400090000030060090200407000
                // Solution:   981724365324615879765983142197836254642571938853249716476398521538162497219457683

        const expert_game_2 = "204060000030509020000300000400200007069070810700006004000002000090105070000080205";
                // Start:      204060000030509020000300000400200007069070810700006004000002000090105070000080205
                // Solution:   254861739137549628986327541413258967569473812728916354645792183892135476371684295

        const expert_game_3 = "000704002090060030000090004010002350800070006052600090200080000070010020500407000";
                // Start:      000704002090060030000090004010002350800070006052600090200080000070010020500407000
                // Solution:   386754912794261835125893674617942358839175246452638791241389567978516423563427189

        const expert_game_4 = "502080000070501090000200000400600007018070960700002004000003000020905030000060402";
                // Start:      502080000070501090000200000400600007018070960700002004000003000020905030000060402
                // Solution:   592486173674531298381297546453619827218374965769852314145723689826945731937168452

        // Opens difficulty modal window
        function openModal() {
            modal.style.display = 'block';
        }

        // Closes difficulty modal window
        function closeModal() {
            modal.style.display = 'none';
        }

        // Add event listener to open difficulty modal window on click
        new_button.addEventListener('click', openModal);

        // Add event listener to close difficulty modal window
        closeButton.addEventListener('click', closeModal);

        // Add event listener to "Easy" Button 
        let easy = 0 
        easyButton.addEventListener('click', function (e) {
            closeModal();
            var easy_arr = [easy_game_1, easy_game_2, easy_game_3, easy_game_4];
            game1.set_board(easy_arr[easy]);
            SudokuDOM.display_board(game1, sudoku_squares, true);

            // Record Difficulty 
            difficulty_check = "Easy" 
            difficulty_span.textContent=difficulty_check

            // Save Game State
            var easy_game_json = [{'Update_Type':'New Game','Username':sessionUsername,'Game_ID':1,'Current_Time':0,'Game':easy_arr[easy], 'Original_Game':easy_arr[easy],'Difficulty':difficulty_check,'Mistakes_Count':0}]
            http_post('game_state/'+sessionUsername,easy_game_json)

            if (easy < 3) {
            easy = easy + 1;
            }
            else {
                easy = 0;
            }

            // Reset mistakes counter
            document.getElementById('strike-counter').innerHTML = "0";
            m = 0;

            timer.set(0, 'timer1', callback);




        });
        // Add event listener to "Hard" Button
        let hard = 0
        hardButton.addEventListener('click', function (e) {
            closeModal();
            var hard_arr = [hard_game_1, hard_game_2, hard_game_3, hard_game_4] 
            game1.set_board(hard_arr[hard]);
            SudokuDOM.display_board(game1, sudoku_squares, true);

            // Record Difficulty 
            difficulty_check = "Medium" 
            difficulty_span.textContent="Hard" //This is very confusing

            // Save Game State
            var hard_game_json = [{'Update_Type':'New Game','Username':sessionUsername,'Game_ID':1,'Current_Time':0,'Game':hard_arr[hard], 'Original_Game':hard_arr[hard],'Difficulty':difficulty_check,'Mistakes_Count':0}]
            http_post('game_state/'+sessionUsername,hard_game_json)

            if (hard < 3) {
                hard = hard + 1;
            }
            else {
                hard = 0;
            }

            // Reset mistakes counter
            document.getElementById('strike-counter').innerHTML = "0";
            m = 0;

            timer.set(0, 'timer1', callback);

        });

        // Add event listener to "Expert" button
        let expert = 0
        expertButton.addEventListener('click', function (e) {
            closeModal();
            var expert_arr = [expert_game_1, expert_game_2, expert_game_3, expert_game_4]
            game1.set_board(expert_arr[expert]);
            SudokuDOM.display_board(game1, sudoku_squares, true);

            difficulty_check = "Hard" 
            difficulty_span.textContent="Expert" //This is very confusing

            // Save Game State
            var expert_game_json = [{'Update_Type':'New Game','Username':sessionUsername,'Game_ID':1,'Current_Time':0,'Game':expert_arr[expert], 'Original_Game':expert_arr[expert],'Difficulty':difficulty_check,'Mistakes_Count':0}]
            http_post('game_state/'+sessionUsername,expert_game_json)


            if (expert < 3) {
                expert = expert + 1; 
            }
            else {
                expert = 0;
            }

            // Reset mistakes counter
            document.getElementById('strike-counter').innerHTML = "0";
            m = 0;

            timer.set(0, 'timer1', callback);



        });

        /* Puzzle Solutions for Puzzle Master Badge */ 
        let easy1_sol = "735164928426978315198532674249381756387256149561749832852617493914823567673495281"
        let easy2_sol = "698532147715684923342179865486723591921458376537961284254817639869345712173296458"
        let easy3_sol = "182594376765328419394716258238947165941652783657183942476235891513879624829461537"
        let easy4_sol = "854692371217543968936718452482169735673854129195327684568971243329486517741235896"

        let med1_sol = "369218475215749863487635912754861239631924758928357641173482596542196387896573124"
        let med2_sol = "421375698783691245695284371146753829857429136932168457219536784368947512574812963"
        let med3_sol = "532981674761354982489276531895147263143625897276893415957418326618532749324769158"
        let med4_sol = "851967423947235816623814759514398672798526341362741598135672984289453167476189235"

        let hard1_sol = "981724365324615879765983142197836254642571938853249716476398521538162497219457683"
        let hard2_sol = "254861739137549628986327541413258967569473812728916354645792183892135476371684295"
        let hard3_sol = "386754912794261835125893674617942358839175246452638791241389567978516423563427189"
        let hard4_sol = "592486173674531298381297546453619827218374965769852314145723689826945731937168452"
        
        
        // Request information from the server using the 'GET' method
        async function http_get_master(route) {


            try {
                const response = await fetch(route, {
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data) 
                return data;
            } catch (error) {
                console.error(error);
            }
        }

        async function loadGameData(username) {
            const game_json_data = await http_get_master('game_state/'+username)
            console.log('inside loadGame', game_json_data)
            return game_json_data
        }

        async function loadSavedGame(username, game, sudoku_squares) {
            const game_json_data = await http_get_master('game_state/'+username)
            console.log('inside loadSavedGame', game_json_data)
            const game_string = game_json_data[3]

            game1.set_board(game_string);
            SudokuDOM.display_board(game1, sudoku_squares, true);

            return game_json_data
        }
        
        // Takes in the string of a recently completed_game to compare with known solutions
        // Used to update the Puzzle_Master table with recent completions 
        async function PuzzleMaster(completed_game) {
            // Requests the current stats on the Puzzle Master table 
            const json_data = await http_get_master("Master");
            console.log("Data in other function", json_data) 


            if (completed_game == easy1_sol) {
                json_data[0][1] = 1; 
            }
            else if (completed_game == easy2_sol) {
                json_data[0][2] = 1;
            }
            else if (completed_game == easy3_sol) {
                json_data[0][3] = 1;
            }
            else if (completed_game == easy4_sol) {
                json_data[0][4] = 1;
            }
            else if (completed_game == med1_sol) {
                json_data[0][5] = 1; 
            }
            else if (completed_game == med2_sol) {
                json_data[0][6] = 1; 
            }
            else if (completed_game == med3_sol) {
                json_data[0][7] = 1;
            }
            else if (completed_game == med4_sol) {
                json_data[0][8] = 1; 
            }
            else if (completed_game == hard1_sol) {
                json_data[0][9] = 1; 
                console.log("Hard Puzzle one", json_data[0][9])
            }
            else if (completed_game == hard2_sol) {
                json_data[0][10] = 1;
            }
            else if (completed_game == hard3_sol) {
                json_data[0][11] = 1;
            }
            else if (completed_game == hard4_sol) {
                json_data[0][12] = 1;    
            }



            // Send updated Puzzle_Master stats back to the database 
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "Master");
            xhr.setRequestHeader("Content-Type", "application/json");
            const body = JSON.stringify({
                Username: sessionUsername,
                Game1_Easy: json_data[0][1],
                Game2_Easy: json_data[0][2], 
                Game3_Easy: json_data[0][3], 
                Game4_Easy: json_data[0][4],
                Game1_Med: json_data[0][5],
                Game2_Med: json_data[0][6],
                Game3_Med: json_data[0][7], 
                Game4_Med: json_data[0][8],
                Game1_Hard: json_data[0][9],
                Game2_Hard: json_data[0][10],
                Game3_Hard: json_data[0][11],
                Game4_Hard: json_data[0][12],

            });
            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 201) {
                    console.log(JSON.parse(xhr.responseText));
                } else {
                    console.log(`Error: ${xhr.status}`);
                }
            };
            xhr.send(body);



        }


        /* Code for Restart Button */ 
        restart_button.addEventListener('click', function(e) {
            game1.restart_puzzle();
            SudokuDOM.display_board(game1, sudoku_squares, true);

            // Reset mistakes counter
            document.getElementById('strike-counter').innerHTML = "0";
            m = 0;

            timer.set(0, 'timer1', callback);
            
            var reset_game_json = [{'Update_Type':'New Game','Username':sessionUsername,'Game_ID':1,'Current_Time':0,'Game':game1.get_string(), 'Original_Game':game1.get_string(),'Difficulty':difficulty_check,'Mistakes_Count':0}]
            http_post('game_state/'+sessionUsername,reset_game_json)

        });

        
    })
});

class Helper {
    static createArray(length) {
        var arr = new Array(length || 0), i = length;
        if ( arguments.length > 1 ) {
            var args = Array.prototype.slice.call(arguments, 1);
            while (i--) {
                arr[length - 1 - i] = Helper.createArray.apply(this, args);
            }
        }
        return arr;
    }

    static delete_value_from_array(arr2, value_to_delete) {
        let array = arr2;
        const index = array.indexOf(value_to_delete);
        if ( index !== -1 ) {
            array.splice(index, 1);
        }
        return array;
    }

    static clone(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    static get_current_time() {
        return Math.round((new Date()).getTime() / 1000);
    }
}

//TIMER_FUNCTION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// This class and implementation is inspired by the following repository: https://github.com/ishwar2303/Timer
//notes indicated changes made from source version 

class Timer {

    Timer() {
        this.time = 0;
        this.element = null;
        this.control = true;
        this.callback = null;
        this.timeLimit = 10;
    }

    set(time, id, callback = null) {
        this.time = time;
        this.element = document.getElementById(id);
        this.callback = callback;
    }

    setTimeLimit(time) {
        this.timeLimit = time;
    }

    start(type = 'COUNT_UP') { //default changed from 'COUNT_DOWN' to 'COUNT_UP'
        this.control = true;

        setTimeout(() => {
            if(type == 'COUNT_DOWN')
                this.countDown();
            else if(type == 'COUNT_UP') 
                this.countUp();
        }, 1000);                       //TODO?: change from 1000 to 9999
    }

    format() {
        let hours = parseInt(this.time / 3600);
        let timeLeft = this.time - hours * 3600;
        let minutes = parseInt(timeLeft / 60);
        timeLeft = timeLeft - minutes * 60;
        let seconds = timeLeft;
        
        hours = hours.toString();
        minutes = minutes.toString();
        seconds = seconds.toString();
    
        if (hours.length == 1)
            hours = '0' + hours;
        if (minutes.length == 1)
            minutes = '0' + minutes;
        if (seconds.length == 1)
            seconds = '0' + seconds;
        
        return hours + ':' + minutes + ':' + seconds;
    }
    
    end() {
        
        return this.time   
    }

    countDown() {
        if(!this.control)
            return;
        let timerblock = this.element;
        timerblock.innerHTML = this.format();
        timerblock.style.display = 'block';

        if (this.time <= 59) {
            timerblock.style.color = 'red';
        }
    
        if (this.time <= 0) {
            timerblock.innerHTML = 'Time end!';
            this.callback();
            this.stop();
        }
        else {
            setTimeout(() => {
                this.countDown();
            }, 1000);
            this.time--;
        }
    }

    countUp() {
        if(!this.control)
            return;
        let timerblock = this.element;
        timerblock.innerHTML = this.format();
        timerblock.style.display = 'block';
    
        if(this.time >= this.timeLimit) {
            timerblock.innerHTML = 'Timer Limit Exceed!';
            this.callback();
            this.stop();
        }
        else {
            setTimeout(() => {
                this.countUp();
            }, 1000); //TODO?: change from 1000 to 9999
            this.time++;
        }
    }

    stop() {
        this.control = false;
    }
}