// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun+gemunion@gmail.com
// Website: https://gemunion.io/

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract StringHashCalculator {
  constructor() {
    console.logBytes32(keccak256("TEST"));
    console.logBytes32(keccak256(bytes("TEST")));
  }
}