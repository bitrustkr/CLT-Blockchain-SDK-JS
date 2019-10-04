const isAddress = address => {
  return address === '1'
}

const isTxHash = txHash => {
  return txHash === '1'
}

const isBlockHash = blockHash => {
  return blockHash === '1'
}

module.exports = {
  isAddress,
  isTxHash,
  isBlockHash
}