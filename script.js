
//

// click function to enable player turn
var turn = 0 // 1st player
var clicked = false
// 2D array checking for winner
// click on tile (need it so it wont be overwritten)
function tileClick(cell) {
    if (cell.innerHTML==="") {
      if (turn === 0) {
        cell.innerHTML = "<span class='dot-black'></span>";
        turn = 1;
      } else {
        cell.innerHTML = "<span class='dot-white'></span>";
        turn = 0;
      }
    }
    
}
// tables keep expanding

// generate board


const board = document.createElement('table')
board.setAttribute('id', 'board')
document.querySelector('#board-holder').append(board)

function buildBoard(rows, columns) {
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < columns; j++) {
          const tile = document.createElement("td");
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


}
)
console.log(document.querySelector('#board').children)

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