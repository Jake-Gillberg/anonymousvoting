// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  //TODO: Optimizer disabled by default in truffle v4 for security
  // purposes, but AnonymousVoting.sol takes >50mil gas to deploy without it
  // (https://github.com/trufflesuite/truffle/releases/tag/v4.0.0)
  solc: {
    optimizer: {
      enabled: true,
    }
  }
};
