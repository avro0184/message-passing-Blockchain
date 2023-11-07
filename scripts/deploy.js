const {ethers} = require("hardhat");

async function main() {
 
  const Message = await ethers.getContractFactory("MessagePassing")
  const message = await Message.deploy()
  
  console.log("contract deploy address : " , message.address)


}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
