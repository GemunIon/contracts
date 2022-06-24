import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractFactory } from "ethers";

import { ERC1155BaseUrlTest } from "../../typechain-types";
import { baseTokenURI, tokenId } from "../constants";

describe("ERC1155BaseUrl", function () {
  let erc1155: ContractFactory;
  let erc1155Instance: ERC1155BaseUrlTest;

  beforeEach(async function () {
    erc1155 = await ethers.getContractFactory("ERC1155BaseUrlTest");

    erc1155Instance = (await erc1155.deploy(baseTokenURI)) as ERC1155BaseUrlTest;
  });

  describe("uri", function () {
    it("should get token uri", async function () {
      const uri2 = await erc1155Instance.uri(tokenId);
      expect(uri2).to.equal(`${baseTokenURI}/${erc1155Instance.address.toLowerCase()}/{id}`);
    });
  });
});
