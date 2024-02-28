let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from( document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue('--draw-blocks')


const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let count_playes = 0

const startGame = () =>{
    boxes.forEach(box => box.addEventListener('click',boxClicked ))
}

function boxClicked(e){
    const id = e.target.id

    if(!spaces[id] && count_playes < 9){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer


        if(playerHasWon()!==false){
            playerText.innerHTML= currentPlayer +' has won!'
            let winBlocks = playerHasWon()
            count_playes = 11
            winBlocks.map(box => boxes[box].style.color = 'green')
            return  
        }
        count_playes++
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }

    if(count_playes == 9){
        playerText.innerHTML = 'Game is draw!'
        boxes.forEach(box => box.style.color = '#ff0000')
    }

}

restartBtn.addEventListener('click', restart)

function restart(){
    spaces.fill(null)
    for (const box of boxes) {
        box.innerText=''
        box.style.backgroundColor=''
        box.style.color = 'orange'
    }
    currentPlayer = X_TEXT
    playerText.innerHTML = 'tic tac toe'
    count_playes = 0
}


const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

]

function playerHasWon(){
    for (const condition of winCombo) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a]==spaces[b] && spaces[a] == spaces[c] )){
            return [a,b,c]
        }
    }
    return false
}

startGame()
