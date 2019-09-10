"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Block =
/*#__PURE__*/
function () {
  function Block() {
    _classCallCheck(this, Block);
  }

  _createClass(Block, [{
    key: "getLastBlock",
    value: function getLastBlock() {
      var id = "dontcare";
      var method = "block_last";
      return {
        block: {
          block_id: {
            hash: "DF9D3EE29714224D6059A2B4A78C229FC0BB06E73B4DE9EB675AB52D044239C4",
            parts: {
              total: "1",
              hash: "1F4A3B0367008252A725B28CD2B4CF9F8F5BA7C94EFFF351381DEECD235C6561"
            }
          },
          header: {
            version: {
              block: "10",
              app: "1"
            },
            chain_id: "logichain-dev",
            height: "11603",
            time: "2019-08-22T01:47:01.9879485Z",
            num_txs: "1",
            total_txs: "1",
            last_block_id: {
              hash: "D20617735CE97ADED7DE88AA50A1D60F183729BF3A926B3F073DEFCF87F3D993",
              parts: {
                total: "1",
                hash: "F2971BE97176B4782675D1A9AC331A76BB381100C0EBEAB3073D79ECDCED7DAE"
              }
            },
            last_commit_hash: "1FC65E838A575523E8447F971B90110E2C740629FD450A0E639488930E40D6F0",
            data_hash: "A010956BD83B8BE563CEF6B1B466C8F6E4BA20966D61631B7129A03E6274DD75",
            validators_hash: "38237AA5AFE05DD628F68D4BE719A0EAC031D4F2561CED086C305162D58C91EC",
            next_validators_hash: "38237AA5AFE05DD628F68D4BE719A0EAC031D4F2561CED086C305162D58C91EC",
            consensus_hash: "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
            app_hash: "C77EE3A4C2E781DECC93BA904B55BF3574003E074AA77341677DFD814C52F34A",
            last_results_hash: "",
            evidence_hash: "",
            proposer_address: "5860EA6D8D8BD810812D43D1F44157EEB89F5F57"
          }
        },
        txs: ["1FF50FD83EA636979E7EB1DF6CC0399F22358950914A8D69D0DB13775F6923B5"]
      };
    }
  }, {
    key: "getBlock",
    value: function getBlock(number) {
      var id = "dontcare";
      var method = "block";
      return {
        block: {
          block_id: {
            hash: "DF9D3EE29714224D6059A2B4A78C229FC0BB06E73B4DE9EB675AB52D044239C4",
            parts: {
              total: "1",
              hash: "1F4A3B0367008252A725B28CD2B4CF9F8F5BA7C94EFFF351381DEECD235C6561"
            }
          },
          header: {
            version: {
              block: "10",
              app: "1"
            },
            chain_id: "logichain-dev",
            height: "11603",
            time: "2019-08-22T01:47:01.9879485Z",
            num_txs: "1",
            total_txs: "1",
            last_block_id: {
              hash: "D20617735CE97ADED7DE88AA50A1D60F183729BF3A926B3F073DEFCF87F3D993",
              parts: {
                total: "1",
                hash: "F2971BE97176B4782675D1A9AC331A76BB381100C0EBEAB3073D79ECDCED7DAE"
              }
            },
            last_commit_hash: "1FC65E838A575523E8447F971B90110E2C740629FD450A0E639488930E40D6F0",
            data_hash: "A010956BD83B8BE563CEF6B1B466C8F6E4BA20966D61631B7129A03E6274DD75",
            validators_hash: "38237AA5AFE05DD628F68D4BE719A0EAC031D4F2561CED086C305162D58C91EC",
            next_validators_hash: "38237AA5AFE05DD628F68D4BE719A0EAC031D4F2561CED086C305162D58C91EC",
            consensus_hash: "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
            app_hash: "C77EE3A4C2E781DECC93BA904B55BF3574003E074AA77341677DFD814C52F34A",
            last_results_hash: "",
            evidence_hash: "",
            proposer_address: "5860EA6D8D8BD810812D43D1F44157EEB89F5F57"
          }
        },
        txs: ["1FF50FD83EA636979E7EB1DF6CC0399F22358950914A8D69D0DB13775F6923B5"]
      };
    }
  }]);

  return Block;
}();

exports.Block = Block;