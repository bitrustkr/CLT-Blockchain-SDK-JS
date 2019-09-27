const crypto = require('crypto');
const sha256 = require('sha256')
// const ed25519 = require('ed25519');
const ed25519 = require('curve25519-js')
const bip39 = require("bip39");
var CryptoJS = require("crypto-js");

const { generateMnemonic } = require('./words')
const validator = require('../../utils/validator')

class Account{
  constructor() {

  }

  getAccount (address) {
    const id = "dontcare"
    const method = "account"

    return {
      address: "5860EA6D8D8BD810812D43D1F44157EEB89F5F57",
      nonce: "1234",
      pub_key: "A33519E2814109F0EF3189971E6C18A2BA05EDD91BB328DEBA2B930B8160656A",
      balance: "999999999999990",
      stake: "10",
      unstaking: "0",
      reward: "10671",
      un_freezing_reward: "0"
    }
  }

  async create (mnemonic) {
    let { seed } = await this.getSeed(mnemonic)
    seed = Buffer.from(seed, "hex");
    seed = seed.slice(0, 32)
    let keyPair = await ed25519.generateKeyPair(seed);
    
    let prvKey = this.decimalToHex(keyPair.private.toString("hex"))
    let pubKey = this.decimalToHex(keyPair.public.toString("hex"))
    let address = sha256(pubKey)
    
    return {
      // seed: seed.toString("hex"),
      prvKey,
      pubKey,
      address,
      encrypt: this.encrypt
    }
  }

  decimalToHex (target) {
    return target.split(',').map(item => {
      let a = item.toString(16)
      a = `${a}`
      a = a.length <2 ? `0${a}`:a
      return a
    }).join('')
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
      encrypted: {
        ciphertext: cipherText.ciphertext, 
        salt, 
        iv
      }
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

  signature (prvKey) {
    let message = 'Hi Bob, How are your pet monkeys doing? What were their names again? -Alice';
    let signature = ed25519.Sign(new Buffer(message, 'utf8'), this.privateKeyToPublicKey(prvKey),  prvKey); //Using Sign(Buffer, Keypair object)

    return {
      signature
    }
  }

  getMnemonic() {
    return generateMnemonic()
  }

  privateKeyToPublicKey (prvKey) {
    return prvKey.slice(64, 128)
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


exports.Account = Account;