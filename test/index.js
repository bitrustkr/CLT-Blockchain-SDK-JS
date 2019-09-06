console.log(` ____    _____      _      ____    _____ `)
console.log(`/ ___|  |_   _|    / \\    |  _ \\  |_   _|`)
console.log(`\\___ \\    | |     / _ \\   | |_) |   | |  `)
console.log(` ___) |   | |    / ___ \\  |  _ <    | |  `)
console.log(`|____/    |_|   /_/   \\_\\ |_| \\_\\   |_|  `)
console.log(`                                         `)

const SDK = require('../')
// console.log(SDK())
const sdk = new SDK({
  ip: "127.0.0.1",
  port: 8545,
  user: '',
  password: ''
});
(async () => {
  const balance1 = await sdk.getBalance('test')
  console.log(balance1)

  console.log( " _____   _   _   ____   ")
  console.log( "| ____| | \\ | | |  _ \\  ")
  console.log( "|  _|   |  \\| | | | | | ")
  console.log( "| |___  | |\\  | | |_| | ")
  console.log( "|_____| |_| \\_| |____/  ")
})()

