
//

// Black always starts first
var turn = 0 // 1st player

var row = 15
var column = 15

// 2D array

const board = []

// generate board

// Additional stuff

// Swap2 rule

/* Because gomoku has a strong advantage for the first player when unrestricted,[5][6] the Swap2 rule is currently 
adapted in tournaments among professional players, including Gomoku World Championships.
In Swap2 rule, the first player starts by placing three stones, 2 black and 1 white, on the board. 
The second player then selects one of three options: play as black, play as white and place another white stone, 
or place two more stones, one white and one black, and let the first player choose the color. 

Swap2 solves the first-move advantage problem */