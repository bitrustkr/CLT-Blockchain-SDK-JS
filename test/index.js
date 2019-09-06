console.log(` ____    _____      _      ____    _____ `)
console.log(`/ ___|  |_   _|    / \\    |  _ \\  |_   _|`)
console.log(`\\___ \\    | |     / _ \\   | |_) |   | |  `)
console.log(` ___) |   | |    / ___ \\  |  _ <    | |  `)
console.log(`|____/    |_|   /_/   \\_\\ |_| \\_\\   |_|  `)
console.log(`                                         `)

const SDK = require('../')

const sdk = new SDK({
  ip: "127.0.0.1",
  port: 8545,
  user: '',
  password: ''
});

(async () => {
  const password = 'password'
  const createdAccount = await sdk.accounts.create('test')
  const {enctypted} = createdAccount.encrypt(createdAccount.prvKey, password)
  const decryptPrvKey = sdk.accounts.decrypt(enctypted, password)
  const recoveryAddress = sdk.accounts.privateKeyToAccount(decryptPrvKey)

  console.log(createdAccount)
  console.log(decryptPrvKey)
  console.log(recoveryAddress)
  // const seed = await sdk.accounts.getSeed()
  // console.log(seed)

  console.log( " _____   _   _   ____   ")
  console.log( "| ____| | \\ | | |  _ \\  ")
  console.log( "|  _|   |  \\| | | | | | ")
  console.log( "| |___  | |\\  | | |_| | ")
  console.log( "|_____| |_| \\_| |____/  ")
})()

