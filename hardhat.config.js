require("@nomicfoundation/hardhat-toolbox")
require("hardhat-gas-reporter")
require("./tasks/block-number")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth.goerli"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "key"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || "key"

defaultNetwork: "hardhat",
    (module.exports = {
        defaultNetwork: "hardhat",
        networks: {
            hardhat: {},
            goerli: {
                url: GOERLI_RPC_URL,
                accounts: [PRIVATE_KEY],
                chainId: 5,
                blockConfirmations: 6,
            },
            localhost: {
                url: "http://127.0.0.1:8545/",
                chainId: 31337,
            },
            Polygon: {
                url: POLYGON_RPC_URL,
                chainId: 137,
            },
        },
        // solidity: "0.8.7",
        solidity: {
            compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
        },
        etherscan: {
            apiKey: ETHERSCAN_API_KEY,
        },
        gasReporter: {
            enabled: true,
            currency: "USD",
            outputFile: "gas-report.txt",
            noColors: true,
            // coinmarketcap: COINMARKETCAP_API_KEY,
            token: "MATIC",
        },
        namedAccounts: {
            deployer: {
                default: 0,
            },
        },
    })
