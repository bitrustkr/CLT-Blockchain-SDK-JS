import { SDK } from '../../src'

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
  const { encrypted } = createdAccount.encrypt(createdAccount.prvKey, password)
  const decryptPrvKey = sdk.accounts.decrypt(encrypted, password)
  const recoveryAddress = sdk.accounts.privateKeyToAccount(decryptPrvKey)

  console.log('createdAccount: ', createdAccount)
  console.log('encrypted: ', encrypted)
  console.log('decryptPrvKey: ', decryptPrvKey)
  console.log('recoveryAddress: ', recoveryAddress)
  
  // console.log("===========================================")
  // console.log("============= Query Account ===============")
  // console.log("===========================================")

  // const account = sdk.accounts.getAccount(createdAccount.address)

  // console.log(account)

  console.log("===========================================")
  console.log("============= Transaction ===============")
  console.log("===========================================")
  const prvKey = "871e91321a6940b05585b9f7fb17c23530c20c3b431a028629f94221e8189e85fb1bb6e33f86e57a3b50fb2d637fb32effd2084cc8f178d99e332ea4d22ebae7"

  const txhash1 = sdk.transaction.getTransaction('tx hash')
  console.log('getTransaction ', txhash1)

  const txhash2 = sdk.transaction.signature(prvKey, {
    from: '',
    to: '',
    value: '',
    data: '',
    nonce: ''
  })
  console.log('signature ', txhash2)

  const txhash3 = sdk.transaction.sendTransaction(txhash2.signature)

  console.log('sendTransaction ', txhash3)
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
  console.log()

  console.log("===========================================")
  console.log("========= Mnemonic to Seed Convert ========")
  console.log("===========================================")

  let {seed, mnemonic: m} = await sdk.accounts.getSeed()
  
  const s1 = await sdk.accounts.mnemonicToSeed(m)
  console.log(m)
  console.log('original: ', seed.toString('hex'))
  console.log('recovery: ', s1)

  console.log( " _____   _   _   ____   ")
  console.log( "| ____| | \\ | | |  _ \\  ")
  console.log( "|  _|   |  \\| | | | | | ")
  console.log( "| |___  | |\\  | | |_| | ")
  console.log( "|_____| |_| \\_| |____/  ")
})()

