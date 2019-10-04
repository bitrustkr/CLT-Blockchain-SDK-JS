const RpcClient = require('node-json-rpc2');

const {Account, Network, Transaction, Block, Node, Validator} = require('./lib')
const utils = require('./utils')

class EITRI {
  static get utils() { return utils }

  constructor ({ip, port, user, password}) {
    this.accounts = {}
    this.network = {}
    this.transaction = {}
    this.block = {}
    this.node = {}

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
    this.block = new Block()
    this.node = new Node()
  }

}
// exports.SDK = SDK

module.exports = {
  EITRI: EITRI
}