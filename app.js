const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('resetBtn');
const turnIndicator = document.getElementById('turnIndicator');


let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function handleClick(e, index) {
  if (!gameActive || gameBoard[index] !== "") return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    alert(`Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (!gameBoard.includes("")) {
    alert("It's a Draw!");
    gameActive = false;
    return;
  }

currentPlayer = currentPlayer === "X" ? "O" : "X";
turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;

}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    );
  });
}

function resetGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  boxes.forEach(box => box.textContent = "");
}

boxes.forEach((box, index) => {
  box.addEventListener('click', (e) => handleClick(e, index));
});

resetBtn.addEventListener('click', resetGame);
turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;

