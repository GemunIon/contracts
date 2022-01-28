import { expect } from "chai";
import { ethers } from "hardhat";

import { MINTER_ROLE } from "../../constants";

export function shouldMint() {
  describe("mint", function () {
    it("should fail for wrong role", async function () {
      const tx = this.erc721Instance.connect(this.receiver).mint(this.receiver.address, 0);
      await expect(tx).to.be.revertedWith(
        `AccessControl: account ${this.receiver.address.toLowerCase()} is missing role ${MINTER_ROLE}`,
      );
    });

    it("should mint to wallet", async function () {
      const tx = this.erc721Instance.mint(this.owner.address, 0);
      await expect(tx)
        .to.emit(this.erc721Instance, "Transfer")
        .withArgs(ethers.constants.AddressZero, this.owner.address, 0);

      const balance = await this.erc721Instance.balanceOf(this.owner.address);
      expect(balance).to.equal(1);
    });

    it("should mint to non receiver", async function () {
      const tx = this.erc721Instance.mint(this.erc721NonReceiverInstance.address, 0);
      await expect(tx)
        .to.emit(this.erc721Instance, "Transfer")
        .withArgs(ethers.constants.AddressZero, this.erc721NonReceiverInstance.address, 0);
    });

    it("should mint to receiver", async function () {
      const tx = this.erc721Instance.mint(this.erc721ReceiverInstance.address, 0);
      await expect(tx)
        .to.emit(this.erc721Instance, "Transfer")
        .withArgs(ethers.constants.AddressZero, this.erc721ReceiverInstance.address, 0);

      const balance = await this.erc721Instance.balanceOf(this.erc721ReceiverInstance.address);
      expect(balance).to.equal(1);
    });
  });
}