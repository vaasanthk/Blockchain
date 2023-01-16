const INITIAL_DIFFICULTY = 2
const MINE_RATE = 1000
const GENESIS_DATA = {
  timestamp: 1,
  prevHash: "0x0",
  hash: "0x123",
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  data: [],
}

module.exports = { GENESIS_DATA, MINE_RATE }
