const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("IcuryErc20", function () {
  let token;
  let deployer;
  let otherAccount;

  beforeEach(async function () {
    const [signer1, signer2] = await ethers.getSigners();
    deployer = signer1;
    otherAccount = signer2;

    const IcuryErc20 = await ethers.getContractFactory("IcuryErc20"); // Replace with your contract name
    token = await IcuryErc20.deploy();
    await token.waitForDeployment();
  });

  describe("Mint", function () {
    it("Should mint tokens and increase total supply", async function () {
      const initialSupply = await token.totalSupply();
    
  

      const mintAmount = 100;

      await expect(token.mint(deployer.address, mintAmount)).to.not.be.reverted;

      const newSupply = await token.totalSupply();
  
      expect(Number(newSupply)).to.equal(Number(initialSupply) + 100);
    });

    it("Should revert if non-owner tries to mint", async function () {
      const mintAmount = 100;
      await expect(token.connect(otherAccount).mint(deployer.address, mintAmount)).to.be.reverted;
    });
  });

  describe("Burn", function () {
    it("Should burn tokens and decrease balance and total supply", async function () {
      const initialSupply = await token.totalSupply();
      const burnAmount = 50;

      // Mint some tokens first
      await token.mint(deployer.address, burnAmount);

      const initialBalance = await token.balanceOf(deployer.address);
      await expect(token.burn(burnAmount)).to.not.be.reverted;

      const newSupply = await token.totalSupply();
      const newBalance = await token.balanceOf(deployer.address);

      expect(Number(newSupply)).to.be.equal(Number(initialSupply)-burnAmount);
      expect(Number(newBalance)).to.be.equal(Number(initialBalance)-burnAmount);
    });
  });

  describe("Transfer", function () {
    it("Should transfer tokens and update balances", async function () {
      const transferAmount = 25;

      // Mint some tokens first
      await token.mint(deployer.address, transferAmount);

      const initialSenderBalance = await token.balanceOf(deployer.address);
      const initialRecipientBalance = await token.balanceOf(otherAccount.address);

      await expect(token.transfer(otherAccount.address, transferAmount)).to.not.be.reverted;

      const newSenderBalance = await token.balanceOf(deployer.address);
      const newRecipientBalance = await token.balanceOf(otherAccount.address);

      expect(Number(newSenderBalance)).to.be.equal(Number(initialSenderBalance)-transferAmount);
      expect(Number(newRecipientBalance)).to.be.equal(Number(initialRecipientBalance)+transferAmount);
    });
  });
});