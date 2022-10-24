// eslint-disable-next-line no-undef
const Migrations = artifacts.require("Campaign");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};