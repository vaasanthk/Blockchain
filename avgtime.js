const Blockchain = require("./blockchain")
const blockchain = new Blockchain()

blockchain.addBlock({ data: "new block" })

let prevTimestamp, nextTimestamp, nextBLock, timeDiff, averageTime

const times = []

for (let i = 0; i < 1000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp
  blockchain.addBlock({ data: `block ${i}` })
  nextBLock = blockchain.chain[blockchain.chain.length - 1]
  nextTimestamp = nextBLock.timestamp

  timeDiff = nextTimestamp - prevTimestamp
  times.push(timeDiff)

  averageTime = times.reduce((total, num) => total + num) / times.length

  console.log(
    `Time taken to mine: ${timeDiff}, Difficulty: ${nextBLock.difficulty}, Average time: ${averageTime}`
  )
}
