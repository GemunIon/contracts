import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";

export function shouldHaveRole(factory: () => Promise<Contract>) {
  return (...roles: Array<string>) => {
    describe("hasRole", function () {
      roles.forEach(role => {
        it(`Should set ${role} to deployer`, async function () {
          const [owner] = await ethers.getSigners();
          const contractInstance = await factory();

          const hasRole = await contractInstance.hasRole(role, owner.address);
          expect(hasRole).to.equal(true);
        });
      });
    });
  };
}
