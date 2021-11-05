const snakeAndLadder = require('../model/snakeAndLadder')
const snakeAndLadderMap = require('../model/player')
const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
    let instructions = 
        `Welcome to the Sanke and Ladder!
          - Each player starts from the position 0
          - The first player get to the position 100 or greater than 100 is the winner
          - /startGame is used to start the game
          - /listPlayers you can list the number of players
          - Use "/makeMove" to roll dice         
          - Use "/reset" to reset the position back to 0
        Have fun!!!! `
    res.send(instructions)
  })

  router.get('/startGame', async function(req, res){
      snakeAndLadder.startGame()
      res.send('The game begins')
  })

  router.get('/listPlayers', async (req, res) => {
      res.json(await snakeAndLadder.listPlayers())
  })

  router.get('/rollDice', function (req, res){
    console.log('The first player can roll the dice')
    let playerName = snakeAndLadder.getCurrentPlayer()
    //let diceNumber = Math.floor(Math.random()*5 + 1)  
   // snakeAndLadder.rollDice(playerName, diceNumber)
    let diceNumber = snakeAndLadder.rollDice()
    res.send(`The rolled dice number of ${playerName} is  ${diceNumber}`)
  })

  router.get('/getPreviousPosition', async(req, res) =>{
    let playerName = snakeAndLadder.getCurrentPlayer()
    let previousPosition = await snakeAndLadder.getPreviousPosition()
    res.send(`Previous position of ${playerName} is ${previousPosition}`)
  })
  router.get('/getNewPosition', async (req, res) => {
      //let playerName = req.query.name
      let diceNumber = req.query.diceNumber
      console.log('Dice number : ', diceNumber)
      let newPosition = await snakeAndLadder.getNewPosition(diceNumber)
      res.send(`New position ->  ${newPosition}`)
  })
 
  router.get('/isSnakeExists', function (req, res){
    let newPosition = req.query.newPosition
    let isSnakeExists = snakeAndLadder.IsSnakeExists(parseInt(newPosition))
    let message
    if(isSnakeExists){
      message = 'Oops... Player is on snake head position and sliding down to tail position'
    }else{
      message = 'You are not on snake'
    }
    res.send(message)
  })

  router.get('/getSnakeTailPosition', function(req, res){
    let newPosition = req.query.newPosition
    let tailPosition = snakeAndLadder.getSnakeTailPosition(parseInt(newPosition))
    res.send(`You are sliding down to the position ${tailPosition}`)
  })

    router.get('/isLadderExists', function( req, res){
    let message
    let newPosition = req.query.newPosition
    let isLadderExists = snakeAndLadder.IsLadderExists(parseInt(newPosition))
    if(isLadderExists){
      message = 'Woosh... Player reached to ladder and going to climb up'
    }else{
      message = 'You are not on ladder'
    }
    res.send(message)
  })

  router.get('/getLadderTopPosition', function(req, res){
    let newPosition = req.query.newPosition
    let ladderTopPosition = snakeAndLadder.getLadderTopPosition(parseInt(newPosition))
    res.send(`You are climbed up to the position ${ladderTopPosition}`)
  })

  router.get('/changePosition', async (req, res) =>{

    let newPosition = req.query.newPosition
    let playerName = snakeAndLadder.getCurrentPlayer()
    let playerPosition = await snakeAndLadder.changePosition(parseInt(newPosition))
    res.send(`Now the ${playerName} is moved to ${playerPosition}`)
  })
 
  router.get('/checkIfWinner', function(req, res){
    let isGameOver = false
    let newPosition = req.query.newPosition
    let playerName = snakeAndLadder.getCurrentPlayer()
    let message 
    isGameOver = snakeAndLadder.checkIfWinner(newPosition)
    if(isGameOver){
        message = `${playerName} is the WINNER. Game Over`
    }else{
      message = `Turn goes to next player`
    }
    res.send(message)
  })

  router.get('/reset', async(req, res)=>{
    
    let playerName = snakeAndLadder.getCurrentPlayer()
    let resetPosition = await snakeAndLadder.reset()
    snakeAndLadder.nextPlayer()
    res.send(`${playerName} position is reset back to 0`)
  })

  router.get('/makeMove', async (req, res) => {
    //getPlayerName
    let isSnakeExists = false
    let isLadderExists = false
    let isGameOver = false
    let message = "" 
    let playerName = snakeAndLadder.getCurrentPlayer()
    // rollDice 
    let diceNumber = snakeAndLadder.rollDice()
    message = message + " " + playerName + " rolled a dice " + diceNumber
    // getPreviousPosition
    let previousPosition = await snakeAndLadder.getPreviousPosition()
    //getNewPosition
    let newPosition = await snakeAndLadder.getNewPosition(diceNumber)
    //isSnakeExists
    isSnakeExists = snakeAndLadder.IsSnakeExists(newPosition)
    isLadderExists = snakeAndLadder.IsLadderExists(newPosition)
    if(isSnakeExists){
      //getSnakeTailPosition
      newPosition =  snakeAndLadder.getSnakeTailPosition(newPosition)
      message = message + " \n Oops... You are on snake head position and sliding down to tail position " 
    }
    //isLadderExists
    else if(isLadderExists){
      //getLadderTopPosition
      newPosition =  snakeAndLadder.getLadderTopPosition(newPosition)
      message = message + " \n Woosh... You reached the ladder and going to climb up" 
    }
  
    //changePosition
    let playerMovePosition = await snakeAndLadder.changePosition(newPosition)
    newPosition = playerMovePosition
    // return result message
    message = message + "\n " + playerName + "  new position is " + playerMovePosition
    isGameOver = snakeAndLadder.checkIfWinner(newPosition)
    if(isGameOver){
      message = message + "\n " + playerName + " is the WINNER. Game Over"  
    }else{
      message = message + "\n Turn goes to " + snakeAndLadder.nextPlayer()
     // snakeAndLadder.nextPlayer()
    }

    
    res.send(message)

  })

  module.exports = router