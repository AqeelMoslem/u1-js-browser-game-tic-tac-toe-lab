/*-------------------------------- Constants --------------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message'); 

console.log(messageEl,squareEls)

const resetBtnEl = document.getElementById('reset');

const winningCombos = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6], 
];

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = ['', '', '', '' ,'', '', '', '' ,''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((cell, index) => {
    const square = squareEls[index];
    square.textContent = cell;

    if (cell === 'X') {
      square.style.color = 'blue';
    } else if (cell === 'O') {
      square.style.color = 'green';
    } else {
      square.style.color = 'red';
    }
  });
}

//
function updateMessage() {
  if (winner=== false && tie === false) {
    messageEl.textContent = `It's ${turn}'s turn!`;
  } else if (winner === false && tie=== true) {
    messageEl.textContent = `It's a tie!`;
  } else {
    const lastPlayer = turn === 'X' ? 'X' : 'O';
    messageEl.textContent = `Congrats!!!, the winner is ${lastPlayer}`;
  }
}

function handleClick(event) {
  
  const squareIndex = parseInt(event.target.id);

  if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner) {
    return;
  }

  
  placePiece(squareIndex);   
  checkForWinner();          
  checkForTie();             
  switchPlayerTurn();        
  render();                
}


function placePiece(index) {
  board[index] = turn;
}

function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] !== ''  && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      return;
    }
  }
}

function checkForTie() {
   if (winner) return;

  if (board.includes('')) {
    tie = false;
  } else {
    tie = true;
  }
}

function switchPlayerTurn() {
  if (!winner) {
    turn = turn === 'X' ? 'O' : 'X';
  }
}

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init)
