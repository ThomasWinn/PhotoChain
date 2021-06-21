// FILE: 
// Puts smart contracts on the smart chain
// migrate from computer to a blockchain

const PhotoChain = artifacts.require("PhotoChain");

module.exports = function(deployer) {
  deployer.deploy(PhotoChain);
};