require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17", // Specify the compiler version
        settings: {
          viaIR: true, // Enable the IR-based compiler
          optimizer: {
            enabled: true, // Enable the optimizer
            runs: 9999999, // Set the number of optimization runs
          },
          metadata: {
            bytecodeHash: "none", // Set metadata bytecode hash option
          },
          outputSelection: {
            "*": {
              "*": [
                "evm.bytecode",
                "evm.deployedBytecode",
                "devdoc",
                "userdoc",
                "metadata",
                "abi",
              ],
            },
          },
          libraries: {}, // Set libraries option (if applicable)
        },
      },
      // Add more versions as needed
    ],
  },
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Uncomment and configure other networks as needed
    // sepolia: {
    //   chainId: 11155111,
    //   url: process.env.PROVIDER_URL,
    //   accounts: [process.env.PRIVATE_KEY],
    // },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
  },
};
