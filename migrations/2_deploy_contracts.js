var LCSToken = artifacts.require("LCSToken");
var RSTToken = artifacts.require("RSTToken");
var ERC20Adapter = artifacts.require("ERC20Adapter");
var TokenContainer = artifacts.require("TokenContainer");
var TokenPool = artifacts.require("TokenPool");

module.exports = function(deployer) {
  deployer.deploy(RSTToken).then(function() {
    return deployer.deploy(TokenContainer, "Luggage Crowdsurance Smart Token", "LCST", {gas:6400000}).then(function() {
      return deployer.deploy(TokenPool, TokenContainer.address, {gas:6400000}).then(function() {
        return deployer.deploy(LCSToken, RSTToken.address, TokenPool.address, {gas:7000000}).then(function() {
          return deployer.deploy(ERC20Adapter, TokenContainer.address, LCSToken.address, "ERC20 Luggage Crowdsurance Smart Token", "LCST20", 10);
        });
      });
    });
  }).catch(function(err) {console.log(err);});
};
