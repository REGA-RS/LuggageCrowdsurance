var Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  return deployer.deploy(Migrations, {gas:1000000});
};
