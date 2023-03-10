// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun@gemunion.io
// Website: https://gemunion.io/

pragma solidity ^0.8.13;

import "../extension/WhiteList.sol";

contract WhiteListTest is WhiteList {
  constructor() {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
  }

  function testMe() external view onlyWhiteListed returns (bool success) {
    return true;
  }
}
