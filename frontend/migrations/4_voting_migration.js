// eslint-disable-next-line no-undef
const Migrations = artifacts.require("Voting");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};