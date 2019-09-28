# Interface

* [connection](https://github.com/bitrustkr/CLT-Blockchain-SDK#usage)
* [account](#account)
* [transaction](#transaction)
* [block](#block)
* [validator](#validator)
* [node](#node)
* [network](#network)



## account

연결된 SDK 객체에서 accounts를 이용하여 `PRIVATE_KEY`,` PUBLIC_KEY`, `MNEMONIC` 관리

* **`address 생성`**

```javascript
const createdAccount = await sdk.accounts.create();

{ 
  prvKey:
   '3291222254144801722201558458886812409762391441441861691302472446917823216021318613592',
  pubKey:
   '2021681018540163192451112021012216022011311323899149255239231129225922351992510118153',
  address:
   'ee61db8ae8003c4c07b546eb91658938df94c49086b02298ef37669d33c1593a',
  encrypt: [Function: encrypt] 
}
```

create() 메서드는 파라미터가 없으면 `PRIVATE_KEY`와 `PUBLIC_KEY` 생성

* **`address 조회`**

```javascript
const account = sdk.accounts.getAccount(createdAccount.address);

{ 
  ddress: '5860EA6D8D8BD810812D43D1F44157EEB89F5F57',
  nonce: '1234',
  pub_key:
   'A33519E2814109F0EF3189971E6C18A2BA05EDD91BB328DEBA2B930B8160656A',
  balance: '999999999999990',
  stake: '10',
  unstaking: '0',
  reward: '10671',
  un_freezing_reward: '0' 
}
```

getAccount() 메서드에 조회대상의 주소를 파라미터로 전달

nonce: 트랜잭션 발생 갯수

pub_key: address의 `PUBLIC_KEY`

balance: 보유코인 수량

state: staking 된 코인은 lock(잠김상태) 되어 사용불가

unstaking: 

reward: 

un_freezing_reward: 



* **`mnemonic 생성`**

```javascript
const mnemonic = sdk.accounts.getMnemonic();

exclude please guess vehicle mask apple crush silly tape wink giant jaguar
```



* **`mnemonic 복구`**

```javascript
const recovery = await sdk.accounts.create(mnemonic);

{ 
  prvKey:
   '321333312525113834742257263892101371865214310408240193927011574461864918123664',
  pubKey:
   '118235174224244177177281546840255144174151731081072421801601101111181798079818118321404',
  address:
   '4cf3c3e62841489a0341daf4bfb7b4a390bf152c0af82c26a8c072ed2afdffc9',
  encrypt: [Function: encrypt] 
}
```

create() 메서드는 파라미터로 `MNEMONIC`을 전달할 수 있으며, MNEMONIC 이용하여 `PRIVATE_KEY`와 `PUBLIC_KEY` 복구



* **`encrypt(암호화)`**

`PRIVATE_KEY`를 비밀번호로 암호화 하여 안전한 방법으로 보관

```javascript
// 방법 1.
const createdAccount = await sdk.accounts.create();
const { encrypted } = createdAccount.encrypt(createdAccount.prvKey, password);

// 방법 2.
const createdAccount = await sdk.accounts.create();
const { encrypted } = sdk.accounts.encrypt(createdAccount.prvKey, password);

{ ciphertext:
   { words:
      [ 274343827,
        475958623,
        -259734138,
        -836139230,
        742775034,
        -793468286,
        1543184607,
        -804120574,
        654577960,
        -1801356116,
        87949877,
        -843209791 ],
     sigBytes: 48 },
  salt:
   { words:
      [ 1145971852,
        -1312248208,
        -1386138489,
        1018292036,
        1371625497,
        -1125526333,
        1496055911,
        -1265506989 ],
     sigBytes: 32 },
  iv: { words: [ -1279458473, -1029465677 ], sigBytes: 8 } }
```

encrypt는 2가지 방법으로 사용가능

	1. accounts의 encrypt() 메서드 호출
 	2. create() 메서드로 생성한 지갑 객체를 통해 encrypt() 호출



* **`decrypt(복호화)`**

encrypt()를 통해 암호화 된 `PRIVATE_KEY`를 비밀번호를 이용하여 원래의 상태로 복구

```javascript
const decryptPrvKey = sdk.accounts.decrypt(encrypted, password);

321333312525113834742257263892101371865214310408240193927011574461864918123664
```



* **`privateKeyToAccount`**

`PRIVATE_KEY`를 이용하여 `PUBLIC_KEY`와 address 복구

```javascript
const recoveryAddress = sdk.accounts.privateKeyToAccount(prvKey);

{ 
  prvKey:
   '3291222254144801722201558458886812409762391441441861691302472446917823216021318613592',
  pubKey:
   '2021681018540163192451112021012216022011311323899149255239231129225922351992510118153',
  address:
   'ee61db8ae8003c4c07b546eb91658938df94c49086b02298ef37669d33c1593a',
  encrypt: [Function: encrypt] 
}
```



## transaction

트랜잭션 발생, 조회 

* **`getTransaction`**

트랜잭션 조회

```javascript
const txhash = sdk.transaction.getTransaction('tx hash');

{ 
  hash: '51D316323EC833DCEBF0BE0B05C4910FD3FBC2DD0990C027AD26351EE375317F',
  height: '11202',
  index: 0,
  nonce: '1',
  time: '2019-08-23T00:34:42.6221603Z',
  sender: '742B63B4AA18361B903E9F164E5B6873706239FB',
  receiver: 'D99E8939133DEB1475E03AE4B21657E46C8E594F',
  gas: '12345',
  action: 1,
  amount: '1',
  pub_key: '5C8854D05667EDE74458EF3DE0DA3F50647AF4049EC258AA01EAD1E6E2C91945',
  sig: 'BC86BC6BD1D0A0B7F8B33A0E3482AD9131FAD85DD080AC4A950BF78196FC17F5EF14BAF898796D3DEA67A5A71DF7946EC1B0A4876BCCE1E1578D20D4E7284109' 
}
```



* **`sendTransaction`**

트랜잭션 발생

```javascript
const txhash1 = sdk.transaction.sendTransaction({
  from: '',
  to: '',
  value: '',
  data: '',
  nonce: ''
})

{ 
  code: 0,
  data: '',
  log: '',
  hash: '51D316323EC833DCEBF0BE0B05C4910FD3FBC2DD0990C027AD26351EE375317F' 
}
```

다음 데이터를 json으로 파라미터 전달

from: 송신주소

to: 수신주소

value: 전달코인

data: 데이터

nonce: `account.getAccount`로 조회한 `nonce`



## block



## validator



## node



## network

