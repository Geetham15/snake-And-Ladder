let {snakeHeadPosition, snakeHeadTailPositionMap, ladderBottomPosition, ladderBottomTopPositionMap} = require('./player')
let { listPlayers, findPlayerById, findPlayerByName,findPositionByPlayerName, updatePositionByName } = require('./playerDb')

let currentPlayerIndex = 0 
let playerNames = ['Player1','Player2']
let currentPlayer = playerNames[0]

//let i
//let playerName

let diceNumber
let newPosition

async function startGame(){
    console.log('Player 1 is the default to roll the dice first')
    let players = await listPlayers()
    
}


function rollDice(){
    //console.log(playerName + ' can roll the dice')
    diceNumber = Math.floor(Math.random() * 6) + 1
    console.log('The rolled dice number is ', diceNumber)
    return diceNumber    
}

async function getPreviousPosition(){
    let previousPosition = await findPositionByPlayerName(currentPlayer)
    //console.log('Previous Position of ' + playerName + ' is ' , previousPosition.position)
    return previousPosition.position
}
async function getNewPosition(diceNumber){

     let previousPosition = await findPositionByPlayerName(currentPlayer)
    //console.log('Previous Position of ' + playerName + ' is ' , previousPosition.position)
    newPosition = previousPosition.position + parseInt(diceNumber)
    console.log(`Previous position ->  ${previousPosition.position}   New position ->  ${newPosition}`)
    return newPosition
}

function IsSnakeExists(newPosition){
    let isSnakeExists = false
    if(snakeHeadPosition.includes(newPosition)){     
        //console.log('You are in snake head position')
        isSnakeExists=true 
    }
    return isSnakeExists
}

function IsLadderExists(newPosition){
    let isLadderExists = false
    if(ladderBottomPosition.includes(newPosition)){
        //console.log('You reached the ladder bottom position')
        isLadderExists = true
    }
    return isLadderExists
}

function getSnakeTailPosition(newPosition){
    let snakeTailPosition = snakeHeadTailPositionMap.get(newPosition)
    //console.log('Get snake tail position ', snakeTailPosition)
    newPosition = snakeTailPosition
    return snakeTailPosition
}

function getLadderTopPosition(newPosition){
    let ladderTopPosition = ladderBottomTopPositionMap.get(newPosition)
    //console.log('Get Ladder Top Position ', ladderTopPosition)
    newPosition = ladderTopPosition
    return ladderTopPosition
}

async function changePosition(newPosition){
    newPosition = parseInt(newPosition)
    let playerPosition
    //let foundPlayerById
    let findPlayer
    //if (newPosition <= 100){
       // foundPlayerById = await findPlayerById('617b62842e69c9434f79950b')
       // console.log('Found player by id ', foundPlayerById)
        findPlayer = await findPlayerByName(currentPlayer) 
        //console.log('Found player by name ', findPlayer)
        //console.log('Player Id ', findPlayer._id)
        let playerId = findPlayer._id

        //update the position to db
        await updatePositionByName(currentPlayer, {position: newPosition})
        let readbackPlayerPosition = await findPlayerById(playerId)
        //console.log('Now player position is',readbackPlayerPosition)
        playerPosition = readbackPlayerPosition.position
        newPosition = playerPosition
    //}
    return playerPosition
}
 //Check the player is in winner position 100. 
 function checkIfWinner(position){
    if(position === 100 || position >= 100){
         console.log(`${currentPlayer} is the Winner. GAME OVER!!!`)
         return true;
    }
    else{
        return false;
    }
}
function getCurrentPlayer(){
    return currentPlayer
}

function nextPlayer(){
    if((currentPlayerIndex+1) >= playerNames.length){
        currentPlayerIndex=0       
    }else{
        currentPlayerIndex++        
    }
    currentPlayer=playerNames[currentPlayerIndex]
    return currentPlayer
}
//reset the position
async function reset(){
    let findPlayer    
    let resetPosition = 0
    findPlayer = await findPlayerByName(currentPlayer) 
    let playerId = findPlayer._id

    //reset the position back to 0
    await updatePositionByName(currentPlayer, {position: resetPosition})
    let readbackPlayerPosition = await findPlayerById(playerId)
    playerPosition = readbackPlayerPosition.position
    console.log('Reset position ', playerPosition)
    return playerPosition
}



module.exports = {
    startGame,
    listPlayers,
    rollDice,
    getPreviousPosition,
    getNewPosition,
    IsSnakeExists,
    IsLadderExists,
    getSnakeTailPosition,
    getLadderTopPosition,
    changePosition,
    checkIfWinner, 
    findPositionByPlayerName,
    findPlayerById,
    nextPlayer,
    getCurrentPlayer,
    reset
}