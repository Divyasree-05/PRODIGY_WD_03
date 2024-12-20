

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusBanner = document.getElementById('status-banner');
const statusText = document.getElementById('status-text');
const trophy = document.getElementById('trophy');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);


const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8], 
  [0, 4, 8], [2, 4, 6]             
];

function showBanner(message, showTrophy = false) {
  statusText.textContent = message;
  if (showTrophy) {
    trophy.classList.remove('hidden');
  } else {
    trophy.classList.add('hidden');
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameState[index] || checkWinner()) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWinner()) {
    showBanner(`Player ${currentPlayer} Wins!`, true);
  } else if (gameState.every(cell => cell)) {
    showBanner(`It's a Tie!`);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    showBanner(`Player ${currentPlayer}'s Turn`);
  }
}


function checkWinner() {
  return winConditions.some(combination =>
    combination.every(index => gameState[index] === currentPlayer)
  );
}


function resetGame() {
  gameState.fill(null);
  currentPlayer = 'X';
  showBanner(`Player X's Turn`);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);


showBanner(`Player X's Turn`);
