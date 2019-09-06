const crypto = require('crypto');
const sha256 = require('sha256')
const ed25519 = require('ed25519');
const bip39 = require("bip39");

const validator = require('../../utils/validator')

class Account{
  constructor() {

  }

  getBalance (address) {
    return address
  }

  async create (password) {
    let { seed, mnemonic} = await this.getSeed()
    seed = Buffer(seed, "hex");
    seed = seed.slice(0, 32)
    let keyPair = ed25519.MakeKeypair(seed);

    let prvKey = keyPair.privateKey.toString("hex")
    let pubKey = keyPair.publicKey.toString("hex")
    let address = sha256(pubKey)
    // let address = sha256(pubKey).slice(0, 20)
    let encrypt = this.encrypt(password)
    
    return {
      // seed: seed.toString("hex"),
      prvKey,
      pubKey,
      address,
      encrypt
    }
  }

  encrypt (password) {

  }

  decrypt (keystore, password) {

  }

  signature (keyPair) {
    let message = 'Hi Bob, How are your pet monkeys doing? What were their names again? -Alice';
    let signature = ed25519.Sign(new Buffer(message, 'utf8'), keyPair.privateKey); //Using Sign(Buffer, Keypair object)

    return {
      signature
    }
  }

  getMnemonic() {
    return bip39.generateMnemonic();
  }

  async getSeed () {
    const mnemonic = this.getMnemonic()
    const seed = await bip39.mnemonicToSeed(mnemonic); // seed === entropy
    // const rootKey = hdkey.fromMasterSeed(seed);
    console.log(mnemonic)
    console.log(seed.toString('hex'))
    return {
      mnemonic,
      seed, 
      // rootKey
    }
  }

}


module.exports = Account;