/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++){
    board.push(new Array(WIDTH).fill('null'))
  }
  // for (let i = 0; i < HEIGHT; i++){
  //   let val = new Array(WIDTH).fill('null')
  //   // for (let j = 0; j < WIDTH; j++){
  //   //   val.push('null');
  //   // 
  // } b
  return board;
  // console.log(board)
  //   const newBoard = board.forEach(val => {
  //   for (let i = 0; i < WIDTH; i++){
  //     val.push('null');
  //   } return val;
  // }); return newBoard
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById('board');


  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
 

  //here we are creating the top row of the game where you click to drop your game piece
  // we create a new row element and assign it the name top 
  //we then set its ID atttribute to 'column-top'
  //finally we assign an eventlistener on the row that calls the function handleClick when user clicks on row

  for (let x = 0; x < WIDTH; x++) 
  {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }

  //running a for loop, in this case 7 times (value of WIDTH)
  //each time we run the loop we are creating a new cell, named 
  //assigning its ID the value of its index, 
  //and appending it to the the top row we just created 

  htmlBoard.append(top);
  //taking the new top element we just created, along with all of the appended children 
  //appending it to the html board 

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    //this for loop creates the arrays that essentially make up the y-axis 
    //each array represents row,
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
      //this for loop creates, in this case 6 table data cells in each row
      //set each individual date set with an ID that corresponds to the row 
      //id also refereces the index num of that individual cell 
      //y - refers to index value of the array representing the rows 
      //x - refers to index value of the array representing the columns 
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  let yVar = undefined
  for (let y = 0; y < HEIGHT; y++){
    if(board[y][x] === 'null') yVar = y
  } return (yVar)

  // TODO: write the real version of this, rather than always returning 0
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newDiv = document.createElement('div');
  const tableCell = document.getElementById(`${y}-${x}`);
  newDiv.classList.add('piece', `p${currPlayer}`)
  tableCell.append(newDiv); 
}

/** endGame: announce game end */

function endGame(msg) {
  // msg = `Player ${currPlayer} wins`;
  alert(msg);

  // TODO: pop up alert message
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
  console.log('x:'+ x)
 

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  console.log('y:'+ y)
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x] = currPlayer; 

 

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // loop through y arrays - see if every array in y array comesback !== null
  
  // console.log(board)
  function checkForTie(){
    for (let y = 0; y < HEIGHT; y++){
      // console.log(board[y])
      return board[y].every(x => x !== 'null')
    }
  };
  if (checkForTie()) endGame('The game has resulted in a tie'); 

  // console.log(checkForTie())


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
