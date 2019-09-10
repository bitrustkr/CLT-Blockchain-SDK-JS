"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var crypto = require('crypto');

var sha256 = require('sha256'); // const ed25519 = require('ed25519');


var ed25519 = require('supercop');

var bip39 = require("bip39");

var CryptoJS = require("crypto-js");

var validator = require('../../utils/validator');

var Account =
/*#__PURE__*/
function () {
  function Account() {
    _classCallCheck(this, Account);
  }

  _createClass(Account, [{
    key: "getAccount",
    value: function getAccount(address) {
      var id = "dontcare";
      var method = "account";
      return {
        address: "5860EA6D8D8BD810812D43D1F44157EEB89F5F57",
        nonce: "1234",
        pub_key: "A33519E2814109F0EF3189971E6C18A2BA05EDD91BB328DEBA2B930B8160656A",
        balance: "999999999999990",
        stake: "10",
        unstaking: "0",
        reward: "10671",
        un_freezing_reward: "0"
      };
    }
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(mnemonic) {
        var _ref, seed, keyPair, prvKey, pubKey, address;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getSeed(mnemonic);

              case 2:
                _ref = _context.sent;
                seed = _ref.seed;
                seed = Buffer.from(seed, "hex");
                seed = seed.slice(0, 32);
                _context.next = 8;
                return ed25519.createKeyPair(seed);

              case 8:
                keyPair = _context.sent;
                prvKey = keyPair.secretKey.toString("hex");
                pubKey = keyPair.publicKey.toString("hex");
                address = sha256(pubKey);
                return _context.abrupt("return", {
                  // seed: seed.toString("hex"),
                  prvKey: prvKey,
                  pubKey: pubKey,
                  address: address,
                  encrypt: this.encrypt
                });

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "encrypt",
    value: function encrypt(prvKey, password) {
      var salt = CryptoJS.lib.WordArray.random(256 / 8);
      var iv = CryptoJS.lib.WordArray.random(256 / 32);
      var encKey = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32
      });
      var plainText = CryptoJS.enc.Hex.parse(prvKey); // console.log("plainText", plainText.toString());

      var cipherText = CryptoJS.AES.encrypt(plainText, encKey, {
        iv: iv
      }); // console.log("cipherText", cipherText.ciphertext.toString());

      return {
        enctypted: _objectSpread({}, cipherText, {
          salt: salt,
          iv: iv
        }) //.ciphertext.toString()

      };
    }
  }, {
    key: "decrypt",
    value: function decrypt(encrypted, password) {
      var cipherText2 = encrypted.ciphertext; // load the 'encrypted.ciphertext'

      var salt2 = encrypted.salt; // load the 'salt'

      var iv2 = encrypted.iv; // load the 'initial vector'
      // derive the 'encKey2' from the 'salt2' and 'user's password'

      var encKey2 = CryptoJS.PBKDF2(password, salt2, {
        keySize: 256 / 32
      }); // console.log("cipherText2", cipherText2.toString());

      var plainText2 = CryptoJS.AES.decrypt({
        ciphertext: cipherText2
      }, encKey2, {
        iv: iv2
      }); // console.log("plainText2", plainText2.toString());

      return plainText2.toString();
    }
  }, {
    key: "signature",
    value: function signature(prvKey) {
      var message = 'Hi Bob, How are your pet monkeys doing? What were their names again? -Alice';
      var signature = ed25519.Sign(new Buffer(message, 'utf8'), this.privateKeyToPublicKey(prvKey), prvKey); //Using Sign(Buffer, Keypair object)

      return {
        signature: signature
      };
    }
  }, {
    key: "getMnemonic",
    value: function getMnemonic() {
      return bip39.generateMnemonic();
    }
  }, {
    key: "privateKeyToPublicKey",
    value: function privateKeyToPublicKey(prvKey) {
      return prvKey.slice(64, 128);
    }
  }, {
    key: "privateKeyToAccount",
    value: function privateKeyToAccount(prvKey) {
      var pubKey = prvKey.slice(64, 128);
      var address = sha256(pubKey);
      return {
        prvKey: prvKey,
        pubKey: pubKey,
        address: address,
        encrypt: this.encrypt
      };
    }
  }, {
    key: "getSeed",
    value: function () {
      var _getSeed = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(mnemonic) {
        var seed;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!mnemonic) mnemonic = this.getMnemonic();
                _context2.next = 3;
                return bip39.mnemonicToSeed(mnemonic);

              case 3:
                seed = _context2.sent;
                return _context2.abrupt("return", {
                  mnemonic: mnemonic,
                  seed: seed // rootKey

                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSeed(_x2) {
        return _getSeed.apply(this, arguments);
      }

      return getSeed;
    }()
  }]);

  return Account;
}();

exports.Account = Account;