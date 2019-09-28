'use strict'
var ed25519   = require("ed25519");
var TenderKeys = require('./index');
var tenderKeys = new TenderKeys;

// var mnemonic = tenderKeys.generateRandomMnemonic();
var mnemonic     =  'Hello World';
var seed     =  tenderKeys.generateSeed(mnemonic);
var keyPair  = tenderKeys.generateKeyPair(seed);
console.log(keyPair)
var address  = tenderKeys.getAddressFromPubKey(keyPair.publicKey.toString('hex'));

console.log("mnemonic    :" + mnemonic);
console.log("private key :" + keyPair.privateKey.toString('base64'));
console.log("Public key  :" + keyPair.publicKey.toString('base64'));
console.log("address     :" + address);


let data = '{"chain_id":"BurrowChain_2A0FC2-4F8BA9","tx":[1,{"inputs":[{"address":"6AE5EF855FE4F3771D1B6D6B73E21065ED7670EC","amount":1000,"sequence":8}],"outputs":[{"address":"D7572DA8389D0C3AA64FC8709CA853AFE24F4260","amount":1000}]}]}';
let privKey = 'C01E3035C40C2FF009791C36755848F77EA9FAD484E4A38A17355C72A2C5EDB81474C7654BD711B910F48561FCEC85BC5FAE01B1D209CDF6B60D10F141EC7D5B';
let signature = tenderKeys.sign(privKey,data);
console.log("signature :"+signature.toString("base64"));
