const crypto = require("crypto")

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256")
  hash.update(inputs.sort().join(""))
  return hash.digest("hex")
}

// const result = cryptoHash("hello", "world")

// console.log(result, cryptoHash("world", "hello"))

module.exports = cryptoHash
