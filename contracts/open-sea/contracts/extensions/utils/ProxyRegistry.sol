// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun+gemunion@gmail.com
// Website: https://gemunion.io/

pragma solidity ^0.8.13;

import "./OwnableDelegateProxy.sol";

contract ProxyRegistry {
  mapping(address => OwnableDelegateProxy) public proxies;
}
