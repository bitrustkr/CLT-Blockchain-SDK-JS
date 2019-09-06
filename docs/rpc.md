## RPC

### Tables

- [Get Account](#get-account)
- [Get Last Nonce](#get-last-nonce)
- [Get Block](#get-block)
- [Get Last Block](#get-last-block)
- [Send Transaction](#send-transaction)
- [Get Transaction](#get-transaction)
- ~~[Get Pending Transactions](#get-transaction)~~
- [Get Validators](#get-validators)
- [Get Node Info.](#get-node-info)
- [Subscribe Event](#subscribe-event)

Logichaind 가 제공하는 RPC 는 HTTP 를 기본 프로토콜로 사용하며, 파라메터는 URI (GET) 또는 JSONRPC 형식으로 전달(POST) 될 수 있다.

**URI (GET)**
```bash
$ curl http://{node_url}/{rpc_method}?{Parameters...}
```

**JSONRPC (POST)**
```bash
$ curl -X POST -d "{JSONRPC_MESSAGE}" http://{node_url}
```  

### Get Account

`address` 를 키로 하여 `Account` 를 조회 한다.

#### Parameters

- `addr`: 조회 하고자 하는 `Account` 의 주소.

#### Request

- JSONRPC

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "account",
  "params": {
    "addr": "5860EA6D8D8BD810812D43D1F44157EEB89F5F57"
  }
}
```

- URI (***Depreicated***)

```shell
$ curl 'http://localhost:26657/account?addr="5860EA6D8D8BD810812D43D1F44157EEB89F5F57"'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "result": {
    "address": "5860EA6D8D8BD810812D43D1F44157EEB89F5F57",
    "nonce": "1234",
    "pub_key": "A33519E2814109F0EF3189971E6C18A2BA05EDD91BB328DEBA2B930B8160656A",
    "balance": "999999999999990",
    "stake": "10",
    "unstaking": "0",
    "reward": "10671",
    "un_freezing_reward": "0"
  }
}
```

### Get Last Nonce

`Account` 의 마지막 `Nonce` 값을 조회한다. `Account` 의 `Nonce` 는 해당 주소로 발생한 트랜잭션 개수를 나타낸다.  
트랜잭션 구성시, `Sender`의 `Nonce` 값이 포함되는데 이 값이 올바른 값이 아닌 경우, 해당 트랜잭션은 거부 된다.

> [Get Account](#get-account) 참조.

### Get Block

블록 `height` 를 키로 하여 블록을 조회한다. 블록 `height` 라는 표현은 보통 블록 **number** 등의 표현과 혼용되며 동일한 의미를 갖는다.

#### Parameters

- `height`: 조회 하고자 하는 블록의 높이 (블록 번호).

#### Request

- JSONRPC

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "block",
  "params": {"height":"553"}
}
```

- URI (***Depreicated***)

```shell
$ curl 'http://localhost:26657/block?height="553"'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "block": {
      "block_id": {
        "hash": "DF9D3EE29714224D6059A2B4A78C229FC0BB06E73B4DE9EB675AB52D044239C4",
        "parts": {
          "total": "1",
          "hash": "1F4A3B0367008252A725B28CD2B4CF9F8F5BA7C94EFFF351381DEECD235C6561"
        }
      },
      "header": {
        "version": {
          "block": "10",
          "app": "1"
        },
        "chain_id": "logichain-dev",
        "height": "11603",
        "time": "2019-08-22T01:47:01.9879485Z",
        "num_txs": "1",
        "total_txs": "1",
        "last_block_id": {
          "hash": "D20617735CE97ADED7DE88AA50A1D60F183729BF3A926B3F073DEFCF87F3D993",
          "parts": {
            "total": "1",
            "hash": "F2971BE97176B4782675D1A9AC331A76BB381100C0EBEAB3073D79ECDCED7DAE"
          }
        },
        "last_commit_hash": "1FC65E838A575523E8447F971B90110E2C740629FD450A0E639488930E40D6F0",
        "data_hash": "A010956BD83B8BE563CEF6B1B466C8F6E4BA20966D61631B7129A03E6274DD75",
        "validators_hash": "38237AA5AFE05DD628F68D4BE719A0EAC031D4F2561CED086C305162D58C91EC",
        "next_validators_hash": "38237AA5AFE05DD628F68D4BE719A0EAC031D4F2561CED086C305162D58C91EC",
        "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
        "app_hash": "C77EE3A4C2E781DECC93BA904B55BF3574003E074AA77341677DFD814C52F34A",
        "last_results_hash": "",
        "evidence_hash": "",
        "proposer_address": "5860EA6D8D8BD810812D43D1F44157EEB89F5F57"
      }
    },
    "txs": [
      "1FF50FD83EA636979E7EB1DF6CC0399F22358950914A8D69D0DB13775F6923B5"
    ]
  }
}
```

### Get Last Block

현재 접속한 노드의 마지막 블록을 조회한다.

#### Parameters

N/A

#### Request

- JSONRPC

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "block_last"
}
```

- URI (***Depreicated***)

```shell
$ curl http://localhost:26657/block_last
```

#### Response

> [Get Block](#get-block) 참조.

### Get Transaction

#### Request

- JSONRPC

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "tx",
  "params": {
    "hash": "51D316323EC833DCEBF0BE0B05C4910FD3FBC2DD0990C027AD26351EE375317F"
  }
}
```

- URI (***Depreicated***)

```shell
$ curl 'http://localhost:26657/tx?hash="51D316323EC833DCEBF0BE0B05C4910FD3FBC2DD0990C027AD26351EE375317F"'
```

#### Response
```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "result": {
    "hash": "51D316323EC833DCEBF0BE0B05C4910FD3FBC2DD0990C027AD26351EE375317F",
    "height": "11202",
    "index": 0,
    "nonce": "1",
    "time": "2019-08-23T00:34:42.6221603Z",
    "sender": "742B63B4AA18361B903E9F164E5B6873706239FB",
    "receiver": "D99E8939133DEB1475E03AE4B21657E46C8E594F",
    "gas": "12345",
    "action": 1,
    "amount": "1",
    "pub_key": "5C8854D05667EDE74458EF3DE0DA3F50647AF4049EC258AA01EAD1E6E2C91945",
    "sig": "BC86BC6BD1D0A0B7F8B33A0E3482AD9131FAD85DD080AC4A950BF78196FC17F5EF14BAF898796D3DEA67A5A71DF7946EC1B0A4876BCCE1E1578D20D4E7284109"
  }
}
```

### Send Transaction

생성된 트랜잭션을 블록체인 네트워크상에 배포 한다.

#### Parameters

- `tx`: Hex string 으로 인코딩된 트랜잭션 데이터.

#### Request

- JSONRPC

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "tx_sync",
  "params": {"tx":"E6E7C2B9A...5FC5F45BB84E49941B"}
}
```

- URI (***Depreicated***)

```shell
$ curl -s http://localhost:26657/tx_sync?tx=0xE6E7C2B9A...5FC5F45BB84E49941B
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "code": 0,
    "data": "",
    "log": "",
    "hash": "51D316323EC833DCEBF0BE0B05C4910FD3FBC2DD0990C027AD26351EE375317F"
  }
}
```

### Get Validators

현재 대표노드(Validator) 를 조회 한다.

#### Parameters

N/A

#### Request

- JSONRPC

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "validators"
}
```

- URI (***Depreicated***)

```shell
$ curl 'http://localhost:26657/validators'
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "result": {
    "block_height": "13967",
    "validators": [
      {
        "address": "5860EA6D8D8BD810812D43D1F44157EEB89F5F57",
        "pub_key": "A33519E2814109F0EF3189971E6C18A2BA05EDD91BB328DEBA2B930B8160656A",
        "voting_power": "10",
        "proposer_priority": "0"
      }
    ]
  }
}
```

### Get Node Info.

#### Parameters

N/A

#### Request

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "node_info"
}
```

#### Response

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "1"
      },
      "id": "0213ec14f96f6d1d5084f65a4109ff5550d131b2",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "logichain-dev",
      "version": "0.32.1",
      "channels": "4020212223303800",
      "moniker": "yongseokkwon-pc",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://127.0.0.1:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "57C34CC87C731A2649B0201039FFB94A51B180CBF094FDC1FBBD1ABCA7AA8C81",
      "latest_app_hash": "86416F5FFF6619489F9A42A0636E07438A86F1649A5983DD7B032AFC35FF310A",
      "latest_block_height": "14977",
      "latest_block_time": "2019-08-23T01:56:22.4903998Z",
      "catching_up": false
    },
    "validator_info": {
      "address": "5860EA6D8D8BD810812D43D1F44157EEB89F5F57",
      "pub_key": "A33519E2814109F0EF3189971E6C18A2BA05EDD91BB328DEBA2B930B8160656A",
      "voting_power": "10",
      "proposer_priority": "0"
    },
    "net_info": {
      "listening": true,
      "listeners": [
        "Listener(@)"
      ],
      "n_peers": "0",
      "peers": []
    }
  }
}
```

### Subscribe Event

Blockchain 에서 발생하는 **event** 에 대한 정보를 **websocket** 을 이용하여 비동기적으로 수신할 수 있다.  **Websocket** 의 endpoint 는 `/websocket` 이다.  
`ws://localhost:26657/websocket` 로 **websocket** 연결을 생성하고 이 연결을 통해 JSONRPC 메시지를 전송함 으로서 이벤트 수신을 시작할 수 있다.  
이 JSONRPC 메시지에는 수신을 원하는 조건을 기술한 **query** 를 포함한다. **Query** 는 `query = 'condition AND condition AND ...'` 형태로 구성되며, 각 **condition** 은 `key operation operand` 형식으로 구성된다. `condition` 에 사용될 수 있는 `key`는 다음과 같다.

- `tm.event` : 수신할 이벤트 종류.
  - `'NewBlock'`: 새로 생성된 블록에 대한 정보를 수신.
  - `'Tx'`: 트랜잭션 관련 정보를 수신.

`tm.event='Tx'` 인경우, 추가로 설정할 수 있는 조건은 다음과 같다.

  - `tx.hash`: 지정된 hash 를 갖는 트랜잭션 정보 수신.
  - `tx.height`: 지정된 블록 `height` 에 포함된 트랜잭션 정보 수신.
  - `acct.sender`: `Transaction.Sender` 정보가 일치하는 트랜잭션 수신.
  - `acct.receiver`: `Transaction.Receiver` 정보가 일치하는 트랜잭션 수신.
  - `acct.action`: `Transaction.Action` 정보가 일치하는 트랜잭션 수신.


예를 들어 새로 생성되는 모든 블록 정보를 수신하고자 한다면 아래와 같이 **query**를 구성하여 **websocket** 으로 전송할 수 있다.

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "subscribe",
  "params": {
      "query": "tm.event='NewBlock'"
  }
}
```

다음은 특정 주소 `1111111111111111111111111111111111111111` 에서 `2222222222222222222222222222222222222222`로 자산 전송한 트랜잭션 조회를 위해서는 다음과 같이 설정할 수 있다.

```json
{
  "jsonrpc": "2.0",
  "id": "dontcare",
  "method": "subscribe",
  "params": {
      "query": "acct.sender='1111111111111111111111111111111111111111' AND acct.receiver='2222222222222222222222222222222222222222' AND acct.action='1'"
  }
}
```
