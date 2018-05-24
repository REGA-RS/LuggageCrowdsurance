var LCSToken = artifacts.require("LCSToken");
var RSTToken = artifacts.require("RSTToken");
var ERC20Adapter = artifacts.require("ERC20Adapter");

module.exports = function(deployer) {
  deployer.deploy(RSTToken).then(function() {
    return deployer.deploy(LCSToken, RSTToken.address, {gas: 9500000}).then(function() {
      return deployer.deploy(ERC20Adapter, LCSToken.address, "LCS ERC20 Token","LSC-20",10);
    });
  }).catch(function(err) {console.log(err);});
};
