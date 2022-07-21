// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun+gemunion@gmail.com
// Website: https://gemunion.io/

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "./ERC721ACBCE.sol";

contract ERC721ACBCES is ERC721ACBCE, ERC721URIStorage {
  constructor(
    string memory name,
    string memory symbol,
    uint256 cap
  ) ERC721ACBCE(name, symbol, cap) { }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721, ERC721ACBCE)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function setTokenURI(uint256 tokenId, string memory _tokenURI) public virtual onlyRole(DEFAULT_ADMIN_ROLE) {
    _setTokenURI(tokenId, _tokenURI);
  }

  function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
    return super._burn(tokenId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override(ERC721, ERC721ACBCE) {
    super._beforeTokenTransfer(from, to, tokenId);
  }
}
