// SPDX-License-Identifier: UNLICENSED

// Author: TrejGun
// Email: trejgun+gemunion@gmail.com
// Website: https://gemunion.io/

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

import "./IEIP712ERC721Droppable.sol";

contract EIP712ERC721Dropbox is EIP712, Pausable, AccessControl {
  using Address for address;

  IEIP712ERC721Droppable _factory;

  constructor(string memory name) EIP712(name, "1.0.0") {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
  }

  function setFactory(address factory) external onlyRole(DEFAULT_ADMIN_ROLE) {
    require(factory.isContract(), "LootBox: the factory must be a deployed contract");
    _factory = IEIP712ERC721Droppable(factory);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControl) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function redeem(
    address account,
    uint256 tokenId,
    address signer,
    bytes calldata signature
  ) external {
    require(_verify(signer, _hash(account, tokenId), signature), "EIP712ERC721Dropbox: Invalid signature");
    _factory.mint(account, tokenId);
  }

  function _hash(address account, uint256 tokenId) internal view returns (bytes32) {
    return _hashTypedDataV4(keccak256(abi.encode(keccak256("NFT(address account,uint256 tokenId)"), account, tokenId)));
  }

  function _verify(
    address signer,
    bytes32 digest,
    bytes memory signature
  ) internal view returns (bool) {
    return SignatureChecker.isValidSignatureNow(signer, digest, signature);
  }
}
