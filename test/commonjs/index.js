console.log(` ____    _____      _      ____    _____ `)
console.log(`/ ___|  |_   _|    / \\    |  _ \\  |_   _|`)
console.log(`\\___ \\    | |     / _ \\   | |_) |   | |  `)
console.log(` ___) |   | |    / ___ \\  |  _ <    | |  `)
console.log(`|____/    |_|   /_/   \\_\\ |_| \\_\\   |_|  `)
console.log(`                                         `)

const {SDK} = require('../../src')
console.log(SDK)
const sdk = new SDK({
  ip: "127.0.0.1",
  port: 8545,
  user: '',
  password: ''
});

(async () => {
  console.log("===========================================")
  console.log("============= Create Account===============")
  console.log("===========================================")

  const password = 'password'
  const createdAccount = await sdk.accounts.create()
  const {enctypted} = createdAccount.encrypt(createdAccount.prvKey, password)
  const decryptPrvKey = sdk.accounts.decrypt(enctypted, password)
  const recoveryAddress = sdk.accounts.privateKeyToAccount(decryptPrvKey)

  console.log(createdAccount)
  console.log(recoveryAddress)
  
  console.log()
  console.log("===========================================")
  console.log("============= Recovery Account=============")
  console.log("===========================================")
  const mnemonic = sdk.accounts.getMnemonic()
  const createdAccount1 = await sdk.accounts.create(mnemonic)
  const createdAccount2 = await sdk.accounts.create(mnemonic)

  console.log(`mnemonic: ${mnemonic}`)
  console.log(createdAccount1)
  console.log(createdAccount2)
  console.log(createdAccount1.address === createdAccount2.address)

  console.log( " _____   _   _   ____   ")
  console.log( "| ____| | \\ | | |  _ \\  ")
  console.log( "|  _|   |  \\| | | | | | ")
  console.log( "| |___  | |\\  | | |_| | ")
  console.log( "|_____| |_| \\_| |____/  ")
})()

