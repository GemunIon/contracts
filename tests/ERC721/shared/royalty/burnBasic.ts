import { expect } from "chai";
import { ethers } from "hardhat";
import { tokenId } from "../../../constants";

export function shouldBurnBasic() {
  describe("burn (basic)", function () {
    it("should reset token royalty info", async function () {
      await this.erc721Instance.mint(this.owner.address, tokenId);

      await this.erc721Instance.setTokenRoyalty(tokenId, this.owner.address, 200);
      const [receiver, amount] = await this.erc721Instance.royaltyInfo(tokenId, 1e6);
      expect(receiver).to.equal(this.owner.address);
      expect(amount).to.equal(20000);

      const tx = await this.erc721Instance.burn(tokenId);
      await expect(tx)
        .to.emit(this.erc721Instance, "Transfer")
        .withArgs(this.owner.address, ethers.constants.AddressZero, tokenId);

      const [receiver2, amount2] = await this.erc721Instance.royaltyInfo(tokenId, 1e6);
      expect(receiver2).to.equal(this.owner.address);
      expect(amount2).to.equal(10000);
    });
  });
}