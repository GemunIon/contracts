import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { Game, Loci } from "../../typechain";
import { baseTokenURI } from "../constants";

describe("Game", function () {
  let nft: ContractFactory;
  let nftInstance: Loci;
  let game: ContractFactory;
  let gameInstance: Game;
  let owner: SignerWithAddress;

  beforeEach(async function () {
    nft = await ethers.getContractFactory("Loci");
    game = await ethers.getContractFactory("Game");
    [owner] = await ethers.getSigners();

    nftInstance = (await upgrades.deployProxy(nft, ["memoryOS NFT token", "Loci", baseTokenURI])) as Loci;
    gameInstance = (await upgrades.deployProxy(game)) as Game;
  });

  describe("Deployment", function () {
    it("should set the right roles to deployer", async function () {
      const address = await gameInstance.owner();
      expect(address).to.equal(owner.address);
    });
  });

  describe("Transfer", function () {
    it("should transfer nft", async function () {
      await nftInstance.mintTo(owner.address);
      await nftInstance.transferFrom(owner.address, gameInstance.address, 0);

      const balanceOfOwner = await nftInstance.balanceOf(owner.address);
      expect(balanceOfOwner).to.equal(0);

      const balanceOfReceiver = await nftInstance.balanceOf(gameInstance.address);
      expect(balanceOfReceiver).to.equal(1);

      const item = await nftInstance.tokenOfOwnerByIndex(gameInstance.address, 0);
      expect(item).to.equal(0); // 0 is nft index
    });
  });
});
