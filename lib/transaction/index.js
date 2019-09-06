class Transaction{
  constructor() {
    
  }

  getTransaction (hash) {
    const id = "dontcare"
    const method = "tx"
    return  {
      hash: "51D316323EC833DCEBF0BE0B05C4910FD3FBC2DD0990C027AD26351EE375317F",
      height: "11202",
      index: 0,
      nonce: "1",
      time: "2019-08-23T00:34:42.6221603Z",
      sender: "742B63B4AA18361B903E9F164E5B6873706239FB",
      receiver: "D99E8939133DEB1475E03AE4B21657E46C8E594F",
      gas: "12345",
      action: 1,
      amount: "1",
      pub_key: "5C8854D05667EDE74458EF3DE0DA3F50647AF4049EC258AA01EAD1E6E2C91945",
      sig: "BC86BC6BD1D0A0B7F8B33A0E3482AD9131FAD85DD080AC4A950BF78196FC17F5EF14BAF898796D3DEA67A5A71DF7946EC1B0A4876BCCE1E1578D20D4E7284109"
    }
  }

  sendTransaction (hash) {
    const id = "dontcare"
    const method = "tx_sync"

    return {
      "code": 0,
      "data": "",
      "log": "",
      "hash": "51D316323EC833DCEBF0BE0B05C4910FD3FBC2DD0990C027AD26351EE375317F"
    }
  }
}

module.exports = Transaction;
