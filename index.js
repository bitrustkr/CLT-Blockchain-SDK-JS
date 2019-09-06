const RpcClient = require('node-json-rpc2');

const {Account, Network, Transaction} = require('./lib')

class IOB {
  
  constructor ({ip, port, user, password}) {
    this.Account = {}
    this.Network = {}
    this.Transaction = {}
    this.setProvider({ip, port, user, password})
    console.log(this.Account)
    console.log(this.Network)
    console.log(this.Transaction)
  }

  setProvider ({ip, port, user, password}) {
    // this.rpcClient = new RpcClient({
    //   protocol:'http',
    //   host:       ip, 
    //   user:       user || '',
    //   password:   password || '',
    //   port:       port,     
    //   method:     'POST'
    // });

    this.Account = new Account()
    this.Network = new Network()
    this.Transaction = new Transaction()
  }

  async getBalance (address) {
    return this.Account.getBalance(address)
  }

  async createAccount () {
    this.Account.newAccount()
  }
}
module.exports = IOB