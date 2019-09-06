const RpcClient = require('node-json-rpc2');

const {Account, Network, Transaction} = require('./lib')

class IOB {
  
  constructor ({ip, port, user, password}) {
    this.accounts = {}
    this.network = {}
    this.transaction = {}
    this.setProvider({ip, port, user, password})
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

    this.accounts = new Account()
    this.network = new Network()
    this.transaction = new Transaction()
  }

}
module.exports = IOB