require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.11",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/f8a9c7c9680045a78680e5988d5edc3e`,
      accounts: [
        `a6bb3a858c0e6f259396f254f95d934015934fbc3f4e111f1800afeed3148a9c`,
      ],
    },
  },
};
