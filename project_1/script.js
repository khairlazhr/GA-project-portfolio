const game = {
  state: "initial",
  p1score: 0,
  p2score: 0,

  // Swap phase 
  firstBlack: false,
  secondBlack: false,
  firstWhite: false,

  secondWhite: false,
  thirdBlack: false,

  // Game Phase
  option: 0,
  turn: 1,
}


// player Customization

// ??? Insert Username???

// Celebratory Lines

const lineArray = [
  "You are the smarter one!",
  "On a scale from 1 to 10, you're an 11.",
  "You're a smart cookie.",
  "You have a good head on your shoulders.",
  "Any team would be lucky to have you",
  "You're great at figuring stuff out."
]

// Building Board

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

// selector function for cells
function boardCell(row, tile) {
  return document.querySelector("#board").children[row].children[tile]
}

// Check Logic Functions for cells

function checkForDraw() {
  const fullArray = []
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      fullArray.push(boardCell(i,j).dataset.clicked)
    }
  }
  if (fullArray.every(isNotZero)) {
    return true
  } else {
    return false
  }
}

function isNotZero(element) {
  return element !== "0"
}

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

function checkWinner(cell) {
  if (checkForDraw()) {
    game.state = "endRound"
    drawRound()
  }
  if (checkForEveryLoop(cell)) {
    if (game.option === 1 || game.option === "white") {
      if (cell.dataset.clicked === "1") {
        game.state = "endRound"
        game.p2score += 1
        if (game.p2score === 5) {
          playerWins(2)
        } else {
          playerWinsRound(2)
        }
      } else {
        game.state = "endRound"
        game.p1score += 1
        if (game.p1score === 5) {
          playerWins(1)
        } else {
          playerWinsRound(1)
        }
      }
    }
    if (game.option === 2 || game.option === "black") {
      if (cell.dataset.clicked === "1") {
        game.state = "endRound"
        game.p1score += 1
        if (game.p1score === 5) {
          playerWins(1)
        } else {
          playerWinsRound(1)
        }
      } else {
        game.state = "endRound"
        game.p2score += 1
        if (game.p2score === 5) {
          playerWins(2)
        } else {
          playerWinsRound(2)
        }
      }
    }
  }
}

function updateScore() {
  document.querySelector("#p1-score").innerHTML = `Player 1<br/><h1>${game.p1score}</h1>`
  document.querySelector("#p2-score").innerHTML = `Player 2<br/><h1>${game.p2score}</h1>`
}

function nextRoundButton() {
  const button = document.createElement('button')
  button.classList.add('btn')
  button.classList.add('btn-success')
  if (game.p1score === 5 || game.p2score === 5) {
    button
  } else {
    button.innerHTML = "Next Round"
    button.addEventListener('click', function(e) {
    refreshBoard()
    startSwapRule()
  })
  }
  document.querySelector("#display").append(button)
}

function playerWinsRound(no) {
  document.querySelector("#display").innerHTML = `<span id='display-title'>Player ${no} Wins!</br>${lineArray[Math.floor(Math.random()*6)]}</span></br>`
  updateScore()
  nextRoundButton()
}

function playerWins(no) {
  document.querySelector("#display").innerHTML = `<h3>Congratulations!!<h3><span id="congrats">Player ${no} takes the game!</br>Time to celebrate!</br>`
  updateScore()
}

function drawRound() {
  document.querySelector("#display").innerHTML = "<span id='display-title'>It's a draw!</span></br>"
  nextRoundButton()
}


function refreshBoard() {
  document.querySelector('#board').innerHTML = ""
  game.firstBlack = false
  game.secondBlack = false
  game.firstWhite = false
  game.secondWhite = false
  game.thirdBlack = false
  game.option = 0
  game.turn = 1
  buildBoard(15,15)
}


// Click Functions

