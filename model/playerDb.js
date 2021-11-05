const { ObjectId } = require('bson')
const db = require('./db')

//add players to db
async function addPlayer(playerData){
    let playerCollection = await db.getCollection('players')
    let insertPlayer = await playerCollection.insertOne(playerData)
    return insertPlayer.insertedId.id
}

//list no of players available in the database
async function listPlayers(){
    let playerCollection = await db.getCollection('players')
    let findCursor = playerCollection.find({})
    let players = await findCursor.toArray()
    console.log('players are ', players)
    return players
}

async function findPlayerById(id){
    let playerCollection = await db.getCollection('players')
    let player = await playerCollection.findOne({_id: ObjectId(id)})
    //console.log('player')
    return player
}

async function findPlayerByName(playerName){
    let playerCollection = await db.getCollection('players')
    let playerId = await playerCollection.findOne({name: playerName})
    return playerId
}
// fetch the player position by passing playerName from database
async function findPositionByPlayerName(playerName){
    let playerCollection = await db.getCollection('players')
    //console.log('playerCollection ' , playerCollection)
    let currentPlayerPosition = await playerCollection.findOne({name : playerName})
    //console.log('currentPlayerPosition in findPositionByPlayerName ->' , currentPlayerPosition)
    return currentPlayerPosition
}
/*
async function updatePositionById(id, newData){
    let playerCollection = await db.getCollection('players')
    return playerCollection.updateOne({_id: ObjectId(id)},{$set: newData})
}
*/
async function updatePositionByName(playerName, newData){
    let playerCollection = await db.getCollection('players')
    return playerCollection.updateOne({name: playerName},{$set: newData})
}

module.exports = {
    addPlayer,
    listPlayers,
    findPlayerById,
    findPlayerByName,
    findPositionByPlayerName,
    updatePositionByName
}