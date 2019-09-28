const ed25519 = require('ed25519');
const ed25519_supercop = require('supercop.js'); // react-native에서 동작함.
const ed25519_clavem = require("@epicinium/clavem");
const ed25519_ed25519_supercop = require('ed25519-supercop');
const ed25519_tendermintkeys = require('../src/utils/ed25519');



(async () => {
  console.log('===== seed =====')
  let seed = ed25519_supercop.createSeed()
  console.log(seed.toString('hex'), seed.toString('hex').length)
  console.log()

  console.log("################################")

  console.log('===== ed25519 =====')
  let keypair0 = ed25519.MakeKeypair(seed);
  console.log("prvKey: ", keypair0.privateKey.toString("hex"));
  console.log("pubKey: ", keypair0.publicKey.toString("hex"));
  console.log()

  console.log('===== supercop.js =====')
  let keypair1 =  await ed25519_supercop.createKeyPair(seed)
  console.log("prvKey: ", keypair1.secretKey.toString("hex"))
  console.log("pubKey: ", keypair1.publicKey.toString("hex"))
  console.log()

  console.log('===== @epicinium/clavem =====')
  let keypair2 = await ed25519_clavem.generateKeyPair(seed)
  console.log("prvKey: ", keypair2.privateKey.toString('hex'))
  console.log("pubKey: ", keypair2.publicKey.toString('hex'))
  console.log()

  console.log('===== ed25519-supercop =====')
  let keypair3 =  await ed25519_ed25519_supercop.createKeyPair(seed)
  console.log("prvKey: ", keypair3.secretKey.toString("hex"))
  console.log("pubKey: ", keypair3.publicKey.toString("hex"))
  console.log()

  console.log('===== ed25519_tendermintkeys =====')
  var tenderKeys = new ed25519_tendermintkeys;
  var keypair4  = tenderKeys.generateKeyPair(seed.toString('hex'))
  console.log("prvKey: ", keypair4.privateKey.toString("hex"))
  console.log("pubKey: ", keypair4.publicKey.toString("hex"))
  console.log()

  // console.log("################################")

  // let msg = 'hi'
  // msg = new Buffer.from(msg)

  // console.log('===== ed25519 =====')
  // var sig0 = ed25519.Sign(msg, keypair0.publicKey, keypair0.privateKey)
  // console.log(sig0.toString('hex'))
  // console.log()

  // console.log('===== supercop.js =====')
  // var sig1 = ed25519_supercop.sign(msg, keypair1.publicKey, keypair1.secretKey)
  // console.log(sig1.toString('hex'))
  // console.log()

  // console.log('===== @epicinium/clavem =====')
  // var sig2 = await ed25519_clavem.sign(msg, keypair2.publicKey, keypair2.privateKey)
  // console.log(sig2.toString('hex'))
  // console.log()
})()