// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Beacon1 is Initializable {
  event Dummy(bool dummy);

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() public initializer {}

  function getDummy() public {
    emit Dummy(false);
  }
}

contract Beacon2 is Initializable {
  event Dummy(bool dummy);

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() {
    _disableInitializers();
  }

  function initialize() public initializer {}

  function getDummy() public {
    emit Dummy(true);
  }
}