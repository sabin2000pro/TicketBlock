/* eslint-disable no-undef */
const EventNftMarket = artifacts.require("EventNftMarket");

module.exports = function(deployer) {
  deployer.deploy(EventNftMarket);
};
