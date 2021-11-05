const mongoose = require('./mongooseDb')
const Player = mongoose.model('Player',{ name: String, position: Number, counterColor: String})

//add players to db
async function addPlayer(playerData){
    let newPlayer = new Player(playerData)
    let addPlayer = await newPlayer.save()
    return addPlayer.id
}

//list no of players available in the database
async function listPlayers(){
    return Player.find({})
}

async function findPlayerById(id){
    return Player.findById(id)
}

async function findPlayerByName(playerName){
    return Player.findOne({name:playerName})
}

// fetch the player position by passing playerName from database
async function findPositionByPlayerName(playerName){
    return Player.findOne({name : playerName})
}

async function updatePositionByName(playerName, newData){
    return Player.updateOne({name: playerName},{$set: newData})
    // let playerCollection = await db.getCollection('players')
    // return playerCollection.updateOne({name: playerName},{$set: newData})
}

/*
async function updatePositionById(id, newData){
    let playerCollection = await db.getCollection('players')
    return playerCollection.updateOne({_id: ObjectId(id)},{$set: newData})
}
*/



module.exports = {
    addPlayer,
    listPlayers,
    findPlayerById,
    findPlayerByName,
    findPositionByPlayerName,
    updatePositionByName
}