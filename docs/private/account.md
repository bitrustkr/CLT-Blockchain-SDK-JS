# Not completed!

## Accounts

블록체인 데이터에 저장되는 상태 정보 (Account) 에 대한 자료 구조를 설명한다. 모든 Account 정보는 아래 기술된 자료 형식에 따라 [Google Protocol Buffers](https://developers.google.com/protocol-buffers) 로 인코딩되어 블록체인 상태정보 DB에 저장된다.  

### Tables

- [Address](#address)
- [AssetAccount](#assetaccount)
- [DataAccount](#dataaccount)

### Create Account

### Address

블록체인상에서 Account 에 대한 식별은 `address` 로 이루어진다. Account 가 `AssetAccount` 인 경우 `address` 는 해당 Account 를 소유한 주체의 public key 로 부터 유도되며, `DataAccount` 의 경우에는 `DataAccount.creator` 와 `DataAccount.tx_hash` 로 부터 유도된다.  
이후 기술되는 Account 의 자료구조에는 `address` 필드가 존재 하지 않는데 이는 `address` 가 Account 에 포함되어 관리되는 상태 정보 그 자체가 아니라, 저장된 Account 를 식별하기 위한 `key` 로 사용되기 때문이다.  
블록체인의 상태 정보를 저장하기 위한 DB 로 Google Level DB와 같은 경량화 DB 가 주로 사용되는데 이러한 DB 대부분 **key-value** 저장 구조를 갖는다.  
각 Account 에 부여된 `address` 에 Account Type 을 나타내는 1byte prefix를 붙여 실제 **key**를 구성하고, 해당 Account 의 인코딩된 데이터를 **value** 로 하여 상태 DB 에 저장된다. 따라서 상태 DB에 저장되는 실제 **key** 는 21Byte 데이터가 된다.

```json
// AssetAccount's address and key
hash = SHA256(AssetAccount.pub_key)
asset_account_address = hash[0..19]             // 20bytes
asset_account_key = 0x01|asset_account_address  // 21bytes

// DataAccount's address and key
hash = SHA256(DataAccount.creator|DataAccount.tx_hash)
data_account_address = hash[0..19]           // 20bytes
data_account_key = 0x02|data_account_address // 21bytes
```

### AssetAccount
블록체인 상의 자산(Asset) 상태를 나타내는 Account 이다. `AssetAccount`의 자산(`balance`)를 사용(transfer) 하기 위해서는 이에 대한 소유 증명이 필요하며, 이 소유 증명은 `address` 를 유도하는데 사용되었던 public key 및 그에 대응되는 private key를 사용하여 이루어진다. 즉 `AssetAccount` 의 상태 변화를 기술하는 모든 트랜잭션은 대응되는 private key 를 사용하여 생성한 **digital signature** 가 포함되어야 하며, 이 signature 는 대응되는 public key 를 사용하여 검증되어야 한다.

- `pub_key`:`Bytes`, 32Bytes - ED25519 public key.
- `nonce`:`int64` -
- `balance`:`BigNumber` - `AssetAccount`가 갖는 사용 가능한 자산 총량.
- `stake`:`BigNumber` - `AssetAccount`가 동결한 자산(지분) 총량.
- `unstaking`:`BigNumber` - 동결 해제가 진행중인 `AssetAccount`의 자산(지분) 총량.
- `reward`:`BigNumber` - `AssetAccount`가 대표노드(Validator) 또는 위임자로서 받은 보상 총량.
- `un_freezing_reward`:`BigNumber` - 동결 해제가 진행중인 `AssetAccount`의 보상 총량.

### DataAccount

- `creator`:`Bytes`, 20Bytes - `DataAccount` 를 생성한 생성자 계정(`AssetAccount`)의 주소.
- `tx_hash`:`Bytes`, 32Bytes - `DataAccount` 를 생성하기 위한 트래잭션 `TxCreateData` 의 hash.
- `authors`:`Array` - `DataAccount` 에 대한 업데이트가 허용된 계정의 주소 목록.
- `code`:`Bytes` - 데이터 원본 또는 데이터 원본과 1:1 관계를 갖는 다른 형태의 데이터.
- `extra`:`string` - 임의의 정보를 기록하기 위한 필드.
