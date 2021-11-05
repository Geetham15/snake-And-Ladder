const express = require('express')
const snakeAndLadderRouter = require('./routes/snakeAndLadderRoutes')

const app = express()
const port = 3000

app.use(snakeAndLadderRouter)

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
})