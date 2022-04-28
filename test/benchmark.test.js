const { ethers } = require("hardhat");

const benchmark = (artifact) => {
  describe(`benchmarking ${artifact} contract`, function () {
    let accounts;
    let token;
    const ROUND = 1000;

    before(async () => {
      const contract = await ethers.getContractFactory(artifact);
      accounts = await ethers.getSigners();
      token = await contract.deploy();
      await token.deployed();
    });

    describe(`${artifact}`, function () {
      // approve 1k
      it("try approve ", async function () {
        let i = 0;
        while (i < ROUND) {
          await token.connect(accounts[0]).approve(accounts[1].address, 1);
          i++;
        }
      });

      // increaseAllowance 1k
      it("try increaseAllowance ", async function () {
        let i = 0;
        while (i < ROUND) {
          await token
            .connect(accounts[0])
            .increaseAllowance(accounts[1].address, 2);
          i++;
        }
      });

      // increaseAllowance 1k
      it("try decreaseAllowance ", async function () {
        let i = 0;
        while (i < ROUND) {
          await token
            .connect(accounts[0])
            .decreaseAllowance(accounts[1].address, 1);
          i++;
        }
      });

      // transfer 1k
      it("try transfer ", async function () {
        let i = 0;
        while (i < ROUND) {
          await token.connect(accounts[0]).transfer(accounts[1].address, 1);
          i++;
        }
      });

      // transferFrom 1k
      it("try transferFrom ", async function () {
        let i = 0;
        while (i < ROUND) {
          await token
            .connect(accounts[1])
            .transferFrom(accounts[0].address, accounts[2].address, 1);
          i++;
        }
      });
    });
  });
};

module.exports = { benchmark };
