// Starting Phase





// Game Phase

// click function to enable player turn
var turn = 0 // 1st player
var gameOver = false
// 2D array checking for winner

function checkWinner() {

}

//

function checkWinner(cell) {

}


// check horizontal

function checkHorizontal(cell) {
  const row = cell.dataset.row
  const col = parseInt(cell.dataset.col)
  for (let i= 1; i < 5; i++) { // checks right on the fifth node
    var nextCol = (col + i)
    if (boardCell(row,nextCol) === undefined) {
      return false
    }
    if (cell.dataset.clicked !== boardCell(row,nextCol).dataset.clicked) {
        return false
    }
  }
  return true 
}

function checkLeft(cell) {
  const row = cell.dataset.row
  const col = parseInt(cell.dataset.col)
  for (let i= -4; i < 0; i++) {
    var nextCol = (col + i)
    if (boardCell(row,nextCol) === undefined) {
      return false
    }
    if (cell.dataset.clicked !== boardCell(row,nextCol).dataset.clicked) {
        return false
    }
  }
  return true
}

// function checkDownFifthNode(cell) {
//   const row = parseInt(cell.dataset.row)
//   const col = cell.dataset.col
//   for (let i= 1; i < 5; i++) {
//     var nextRow = (row + i)
//     if (boardCell(row,nextCol) === undefined) {
//       return false
//     }
//     if (cell.dataset.clicked !== boardCell(nextRow, col).dataset.clicked) {
//         return false
//     }
//   } 
//   return true
// }


// selector function for cells
function boardCell(row, tile) {
  return document.querySelector("#board").children[row].children[tile]
}

// check function

function checkForLoop(cell, direction, node) {
  const row = cell.dataset.row
  const col = parseInt(cell.dataset.col)
  switch (direction) {
    case "left":
      
      switch (node){
        case "fifth":
          for (let i= -4; i < 0; i++) {
            toCheckFunction(cell, row, col, i)
          }
          return true
        case "fourth":
          for (let i= -3; i < 2; i++) {
            toCheckFunction(cell, row, col, i)
          }
          return true
        case "third":
          for (let i= -2; i < 3; i++) {
            toCheckFunction(cell, row, col, i)
          }
          return true
      }
    case "right":
      switch (node) {
        case "fifth":
          for (let i= 1; i < 5; i++) { // checks right on the fifth node
            var nextCol = (col + i)
            if (boardCell(row,nextCol) === undefined) {
              return false
            }
            if (cell.dataset.clicked !== boardCell(row,nextCol).dataset.clicked) {
              return false
              }
            }
            return true
      }
      
  }
}

function toCheckFunction(cell, row, col, i) {
  var nextCol = (col + i)
  if (boardCell(row,nextCol) === undefined) {
    return false
  }
  if (cell.dataset.clicked !== boardCell(row,nextCol).dataset.clicked) {
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
  checkForLoop(e.target, "left", "third")
  console.log(checkForLoop(e.target, "left", "third"))
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
