import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

import { tokenId } from "@gemunion/contracts-constants";

export function shouldTransferFrom(factory: () => Promise<Contract>, options: Record<string, any> = {}) {
  describe("transferFrom", function () {
    it("should fail: not an owner", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(owner.address, options.batchSize + tokenId);
      const tx = contractInstance
        .connect(receiver)
        .transferFrom(owner.address, receiver.address, options.batchSize + tokenId);

      await expect(tx).to.be.revertedWith(`ERC721: caller is not token owner or approved`);
    });

    it("should fail: zero addr", async function () {
      const [owner] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(owner.address, options.batchSize + tokenId);
      const tx = contractInstance.transferFrom(
        owner.address,
        ethers.constants.AddressZero,
        options.batchSize + tokenId,
      );

      await expect(tx).to.be.revertedWith(`ERC721: transfer to the zero address`);
    });

    it("should transfer own tokens to wallet", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(owner.address, options.batchSize + tokenId);
      const tx = contractInstance.transferFrom(owner.address, receiver.address, options.batchSize + tokenId);

      await expect(tx)
        .to.emit(contractInstance, "Transfer")
        .withArgs(owner.address, receiver.address, options.batchSize + tokenId);

      const balanceOfOwner = await contractInstance.balanceOf(owner.address);
      expect(balanceOfOwner).to.equal(options.batchSize);

      const balanceOfReceiver = await contractInstance.balanceOf(receiver.address);
      expect(balanceOfReceiver).to.equal(1);
    });

    it("should transfer approved tokens to wallet", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(owner.address, options.batchSize + tokenId);
      await contractInstance.approve(receiver.address, options.batchSize + tokenId);

      const tx = contractInstance
        .connect(receiver)
        .transferFrom(owner.address, receiver.address, options.batchSize + tokenId);

      await expect(tx)
        .to.emit(contractInstance, "Transfer")
        .withArgs(owner.address, receiver.address, options.batchSize + tokenId);

      const balanceOfOwner = await contractInstance.balanceOf(owner.address);
      expect(balanceOfOwner).to.equal(options.batchSize);

      const balanceOfReceiver = await contractInstance.balanceOf(receiver.address);
      expect(balanceOfReceiver).to.equal(1);
    });
  });
}
