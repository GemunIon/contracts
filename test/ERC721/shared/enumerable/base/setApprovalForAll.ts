import { expect } from "chai";
import { ethers } from "hardhat";

import { deployErc721Base } from "../../fixtures";

export function shouldSetApprovalForAll(name: string) {
  describe("setApprovalForAll", function () {
    it("should approve for all", async function () {
      const [owner, receiver] = await ethers.getSigners();
      const { contractInstance } = await deployErc721Base(name);

      await contractInstance.mint(owner.address);
      await contractInstance.mint(owner.address);

      const balanceOfOwner = await contractInstance.balanceOf(owner.address);
      expect(balanceOfOwner).to.equal(2);

      const tx1 = contractInstance.setApprovalForAll(receiver.address, true);
      await expect(tx1).to.not.be.reverted;

      const approved1 = await contractInstance.getApproved(0);
      expect(approved1).to.equal(ethers.constants.AddressZero);

      const isApproved1 = await contractInstance.isApprovedForAll(owner.address, receiver.address);
      expect(isApproved1).to.equal(true);

      const tx2 = contractInstance.setApprovalForAll(receiver.address, false);
      await expect(tx2).to.not.be.reverted;

      const approved3 = await contractInstance.getApproved(0);
      expect(approved3).to.equal(ethers.constants.AddressZero);

      const isApproved2 = await contractInstance.isApprovedForAll(owner.address, receiver.address);
      expect(isApproved2).to.equal(false);
    });
  });
}
