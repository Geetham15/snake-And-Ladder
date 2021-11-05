
// 7 snakes in the board
let snakeHeadPosition = [98,84,43,87,73,56,50]
let snakeHeadTailPositionMap = new Map();
snakeHeadTailPositionMap.set(98,40)
snakeHeadTailPositionMap.set(84,58)
snakeHeadTailPositionMap.set(43,17)
snakeHeadTailPositionMap.set(87,49)
snakeHeadTailPositionMap.set(73,15)
snakeHeadTailPositionMap.set(56,8)
snakeHeadTailPositionMap.set(50,5)

//7 ladders in the board
let ladderBottomPosition = [2,6,20,30,52,57,71]
let ladderBottomTopPositionMap = new Map()
ladderBottomTopPositionMap.set(2,23)
ladderBottomTopPositionMap.set(6,45)
ladderBottomTopPositionMap.set(20,59)
ladderBottomTopPositionMap.set(30,95)
ladderBottomTopPositionMap.set(52,72)
ladderBottomTopPositionMap.set(57,96)
ladderBottomTopPositionMap.set(71,92)

module.exports = {
    snakeHeadPosition,
    snakeHeadTailPositionMap,
    ladderBottomPosition,
    ladderBottomTopPositionMap
}