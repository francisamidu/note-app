async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Note = await ethers.getContractFactory("Note");
  const note = await Note.deploy();
  console.log(note);
  await note.deployed();

  console.log(`Contract address: ${note.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
