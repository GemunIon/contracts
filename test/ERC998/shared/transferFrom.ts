import { expect } from "chai";
import { ethers } from "hardhat";

export function shouldTransferFrom() {
  describe("transferFrom", function () {
    it("should fail: not an owner", async function () {
      await this.erc998Instance.mint(this.owner.address);
      const tx = this.erc998Instance.connect(this.receiver).transferFrom(this.owner.address, this.receiver.address, 0);

      await expect(tx).to.be.revertedWith("ERC721: transfer caller is not owner nor approved");
    });

    it("should fail: zero addr", async function () {
      await this.erc998Instance.mint(this.owner.address);
      const tx = this.erc998Instance.transferFrom(this.owner.address, ethers.constants.AddressZero, 0);

      await expect(tx).to.be.revertedWith(`ERC721: transfer to the zero address`);
    });

    it("should transfer own tokens to wallet", async function () {
      await this.erc998Instance.mint(this.owner.address);
      const tx = this.erc998Instance.transferFrom(this.owner.address, this.receiver.address, 0);

      await expect(tx).to.emit(this.erc998Instance, "Transfer").withArgs(this.owner.address, this.receiver.address, 0);

      const balanceOfOwner = await this.erc998Instance.balanceOf(this.owner.address);
      expect(balanceOfOwner).to.equal(0);

      const balanceOfReceiver = await this.erc998Instance.balanceOf(this.receiver.address);
      expect(balanceOfReceiver).to.equal(1);

      const item = await this.erc998Instance.tokenOfOwnerByIndex(this.receiver.address, 0);
      expect(item).to.equal(0); // 0 is nft index
    });

    it("should transfer approved tokens to wallet", async function () {
      await this.erc998Instance.mint(this.owner.address);
      await this.erc998Instance.approve(this.receiver.address, 0);

      const tx = this.erc998Instance.connect(this.receiver).transferFrom(this.owner.address, this.receiver.address, 0);

      await expect(tx).to.emit(this.erc998Instance, "Transfer").withArgs(this.owner.address, this.receiver.address, 0);

      const balanceOfOwner = await this.erc998Instance.balanceOf(this.owner.address);
      expect(balanceOfOwner).to.equal(0);

      const balanceOfReceiver = await this.erc998Instance.balanceOf(this.receiver.address);
      expect(balanceOfReceiver).to.equal(1);

      const item = await this.erc998Instance.tokenOfOwnerByIndex(this.receiver.address, 0);
      expect(item).to.equal(0); // 0 is nft index
    });
  });
}
