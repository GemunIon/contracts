import { expect } from "chai";
import { ethers } from "hardhat";
import { deployErc721Base } from "../../../../ERC721/shared/fixtures";
import { whiteListChildInterfaceId } from "../../../../constants";

export function shouldChildExists(name: string) {
  describe("childExists", function () {
    it("should check if child exists", async function () {
      const [owner] = await ethers.getSigners();
      const { contractInstance: erc721Instance } = await deployErc721Base(name);
      const { contractInstance: erc721InstanceMock } = await deployErc721Base("ERC721ABCE");

      const supportsWhiteListChild = await erc721Instance.supportsInterface(whiteListChildInterfaceId);
      if (supportsWhiteListChild) {
        await erc721Instance.whiteListChild(erc721InstanceMock.address, 0);
      }

      await erc721InstanceMock.mint(owner.address);
      await erc721Instance.mint(owner.address); // this is edge case
      await erc721Instance.mint(owner.address);

      const tx1 = erc721InstanceMock["safeTransferFrom(address,address,uint256,bytes)"](
        owner.address,
        erc721Instance.address,
        0, // erc721 tokenId
        "0x0000000000000000000000000000000000000000000000000000000000000001", // erc998 tokenId
      );
      await expect(tx1).to.not.be.reverted;

      const isExist1 = await erc721Instance.childExists(erc721InstanceMock.address, 0);
      expect(isExist1).to.equal(true);

      const isExist2 = await erc721Instance.childExists(erc721InstanceMock.address, 1);
      expect(isExist2).to.equal(false);
    });
  });
}
