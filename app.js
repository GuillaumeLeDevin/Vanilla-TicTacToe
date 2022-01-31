const info = document.querySelector('.info');
const cells = document.querySelectorAll('.cell');

let locked = true;
let currentPlayer = "X";

info.innerHTML = `Player: ${currentPlayer}`;

const winningAlignment = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let gameInProgress = ["","","","","","","","",""];

cells.forEach(cell => {
    cell.addEventListener('click', clickOnBox);
})

function clickOnBox(e) {
    const boxClick = e.target;
    const boxIndex = boxClick.getAttribute('data-index');

    if(gameInProgress[boxIndex] !== '' || !locked){
        return;
    }

    gameInProgress[boxIndex] = currentPlayer;
    boxClick.innerHTML = currentPlayer;
    console.log(gameInProgress);

    resultsValidation();
}

function resultsValidation() {
    let endGame = false;

    for(let i = 0; i < winningAlignment.length; i++){
        const checkWin = winningAlignment[i];

        let a = gameInProgress[checkWin[0]];
        let b = gameInProgress[checkWin[1]];
        let c = gameInProgress[checkWin[2]];

        if( a === '' || b === '' || c === ''){
            continue;
        }
        if( a === b && b === c){
            endGame = true;
            break;
        }
    }
    if(endGame){
        info.innerText = `Player ${currentPlayer} win!!`;
        locked = false;
        return;
    }

    let drawingGame = !gameInProgress.includes('');
    if(drawingGame){
        info.innerText = 'Draw!!';
        locked = false;
        return;
    }

    playerChange();
}

function playerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    info.innerHTML = `Player: ${currentPlayer}`;
}