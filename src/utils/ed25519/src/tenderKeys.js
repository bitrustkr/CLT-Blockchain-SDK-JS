'use strict'

var crypto    = require("crypto");
var bip39     = require("bip39");
// var ed25519   = require("ed25519");
var ed25519   = require("tweetnacl");
var RIPEMD160 = require("ripemd160");

const TYPE_ED25519      = '01';
const PUBKEY_PREFIX     = '0120';//0x01   0x20 = 32 

const PUBKEY_LENGTH     = 64; // 32 bytes
const SEED_LENGTH       = 64; // 32 bytes
const PRIVKEY_LENGTH    = 128; // 64 bytes
const ADDRESS_LENGTH    = 40; //20 bytes

const PUBKEY_NAME       = 'PublicKey';
const SEED_NAME         =  'Seed';
const PRIVKEY_NAME      = 'PrivateKey';
const ADDRESS_NAME      = 'Address';

var  crypto_sign_PUBLICKEYBYTES = 32;
var  crypto_sign_SECRETKEYBYTES = 64;

function ed25519keypar(seed){
  console.log('seed',seed)
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);

  for (var  i = 0; i < 32; i++){
    sk[i] = seed[i];
  }
      
  // crypto_sign_keypair(publicKeyData, privateKeyData);
  ed25519.lowlevel.crypto_sign_keypair(pk, sk,true);
  return {publicKey: pk, secretKey: sk};

}

module.exports = class TenderKeys {
      
      generateKeyPair(seed){
        this._isHexString(seed,SEED_NAME,SEED_LENGTH);
        let buffer = new Buffer(seed, "hex")
        let keyPair = ed25519keypar(buffer);
        return {publicKey:Buffer.from(keyPair.publicKey) ,
                privateKey:Buffer.from(keyPair.secretKey)};
      }
      
      generateRandomMnemonic(){
      
        return bip39.generateMnemonic();
      
      }
      
      generateSeed(mnemonic){
      
        let hash = crypto.createHash('sha256');
        hash.update(mnemonic);
        return hash.digest('hex').toUpperCase();
        
      }
      
      getAddressFromPubKey(publicKey){

        this._isHexString(publicKey,PUBKEY_NAME,PUBKEY_LENGTH);
        let hash = crypto.createHash('sha256');
        hash.update(Buffer.from(publicKey,'hex') );
        var address=hash.digest().slice(0,20).toString('hex').toUpperCase()
        return address;
      }

      getAddressFromPrivKey(privateKey){
        this._isHexString(privateKey,PRIVKEY_NAME,PRIVKEY_LENGTH);
        let publicKey = privateKey.substring(64,128);
        return this.getAddressFromPubKey(publicKey);

      }
      
      getPubKeyFromPrivKey(privateKey){
        this._isHexString(privateKey,PRIVKEY_NAME,PRIVKEY_LENGTH);
        return privateKey.substring(64,128);

      }

      validateMnemonic(mnemonic){
      
        return bip39.validateMnemonic(mnemonic);
      
      }

      validateAddress(publicKey, address){
        this._isHexString(publicKey,PUBKEY_NAME,PUBKEY_LENGTH);
        this._isHexString(address,ADDRESS_NAME,ADDRESS_LENGTH);

        if(this.generateAddress(publicKey.toUpperCase() == address.toUpperCase()))
            return true;

        return false;            

      }

      sign(privKeyStr, txStr){
        let buffer  = new Buffer(txStr);
        let privKey = new Buffer(privKeyStr,"hex");
        let signature = Buffer.from(ed25519.sign(buffer,privKey));        

        return signature.slice(0,64);
      }
      signBuffer(privKeyStr, txStrBuffer){
        let buffer  = txStrBuffer;
        let privKey = new Buffer(privKeyStr,"hex");
        let signature = Buffer.from(ed25519.sign(buffer,privKey));        

        return signature.slice(0,64);
      }
      
      _isHexString(hexString,name,length){

        if (typeof hexString != 'string') {
            throw new Error( '\nError : The type of' + name + ' must be string!' );
        }
        
        if (hexString.length != length) {
            throw new Error( '\nError : The length of' + name + ' must be ' + length );
        }

        let arr = hexString.split();
        for (let i = 0; i < arr.length; i++) 
            if (!arr[i].match(/[0-9A-Fa-f]/))
                throw new Error("Error : unexpected junk in  " + name);            
        
      }

      _hexStringToBytes(hexStr) { 

        let result = [];
        while (hexStr.length >= 2) { 
            result.push(parseInt(hexStr.substring(0, 2), 16));
            hexStr = hexStr.substring(2, hexStr.length);
        }
      
        return result;
      }         

}
