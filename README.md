<img src="./docs/images/logo.png" width="100%" height="auto">

# CLT-Blockchain-SDK

[![npm](https://img.shields.io/badge/node-SDK-green)](https://www.npmjs.com/package/@dominantlab/clt-blockchain-sdk)

* [usage](#usage)
* [development](#development)
* [interface](https://github.com/bitrustkr/CLT-Blockchain-SDK/docs/API.md)

## usage

```bash
$ npm install --save @dominantlab/clt-blockchain-sdk
```

* node.js 


```js
const {SDK} = require('@dominantlab/clt-blockchain-sdk')

const sdk = new SDK({
  ip: "127.0.0.1",
  port: 8545,
  user: '',
  password: ''
});

(async () => {
  const createdAccount = await sdk.accounts.create()
  console.log(createdAccount)
})()

```

```json
{ 
  "prvKey": "4aca257c4e1f71689569183b532754080c683d42e5e769509d444c1dd77ae58df69750cf915757745fa8789ac68240f62bf9ec29a7c9b6f06483c562c767c06d",
  "pubKey": "f69750cf915757745fa8789ac68240f62bf9ec29a7c9b6f06483c562c767c06d",
  "address": "ce10901367d2612278313dadd1dc308d8364d53a4039b47d97ee78ccd6fd7ef3",
  "encrypt": [Function: encrypt] 
}
```

* react 

```js
import {SDK}  from '@dominantlab/clt-blockchain-sdk'
// let {SDK} = require('./SDK')

function App() {
  useEffect(() => {
    (async() => {
      let sdk = new SDK({})
      // console.log(sdk)
      const password = 'password'
      const createdAccount = await sdk.accounts.create()
      const { encrypted } = sdk.accounts.encrypt(createdAccount.prvKey, password)
      const decryptPrvKey = sdk.accounts.decrypt(encrypted, password)
      const recoveryAddress = sdk.accounts.privateKeyToAccount(decryptPrvKey)
      
      console.log(createdAccount)
      console.log(encrypted)
      console.log(recoveryAddress)
    })()
  }, [])
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
```

```json
{ 
  "prvKey": "4aca257c4e1f71689569183b532754080c683d42e5e769509d444c1dd77ae58df69750cf915757745fa8789ac68240f62bf9ec29a7c9b6f06483c562c767c06d",
  "pubKey": "f69750cf915757745fa8789ac68240f62bf9ec29a7c9b6f06483c562c767c06d",
  "address": "ce10901367d2612278313dadd1dc308d8364d53a4039b47d97ee78ccd6fd7ef3",
  "encrypt": [Function: encrypt] 
}
```

* html 

```html
<!DOCTYPE html>
<html>
  <script src="./node_modules/@dominantlab/clt-blockchain-sdk/build"></script>

  <body>
    <script>
      (async () => {
        let sdk = new SDK.SDK({})
        const password = 'password'
        const createdAccount = await sdk.accounts.create()
        const { encrypted } = sdk.accounts.encrypt(createdAccount.prvKey, password)
        const decryptPrvKey = sdk.accounts.decrypt(encrypted, password)
        const recoveryAddress = sdk.accounts.privateKeyToAccount(decryptPrvKey)
        
        console.log(createdAccount)
        console.log(encrypted)
        console.log(recoveryAddress)
      })()
     
    </script>
  </body>
</html>
```

## development

* test

test 코드는 **`./test/`** 아래에 있다.

`commonjs/`: reuqire() 형태 구동 테스트

`es6`: es6 형태 구동 테스트

`web`: web에서 구동 테스트 

```base
$ npm run test:commonjs
$ npm run test:es6
```

**`./src/index.js`** 를 **`require()`** 형태와 **`import '' from ''`** 로 테스트 한다

**`web`** 은 아래의 명령어를 수행후 테스트한다.

* html 배포파일 만들기

```bash
$ npm build
```

webpack을 이용하여 html에서 사용할 수 있는 SDK를 `build/index.js`에 생성한다.

* deploy

```bash
$ npm run publish
```

[npm](https://www.npmjs.com/package/@dominantlab/clt-blockchain-sdk) 배포