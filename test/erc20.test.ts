import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MindToken } from "../typechain";

describe("ERC20 Token contract", function () {
  let token: ContractFactory;
  let instance: MindToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    token = await ethers.getContractFactory("MindToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    instance = (await upgrades.deployProxy(token, ["memoryOS main token", "MIND"])) as MindToken;
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await instance.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await instance.balanceOf(owner.address);
      expect(await instance.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await instance.transfer(addr1.address, 50);
      const addr1Balance = await instance.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await instance.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await instance.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await instance.balanceOf(owner.address);

      await expect(instance.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith(
        "ERC20: transfer amount exceeds balance",
      );

      expect(await instance.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await instance.balanceOf(owner.address);

      await instance.transfer(addr1.address, 100);

      await instance.transfer(addr2.address, 50);

      const finalOwnerBalance = await instance.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await instance.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await instance.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
