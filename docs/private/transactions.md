#Not completed!

## Transactions

블록체인 네트워크 채널을 통해 Node 간에 공유되는 트랜잭션의 자료구조를 설명한다. 모든 트랜잭션은 아래 기술된 자료 형식에 따라 [Google Protocol Buffers](https://developers.google.com/protocol-buffers) 로 인코딩된 형태로 네트워트에 전파되고 블록체인에 저장된다.  
사용자가 트랜잭션 조회시 수신하게 되는 결과는 아래 기술된 자료구조를 적절히 변형한 것에 해단한다.

### Tables

- [Transaction](#transaction)
- [TxTransfer](#txtransfer)
- [TxStaking](#txstaking)
- [TxUnStaking](#txunstaking)
- [TxGovRuleProposal](#TxGovRuleProposal)
- [TxGovRuleVote](#TxGovRuleVote)
- ~~*[TxCreateData](#TxCreateData)*~~
- ~~*[TxUpdateData](#TxUpdateData)*~~
- ~~*[TxVerifyData](#TxVerifyData)*~~
- ~~*[TxResult](#TxResult)*~~

### Transaction

- `Nonce`:`int64` - `Sender` 가 발생시킨 트랜잭션의 순번. `Sender`가 마지막 발생시킨 트랜잭션의 `Nonce` 보다 +1 이어야 하며 이 `Nonce` 값이 맞지 않는 트랜잭션은 처리되지 않는다.  
- `Time`:`Time` - `Transaction` 생성 시간.  
- `Sender`: `Bytes`, 20Bytes - 현재 `Transaction` 을 생성한 계정의 주소.
- `Receiver`: `Bytes`, 20Bytes -
- `Gas`: `BigNumber` - 트랜잭션 처리를 위한 수수료. 이 수수료는 대표노드(Validator)의 보상분으로 주어진다.  
- `Action`: `byte` - `Transaction` 의 종류. 이 값에 따라 `Payload`의 형식이 결정된다. 다음과 같은 값이 설정될 수 있다.  

    | Action | Value | Description |
    |---|:---:|---|
    | `Transfer` | 1 | `Payload` 는 `TxTransfer` 를 갖는다. `Sender` 로 부터 `Receiver`로 `TxTransfer.amount` 만큼의 자산을 이동한다. |
    | `Staking` | 2 | `Payload` 는 `TxStaking` 을 갖는다. `Sender` 는 `Receiver` 에게  `TxStaking.amount` 만큼의 지분(자산)을 **위임**한다. 만약 `Sender`와 `Receiver`가 동일하다면, 이것은 `Sender`가 대표노드(Validator)로 되기 위하여 자신의 지분(자산)을 **동결(Staking)** 하는 것을 의미한다. |
    | `UnStaking` | 3 | `Payload` 는 `TxUnStaking` 을 갖는다. `Sender` 는 `Receiver` 에게 위임하였던 지분중 `TxUnStaking.amount` 만큼의 지분(자산)을 **회수**한다. 만약 `Sender`와 `Receiver`가 동일하다면, 이것은 `Sender`가 대표노드(Validator)로 되기 위하여 **동결(Staking)** 하였던 자신의 지분(자산)을 **동결해제** 하는 것을 의미한다. |
    | `GovRuleProposal` | 4 | `Payload` 는 `TxGovRuleProposal` 을 갖는다. |
    | `GovRuleVote` | 5 | `Payload` 는 `TxGovRuleVote` 을 갖는다. |

- `Payload`: `Bytes` -  `Action` 의 값에 따라, 아래 기술된 `TxXXX` 데이터의 인코딩된 형태를 갖는다.

- `PubKey`: `Bytes` - `Sender` 의 Public Key. 이 필드는 `Nonce` 가 1 인 경우에 한하여 필수로 존재 하여야 한다. 이후 모든 노드가 `Sender`의 Public Key 를 알고 있으므로 더 이상 해당 `Sender` 의 `PubKey`를 `Transactioin` 에 담을 필요가 없다.

- `Sig`: `Bytes` - `Sender` 의 전자서명. 현재 `Transaction`이 적절한 규칙에 따라 인코딩된 데이터에 대한 `Sender`의 Private Key 로 구한 전자서명 값.

#### Validation

- check that the sender's account is there.  
If it is not found, a new account which address is `Transaction.Sender` will be created. In this case, `Transaction` must have `PubKey`.

- check that the sender's account has a public key and it's address is derived from the sender's public key.

- check that the receiver's account is there.  
If it is not found, a new account will be created. In this case, a public key is not need. A public key is only need for a sender.

- check that the sender's account is an asset account.  
For all `Transaction`, the sender's account should be an asset account.

- check that the `Transaction.Nonce` is equal to `the nonce of the sender's account + 1`

- check `Transaction.Payload`. Each 

- check `Transaction.Sig`

### TxTransfer

`Transaction.Action` 값이 `Transfer` 일 경우, `Transaction.Payload`를 구성 하는 자료 구조이다. 자산 전송을 위한 트랜잭션에 사용된다.

- `amount`:`BigNumber` - 전송할 자산량.

`TxTransfer`를 수신한 모든 노드는 아래와 같은 검증 절차를 수행한다.

1. Verify the `Transaction.Sig` by using `Sender`'s public key.
2. `Sender.balance` >= `Transaction.Gas` + `TxTransfer.amount`.

### TxStaking

`Transaction.Action` 값이 `Staking` 일 경우, `Transaction.Payload`를 구성 하는 자료 구조이다. 자산을 동결하여 지분으로 전환할 경우 사용된다.  
`Sender.address`와  `Receiver.address` 가 동일한 경우, `Sender`가 동결한 자산은 곧 `Sender` 자신의 **지분** 으로 전환 된다. 반면에 `Sender.address` 가 `Receiver.address` 와 다른 경우, `Sender`가 동결한 자산은 곧 `Receiver`의 **지분** 으로 전환 되는 **지분 위임** 이 이루어진다.

- `amount`:`BigNumber` - 동결할 자산량.

`TxStaking`를 수신한 모든 노드는 아래와 같은 검증 절차를 수행한다.

1. Verify the `Transaction.Sig` by using `Sender`'s publick key.
2. `Sender.balance` >= `Transaction.Gas` + `TxUnStaking.amount`.


### TxUnStaking

`Transaction.Action` 값이 `UnStaking` 일 경우, `Transaction.Payload`를 구성 하는 자료 구조이다. 동결한 자산을 다시 회수하기 위하여 사용된다.

- `amount`:`BigNumber` - 회수할 자산량.

`TxUnStaking`를 수신한 모든 노드는 아래와 같은 검증 절차를 수행한다.

1. Verify the `Transaction.Sig` by using `Sender`'s publick key.
2. `Sender.balance` >= `Transaction.Gas`.
3. `Sender.stake` >= `TxUnStaking.amount`


### TxGovRuleProposal

- `VotingPeriod`: - 투표 기간. 현재 Governance Rule 의 `BN_Min_GovRuleVotingPeriod` ~ `BN_Max_GovRuleVotingPeriod` 사이의 값 이어야 한다.
- `ApplyPeriod`: - 변경안이 가결될 경우, 가결된 block 다음 block 부터 실제 적용이 시작되는 block 까지의 block 수. 이 값은 현재 Governance Rule 의 `BN_Min_GovRuleApplyPrepare` ~ `BN_Max_GovRuleApplyPrepare` 사이의 값이 어야 한다.
- `Proposal`: `Object` - 변경안 내용.  
    - `RewardPerStake`:`BigNumber`, Optional - 대표노드(Validator)에 주어지는 보상량으로 추가 발행되는 수량. 단위 동결 자산당 추가 발행되는 보상량을 의미한다. 즉, 동결된 자산(지분)이 많은면 그만큼 많은 보상량이 추가 발행된다.
    - `TxFee_Min_Transfer`:`BigNumber`, Optional - 자산 이동 트랜잭션 `TxTransfer` 이 처리 되기위한 최소 수수료.
    - `TxFee_Min_Staking`:`BigNumber`, Optional - 자산 동결(Staking) 트랜잭션 `TxStaking` 이 처리 되기위한 최소 수수료.
    - `TxFee_Min_GovRuleProposal`:`BigNumber`, Optional - Governance Rule 변경 제안 트랜잭션 `TxGovRuleProposal` 이 처리 되기위한 최소 수수료.
    - `TxFee_Min_GovRuleVoting`:`BigNumber`, Optional - Governance Rule 변경 제안에 대한 투표 트랜잭션 `TxGovRuleVote` 이 처리 되기위한 최소 수수료.
    - `BN_GovRuleProposable`:`int64`, Optional - Governance Rule 변경을 제안하기 위한 자격 조건. 이 값에 명시된 수 만큼의 block 에 연속적으로 **서명** 한 대표노드만이 변경 제안 트랜잭션 `TxGovRuleProposal` 을 제출 할 수 있다.
    - `BN_Max_GovRuleVotingPeriod`:`int64`, Optional - Governance Rule 변경안에 대한 투표 기간에 해당 되는 최대 block 수. 제안된 변경안에 대한 투표 기간은 이 값에 명시된 block 수를 초과 할 수 없다.
    - `BN_Min_GovRuleVotingPeriod`:`int64`, Optional - Governance Rule 변경안에 대한 투표 기간에 해당 되는 최소 block 수. 제안된 변경안에 대한 투표 기간은 이 값에 명시된 block 수 이상이 주어져야 한다.
    - `BN_Max_GovRuleApplyPeriod`:`int64`, Optional - 가결된 Governance Rule 이 실제 반영되는데 걸리는 최대 block 수.
    - `BN_Min_GovRuleApplyPeriod`:`int64`, Optional - 가결된 Governance Rule 이 실제 반영되는데 걸리는 최소 block 수.
    - `BN_FreezeValidator`:`int64`, Optional - 이 값의 block 수 만큼 연속적으로 서명에 빠지는 대표노드(Validator) 는 자격을 상실하게 된다. 상실된 자격을 되살리기 위해서는 블록체인 네트워크에 `TxRecoverValidator` 를 제출 해야 한다.
    - `BN_UnSakingPeriod`:`int64`, Optional, 동결 해제된 자산이 실제 가용해지기 까지 걸리는 block 수. `TxUnStaking` 이 처리된 block 이후 부터 이 값의 block 수 이후에 해당 자산은 사용(Transfer) 이 가능해 진다.
    - `ValidatorNums`:`int64`, Optional - 최대 대표노드(Validator) 수. 동결 지분량 순위가 `ValidatorNums` 이내에 포함되어야만 대표노드(Validator)의 자격을 갖게된다.
    - `DelegatorNumsPerVal`:`int64`, Optional - 

### TxGovRuleVote

- `YN`: `bool` - 현재 제안된 Governance Rule 변경안에 대한 찬성/반대.

<font color="gray">

### TxCreateData

- `code`:`Bytes` -
- `extra`:`string` -

### TxUpdateData

- `authors`:`Array`, Optional -
- `code`:`Bytes` -
- `extra`:`string` -

### TxVerifyData

### TxResult

- `txHash`:`Bytes`, 32Bytes -
- `blockHeight`:`Bytes`, 32Bytes -
- `result`:`String` - "success" or "fail"
- `log`:`String` - An error code and message.
- `gasUsed`:`BigNumber` -  

</font>
