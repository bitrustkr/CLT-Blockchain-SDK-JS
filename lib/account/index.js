const crypto = require('crypto');
const sha256 = require('sha256')
const ed25519 = require('ed25519');
const bip39 = require("bip39");
var CryptoJS = require("crypto-js");

const validator = require('../../utils/validator')



class Account{
  constructor() {

  }

  getBalance (address) {
    return address
  }

  async create (mnemonic) {
    let { seed } = await this.getSeed(mnemonic)
    seed = Buffer.from(seed, "hex");
    seed = seed.slice(0, 32)
    let keyPair = ed25519.MakeKeypair(seed);

    let prvKey = keyPair.privateKey.toString("hex")
    let pubKey = keyPair.publicKey.toString("hex")
    let address = sha256(pubKey)

    return {
      // seed: seed.toString("hex"),
      prvKey,
      pubKey,
      address,
      encrypt: this.encrypt
    }
  }

  encrypt (prvKey, password) {
    var salt    = CryptoJS.lib.WordArray.random(256 / 8);
    var iv      = CryptoJS.lib.WordArray.random(256 / 32)
    var encKey 	= CryptoJS.PBKDF2(password, salt, {keySize: 256 / 32});

    var plainText = CryptoJS.enc.Hex.parse(prvKey);
    // console.log("plainText", plainText.toString());

    var cipherText = CryptoJS.AES.encrypt(plainText, encKey, {iv: iv});
    // console.log("cipherText", cipherText.ciphertext.toString());
    return {
      enctypted: {...cipherText, salt, iv} //.ciphertext.toString()
    }
  }

  decrypt (encrypted, password) {
    var cipherText2 =  encrypted.ciphertext  // load the 'encrypted.ciphertext'
    var salt2       =  encrypted.salt                   // load the 'salt'
    var iv2         =  encrypted.iv                     // load the 'initial vector'

    // derive the 'encKey2' from the 'salt2' and 'user's password'
    var encKey2 = CryptoJS.PBKDF2(password, salt2, {keySize: 256 / 32});

    // console.log("cipherText2", cipherText2.toString());
    var plainText2 = CryptoJS.AES.decrypt( { ciphertext: cipherText2 },
                                              encKey2,
                                              { iv: iv2 }
                                          )
    // console.log("plainText2", plainText2.toString());
    return plainText2.toString()
  }

  signature (privateKey) {
    let message = 'Hi Bob, How are your pet monkeys doing? What were their names again? -Alice';
    let signature = ed25519.Sign(new Buffer(message, 'utf8'), privateKey); //Using Sign(Buffer, Keypair object)

    return {
      signature
    }
  }

  getMnemonic() {
    return bip39.generateMnemonic();
  }

  privateKeyToAccount (prvKey) {
    let pubKey = prvKey.slice(64, 128)
    let address = sha256(pubKey)
    return {
      prvKey,
      pubKey,
      address,
      encrypt: this.encrypt
    }
  }

  async getSeed (mnemonic) {
    if (!mnemonic) mnemonic = this.getMnemonic()
    const seed = await bip39.mnemonicToSeed(mnemonic); // seed === entropy
    // const rootKey = hdkey.fromMasterSeed(seed);
    // console.log(mnemonic)
    // console.log(seed.toString('hex'))
    return {
      mnemonic,
      seed, 
      // rootKey
    }
  }
}


module.exports = Account;