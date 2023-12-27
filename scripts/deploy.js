const relayer = ['0x0']
const expired = 248
const relayerThreshold = 1
const domainID  = 2
const FeePercent  = 10

const gasPrice = 50000000000
const gasLimit = 5000000

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());
  const _Bridge = await ethers.getContractFactory("Bridge");
  let Bridge = await _Bridge.deploy(domainID,relayer,relayerThreshold,expired,
    { gasPrice: gasPrice, gasLimit: gasLimit}
  )
  await Bridge.deployed();
  const bridgeAddress = Bridge.address
  console.log("Bridge address:", bridgeAddress);

  const _FeeHandler = await ethers.getContractFactory("ERC20Handler");
  const FeeHandler = await _FeeHandler.deploy(bridgeAddress,FeePercent, { gasPrice: gasPrice, gasLimit: gasLimit});
  await FeeHandler.deployed();
  const ERC20HandlerAddress = FeeHandler.address
  console.log("ERC20 handler addresss:", ERC20HandlerAddress);
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
