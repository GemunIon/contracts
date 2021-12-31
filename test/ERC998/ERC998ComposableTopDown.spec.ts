import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import {
  ERC998ComposableTopDownTest,
  ERC998GemunionNonReceiverTest,
  ERC998GemunionReceiverTest,
} from "../../typechain-types";
import {
  baseTokenURI,
  DEFAULT_ADMIN_ROLE,
  MINTER_ROLE,
  PAUSER_ROLE,
  tokenName,
  tokenSymbol,
  ZERO_ADDR,
} from "../constants";

describe("ERC998ComposableTopDown", function () {
  let nft: ContractFactory;
  let nftInstance: ERC998ComposableTopDownTest;
  let nftReceiver: ContractFactory;
  let nftReceiverInstance: ERC998GemunionReceiverTest;
  let nftNonReceiver: ContractFactory;
  let nftNonReceiverInstance: ERC998GemunionNonReceiverTest;
  let owner: SignerWithAddress;
  let receiver: SignerWithAddress;

  beforeEach(async function () {
    nft = await ethers.getContractFactory("ERC998ComposableTopDownTest");
    nftReceiver = await ethers.getContractFactory("ERC998GemunionReceiverTest");
    nftNonReceiver = await ethers.getContractFactory("ERC998GemunionNonReceiverTest");
    [owner, receiver] = await ethers.getSigners();

    nftInstance = (await nft.deploy(tokenName, tokenSymbol, baseTokenURI)) as ERC998ComposableTopDownTest;
    nftReceiverInstance = (await nftReceiver.deploy(tokenName, tokenSymbol)) as ERC998GemunionReceiverTest;
    nftNonReceiverInstance = (await nftNonReceiver.deploy(tokenName, tokenSymbol)) as ERC998GemunionNonReceiverTest;
  });

  describe("constructor", function () {
    it("Should set the right roles to deployer", async function () {
      const isAdmin = await nftInstance.hasRole(DEFAULT_ADMIN_ROLE, owner.address);
      expect(isAdmin).to.equal(true);
      const isMinter = await nftInstance.hasRole(MINTER_ROLE, owner.address);
      expect(isMinter).to.equal(true);
      const isPauser = await nftInstance.hasRole(PAUSER_ROLE, owner.address);
      expect(isPauser).to.equal(true);
    });
  });

  describe("safeMint", function () {
    it("should fail for wrong role", async function () {
      const tx = nftInstance.connect(receiver).safeMint(receiver.address);
      await expect(tx).to.be.revertedWith(
        `AccessControl: account ${receiver.address.toLowerCase()} is missing role ${MINTER_ROLE}`,
      );
    });

    it("should mint to wallet", async function () {
      const tx = nftInstance.safeMint(owner.address);
      await expect(tx).to.emit(nftInstance, "Transfer").withArgs(ZERO_ADDR, owner.address, 0);

      const balance = await nftInstance.balanceOf(owner.address);
      expect(balance).to.equal(1);
    });

    it("should fail to mint to non receiver", async function () {
      const tx = nftInstance.safeMint(nftNonReceiverInstance.address);
      await expect(tx).to.be.revertedWith(`ERC721: transfer to non ERC721Receiver implementer`);
    });

    it("should mint to receiver", async function () {
      const tx = nftInstance.safeMint(nftReceiverInstance.address);
      await expect(tx).to.emit(nftInstance, "Transfer").withArgs(ZERO_ADDR, nftReceiverInstance.address, 0);

      const balance = await nftInstance.balanceOf(nftReceiverInstance.address);
      expect(balance).to.equal(1);
    });
  });

  describe("balanceOf", function () {
    it("should fail for zero addr", async function () {
      const tx = nftInstance.balanceOf(ZERO_ADDR);
      await expect(tx).to.be.revertedWith(`ERC721: balance query for the zero address`);
    });

    it("should get balance of owner", async function () {
      await nftInstance.safeMint(owner.address);
      const balance = await nftInstance.balanceOf(owner.address);
      expect(balance).to.equal(1);
    });

    it("should get balance of not owner", async function () {
      await nftInstance.safeMint(owner.address);
      const balance = await nftInstance.balanceOf(receiver.address);
      expect(balance).to.equal(0);
    });
  });

  describe("ownerOf", function () {
    it("should get owner of token", async function () {
      await nftInstance.safeMint(owner.address);
      const ownerOfToken = await nftInstance.ownerOf(0);
      expect(ownerOfToken).to.equal(owner.address);
    });

    it("should get owner of burned token", async function () {
      await nftInstance.safeMint(owner.address);
      const tx = nftInstance.burn(0);
      await expect(tx).to.not.be.reverted;
      const balanceOfOwner = await nftInstance.balanceOf(owner.address);
      expect(balanceOfOwner).to.equal(0);
      const tx2 = nftInstance.ownerOf(0);
      await expect(tx2).to.be.revertedWith(`ERC721: owner query for nonexistent token`);
    });
  });

  describe("tokenURI", function () {
    it("should get default token URI", async function () {
      await nftInstance.safeMint(owner.address);
      const uri = await nftInstance.tokenURI(0);
      expect(uri).to.equal(`${baseTokenURI}0`);
    });

    it("should override token URI", async function () {
      await nftInstance.safeMint(owner.address);
      await nftInstance.setTokenURI(0, "newURI");
      const uri = await nftInstance.tokenURI(0);
      expect(uri).to.equal(`${baseTokenURI}newURI`);
    });
  });

  describe("approve", function () {
    it("should fail: not an owner", async function () {
      await nftInstance.safeMint(owner.address);
      const tx = nftInstance.connect(receiver).approve(owner.address, 0);
      await expect(tx).to.be.revertedWith(`ComposableTopDown: approval to current owner`);
    });

    it("should fail: approve to self", async function () {
      await nftInstance.safeMint(owner.address);
      const tx = nftInstance.approve(owner.address, 0);
      await expect(tx).to.be.revertedWith("ComposableTopDown: approval to current owner");
    });

    it("should approve", async function () {
      await nftInstance.safeMint(owner.address);
      const tx = nftInstance.approve(receiver.address, 0);

      await expect(tx).to.emit(nftInstance, "Approval").withArgs(owner.address, receiver.address, 0);

      const approved = await nftInstance.getApproved(0);
      expect(approved).to.equal(receiver.address);

      const tx1 = nftInstance.connect(receiver).burn(0);
      await expect(tx1).to.emit(nftInstance, "Transfer").withArgs(owner.address, ZERO_ADDR, 0);

      const balanceOfOwner = await nftInstance.balanceOf(owner.address);
      expect(balanceOfOwner).to.equal(0);
    });
  });

  describe("setApprovalForAll", function () {
    it("should approve for all", async function () {
      await nftInstance.safeMint(owner.address);
      await nftInstance.safeMint(owner.address);

      const balanceOfOwner = await nftInstance.balanceOf(owner.address);
      expect(balanceOfOwner).to.equal(2);

      const tx1 = nftInstance.setApprovalForAll(receiver.address, true);
      await expect(tx1).to.not.be.reverted;

      const approved1 = await nftInstance.getApproved(0);
      expect(approved1).to.equal(ZERO_ADDR);

      const isApproved1 = await nftInstance.isApprovedForAll(owner.address, receiver.address);
      expect(isApproved1).to.equal(true);

      const tx2 = nftInstance.setApprovalForAll(receiver.address, false);
      await expect(tx2).to.not.be.reverted;

      const approved3 = await nftInstance.getApproved(0);
      expect(approved3).to.equal(ZERO_ADDR);

      const isApproved2 = await nftInstance.isApprovedForAll(owner.address, receiver.address);
      expect(isApproved2).to.equal(false);
    });
  });

  describe("supportsInterface", function () {
    it("should support all interfaces", async function () {
      const supportsIERC721 = await nftInstance.supportsInterface("0x80ac58cd");
      expect(supportsIERC721).to.equal(true);
      const supportsIERC721Metadata = await nftInstance.supportsInterface("0x5b5e139f");
      expect(supportsIERC721Metadata).to.equal(true);
      const supportsIERC721Enumerable = await nftInstance.supportsInterface("0x780e9d63");
      expect(supportsIERC721Enumerable).to.equal(true);

      const supportsIERC165 = await nftInstance.supportsInterface("0x01ffc9a7");
      expect(supportsIERC165).to.equal(true);

      const supportsIAccessControl = await nftInstance.supportsInterface("0x7965db0b");
      expect(supportsIAccessControl).to.equal(true);
      const supportsIAccessControlEnumerable = await nftInstance.supportsInterface("0x5a05180f");
      expect(supportsIAccessControlEnumerable).to.equal(true);

      const supportsERC998 = await nftInstance.supportsInterface("0x1bc995e4");
      expect(supportsERC998).to.equal(true);

      const supportsInvalidInterface = await nftInstance.supportsInterface("0xffffffff");
      expect(supportsInvalidInterface).to.equal(false);
    });
  });
});
