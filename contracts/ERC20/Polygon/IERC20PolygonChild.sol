// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun+permission@gmail.com
// Website: https://gemunion.io/

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20PolygonChild is IERC20 {
  /**
   * Polygon Child functions
   */
  function deposit(address to, bytes calldata depositData) external;

  function withdraw(uint256 amount) external;

  function mint(address to, uint256 amount) external;
}
