# Utils

utils는 노드와 통신을 하지 않습니다.

* [usage](#usage)
* [isAddress](#isAddress)
* [isTxHash](#isTxHash)
* [isBlockHash](#isBlockHash)
* [fromConvert](#fromConvert)
* [toConvert](#toConvert)
* [unitMap](#unitMap)

## usage

* common.js 

```js
const {EITRI} = require('@dominantlab/clt-blockchain-sdk')
```

* ES6 

```js
import {EITRI}  from '@dominantlab/clt-blockchain-sdk'
```

* CDN

```html
<!DOCTYPE html>
<html>
  <script src="./node_modules/@dominantlab/clt-blockchain-sdk/build"></script>

  <body>
    <script>
      (async () => {
       const {
          isAddress
          isTxHash
          isBlockHash
          fromConvert
          toConvert
          unitMap
        } = EITRI.EITRI.utils

        
        console.log(unitMap())
      })()
    </script>
  </body>
</html>
```

## isAddress

```js
EITRI.utils.isAddress(123)
```

## isTxHash

```js
EITRI.utils.isTxHash(123)
```

## isBlockHash

```js
EITRI.utils.isBlockHash(123)
```

## fromConvert

```js
EITRI.utils.fromConvert(123)
```

## toConvert

```js
EITRI.utils.toConvert(123)
```

## unitMap

```js
EITRI.utils.unitMap()
```
