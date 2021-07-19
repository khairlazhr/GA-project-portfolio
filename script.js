const gameState = {
  state: "initial"
}

var turn = 0 
var gameOver = false
// Starting Phase





// Game Phase

// click function to enable player turn

// 2D array checking for winner

function checkWinner(cell) {
  if (checkForEveryLoop(cell)) {
    if (cell.dataset.clicked === "1") {
      alert("Black wins!")
    } else {
      alert("White wins!")
    }
  }
}

//



// selector function for cells
function boardCell(row, tile) {
  return document.querySelector("#board").children[row].children[tile]
}

// check function

function toCheckHorizontal(row, col, j, k) {
  for (let i = j; i < k; i++) {
    var nextCol = (col + i)
    if (nextCol < 0 || nextCol > 14) {
      return false
    }
    if (boardCell(row,col).dataset.clicked !== boardCell(row,nextCol).dataset.clicked) {
      return false
    }
  }
  return true
}

function toCheckVertical(row, col, j, k) {
  for (let i = j; i < k; i++) {
    var nextRow = (row + i)
    if (nextRow < 0 || nextRow > 14) {
      return false
    }
    if (boardCell(row,col).dataset.clicked !== boardCell(nextRow, col).dataset.clicked) {
        return false
    }
  } 
  return true
}

function toCheckDiagonalDown(row, col, j, k) {
  for (let i= j; i < k; i++) {
    var nextRow = (row + i)
    var nextCol = (col + i)
    if (nextRow < 0 || nextCol < 0 || nextRow > 14 || nextCol > 14) {
      return false
    }
    if (boardCell(row,col).dataset.clicked !== boardCell(nextRow, nextCol).dataset.clicked) {
      return false
    }
  }
  return true
}

function toCheckDiagonalUp(row, col, j, k) {
  for (let i= j; i < k; i++) {
    var nextRow = (row - i)
    var nextCol = (col + i)
    if (nextRow < 0 || nextCol < 0 || nextRow > 14 || nextCol > 14) {
      return false
    }
    if (boardCell(row,col).dataset.clicked !== boardCell(nextRow, nextCol).dataset.clicked) {
      return false
    }
  }
  return true
} 


function checkForEveryLoop(cell) {
  const row = parseInt(cell.dataset.row)
  const col = parseInt(cell.dataset.col)
  // left function
  if (toCheckHorizontal(row, col, -4, 0) || 
  toCheckHorizontal(row, col, -3, 2) || 
  toCheckHorizontal(row, col, 1, 5) ||
  toCheckHorizontal(row, col, -1, 4) ||

  // up functions 
  toCheckVertical(row, col, -4, 0) ||
  toCheckVertical(row, col, -3, 2) ||
  toCheckVertical(row, col, 1, 5) ||
  toCheckVertical(row, col, -1, 4) ||

  // check Diagonal Down
  toCheckDiagonalDown(row, col, -4, 0) ||
  toCheckDiagonalDown(row, col, -3, 2) ||
  toCheckDiagonalDown(row, col, -1, 4) ||
  toCheckDiagonalDown(row, col, 1, 5) ||

  // check Diagonal Up
  toCheckDiagonalUp(row, col, -4, 0) ||
  toCheckDiagonalUp(row, col, -3, 2) ||
  toCheckDiagonalUp(row, col, -1, 4) ||
  toCheckDiagonalUp(row, col, 1, 5) ||

  // check middle Directions
  toCheckHorizontal(row, col, -2, 3) ||
  toCheckVertical(row, col, -2, 3) ||
  toCheckDiagonalDown(row, col, -2, 3) ||
  toCheckDiagonalUp(row, col, -2, 3)) {
    return true
  } else {
    return false
  }
}


// click on tile so the black and white tiles display
function tileClick(cell) {
  if (cell.dataset.clicked !== "0") {
    return
  } else {
    if (turn === 0) {
      cell.innerHTML = "<span class='dot-black'></span>";
      cell.dataset.clicked = "1"
      turn = 1;
    } else {
      cell.innerHTML = "<span class='dot-white'></span>";
      cell.dataset.clicked = "2"
      turn = 0;
    }
    checkWinner(cell)
  }
}


// generate board


function buildBoard(rows, columns) {
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("div");
        row.classList.add('boardRow')
        for (let j = 0; j < columns; j++) {
          const tile = document.createElement("div");
          tile.classList.add('boardColumn')
          tile.setAttribute('data-row',`${i}`)
          tile.setAttribute('data-col',`${j}`)
          tile.setAttribute('data-clicked', '0')
          row.appendChild(tile);
        }
        board.appendChild(row);
    }
}


buildBoard(15,15)
document.querySelector('#board').addEventListener('click', function(e) {
  if (e.target !== this) {
    tileClick(e.target)
  }
})



// Additional stuff

// Black always starts first

// Swap2 rule
/* Because gomoku has a strong advantage for the first player when unrestricted,[5][6] the Swap2 rule is currently 
adapted in tournaments among professional players, including Gomoku World Championships.
In Swap2 rule, the first player starts by placing three stones, 2 black and 1 white, on the board. 
The second player then selects one of three options: play as black, play as white and place another white stone, 
or place two more stones, one white and one black, and let the first player choose the color. 

Swap2 solves the first-move advantage problem */

// Undo-redo button?
