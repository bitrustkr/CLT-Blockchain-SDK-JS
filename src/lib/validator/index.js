class Validator{
  constructor() {
    
  }

  getValidators () {
    const id = "dontcare"
    const method = "validators"
    return {
      block_height: "13967",
      validators: [
        {
          address: "5860EA6D8D8BD810812D43D1F44157EEB89F5F57",
          pub_key: "A33519E2814109F0EF3189971E6C18A2BA05EDD91BB328DEBA2B930B8160656A",
          voting_power: "10",
          proposer_priority: "0"
        }
      ]
    }
  }
}

exports.Validator = Validator;
