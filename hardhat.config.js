require("dotenv").config("");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-change-network");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-contract-sizer");
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
    ],
    overrides: {
      "contracts/1_MyToken20.sol": {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: false,
            runs: 0,
          },
        },
      },
      "contracts/2_MyToken20.sol": {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      "contracts/3_MyToken20.sol": {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 50000,
          },
        },
      },
      "contracts/4_MyToken20.sol": {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000000,
          },
        },
      },
      "contracts/5_MyToken20.sol": {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 788, // coarse-tune
          },
        },
      },
      "contracts/6_MyToken20.sol": {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 684, // fine-tune
          },
        },
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    ropsten: {
      url: process.env.ROPSTEN_URL !== undefined ? process.env.ROPSTEN_URL : "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL !== undefined ? process.env.RINKEBY_URL : "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mainnet: {
      url: process.env.MAINNET_URL !== undefined ? process.env.MAINNET_URL : "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "usd",
    gasPrice: 70,
    // coinmarketcap: process.env.COINMARKET_API_KEY,
  },
  etherscan: {
    apiKey:
      process.env.ETHERSCAN_API_KEY !== undefined
        ? process.env.ETHERSCAN_API_KEY
        : "",
  },
  mocha: {
    timeout: 200000,
    slow: "0",
  },
  contractSizer: {
    except: ["ERC20"],
  },
};
