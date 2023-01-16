const { GENESIS_DATA, MINE_RATE } = require("./config")
const cryptoHash = require("./crypto-hash")
const hexToBinary = require("hex-to-binary")

GENESIS_DATA
class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp
    this.prevHash = prevHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
    this.difficulty = difficulty
  }

  static genesis() {
    return new this(GENESIS_DATA)
  }

  static mineBlock({ prevBlock, data }) {
    let timestamp, hash
    const prevHash = prevBlock.hash
    let { difficulty } = prevBlock

    let nonce = 0
    do {
      nonce++
      timestamp = Date.now()
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      })
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty)
    } while (
      hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    )

    return new this({
      timestamp,
      prevHash,
      hash,
      difficulty,
      nonce,
      data,
    })
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock
    if (difficulty < 1) return 1
    const difference = timestamp - originalBlock.timestamp
    if (difference > MINE_RATE) return difficulty - 1
    return difficulty + 1
  }
}

// const block1 = new Block({
//   timestamp: "01-10-2022",
//   preHash: "0x123",
//   hash: "0x2cd",
//   data: "hello",
// })

// console.log(Block.genesis())

// const result = Block.mineBlock({ prevBlock: block1, data: "block2" })
// console.log(result)

module.exports = Block
