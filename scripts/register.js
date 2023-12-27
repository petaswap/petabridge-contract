const { ethers } = require("hardhat")

const bridgeAddress = '0x0'
const ERC20HandlerAddress = '0x0'
const erc20Address = '0x0'

const RefResource  = "0x0"

const gasPrice = 50000000000
const gasLimit = 5000000



async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(
        "Deploying the contracts with the account:",
        await deployer.getAddress()
    );
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const resourceId = ethers.utils.hexZeroPad((RefResource + ethers.utils.hexlify(0).substr(2)), 32);

    const bridgeInstance = await ethers.getContractAt("Bridge", bridgeAddress);
    console.log(`Registering contract ${erc20Address} with resource ID ${resourceId} on handler ${ERC20HandlerAddress}`);
    const tx = await bridgeInstance.adminSetResource(ERC20HandlerAddress, resourceId, erc20Address, { gasPrice: gasPrice, gasLimit: gasLimit});
    await waitForTx(tx.hash)
    console.log(`Registering contract with hash ${tx.hash}`);  
}

const waitForTx = async (hash) => {
    const provider = ethers.provider
    console.log(`Waiting for tx: ${hash}...`)
    while (!await provider.getTransactionReceipt(hash)) {
        sleep(5000)
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
