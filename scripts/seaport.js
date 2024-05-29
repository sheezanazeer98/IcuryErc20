const { ethers } = require("hardhat");

async function main() {
//   Get the contract factory
  const contract = await ethers.getContractFactory("Seaport");


  // Deploy the contract
  const deployedContract = await contract.deploy("0x00000000f9490004c11cef243f5400493c00ad63");

  await deployedContract.waitForDeployment();

  console.log("Seaport Contract deployed to", deployedContract.target);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
