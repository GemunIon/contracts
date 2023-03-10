import { expect } from "chai";
import { ethers } from "hardhat";
import { constants, Contract } from "ethers";

import { amount, tokenId } from "@gemunion/contracts-constants";

export function shouldBurn(factory: () => Promise<Contract>) {
  describe("burn", function () {
    it("should burn own token", async function () {
      const [owner] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(owner.address, tokenId, amount, "0x");
      const tx = contractInstance.burn(owner.address, tokenId, amount);

      await expect(tx)
        .to.emit(contractInstance, "TransferSingle")
        .withArgs(owner.address, owner.address, constants.AddressZero, tokenId, amount);

      const balanceOfOwner = await contractInstance.balanceOf(owner.address, tokenId);
      expect(balanceOfOwner).to.equal(0);
    });

    it("should burn approved token", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(owner.address, tokenId, amount, "0x");
      await contractInstance.setApprovalForAll(receiver.address, true);

      const tx = contractInstance.connect(receiver).burn(owner.address, tokenId, amount);
      await expect(tx)
        .to.emit(contractInstance, "TransferSingle")
        .withArgs(receiver.address, owner.address, constants.AddressZero, tokenId, amount);

      const balanceOfOwner = await contractInstance.balanceOf(owner.address, tokenId);
      expect(balanceOfOwner).to.equal(0);
    });

    it("should fail: not an owner", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(owner.address, tokenId, amount, "0x");
      const tx = contractInstance.connect(receiver).burn(owner.address, tokenId, amount);

      await expect(tx).to.be.revertedWith("ERC1155: caller is not token owner or approved");
    });

    it("should fail: burn amount exceeds balance", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(receiver.address, tokenId, amount, "0x");

      const tx = contractInstance.burn(owner.address, tokenId, amount);
      await expect(tx).to.be.revertedWith("ERC1155: burn amount exceeds balance");
    });
  });
}
