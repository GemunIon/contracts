import { expect } from "chai";
import { ethers } from "hardhat";
import { DEFAULT_ADMIN_ROLE } from "../../../constants";

export function shouldSetDefaultRoyalty(roles = false) {
  describe("setDefaultRoyalty", function () {
    it("should set token royalty", async function () {
      const royaltyNumerator = 5000;

      const tx = this.erc721Instance.setDefaultRoyalty(this.receiver.address, royaltyNumerator);
      await expect(tx)
        .to.emit(this.erc721Instance, "DefaultRoyaltyInfo")
        .withArgs(this.receiver.address, royaltyNumerator);
    });

    it("should fail: royalty fee will exceed salePrice", async function () {
      const royaltyNumerator = 11000;

      const tx = this.erc721Instance.setDefaultRoyalty(this.receiver.address, royaltyNumerator);
      await expect(tx).to.be.revertedWith("ERC2981: royalty fee will exceed salePrice");
    });

    it("should fail: invalid parameters", async function () {
      const royaltyNumerator = 5000;

      const tx = this.erc721Instance.setDefaultRoyalty(ethers.constants.AddressZero, royaltyNumerator);
      await expect(tx).to.be.revertedWith("ERC2981: invalid receiver");
    });

    it("should fail: not admin", async function () {
      const royaltyNumerator = 5000;

      const tx = this.erc721Instance.connect(this.receiver).setDefaultRoyalty(this.receiver.address, royaltyNumerator);
      await expect(tx).to.be.revertedWith(
        roles
          ? `AccessControl: account ${this.receiver.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`
          : "Ownable: caller is not the owner",
      );
    });
  });
}