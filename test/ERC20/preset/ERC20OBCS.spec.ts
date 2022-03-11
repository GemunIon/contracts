import { ethers } from "hardhat";
import { ContractFactory } from "ethers";
import { expect } from "chai";

import { ERC20OBCS, ERC20NonReceiverMock } from "../../../typechain-types";
import { amount, tokenName, tokenSymbol } from "../../constants";

import { shouldBeOwner } from "../shared/ownable/owner";
import { shouldMint } from "../shared/mint";
import { shouldBalanceOf } from "../shared/balanceOf";
import { shouldTransfer } from "../shared/transfer";
import { shouldTransferFrom } from "../shared/transferFrom";
import { shouldSnapshot } from "../shared/snapshot";
import { shouldApprove } from "../shared/approve";
import { shouldBurn } from "../shared/burn";
import { shouldBurnFrom } from "../shared/burnFrom";
import { shouldCap } from "../shared/cap";

describe("ERC20OBCS", function () {
  let erc20: ContractFactory;
  let coinNonReceiver: ContractFactory;

  beforeEach(async function () {
    erc20 = await ethers.getContractFactory("ERC20OBCS");
    coinNonReceiver = await ethers.getContractFactory("ERC20NonReceiverMock");
    [this.owner, this.receiver] = await ethers.getSigners();

    this.erc20Instance = (await erc20.deploy(tokenName, tokenSymbol, amount)) as ERC20OBCS;
    this.coinNonReceiverInstance = (await coinNonReceiver.deploy()) as ERC20NonReceiverMock;
  });

  shouldBeOwner();
  shouldMint();
  shouldBalanceOf();
  shouldTransfer();
  shouldTransferFrom();
  shouldSnapshot();
  shouldApprove();
  shouldBurn();
  shouldBurnFrom();
  shouldCap();

  describe("supportsInterface", function () {
    it("should support all interfaces", async function () {
      const supportsIERC20 = await this.erc20Instance.supportsInterface("0x36372b07");
      expect(supportsIERC20).to.equal(true);
      const supportsIERC20Metadata = await this.erc20Instance.supportsInterface("0xa219a025");
      expect(supportsIERC20Metadata).to.equal(true);
      const supportsIERC165 = await this.erc20Instance.supportsInterface("0x01ffc9a7");
      expect(supportsIERC165).to.equal(true);
      const supportsInvalidInterface = await this.erc20Instance.supportsInterface("0xffffffff");
      expect(supportsInvalidInterface).to.equal(false);
    });
  });
});