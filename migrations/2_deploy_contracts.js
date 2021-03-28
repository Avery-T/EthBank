var bank = artifacts.require("../contracts/bank.sol");

module.exports = function(deployer) {
  deployer.deploy(bank);
};
