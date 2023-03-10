// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun@gemunion.io
// Website: https://gemunion.io/

pragma solidity ^0.8.13;

import "../extension/BlackList.sol";

contract BlackListTest is BlackList {
  constructor() {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
  }

  function testMe() external view onlyNotBlackListed returns (bool success) {
    return true;
  }
}
