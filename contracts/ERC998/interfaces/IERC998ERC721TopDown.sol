// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

interface IERC998ERC721TopDown is IERC721Receiver {
  event ReceivedChild(
    address indexed _from,
    uint256 indexed _tokenId,
    address indexed _childContract,
    uint256 _childTokenId
  );
  event TransferChild(
    uint256 indexed tokenId,
    address indexed _to,
    address indexed _childContract,
    uint256 _childTokenId
  );

  function rootOwnerOf(uint256 _tokenId)
  external
  view
  returns (bytes32 rootOwner);

  function rootOwnerOfChild(address _childContract, uint256 _childTokenId)
  external
  view
  returns (bytes32 rootOwner);

  function ownerOfChild(address _childContract, uint256 _childTokenId)
  external
  view
  returns (bytes32 parentTokenOwner, uint256 parentTokenId);

  function transferChild(
    uint256 _fromTokenId,
    address _to,
    address _childContract,
    uint256 _childTokenId
  ) external;

  function safeTransferChild(
    uint256 _fromTokenId,
    address _to,
    address _childContract,
    uint256 _childTokenId
  ) external;

  function safeTransferChild(
    uint256 _fromTokenId,
    address _to,
    address _childContract,
    uint256 _childTokenId,
    bytes memory _data
  ) external;

  function transferChildToParent(
    uint256 _fromTokenId,
    address _toContract,
    uint256 _toTokenId,
    address _childContract,
    uint256 _childTokenId,
    bytes memory _data
  ) external;

  // getChild function enables older contracts like cryptokitties to be transferred into a composable
  // The _childContract must approve this contract. Then getChild can be called.
  function getChild(
    address _from,
    uint256 _tokenId,
    address _childContract,
    uint256 _childTokenId
  ) external;
}
