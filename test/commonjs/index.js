const {EITRI} = require('../../src')

const eitri = new EITRI({
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
  const createdAccount = await eitri.accounts.create()
  const { encrypted } = createdAccount.encrypt(createdAccount.prvKey, password)
  const decryptPrvKey = eitri.accounts.decrypt(encrypted, password)
  const recoveryAddress = eitri.accounts.privateKeyToAccount(decryptPrvKey)

  console.log('createdAccount: ', createdAccount)
  console.log('encrypted: ', encrypted)
  console.log('decryptPrvKey: ', decryptPrvKey)
  console.log('recoveryAddress: ', recoveryAddress)
  
  // console.log("===========================================")
  // console.log("============= Query Account ===============")
  // console.log("===========================================")

  // const account = eitri.accounts.getAccount(createdAccount.address)

  // console.log(account)

  console.log("===========================================")
  console.log("============= Transaction ===============")
  console.log("===========================================")
  const prvKey = "871e91321a6940b05585b9f7fb17c23530c20c3b431a028629f94221e8189e85fb1bb6e33f86e57a3b50fb2d637fb32effd2084cc8f178d99e332ea4d22ebae7"

  const txhash1 = eitri.transaction.getTransaction('tx hash')
  console.log('getTransaction ', txhash1)

  const txhash2 = eitri.transaction.signature(prvKey, {
    from: '',
    to: '',
    value: '',
    data: '',
    nonce: ''
  })
  console.log('signature ', txhash2)

  const txhash3 = eitri.transaction.sendTransaction(txhash2.signature)

  console.log('sendTransaction ', txhash3)
  console.log()

  console.log("===========================================")
  console.log("============= Recovery Account=============")
  console.log("===========================================")
  const mnemonic = eitri.accounts.getMnemonic()
  const createdAccount1 = await eitri.accounts.create(mnemonic)
  const createdAccount2 = await eitri.accounts.create(mnemonic)

  console.log(`mnemonic: ${mnemonic}`)
  console.log(createdAccount1)
  console.log(createdAccount2)
  console.log(createdAccount1.address === createdAccount2.address)
  console.log()

  console.log("===========================================")
  console.log("========= Mnemonic to Seed Convert ========")
  console.log("===========================================")

  let {seed, mnemonic: m} = await eitri.accounts.getSeed()
  
  const s1 = await eitri.accounts.mnemonicToSeed(m)
  console.log(m)
  console.log('original: ', seed.toString('hex'))
  console.log('recovery: ', s1)

  console.log( " _____   _   _   ____   ")
  console.log( "| ____| | \\ | | |  _ \\  ")
  console.log( "|  _|   |  \\| | | | | | ")
  console.log( "| |___  | |\\  | | |_| | ")
  console.log( "|_____| |_| \\_| |____/  ")
  console.log()

  console.log("===========================================")
  console.log("=============== utils test  ===============")
  console.log("===========================================")

  console.log('>>>> isAddress <<<<')
  console.log(EITRI.utils.isAddress(123))
  console.log()

  console.log('>>>> isTxHash <<<<')
  console.log(EITRI.utils.isTxHash(123))
  console.log()

  console.log('>>>> isBlockHash <<<<')
  console.log(EITRI.utils.isBlockHash(123))
  console.log()

  console.log('>>>> fromConvert <<<<')
  console.log(EITRI.utils.fromConvert(123))
  console.log()

  console.log('>>>> toConvert <<<<')
  console.log(EITRI.utils.toConvert(123))
  console.log()

  console.log('>>>> unitMap <<<<')
  console.log(EITRI.utils.unitMap())
  console.log()

})()

