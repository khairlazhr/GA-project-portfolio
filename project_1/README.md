# gomoku-game
Also known as Five-In-A-Row or Omok in Japan

For this game,  there are two logic functions that we need to work with: 1) Check Logic Functions and 2) Phase Logic Functions.

1) Check Logic Functions

For the checking of logic, there were two ways I could have done it. On each respective click as the game progresses, I could either 1) run a for loop on all the cells to check for four win conditions: horizontal, vertical, and diagonal left/right or 2) run smaller for loops to check on the area surrounding the clicked cell for the win conditions. In this case, I opted for the second option. In terms of efficiency, I am still unable to tell if which way is faster but in theory, since I'm running smaller for loops, I feel the second option is better.

2) Phase Logic Functions

This game is split into four phases: "initial", "swap", "gameStart", "endRound". The 'swap' phase was the trickiest and required the most conditional object values to control as I need to adopt the Swap2 rule in order to remove the first-player move advantage. I also faced problems in where my eventListeners would fire off on the board regardless of the game state. All in all, it was interesting to know how to control event listeners depending on the object value

Future implementations/improvements would include player customization and possibly a draw button where players could initiate a draw if they feel the round is not gonna end in a win/loss.
