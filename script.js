const boardSize = 8;
const numShips = 5;
let hiddenBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(' '));
let guessBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(' '));
let turns = 10;
let shipsHit = 0;

// Initialize boards
function initBoards() {
    const hiddenBoardElement = document.getElementById('hidden-board');
    const guessBoardElement = document.getElementById('guess-board');
    hiddenBoardElement.innerHTML = '';
    guessBoardElement.innerHTML = '';

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            hiddenBoardElement.innerHTML += `<div data-row="${i}" data-col="${j}"></div>`;
            guessBoardElement.innerHTML += `<div data-row="${i}" data-col="${j}"></div>`;
        }
    }
}

function placeShips() {
    let shipsPlaced = 0;
    while (shipsPlaced < numShips) {
        let row = Math.floor(Math.random() * boardSize);
        let col = Math.floor(Math.random() * boardSize);
        if (hiddenBoard[row][col] === ' ') {
            hiddenBoard[row][col] = 'X';
            shipsPlaced++;
        }
    }
}

function handleGuess() {
    const guessInput = document.getElementById('guess').value.toUpperCase();
    const row = parseInt(guessInput[1]) - 1;
    const col = guessInput.charCodeAt(0) - 'A'.charCodeAt(0);

    if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
        if (guessBoard[row][col] === 'X' || guessBoard[row][col] === '-') {
            document.getElementById('message').innerText = 'You already guessed that!';
        } else if (hiddenBoard[row][col] === 'X') {
            guessBoard[row][col] = 'X';
            shipsHit++;
            document.querySelector(`#guess-board div[data-row="${row}"][data-col="${col}"]`).classList.add('hit');
            document.getElementById('message').innerText = 'Hit!';
        } else {
            guessBoard[row][col] = '-';
            document.querySelector(`#guess-board div[data-row="${row}"][data-col="${col}"]`).classList.add('miss');
            document.getElementById('message').innerText = 'Miss!';
        }

        turns--;
        document.getElementById('turns-count').innerText = turns;

        if (shipsHit === numShips) {
            document.getElementById('message').innerText = 'You win!';
            document.getElementById('submit').disabled = true;
        } else if (turns === 0) {
            document.getElementById('message').innerText = 'Game Over!';
            document.getElementById('submit').disabled = true;
        }
    } else {
        document.getElementById('message').innerText = 'Invalid input. Use format A1, B2, etc.';
    }
}

document.getElementById('submit').addEventListener('click', handleGuess);

window.onload = function() {
    initBoards();
    placeShips();
};
