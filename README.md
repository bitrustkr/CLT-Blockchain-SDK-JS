<img src="./docs/images/logo.png" width="100%" height="auto">

# CLT-Blockchain-SDK

[![npm](https://img.shields.io/badge/node-SDK-green)](https://www.npmjs.com/package/@dominantlab/clt-blockchain-sdk)
<!-- ![](./docs/images/logo.png){: width="100%" height="100%"} -->

* usage

## usage

* install 

```bash
$ npm install --save @dominantlab/clt-blockchain-sdk
```

```js
const SDK = require('@dominantlab/clt-blockchain-sdk')

const sdk = new SDK({
  ip: "127.0.0.1",
  port: 8545,
  user: '',
  password: ''
});

const createdAccount = await sdk.accounts.create()

console.log(createdAccount)
```

```json
{ 
  "prvKey": "4aca257c4e1f71689569183b532754080c683d42e5e769509d444c1dd77ae58df69750cf915757745fa8789ac68240f62bf9ec29a7c9b6f06483c562c767c06d",
  "pubKey": "f69750cf915757745fa8789ac68240f62bf9ec29a7c9b6f06483c562c767c06d",
  "address": "ce10901367d2612278313dadd1dc308d8364d53a4039b47d97ee78ccd6fd7ef3",
  "encrypt": [Function: encrypt] 
}
```