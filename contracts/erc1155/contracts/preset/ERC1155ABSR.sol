// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun@gemunion.io
// Website: https://gemunion.io/

pragma solidity ^0.8.13;

import "./ERC1155ABS.sol";
import "../extensions/ERC1155ARoyalty.sol";

contract ERC1155ABSR is ERC1155ABS, ERC1155ARoyalty {
  constructor(uint96 royaltyNumerator, string memory uri) ERC1155ABS(uri) ERC1155ARoyalty(royaltyNumerator) {}

  function supportsInterface(
    bytes4 interfaceId
  ) public view virtual override(ERC1155ABS, ERC1155ARoyalty) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
