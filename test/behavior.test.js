const { expect } = require("chai");
const { ethers } = require("hardhat");

const behavior = (artifact) => {
  describe(`benchmarking ${artifact} contract`, function () {
    let accounts;
    let token;
    const amount = ethers.utils.parseEther("1");

    before(async () => {
      const contract = await ethers.getContractFactory(artifact);
      token = await contract.deploy();
      accounts = await ethers.getSigners();
      await token.deployed();
    });

    it("Assigns initial balance", async function () {
      const totalSupply = await token.totalSupply();
      expect(await token.balanceOf(accounts[0].address)).to.equal(totalSupply);
    });

    it("Do not have permission to minting token", async function () {
      const wallet = token.connect(accounts[2]);
      await expect(wallet.mint(accounts[2].address, amount)).to.be.reverted;
    });

    it("Do not have permission to burning token", async function () {
      const wallet = token.connect(accounts[2]);
      await expect(wallet.burn(accounts[2].address, amount)).to.be.reverted;
    });

    it("Transfer adds amount to destination account", async function () {
      await token.transfer(accounts[1].address, amount);
      expect(await token.balanceOf(accounts[1].address)).to.equal(amount);
    });

    it("Transfer emits event", async () => {
      await expect(token.transfer(accounts[1].address, amount))
        .to.emit(token, "Transfer")
        .withArgs(accounts[0].address, accounts[1].address, amount);
    });

    it("Can not transfer above the amount", async () => {
      const wallet = token.connect(accounts[3]);
      await expect(wallet.transfer(accounts[1].address, 1)).to.be.reverted;
    });

    it("Can not transfer from empty account", async () => {
      const wallet = token.connect(accounts[3]);
      await expect(wallet.transfer(accounts[0].address, 1)).to.be.reverted;
    });

    it("Minting token", async function () {
      const beforeMint = await token.balanceOf(accounts[0].address);
      await token.mint(accounts[0].address, amount);
      const afterMint = await token.balanceOf(accounts[0].address);
      expect(afterMint).to.equal(beforeMint.add(amount));
    });

    it("Burning token", async function () {
      const beforeBurn = await token.balanceOf(accounts[0].address);
      await token.burn(accounts[0].address, amount);
      const afterBurn = await token.balanceOf(accounts[0].address);
      expect(afterBurn).to.equal(beforeBurn.sub(amount));
    });
  });
};

module.exports = { behavior };