function tileClickNumberOne(cell) {
  if (cell.dataset.clicked !== "0") {
    return
  } else {
    if (game.turn === 0) {
      cell.innerHTML = "<span class='dot-black'></span>";
      cell.dataset.clicked = "1"
      game.turn = 1;
      document.querySelector("#display").innerHTML = `<span id='display-title'>Player 1's Turn.</br>Let's play!</span>`
    } else {
      cell.innerHTML = "<span class='dot-white'></span>";
      cell.dataset.clicked = "2"
      game.turn = 0;
      document.querySelector("#display").innerHTML = `<span id='display-title'>Player 2's Turn.</br>Let's play!</span>`
    }
    checkWinner(cell)
  }
}

function tileClickNumberTwo(cell) {
  if (cell.dataset.clicked !== "0") {
    return
  } else {
    if (game.turn === 0) {
      cell.innerHTML = "<span class='dot-black'></span>";
      cell.dataset.clicked = "1"
      game.turn = 1;
      document.querySelector("#display").innerHTML = `<span id='display-title'>Player 2's Turn.</br>Let's play!</span>`
    } else {
      cell.innerHTML = "<span class='dot-white'></span>";
      cell.dataset.clicked = "2"
      game.turn = 0;
      document.querySelector("#display").innerHTML = `<span id='display-title'>Player 1's Turn.</br>Let's play!</span>`
    }
    checkWinner(cell)
  }
}

function swapClick(cell) {
  if (game.firstWhite) {
    return
  }
  if (cell.dataset.clicked !== "0") {
    return
  } else {
    if (game.secondBlack) {
      cell.innerHTML = "<span class='dot-white'></span>";
      cell.dataset.clicked = "2"
      game.firstWhite = true
      choices()
    } else if (game.firstBlack) {
      cell.innerHTML = "<span class='dot-black'></span>";
      cell.dataset.clicked = "1"
      game.secondBlack = true
      document.querySelector('#display').innerHTML = "<span id='display-title'>Player 1's Turn.</br> Now, place one white tile.</span>"
    } else if (!game.firstBlack) {
      cell.innerHTML = "<span class='dot-black'></span>";
      cell.dataset.clicked = "1"
      game.firstBlack = true
    }
  }
}

function twoMoreStones(cell) {
  if (game.thirdBlack) {
    return
  }
  if (cell.dataset.clicked !== "0") {
    return
  } else {
    if (game.secondWhite) {
      cell.innerHTML = "<span class='dot-black'></span>";
      cell.dataset.clicked = "1"
      game.thirdBlack = true
      chooseSide()
    } else if (!game.secondWhite) {
      cell.innerHTML = "<span class='dot-white'></span>";
      cell.dataset.clicked = "2"
      document.querySelector("#display").innerHTML = `<span id='display-title'>Player 2's Turn.</br>Now, place the black one.</span>` 
      game.secondWhite = true
       
    } 
  }
}


// Phase Logic Functions

function startSwapRule() {
  game.state = "swap"
  document.querySelector('#display').innerHTML = ""
  document.querySelector('#display').innerHTML = "<span id='display-title'>Player 1's Turn.</br> First, place two black tiles."
}

function choices() {
  document.querySelector('#display').innerHTML = `<span id='display-title'>Player 2's Turn.</br></span>`
  createButton("one")
  createButton("two")
  createButton("three")
}

function chooseSide() {
  document.querySelector('#display').innerHTML = `<span id='display-title'>Player 1's Turn.</br>Choose which colour to play as.</span></br>`
  createButtonForSide("black")
  createButtonForSide("white")
}

