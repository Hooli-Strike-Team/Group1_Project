class Sudoku {
  constructor() {
        this.blank_board = [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
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
                let char = board_string.charAt(row*9+column);
                if ( char == '*' || char == '_' || char == '.' )
                {
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

    get_board() {
        return this.board;
    }

    get_original_board() {
        return this.original_board;
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

    // making this its own method to help with debugging
    set_original_board(obj) {
        this.original_board = Helper.clone(obj);
    }

    restart_puzzle() {
        this.board = Helper.clone(this.original_board);
    }

    make_move(row, col, value) {
        if ( value === '' ) {
            value = 0;
        }
        this.board[row][col] = value;
    }

    is_legal_move(row, col, value) {
        value = toString(value);

        // check for non numbers
        if ( ! value.match(/^[1-9]$/m) ) {
            return false;
        }

        // check row
        // TODO: foreach getRowSquares
        for ( let i = 0; i <= 8; i++ ) {
            if ( value == this.board[row][i] ) {
                return false;
            }
        }

        // check column
        // TODO: foreach getColumnSquares
        for ( let i = 0; i <= 8; i++ ) {
            if ( value == this.board[i][col] ) {
                return false;
            }
        }

        // check 3x3 grid
        // TODO: foreach getBoxSquares
        const row_offset = Math.floor(row/3)*3;
        const col_offset = Math.floor(col/3)*3;
        for ( let i = 0 + row_offset; i <= 2 + row_offset; i++ ) {
            for ( let j = 0 + col_offset; j <= 2 + col_offset; j++ ) {
                if ( value == this.board[i][j] ) {
                    return false;
                }
            }
        }

        return true;
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
        // string_box,
        // sudoku_wiki_link,
        change_square_color = true
    ) {
        const board = sudoku_object.get_board();
        this.clear_board(sudoku_squares, change_square_color);
        for ( let row = 0; row <= 8; row++ ) {
            for ( let col = 0; col <= 8; col++ ) {
                const input = sudoku_squares[row][col];
                input.classList.remove('hint');
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
        //SudokuDOM.display_string(sudoku_object, string_box, sudoku_wiki_link);
    }

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

    static highlight_illegal_move(obj){
        obj.classList.add('invalid');
        setTimeout(function(){
            obj.classList.remove('invalid');
        }, 2000);
    }

    static highlight_hint(obj) {
        obj.classList.add('hint');
        setTimeout(function(){
            obj.classList.remove('hint');
        }, 2000);
    }
}

// DOMContentLoaded event occurs when all html is loaded and scripts are executed
window.addEventListener('DOMContentLoaded', (e) => {
    // DOM elements stored as constants
    const sudoku_table = document.getElementById('sudoku-board');
    // const solve_button = document.getElementById('solve');
    // const restart_button = document.getElementById('restart');
    // const hint_button = document.getElementById('hint');
    // const import_button = document.getElementById('import');
    const new_button = document.getElementById('new-game-button');
    // const string_box = document.getElementById('string-box');
    // const puzzle_picker = document.getElementById('puzzle_picker');
    // const sudoku_wiki_link = document.getElementById('sudoku-wiki-link');
    // const set_button = document.getElementById('set');
    // const algorithm = document.getElementById('algorithm');
    // const validate_button = document.getElementById('validate');
    // const legal_moves_button = document.getElementById('legal-moves');
    const xbutton = document.querySelector(".x-button");

    const game1 = new Sudoku();
    const sudoku_squares = Helper.createArray(9,9);
    const keypad = Helper.createArray(9);
    // These are real constants, so these get MACRO_CASE
    // const CUSTOM_PUZZLE_SELECTEDINDEX = 3;
    // const DEFAULT_PUZZLE_SELECTEDINDEX = 6;
    const PUZZLE_SIZE = 9;

    // Store all the Sudoku square <input type="text"> elements in variables for quick accessing
    for ( let row = 0; row < PUZZLE_SIZE; row++ ) {
        for ( let col = 0; col < PUZZLE_SIZE; col++ ) {
            sudoku_squares[row][col] = sudoku_table.children[col+row*PUZZLE_SIZE].children[0];
        }
    }
    
    // Store all the keypad button elements in variables for quick accessing (index off by 1 of value)
    for (let i = 1; i<10;i++) {
        keypad[i-1] = document.getElementById('digit-'+i)
    }
    
    // Simple version of Sudoku Cell Listener, adds input to board
    for ( let row = 0; row < PUZZLE_SIZE; row++ ) {
        for ( let col = 0; col < PUZZLE_SIZE; col++ ) {
            sudoku_squares[row][col].addEventListener('input', function(e) {
                game1.make_move(row, col, e.target.value);
                console.log(game1.board)
            });
            sudoku_squares[row][col].addEventListener("mousedown", function(e) {
                let element = document.querySelector(".selected-square");
                if (element){
                    element.classList.remove("selected-square");
                }
                sudoku_squares[row][col].classList.add('selected-square');

            });
        }
    }

    // Creates listener for each keypad button, inputs value in display and array (index off by 1 of value)
    for (let i = 1; i<10;i++) {
        keypad[i-1].addEventListener('click', function(e) {
            let key_num = this.getAttribute('data-digit')
            let element = document.querySelector('.selected-square');
            if(element){
                element.value = key_num
                let cell_name = element.id
                let cell_num = cell_name.split('-')[1]
                let row = Math.floor(cell_num/PUZZLE_SIZE)
                let col = cell_num%PUZZLE_SIZE
                game1.make_move(row, col, this.getAttribute('data-digit'));
                console.log(game1.board)
            }
        })
    }
    
    // Keypad Backspace
    xbutton.addEventListener('click',function(e) {
        let element = document.querySelector('.selected-square');
        if(element){
            element.value = ""
            let cell_name = element.id
            let cell_num = cell_name.split('-')[1]
            let row = Math.floor(cell_num/PUZZLE_SIZE)
            let col = cell_num%PUZZLE_SIZE
            game1.make_move(row, col, 0);
        }
    })
    
    // Create New Game 
    // Temporarily read from string
    new_button.addEventListener('click', function(e) {
        beginner = "080100007000070960026900130000290304960000082502047000013009840097020000600003070"
        game1.set_board(beginner);
        SudokuDOM.display_board(game1, sudoku_squares, true);
    })

/* Full functinoality below
   // Sudoku Cell Listener
   
    for ( let row = 0; row <= 8; row++ ) {
        for ( let col = 0; col <= 8; col++ ) {
            sudoku_squares[row][col].addEventListener('input', function(e) {
                e.target.classList.remove("invalid");
                e.target.classList.remove("hint");

                // Listen for illegal moves. If illegal, delete input and turn square red for 2 seconds.
                if ( ! game1.is_legal_move(row, col, e.target.value) && e.target.value != "" ) {
                    e.target.value = "";
                    SudokuDOM.highlight_illegal_move(e.target);
                } else {
                    game1.make_move(row, col, e.target.value);
                }

                //SudokuDOM.display_string(game1, string_box, sudoku_wiki_link);
            });
        }
    }
*/
    
//     solve_button.addEventListener('click', function(e) {
//         const t1 = performance.now();
//         game1.solve_puzzle();
//         const t2 = performance.now();
//         document.querySelector('#algorithm span').innerHTML = (t2 - t1).toFixed(1);
//         SudokuDOM.display_board(game1, sudoku_squares, string_box, sudoku_wiki_link, false);
//         algorithm.style.display = 'block';
//     });

//     /*
//     set_button.addEventListener('click', function(e) {
//         game1.set_as_start_point();
//         puzzle_picker.selectedIndex = CUSTOM_PUZZLE_SELECTEDINDEX;
//         SudokuDOM.display_board(game1, sudoku_squares, string_box, sudoku_wiki_link, true);
//     });
//     */

//     validate_button.addEventListener('click', function(e) {
//         const t1 = performance.now();
//         const numberOfSolutions = game1.getNumberOfSolutions();
//         const t2 = performance.now();
//         document.querySelector('#algorithm span').innerHTML = (t2 - t1).toFixed(1);
//         algorithm.style.display = 'block';
//         if ( numberOfSolutions === 1 ) {
//             window.alert('PASS - Puzzle is valid');
//         } else {
//             window.alert('FAIL - Puzzle is invalid');
//         }
//     });

//     legal_moves_button.addEventListener('click', function(e) {
//         // TODO ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//         const t1 = performance.now();
//         const numberOfSolutions = game1.getNumberOfSolutions();
//         const t2 = performance.now();
//         document.querySelector('#algorithm span').innerHTML = (t2 - t1).toFixed(1);
//         algorithm.style.display = 'block';
//         if ( numberOfSolutions === 1 ) {
//             window.alert('PASS - Puzzle is valid');
//         } else {
//             window.alert('FAIL - Puzzle is invalid');
//         }
//     });

//     restart_button.addEventListener('click', function(e) {
//         game1.restart_puzzle();
//         SudokuDOM.display_board(game1, sudoku_squares, string_box, sudoku_wiki_link);
//     });

//     hint_button.addEventListener('click', function(e) {
//         const hint = game1.get_hint();
//         if ( hint ) {
//             const row = hint.getRow();
//             const col = hint.getCol();
//             SudokuDOM.highlight_hint(sudoku_squares[row][col]);
//         }
//     });

//     import_button.addEventListener('click', function(e) {
//         const board = window.prompt('Please enter a sequence of 81 numbers, with 0 representing an empty square.');
//         const board_changed = game1.set_board(board);
//         if ( board_changed) {
//             puzzle_picker.selectedIndex = CUSTOM_PUZZLE_SELECTEDINDEX;
//         }
//         SudokuDOM.display_board(game1, sudoku_squares, string_box, sudoku_wiki_link);
//     });

//     puzzle_picker.addEventListener('change', function(e) {
//         if ( puzzle_picker.value == 'import' ) {
//             import_button.click();
//         } else if ( puzzle_picker.value == 'random' ) {
//             new_button.click();
//         } else {
//             game1.set_board(puzzle_picker.value);
//             SudokuDOM.display_board(game1, sudoku_squares, string_box, sudoku_wiki_link);
//         }
//     });

//     // Pick the default puzzle. Trigger the <select>.change listener so the puzzle gets loaded.
//     // selectedIndex starts from 0
//     puzzle_picker.selectedIndex = DEFAULT_PUZZLE_SELECTEDINDEX;
//     puzzle_picker.dispatchEvent(new Event('change'));
});

class Helper {
    static createArray(length) {
        var arr = new Array(length || 0), i = length;
        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments, 1);
            while ( i-- ) {
                arr[length-1 - i] = Helper.createArray.apply(this, args);
            }
        }
        return arr;
    }

    static delete_value_from_array(arr2, value_to_delete) {
    let array = arr2;
        const index = array.indexOf(value_to_delete);
        if (index !== -1) {
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