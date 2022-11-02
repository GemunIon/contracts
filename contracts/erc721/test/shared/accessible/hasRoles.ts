import { expect } from "chai";
import { deployErc721Base } from "../fixtures";
import { ethers } from "hardhat";

export function shouldHaveRole(name: string) {
  return (...roles: Array<string>) => {
    describe("hasRole", function () {
      roles.forEach(role => {
        it(`Should set ${role} to deployer`, async function () {
          const [owner] = await ethers.getSigners();
          const { contractInstance } = await deployErc721Base(name);

          const hasRole = await contractInstance.hasRole(role, owner.address);
          expect(hasRole).to.equal(true);
        });
      });
    });
  };
}