//let { addPlayer } = require('./playerDb')
let {addPlayer} = require('./playerMongoose')
//load players

async function loadInitialData(){
    await addPlayer({name: 'PlayerA', position : 0, counterColor : 'green'})
    await addPlayer({name: 'PlayerB', position : 0, counterColor : 'blue'})
}

loadInitialData()