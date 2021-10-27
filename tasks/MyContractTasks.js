task("read-number", "Reads the number")
  .addParam("contract", "The contract")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract
    const MyFirstContract = await ethers.getContractFactory("MyFirstContract")

    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const myFirstContract = await new ethers.Contract(contractAddr, MyFirstContract.interface, signer)

    let result = BigInt(await myFirstContract.getNumber()).toString()

    console.log("stored value is: " + result);
  });

  task("write-number", "Writes the number")
  .addParam("contract", "The contract")
  .addParam("value", "The value")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract
    const value = taskArgs.value

    const MyFirstContract = await ethers.getContractFactory("MyFirstContract")

    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const myFirstContract = await new ethers.Contract(contractAddr, MyFirstContract.interface, signer)

    let result = await myFirstContract.setNumber(value)

    console.log("value set: " + value);
  });

module.exports = {};