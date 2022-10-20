// eslint-disable-next-line no-undef
const Migrations = artifacts.require("Auction");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};