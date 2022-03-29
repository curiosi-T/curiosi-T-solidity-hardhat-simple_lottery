const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

let Lottery;
let lottery;
let owner;
let addr1;
let addr2;
let addrs;
let provider;

beforeEach(async function () {
  Lottery = await ethers.getContractFactory("Lottery");
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

  lottery = await Lottery.deploy();
  await lottery.deployed();

  provider = waffle.provider;
});

describe("Deployment", function () {
  it("Should set the right manager", async function () {
    expect(await lottery.manager()).to.equal(owner.address);
  });
});

describe("Transactions", function () {
  it("Should return 0x00 for recent winner at beginning", async function () {
    expect(await lottery.recentWinner()).to.equal("0x0000000000000000000000000000000000000000");
  });

  it("should throw exception when player sends less than 0.1 ETH", async function () {
    await expect(lottery.connect(addr1).playLottery()).to.be.revertedWith("not enough ETH!");
  });

  it("should succeed when player sends more than 0.1 ETH", async function () {
    await lottery.connect(addr1).playLottery({ value: ethers.utils.parseEther("1.0") });

    var contractBalance = await provider.getBalance(lottery.address);
    console.log(`--> ${contractBalance}`);

    expect(contractBalance).to.equal(ethers.utils.parseEther("1.0"));
    expect(await lottery.players(0)).to.equal(addr1.address);
  });

  it("should pick a winner when more then 3 players", async function () {
    await lottery.connect(addr1).playLottery({ value: ethers.utils.parseEther("0.1") });
    await lottery.connect(addr1).playLottery({ value: ethers.utils.parseEther("0.1") });
    await lottery.connect(addr1).playLottery({ value: ethers.utils.parseEther("0.1") });

    await lottery.pickWinner();
    expect(await lottery.recentWinner()).to.equal(addr1.address);
  });
});
