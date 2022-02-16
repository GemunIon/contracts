// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

interface IERC20AndERC223 {
  function transferFrom(
    address from,
    address to,
    uint256 value
  ) external returns (bool success);

  function transfer(address to, uint256 value) external returns (bool success);

  function transfer(
    address to,
    uint256 value,
    bytes memory data
  ) external returns (bool success);

  function allowance(address owner, address spender) external view returns (uint256 remaining);
}
