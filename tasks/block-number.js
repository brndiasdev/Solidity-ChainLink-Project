const { task } = require("hardhat/config")

task("block-number", "Prints the Current Block Number").setAction(
    async (taskArgs, hre) => {
        //this is an anonymous function: no name after "async"
        // Same ass : const blockTask = async function() =>{}
        // Same ass : async function blockTask() {}
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current Block Number: ${blockNumber}`)
    }
)
