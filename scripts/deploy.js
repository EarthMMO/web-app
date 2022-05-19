const { ethers } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("EventMinter");
  const contract = await contractFactory.deploy();

  await contract.deployed();
  console.log("Contract address:", "EventMinter", " ", contract.address);

  saveFrontendFiles("EventMinter", contract.address);
  return contract.address;
}

function saveFrontendFiles(contractName, contractAddress) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../src/abis";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/" + contractName + "_address.json",
    JSON.stringify({ address: contractAddress }, undefined, 2)
  );

  const artifact = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(
    contractsDir + "/" + contractName + "_abi.json",
    JSON.stringify(artifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
