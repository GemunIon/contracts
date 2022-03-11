import { expect } from "chai";
import { ethers, web3 } from "hardhat";
import { ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { time } from "@openzeppelin/test-helpers";

import { AuctionERC20, ERC20ACBCS, ERC721ACB } from "../../typechain-types";
import { amount, baseTokenURI, DEFAULT_ADMIN_ROLE, tokenId, tokenName, tokenSymbol } from "../constants";

describe("AuctionERC20", function () {
  let auction: ContractFactory;
  let auctionInstance: AuctionERC20;
  let erc20: ContractFactory;
  let erc20Instance: ERC20ACBCS;
  let erc721: ContractFactory;
  let erc721Instance: ERC721ACB;
  let owner: SignerWithAddress;
  let receiver: SignerWithAddress;
  let stranger: SignerWithAddress;

  beforeEach(async function () {
    erc20 = await ethers.getContractFactory("ERC20ACBCS");
    erc721 = await ethers.getContractFactory("ERC721ACB");
    auction = await ethers.getContractFactory("AuctionERC20");
    [owner, receiver, stranger] = await ethers.getSigners();

    erc20Instance = (await erc20.deploy(tokenName, tokenSymbol, amount * 10)) as ERC20ACBCS;
    erc721Instance = (await erc721.deploy(tokenName, tokenSymbol, baseTokenURI)) as ERC721ACB;
    auctionInstance = (await auction.deploy(erc20Instance.address)) as AuctionERC20;

    await erc721Instance.mint(owner.address, tokenId);
    await erc721Instance.approve(auctionInstance.address, tokenId);

    const approveAddress = await erc721Instance.getApproved(tokenId);
    expect(auctionInstance.address).to.equal(approveAddress);
  });

  describe("Deployment", function () {
    it("should set the right roles to deployer", async function () {
      const isAdmin = await auctionInstance.hasRole(DEFAULT_ADMIN_ROLE, owner.address);
      expect(isAdmin).to.equal(true);
    });
  });

  describe("startAuction", function () {
    it("should start auction (collection owner)", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);

      const ownerOf = await erc721Instance.ownerOf(tokenId);
      expect(ownerOf).to.equal(auctionInstance.address);
    });

    it("should start auction (if startAuctionTimestamp == 0, startAuctionTimestamp should block.timestamp)", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        0,
        timestamp + span + span,
      );
      await expect(tx1)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(
          0,
          owner.address,
          erc721Instance.address,
          tokenId,
          amount,
          1000,
          timestamp + 1,
          timestamp + span + span,
        );

      const ownerOf = await erc721Instance.ownerOf(tokenId);
      expect(ownerOf).to.equal(auctionInstance.address);
    });

    it("should fail: transfer from incorrect owner", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance
        .connect(stranger)
        .startAuction(erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);
      await expect(tx1).to.be.revertedWith(`ERC721: transfer from incorrect owner`);
    });

    it("should fail: operator query for nonexistent token", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId + 1,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1).to.be.revertedWith(`ERC721: operator query for nonexistent token`);
    });

    it("should fail: collection address cannot be zero", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        ethers.constants.AddressZero,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1).to.be.revertedWith(`Auction: collection address cannot be zero`);
    });

    it("should fail: auction start time should be less than end time", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp + span + span,
        timestamp,
      );
      await expect(tx1).to.be.revertedWith(`Auction: auction start time should be less than end time`);
    });

    it("should fail: auction start price should be positive", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        0,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1).to.be.revertedWith(`Auction: auction start price should be positive`);
    });

    it("should fail: auction should finished in future", async function () {
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp - 1000,
        timestamp - 100,
      );
      await expect(tx1).to.be.revertedWith(`Auction: auction should finished in future`);
    });
  });

  describe("makeBid", function () {
    it("should make bid", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);

      const tx2 = erc20Instance.mint(receiver.address, amount);
      await expect(tx2)
        .to.emit(erc20Instance, "Transfer")
        .withArgs(ethers.constants.AddressZero, receiver.address, amount);

      const tx3 = erc20Instance.connect(receiver).approve(auctionInstance.address, amount);
      await expect(tx3).to.emit(erc20Instance, "Approval").withArgs(receiver.address, auctionInstance.address, amount);

      const tx4 = await auctionInstance.connect(receiver).makeBid(0, amount);
      await expect(tx4)
        .to.emit(auctionInstance, "AuctionBid")
        .withArgs(0, receiver.address, erc721Instance.address, tokenId, amount);

      const balance = await erc20Instance.balanceOf(auctionInstance.address);
      expect(balance).to.equal(amount);

      const balance1 = await erc20Instance.balanceOf(owner.address);
      expect(balance1).to.equal(0);

      const balance2 = await erc20Instance.balanceOf(receiver.address);
      expect(balance2).to.equal(0);
    });

    it("should make another bid", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);

      const tx2 = erc20Instance.mint(receiver.address, amount);
      await expect(tx2)
        .to.emit(erc20Instance, "Transfer")
        .withArgs(ethers.constants.AddressZero, receiver.address, amount);

      const tx3 = erc20Instance.connect(receiver).approve(auctionInstance.address, amount);
      await expect(tx3).to.emit(erc20Instance, "Approval").withArgs(receiver.address, auctionInstance.address, amount);

      const tx4 = auctionInstance.connect(receiver).makeBid(0, amount);
      await expect(tx4)
        .to.emit(auctionInstance, "AuctionBid")
        .withArgs(0, receiver.address, erc721Instance.address, tokenId, amount);

      const tx5 = erc20Instance.mint(stranger.address, amount * 2);
      await expect(tx5)
        .to.emit(erc20Instance, "Transfer")
        .withArgs(ethers.constants.AddressZero, stranger.address, amount * 2);

      const tx6 = erc20Instance.connect(stranger).approve(auctionInstance.address, amount * 2);
      await expect(tx6)
        .to.emit(erc20Instance, "Approval")
        .withArgs(stranger.address, auctionInstance.address, amount * 2);

      const tx7 = auctionInstance.connect(stranger).makeBid(0, amount * 2);
      await expect(tx7)
        .to.emit(auctionInstance, "AuctionBid")
        .withArgs(0, stranger.address, erc721Instance.address, tokenId, amount * 2);

      const balance = await erc20Instance.balanceOf(auctionInstance.address);
      expect(balance).to.equal(amount * 2);

      const balance1 = await erc20Instance.balanceOf(owner.address);
      expect(balance1).to.equal(0);

      const balance2 = await erc20Instance.balanceOf(receiver.address);
      expect(balance2).to.equal(amount);

      const balance3 = await erc20Instance.balanceOf(stranger.address);
      expect(balance3).to.equal(0);
    });

    it("should fail: seems you tried wrong auction id", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);

      const bid = auctionInstance.connect(receiver).makeBid(1, amount);
      await expect(bid).to.be.revertedWith(`Auction: seems you tried wrong auction id`);
    });

    it("should fail: auction is not yet started", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp + 1000,
        timestamp + span + span + 1000,
      );
      await expect(tx)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(
          0,
          owner.address,
          erc721Instance.address,
          tokenId,
          amount,
          1000,
          timestamp + 1000,
          timestamp + span + span + 1000,
        );

      const bid = auctionInstance.connect(receiver).makeBid(0, amount);
      await expect(bid).to.be.revertedWith(`Auction: auction is not yet started`);
    });

    it("should fail: auction is already finished", async function () {
      const span = 100;
      const timestamp: number = (await time.latest()).toNumber();

      const tx = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span,
      );
      await expect(tx)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span);

      const current = await time.latestBlock();
      await time.advanceBlockTo(current.add(web3.utils.toBN(span)));

      const bid = auctionInstance.connect(receiver).makeBid(0, amount);
      await expect(bid).to.be.revertedWith(`Auction: auction is already finished`);
    });

    it("should fail: prevent double spending", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);

      const tx2 = erc20Instance.mint(receiver.address, amount * 3);
      await expect(tx2)
        .to.emit(erc20Instance, "Transfer")
        .withArgs(ethers.constants.AddressZero, receiver.address, amount * 3);

      const tx3 = erc20Instance.connect(receiver).approve(auctionInstance.address, amount * 3);
      await expect(tx3)
        .to.emit(erc20Instance, "Approval")
        .withArgs(receiver.address, auctionInstance.address, amount * 3);

      const tx4 = auctionInstance.connect(receiver).makeBid(0, amount);
      await expect(tx4)
        .to.emit(auctionInstance, "AuctionBid")
        .withArgs(0, receiver.address, erc721Instance.address, tokenId, amount);

      const bid1 = auctionInstance.connect(receiver).makeBid(0, amount * 2);
      await expect(bid1).to.be.revertedWith(`Auction: prevent double spending`);
    });

    it("should fail: prevent bidding on own items", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);

      const tx2 = auctionInstance.makeBid(0, amount);
      await expect(tx2).to.be.revertedWith(`Auction: prevent bidding on own items`);
    });

    it("should fail: proposed bid can not be less than start price", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);

      const tx2 = auctionInstance.connect(receiver).makeBid(0, amount / 2);
      await expect(tx2).to.be.revertedWith(`Auction: proposed bid can not be less than start price`);
    });

    it("should fail: proposed bid must be bigger than current bid", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);

      const tx2 = erc20Instance.mint(receiver.address, amount * 3);
      await expect(tx2)
        .to.emit(erc20Instance, "Transfer")
        .withArgs(ethers.constants.AddressZero, receiver.address, amount * 3);

      const tx3 = erc20Instance.connect(receiver).approve(auctionInstance.address, amount * 3);
      await expect(tx3)
        .to.emit(erc20Instance, "Approval")
        .withArgs(receiver.address, auctionInstance.address, amount * 3);

      const tx4 = await auctionInstance.connect(receiver).makeBid(0, amount * 3);
      await expect(tx4)
        .to.emit(auctionInstance, "AuctionBid")
        .withArgs(0, receiver.address, erc721Instance.address, tokenId, amount * 3);

      const tx5 = erc20Instance.mint(stranger.address, amount * 2);
      await expect(tx5)
        .to.emit(erc20Instance, "Transfer")
        .withArgs(ethers.constants.AddressZero, stranger.address, amount * 2);

      const tx6 = erc20Instance.connect(stranger).approve(auctionInstance.address, amount * 2);
      await expect(tx6)
        .to.emit(erc20Instance, "Approval")
        .withArgs(stranger.address, auctionInstance.address, amount * 2);

      const tx7 = auctionInstance.connect(stranger).makeBid(0, amount * 2);
      await expect(tx7).to.be.revertedWith(`Auction: proposed bid must be bigger than current bid`);
    });

    it("should fail: bid must be a multiple of the bid step", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx1)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);

      const tx2 = auctionInstance.connect(receiver).makeBid(0, amount + 1);
      await expect(tx2).to.be.revertedWith(`Auction: bid must be a multiple of the bid step`);
    });
  });

  describe("finishAuction", function () {
    it("should finish auction without bids", async function () {
      const span = 200;
      const timestamp: number = (await time.latest()).toNumber();

      const tx = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span,
      );
      await expect(tx)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span);

      const ownerOf = await erc721Instance.ownerOf(tokenId);
      expect(ownerOf).to.equal(auctionInstance.address);

      const current = await time.latestBlock();
      await time.advanceBlockTo(current.add(web3.utils.toBN(200)));

      const finish = auctionInstance.finishAuction(0);
      await expect(finish)
        .to.emit(auctionInstance, "AuctionFinish")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, 0);

      const ownerOf1 = await erc721Instance.ownerOf(tokenId);
      expect(ownerOf1).to.equal(owner.address);
    });

    it("should finish auction with bid", async function () {
      const span = 300;
      const timestamp: number = (await time.latest()).toNumber();

      const tx1 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span,
      );
      await expect(tx1)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span);

      const tx2 = erc20Instance.mint(receiver.address, amount);
      await expect(tx2)
        .to.emit(erc20Instance, "Transfer")
        .withArgs(ethers.constants.AddressZero, receiver.address, amount);

      const tx3 = erc20Instance.connect(receiver).approve(auctionInstance.address, amount);
      await expect(tx3).to.emit(erc20Instance, "Approval").withArgs(receiver.address, auctionInstance.address, amount);

      const tx4 = auctionInstance.connect(receiver).makeBid(0, amount);
      await expect(tx4)
        .to.emit(auctionInstance, "AuctionBid")
        .withArgs(0, receiver.address, erc721Instance.address, tokenId, amount);

      const current = await time.latestBlock();
      await time.advanceBlockTo(current.add(web3.utils.toBN(300)));

      const tx5 = await auctionInstance.finishAuction(0);
      await expect(tx5)
        .to.emit(auctionInstance, "AuctionFinish")
        .withArgs(0, receiver.address, erc721Instance.address, tokenId, amount);

      const ownerOf1 = await erc721Instance.ownerOf(tokenId);
      expect(ownerOf1).to.equal(receiver.address);

      const balance = await erc20Instance.balanceOf(auctionInstance.address);
      expect(balance).to.equal(0);

      const balance1 = await erc20Instance.balanceOf(owner.address);
      expect(balance1).to.equal(amount);

      const balance2 = await erc20Instance.balanceOf(receiver.address);
      expect(balance2).to.equal(0);
    });

    it("should fail: seems you tried wrong auction id", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span,
      );
      await expect(tx)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span);

      const finish = auctionInstance.finishAuction(1);
      await expect(finish).to.be.revertedWith(`Auction: seems you tried wrong auction id`);
    });

    it("should fail: auction is not yet started", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp + span,
        timestamp + span + span,
      );
      await expect(tx)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(
          0,
          owner.address,
          erc721Instance.address,
          tokenId,
          amount,
          1000,
          timestamp + span,
          timestamp + span + span,
        );

      const finish = auctionInstance.finishAuction(0);
      await expect(finish).to.be.revertedWith(`Auction: auction is not yet started`);
    });

    it("should fail: auction is not finished", async function () {
      const span = 24 * 60 * 60;
      const timestamp: number = (await time.latest()).toNumber();

      const tx = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span + span,
      );
      await expect(tx)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span + span);

      const finish = auctionInstance.finishAuction(0);
      await expect(finish).to.be.revertedWith(`Auction: auction is not finished`);
    });
  });

  describe("pause", function () {
    it("should fail: paase not admin", async function () {
      const tx = auctionInstance.connect(receiver).pause();
      await expect(tx).to.be.revertedWith(
        `AccessControl: account ${receiver.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
      );
    });

    it("should fail: unpause not admin", async function () {
      const tx = auctionInstance.connect(receiver).unpause();
      await expect(tx).to.be.revertedWith(
        `AccessControl: account ${receiver.address.toLowerCase()} is missing role ${DEFAULT_ADMIN_ROLE}`,
      );
    });

    it("should pause/unpause", async function () {
      const span = 300;
      const timestamp: number = (await time.latest()).toNumber();

      const tx = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId,
        amount,
        1000,
        timestamp,
        timestamp + span,
      );
      await expect(tx)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(0, owner.address, erc721Instance.address, tokenId, amount, 1000, timestamp, timestamp + span);

      const tx2 = auctionInstance.pause();
      await expect(tx2).to.emit(auctionInstance, "Paused").withArgs(owner.address);

      const tokenId1 = tokenId + 1;
      await erc721Instance.mint(owner.address, tokenId1);
      await erc721Instance.approve(auctionInstance.address, tokenId1);

      const tx3 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId1,
        amount,
        1000,
        timestamp,
        timestamp + span,
      );
      await expect(tx3).to.be.revertedWith(`Pausable: paused`);

      const tx4 = auctionInstance.unpause();
      await expect(tx4).to.emit(auctionInstance, "Unpaused").withArgs(owner.address);

      const tx5 = auctionInstance.startAuction(
        erc721Instance.address,
        tokenId1,
        amount,
        1000,
        timestamp,
        timestamp + span,
      );
      await expect(tx5)
        .to.emit(auctionInstance, "AuctionStart")
        .withArgs(1, owner.address, erc721Instance.address, tokenId1, amount, 1000, timestamp, timestamp + span);
    });
  });
});