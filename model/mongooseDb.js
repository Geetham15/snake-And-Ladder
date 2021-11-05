const mongoose = require('mongoose')

const dbUrl = 'mongodb://localhost:27017/snakeAndLadderMongoose'
mongoose.connect(dbUrl)

module.exports = mongoose