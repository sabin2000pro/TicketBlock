// eslint-disable-next-line no-undef
const Migrations = artifacts.require("EventNftMarket");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};