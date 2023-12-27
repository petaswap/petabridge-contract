require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    compilers: [
          {version: "0.8.11"},
      ]
  },
  defaultNetwork: "dev",
  networks: {
    mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      chainId: 80001,
      accounts: ['0x0']
    }
  }
};
