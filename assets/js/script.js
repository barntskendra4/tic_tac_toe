let cells = document.querySelectorAll(".cell")
let statusText = document.querySelector("#statusText")
let options = ["", "", "", "", "", "", "", "", "",]
let currentPlayer = "💎";
let gameStart = false;
let score = 0;

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
game();
function game() {
    cells.forEach(cell => {
        cell.addEventListener("click", callCell);
        statusText.textContent = `${currentPlayer}'s Turn`;
        gameStart = true;
    })
}

function callCell() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !gameStart) {
        return;
    }
    newCells(this, cellIndex);
    winna();
}


function newCells(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
// this switches the players back and forth
function switchPlayer() {
    currentPlayer = (currentPlayer == "💎") ? "🫧" : "💎";
    statusText.textContent = `${currentPlayer}'s Turn`;
}

function winna() {
    let gameOver = false;
    for (let i = 0; i < lines.length; i++) {
        let condition = lines[i];
        let cell1 = options[condition[0]];
        let cell2 = options[condition[1]];
        let cell3 = options[condition[2]];
        if (cell1 == "" || cell2 == "" || cell3 == "") {
            continue;
        } if (cell1 == cell2 && cell2 == cell3) {
            gameOver = true;
            break
        }
    } if (gameOver) {
        statusText.textContent = `${currentPlayer} wins!`;
         score++;
        gameStart = false;
        winnerWinner();
    } else if (!options.includes("")) {
        statusText.textContent = "CAT GAME";
        gameStart = false;
        winnerWinner();
    } else {
        switchPlayer();
    }
}
//  this function animates the winner.
function winnerWinner() {
    let hue = 0;
    const setAnimation = () => {
        hue = (hue + 2) % 360;
        const color = `hsl(${hue}, 55%, 60%)`;
        const shadow = `hsla(${hue}, 55%, 60%, 0.3)`;
        statusText.style.color = color;
        statusText.style.fontFamily = "Ink Free";
        statusText.style.fontSize = "5rem";
        statusText.style.textShadow = `2px 2px 4px ${shadow}`;
        requestAnimationFrame(setAnimation);
    }
    setAnimation();
};
// this function restarts the whole game to a brand new game
function restart() {
    location.replace("index.html")
}



document.querySelector("#restartBtn").addEventListener("click", restart);
document.querySelector("body").style.color = "pink";
document.querySelector("#restartBtn").style.fontFamily = "Ink Free";
document.querySelector("#restartBtn").style.fontSize = "2rem";
document.querySelector("#restartBtn").style.color = "white";
document.querySelector("#restartBtn").style.backgroundColor = "black";
document.querySelector("#restartBtn").style.cursor = "pointer";
