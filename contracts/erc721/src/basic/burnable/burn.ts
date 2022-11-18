import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

import { tokenId } from "@gemunion/contracts-constants";

export function shouldERC721Burnable(factory: () => Promise<Contract>) {
  describe("burn", function () {
    it("should fail: not an owner", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(owner.address, tokenId);
      const tx = contractInstance.connect(receiver).burn(tokenId);

      await expect(tx).to.be.revertedWith(`ERC721: caller is not token owner or approved`);
    });

    it("should burn own token", async function () {
      const [owner] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(owner.address, tokenId);
      const tx = await contractInstance.burn(tokenId);

      await expect(tx)
        .to.emit(contractInstance, "Transfer")
        .withArgs(owner.address, ethers.constants.AddressZero, tokenId);

      const balanceOfOwner = await contractInstance.balanceOf(owner.address);
      expect(balanceOfOwner).to.equal(0);
    });

    it("should burn approved token", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const contractInstance = await factory();

      await contractInstance.mint(owner.address, tokenId);
      await contractInstance.approve(receiver.address, tokenId);

      const tx = await contractInstance.burn(tokenId);

      await expect(tx)
        .to.emit(contractInstance, "Transfer")
        .withArgs(owner.address, ethers.constants.AddressZero, tokenId);

      const balanceOfOwner = await contractInstance.balanceOf(owner.address);
      expect(balanceOfOwner).to.equal(0);
    });
  });
}