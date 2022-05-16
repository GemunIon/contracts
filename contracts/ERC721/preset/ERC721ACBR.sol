// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun+gemunion@gmail.com
// Website: https://gemunion.io/

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

import "../interfaces/IERC721Royalty.sol";

contract ERC721ACBR is AccessControl, ERC721Burnable, IERC721Royalty, ERC721Royalty {
  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  string internal _baseTokenURI;

  constructor(
    string memory name,
    string memory symbol,
    string memory baseTokenURI,
    uint96 royaltyNumerator
  ) ERC721(name, symbol) {
    _baseTokenURI = baseTokenURI;

    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(MINTER_ROLE, _msgSender());

    _setDefaultRoyalty(_msgSender(), royaltyNumerator);
  }

  function mint(address to, uint256 tokenId) public virtual onlyRole(MINTER_ROLE) {
    _mint(to, tokenId);
  }

  function safeMint(address to, uint256 tokenId) public virtual onlyRole(MINTER_ROLE) {
    _safeMint(to, tokenId);
  }

  function setDefaultRoyalty(address royaltyReceiver, uint96 royaltyNumerator)
    public
    virtual
  override
    onlyRole(DEFAULT_ADMIN_ROLE)
  {
    super._setDefaultRoyalty(royaltyReceiver, royaltyNumerator);
    emit DefaultRoyaltyInfo(royaltyReceiver, royaltyNumerator);
  }

  function setTokenRoyalty(
    uint256 tokenId,
    address royaltyReceiver,
    uint96 royaltyNumerator
  ) public virtual override onlyRole(DEFAULT_ADMIN_ROLE) {
    super._setTokenRoyalty(tokenId, royaltyReceiver, royaltyNumerator);
    emit TokenRoyaltyInfo(tokenId, royaltyReceiver, royaltyNumerator);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(AccessControl, ERC721, ERC721Royalty)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }

  function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721Royalty) {
    super._burn(tokenId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override(ERC721) {
    super._beforeTokenTransfer(from, to, tokenId);
  }
}