function createButton(option) {
  let button = document.createElement('button')
  button.classList.add('btn')
  button.setAttribute('data-bs-toggle', 'tooltip')
  switch (option){
    case "one":
      button.classList.add('btn-dark')
      button.setAttribute('title', 'Play as Black.')
      button.setAttribute('id', 'option-one')
      button.innerHTML = "Option 1"
      button.addEventListener('click', optionOne)
      break
    case "two":
      button.classList.add('btn-light')
      button.setAttribute('title', 'Play as White. Place another white stone.')
      button.setAttribute('id', 'option-two')
      button.innerHTML = "Option 2"
      button.addEventListener('click', optionTwo)
      break
    case "three":
      button.classList.add('btn-warning')
      button.setAttribute('title', 'Place two more stones, one white and one black, and let the first player choose the color.')
      button.setAttribute('id', 'option-three')
      button.innerHTML = "Option 3"
      button.addEventListener('click', optionThree)
      break
  }
  document.querySelector('#display').append(button)
}

function createButtonForSide(option) {
  let button = document.createElement('button')
  button.classList.add('btn')
  switch (option){
    case "black":
      button.classList.add('btn-dark')
      button.setAttribute("id", "black")
      button.innerHTML = "Play As Black"
      button.addEventListener('click', playAsBlack)
      break
    case "white":
      button.classList.add('btn-light')
      button.setAttribute("id", "white")
      button.innerHTML = "Play As White"
      button.addEventListener('click', playAsWhite)
      break
  }
  document.querySelector('#display').append(button)
}

function optionOne() {
  document.querySelector("#display").innerHTML = `<span id='display-title'>Player 1's Turn.</br>Let's play!</span>`
  game.state = 'gameStart'
  game.option = 1
}

function optionTwo() {
  document.querySelector("#display").innerHTML = `<span id='display-title'>Player 2's Turn.</br>Place another white stone.</span>`
  game.state = 'gameStart'
  game.option = 2
}

function optionThree() {
  document.querySelector("#display").innerHTML = `<span id='display-title'>Player 2's Turn.</br>Place two more stones.</br>First, place the white one.</span>`
  game.option = 3
}

function playAsBlack() {
  document.querySelector("#display").innerHTML = `<span id='display-title'>Player 2's Turn.</br>Let's play!</span>`
  game.state = 'gameStart'
  game.option = "black"
}

function playAsWhite() {
  document.querySelector("#display").innerHTML = `<span id='display-title'>Player 1's Turn.</br>Let's play!</span>`
  game.state = 'gameStart'
  game.option = "white"
}

// Event Listeners

document.querySelector('#reset').addEventListener('click', function(e) {
  location.reload()
})

document.querySelector("#start").addEventListener("click", function(e) {
  if (game.state === "initial") {
    startSwapRule()
  }
})


document.querySelector('#board').addEventListener('click', function(e) {
  if (game.state === 'swap') {
    if (game.option === 3) {
      twoMoreStones(e.target)
    }
    if (e.target !== this) {
      swapClick(e.target)
    }
    
  }
  if (game.state === 'gameStart') {
    if (e.target !== this) {
      if (game.option === 1) {
        tileClickNumberOne(e.target) //Player one is white
      } else if (game.option === 2) {
        tileClickNumberTwo(e.target)
      } else if (game.option === "black") {
        tileClickNumberTwo(e.target)
      } else if (game.option === "white") { 
        tileClickNumberOne(e.target)
      }
    }
  }  
  })


// Initialization

document.querySelector('.modal-body').innerHTML = `The game is played on a 15 x 15 board. Players alternate turns placing a stone of their color on an empty intersection. 
  The winner of the round is the first player to form an unbroken chain of five stones horizontally, vertically, or diagonally. 
  The first player to score five rounds wins the game!</br></br>
  
  In Swap2 rule, the first player starts by placing three stones, 2 black and 1 white, on the board.
  The second player then selects one of three options: 1) play as black, 2) play as white and place another white stone, 
  or 3) place two more stones, one white and one black, and let the first player choose the color. `
buildBoard(15,15)
document.querySelector('#starting-display').innerHTML = "A game of wits.<br/> Are you ready?<br/>"
document.querySelector("#p1-score").innerHTML = `<span id="p1-title">Player 1</span><br/><h1>0</h1>`
document.querySelector("#p2-score").innerHTML = `<span id="p2-title">Player 2</span><br/><h1>0</h1>`

