const Note = artifacts.require("Note");

module.exports = (deployer) => {
  deployer.deploy(Note);
};
