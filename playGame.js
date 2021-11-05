let snakeAndLadder = require('./model/snakeAndLadder')

async function test(){

let players = [{name: 'AA', position: 0, counterColour : 'green'},
               {name: 'BB', position: 0, counterColour : 'blue'}]
               

    var currentPlayer = 0;
    let newPosition
    let gameFinished = false;
    let isSnakeExists = false;
    let isLadderExists = false;
    let message = " "
    while(!gameFinished){
        console.log('Player Name ', players[currentPlayer].name)
        diceNumber = snakeAndLadder.rollDice() 
        message = message + " "+ players[currentPlayer].name + " rolled a dice " + diceNumber
        let previousPosition = await snakeAndLadder.getPreviousPosition()
        message = message + "\n " + players[currentPlayer].name + " previous position is " + previousPosition
        newPosition = await snakeAndLadder.getNewPosition(diceNumber)
        isSnakeExists = snakeAndLadder.IsSnakeExists(newPosition)
        isLadderExists = snakeAndLadder.IsLadderExists(newPosition)
        if(isSnakeExists){
            let snakeTailPosition = snakeAndLadder.getSnakeTailPosition(newPosition)
            newPosition = snakeTailPosition
            message = message + " \n Oops... Player is on snake head position and sliding down to tail position " 
        } else if(isLadderExists){
            let ladderBottomPosition = snakeAndLadder.getLadderTopPosition(newPosition)
            newPosition = ladderBottomPosition
            message = message + " \n Woosh... Player reached to ladder and going to climb up" 
        }
        newPosition = await snakeAndLadder.changePosition(newPosition)
        message = message + "\n " + players[currentPlayer].name + " new position is " + newPosition
        gameFinished = snakeAndLadder.checkIfWinner(newPosition)
        if(gameFinished){
            //console.log(players[currentPlayer].name , "is the WINNER. Game Over")
            break
        }else{
           // snakeAndLadder.nextPlayer
        }
        
        //currentPlayer=(currentPlayer+1) % 2 //check for 0 or 1
        
        if((currentPlayer+1) >= players.length){
            currentPlayer=0
            console.log('Turn goes to ',players[currentPlayer].name)
        }else{
            currentPlayer++
            console.log('Turn goes to ',players[currentPlayer].name)
        }
        // currentPlayer=players[currentPlayer]
    }
    
    
    }

test()

async function resetlist(){
    let playerlist = [{name: 'Player1', position: 0, counterColour : 'green'},
                      {name: 'Player2', position: 0, counterColour : 'blue'},
                      {name: 'Player3', position: 0, counterColour : 'red'}]
        playerlist.forEach( async (player)=>{
            console.log(player.name)
            let position =  await snakeAndLadder.reset(player.name)
            console.log('position after reset ', position)
})}
//resetlist()        
