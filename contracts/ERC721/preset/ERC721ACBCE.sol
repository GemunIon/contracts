// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun+gemunion@gmail.com
// Website: https://gemunion.io/

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "../ERC721CappedEnumerable.sol";

contract ERC721ACBCE is AccessControl, ERC721Burnable, ERC721CappedEnumerable {
  using Counters for Counters.Counter;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

  Counters.Counter internal _tokenIdTracker;

  constructor(
    string memory name,
    string memory symbol,
    uint256 cap
  ) ERC721(name, symbol) ERC721CappedEnumerable(cap) {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    _setupRole(MINTER_ROLE, _msgSender());
  }

  /**
   * @dev Creates a new token for `to`. Its token ID will be automatically
   * assigned (and available on the emitted {IERC721-Transfer} event), and the token
   * URI autogenerated based on the base URI passed at construction.
   *
   * See {ERC721-_safeMint}.
   *
   * Requirements:
   *
   * - the caller must have the `MINTER_ROLE`.
   */
  function mint(address to) public virtual onlyRole(MINTER_ROLE) {
    // We cannot just use balanceOf to create the new tokenId because tokens
    // can be burned (destroyed), so we need a separate counter.
    _mint(to, _tokenIdTracker.current());
    _tokenIdTracker.increment();
  }

  function safeMint(address to) public virtual onlyRole(MINTER_ROLE) {
    // We cannot just use balanceOf to create the new tokenId because tokens
    // can be burned (destroyed), so we need a separate counter.
    _safeMint(to, _tokenIdTracker.current());
    _tokenIdTracker.increment();
  }

  function getCurrentTokenIndex() public view returns (uint256) {
    return _tokenIdTracker.current();
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(AccessControl, ERC721, ERC721Enumerable)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal virtual override(ERC721, ERC721CappedEnumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }
}
