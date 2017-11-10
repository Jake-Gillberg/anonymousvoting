var AnonymousVoting = artifacts.require("./AnonymousVoting.sol");
var LocalCrypto = artifacts.require("./LocalCrypto.sol");

var AnonymousVoting_uint_gap = 86400; //86400 seconds in 24 hrs
var AnonymousVoting_address_charity = '0x379FB20786a3b704A7B010A0815044A7c3f6B363';

module.exports = function(deployer) {
  deployer.deploy([
    [AnonymousVoting,
      AnonymousVoting_uint_gap,
      AnonymousVoting_address_charity],
    LocalCrypto
  ]);
};
