//import
//main function
//calling of main function

// function deployFunc(hre) {
//     //hre = hardhat runtime environment
//     console.log("hi!")
//     hre.getNamedAccounts()
//     hre.deployments
// }
// module.exports.default = deployFunc

// module.exports = async (hre) => { // this line is exactly the same as lines 5-10
//     const { getNamedAccounts, deployments} = hre
//     //same as hre.getNamedAccounts and hre.deployments

const { networkConfig, developmentChains } = require("../helper-hardhat-config")
//const helperConfig = require("../helper-hardhat-config")
//const networkConfig = helperConfig.networkConfig
//18-19 same as 17
const { network } = require("hardhat")
const { verify } = require("../utils/verify.js")

module.exports = async ({ getNamedAccounts, deployments }) => {
    //this is the same as above - lines 13-15
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //if chainID is X use address Y or if chainID is Z use address C
    //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    // if the contract doesnt exist, we deploy a minimal version of it in our local testing
    //when going for localhsot or hardhat network we want to use a mock
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        /* address? */
        // put pricefeed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        //verify
        await verify(fundMe.address, args)
    }
    log("--------------------------------------")
}
module.exports.tags = ["all", "fundme"]
