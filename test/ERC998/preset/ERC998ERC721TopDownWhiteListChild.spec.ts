import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractFactory } from "ethers";

import {
  ERC721NonReceiverMock,
  ERC721ReceiverMock,
  ERC721ACBCE,
  ERC998ERC721TopDownWhiteListChild,
} from "../../../typechain-types";
import { baseTokenURI, DEFAULT_ADMIN_ROLE, MINTER_ROLE, tokenName, tokenSymbol } from "../../constants";

import { shouldMint } from "../../ERC721/shared/mint1";
import { shouldSafeMint } from "../../ERC721/shared/safeMint1";
import { shouldGetBalanceOf } from "../../ERC721/shared/balanceOf1";
import { shouldGetOwnerOf } from "../../ERC721/shared/ownerOf1";
import { shouldGetTokenURI } from "../../ERC721/shared/tokenURI1";
import { shouldApprove } from "../shared/approve";
import { shouldSetApprovalForAll } from "../../ERC721/shared/setApprovalForAll1";
import { shouldTransferFrom } from "../../ERC721/shared/transferFrom1";
import { testsUsingWhiteListChild } from "../shared/sharedWhiteListChild/testsUsingWhiteListChild";
import { shouldWhiteListChild } from "../shared/sharedWhiteListChild/whiteListChild";

describe("ERC998ERC721TopDownWhiteListChild", function () {
  let erc721: ContractFactory;
  let erc998: ContractFactory;
  let erc721Receiver: ContractFactory;
  let erc721NonReceiver: ContractFactory;

  beforeEach(async function () {
    erc721 = await ethers.getContractFactory("ERC721ACBCE");
    erc998 = await ethers.getContractFactory("ERC998ERC721TopDownWhiteListChild");
    erc721Receiver = await ethers.getContractFactory("ERC721ReceiverMock");
    erc721NonReceiver = await ethers.getContractFactory("ERC721NonReceiverMock");
    [this.owner, this.receiver] = await ethers.getSigners();

    this.erc721InstanceMock = (await erc721.deploy(tokenName, tokenSymbol, baseTokenURI, 2)) as ERC721ACBCE;
    this.erc721Instance = (await erc998.deploy(
      tokenName,
      tokenSymbol,
      baseTokenURI,
      1000,
    )) as ERC998ERC721TopDownWhiteListChild;
    this.erc721ReceiverInstance = (await erc721Receiver.deploy()) as ERC721ReceiverMock;
    this.erc721NonReceiverInstance = (await erc721NonReceiver.deploy()) as ERC721NonReceiverMock;
  });

  describe("constructor", function () {
    it("Should set the right roles to deployer", async function () {
      const isAdmin = await this.erc721Instance.hasRole(DEFAULT_ADMIN_ROLE, this.owner.address);
      expect(isAdmin).to.equal(true);
      const isMinter = await this.erc721Instance.hasRole(MINTER_ROLE, this.owner.address);
      expect(isMinter).to.equal(true);
    });
  });

  shouldMint();
  shouldSafeMint();
  shouldGetBalanceOf();
  shouldGetOwnerOf();
  shouldGetTokenURI();
  shouldApprove();
  shouldSetApprovalForAll();
  shouldTransferFrom();
  testsUsingWhiteListChild();

  describe("getChild", function () {
    it("should get child", async function () {
      await this.erc721Instance.whiteListChild(this.erc721InstanceMock.address);
      await this.erc721Instance.setMaxChild(0);
      await this.erc721InstanceMock.mint(this.owner.address);
      await this.erc721InstanceMock.approve(this.erc721Instance.address, 0);
      await this.erc721Instance.mint(this.owner.address); // this is edge case
      await this.erc721Instance.mint(this.owner.address);

      const tx1 = this.erc721Instance.getChild(this.owner.address, 1, this.erc721InstanceMock.address, 0);
      await expect(tx1).to.be.revertedWith(`ERC998ERC721TopDown: this method is not supported`);
    });
  });

  shouldWhiteListChild();
});