"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RpcClient = require('node-json-rpc2');

var _require = require('./lib'),
    Account = _require.Account,
    Network = _require.Network,
    Transaction = _require.Transaction,
    Block = _require.Block,
    Node = _require.Node;

var IOB =
/*#__PURE__*/
function () {
  function IOB(_ref) {
    var ip = _ref.ip,
        port = _ref.port,
        user = _ref.user,
        password = _ref.password;

    _classCallCheck(this, IOB);

    this.accounts = {};
    this.network = {};
    this.transaction = {};
    this.block = {};
    this.node = {};
    this.setProvider({
      ip: ip,
      port: port,
      user: user,
      password: password
    });
  }

  _createClass(IOB, [{
    key: "setProvider",
    value: function setProvider(_ref2) {
      var ip = _ref2.ip,
          port = _ref2.port,
          user = _ref2.user,
          password = _ref2.password;
      // this.rpcClient = new RpcClient({
      //   protocol:'http',
      //   host:       ip, 
      //   user:       user || '',
      //   password:   password || '',
      //   port:       port,     
      //   method:     'POST'
      // });
      this.accounts = new Account();
      this.network = new Network();
      this.transaction = new Transaction();
      this.block = new Block();
      this.node = new Node();
    }
  }]);

  return IOB;
}();

exports.SDK = IOB; // module.exports = {
//   SDK: IOB
// }