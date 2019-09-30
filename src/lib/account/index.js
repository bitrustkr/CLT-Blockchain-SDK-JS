const crypto = require('crypto');
const sha256 = require('sha256')
// const ed25519 = require('ed25519');
let ed25519 = require('../../utils/ed25519')
const bip39 = require("bip39");
const CryptoJS = require("crypto-js");

const { generateMnemonic } = require('./words')
const validator = require('../../utils/validator')

ed25519 = new ed25519;

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
    
    let keyPair = await ed25519.generateKeyPair(seed.toString('hex'));
    let prvKey = keyPair.privateKey.toString("hex")
    let pubKey = keyPair.publicKey.toString('hex')
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
    let salt    = CryptoJS.lib.WordArray.random(256 / 8);
    let iv      = CryptoJS.lib.WordArray.random(256 / 32)
    let encKey 	= CryptoJS.PBKDF2(password, salt, {keySize: 256 / 32});

    let plainText = CryptoJS.enc.Hex.parse(prvKey);
    let cipherText = CryptoJS.AES.encrypt(plainText, encKey, {iv: iv});
    
    return {
      encrypted: {
        ciphertext: cipherText.ciphertext, 
        salt, 
        iv
      }
    }
  }

  decrypt (encrypted, password) {
    let cipherText2 =  encrypted.ciphertext  // load the 'encrypted.ciphertext'
    let salt2       =  encrypted.salt        // load the 'salt'
    let iv2         =  encrypted.iv          // load the 'initial vector'

    // derive the 'encKey2' from the 'salt2' and 'user's password'
    let encKey2 = CryptoJS.PBKDF2(password, salt2, {keySize: 256 / 32});

    let plainText2 = CryptoJS.AES.decrypt( 
      { 
        ciphertext: cipherText2 
      },
      encKey2, { 
        iv: iv2 
      }
    )

    return plainText2.toString()
  }

  getMnemonic() {
    return generateMnemonic()
  }

  static privateKeyToPublicKey (prvKey) {
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

    return {
      mnemonic,
      seed: seed.toString('hex'), 
    }
  }

  async mnemonicToSeed(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return seed.toString('hex')
  }
}

exports.Account = Account;