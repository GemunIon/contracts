// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

import "./MarketplaceStorage.sol";

contract Marketplace is OwnableUpgradeable, PausableUpgradeable, MinimalForwarderUpgradeable, MarketplaceStorage {
    using SafeMathUpgradeable for uint256;
    using AddressUpgradeable for address;

    /**
      * @dev Initialize this contract. Acts as a constructor
      * @param _acceptedToken - Address of the ERC20 accepted for this marketplace
      * @param _ownerCutPerMillion - owner cut per million
      */
    function initialize(
        address _acceptedToken,
        uint256 _ownerCutPerMillion
    ) initializer public {
        __Pausable_init();
        __Ownable_init();
        __MinimalForwarder_init();

        // Fee init
        setOwnerCutPerMillion(_ownerCutPerMillion);

        require(_acceptedToken.isContract(), "The accepted token address must be a deployed contract");
        acceptedToken = IERC20Upgradeable(_acceptedToken);
    }

    /**
      * @dev Sets the publication fee that's charged to users to publish items
      * @param _publicationFee - Fee amount in wei this contract charges to publish an item
      */
    function setPublicationFee(uint256 _publicationFee) external onlyOwner {
        publicationFeeInWei = _publicationFee;
        emit ChangedPublicationFee(publicationFeeInWei);
    }

    /**
      * @dev Sets the share cut for the owner of the contract that's
      *  charged to the seller on a successful sale
      * @param _ownerCutPerMillion - Share amount, from 0 to 999,999
      */
    function setOwnerCutPerMillion(uint256 _ownerCutPerMillion) public onlyOwner {
        require(_ownerCutPerMillion < 1000000, "The owner cut should be between 0 and 999,999");

        ownerCutPerMillion = _ownerCutPerMillion;
        emit ChangedOwnerCutPerMillion(ownerCutPerMillion);
    }

    /**
      * @dev Creates a new order
      * @param nftAddress - Non fungible registry address
      * @param assetId - ID of the published NFT
      * @param priceInWei - Price in Wei for the supported coin
      * @param expiresAt - Duration of the order (in hours)
      */
    function createOrder(
        address nftAddress,
        uint256 assetId,
        uint256 priceInWei,
        uint256 expiresAt
    )
    public
    whenNotPaused
    {
        _createOrder(
            nftAddress,
            assetId,
            priceInWei,
            expiresAt
        );
    }

    /**
      * @dev Cancel an already published order
      *  can only be canceled by seller or the contract owner
      * @param nftAddress - Address of the NFT registry
      * @param assetId - ID of the published NFT
      */
    function cancelOrder(address nftAddress, uint256 assetId) public whenNotPaused {
        _cancelOrder(nftAddress, assetId);
    }

    /**
      * @dev Executes the sale for a published NFT
      * @param nftAddress - Address of the NFT registry
      * @param assetId - ID of the published NFT
      * @param price - Order price
      */
    function executeOrder(
        address nftAddress,
        uint256 assetId,
        uint256 price
    )
    public
    whenNotPaused
    {
        _executeOrder(
            nftAddress,
            assetId,
            price
        );
    }

    /**
      * @dev Creates a new order
      * @param nftAddress - Non fungible registry address
      * @param assetId - ID of the published NFT
      * @param priceInWei - Price in Wei for the supported coin
      * @param expiresAt - Duration of the order (in hours)
      */
    function _createOrder(
        address nftAddress,
        uint256 assetId,
        uint256 priceInWei,
        uint256 expiresAt
    )
    internal
    {
        _requireERC721(nftAddress);

        address sender = _msgSender();

        IERC721Upgradeable nftRegistry = IERC721Upgradeable(nftAddress);
        address assetOwner = nftRegistry.ownerOf(assetId);

        require(sender == assetOwner, "Only the owner can create orders");
        require(
            nftRegistry.getApproved(assetId) == address(this) || nftRegistry.isApprovedForAll(assetOwner, address(this)),
            "The contract is not authorized to manage the asset"
        );
        require(priceInWei > 0, "Price should be bigger than 0");
        require(expiresAt > block.timestamp.add(1 minutes), "Publication should be more than 1 minute in the future");

        bytes32 orderId = keccak256(
            abi.encodePacked(
                block.timestamp,
                assetOwner,
                assetId,
                nftAddress,
                priceInWei
            )
        );

        orderByAssetId[nftAddress][assetId] = Order({
        id: orderId,
        seller: assetOwner,
        nftAddress: nftAddress,
        price: priceInWei,
        expiresAt: expiresAt
        });

        // Check if there's a publication fee and
        // transfer the amount to marketplace owner
        if (publicationFeeInWei > 0) {
            require(
                acceptedToken.transferFrom(sender, owner(), publicationFeeInWei),
                "Transfering the publication fee to the Marketplace owner failed"
            );
        }

        emit OrderCreated(
            orderId,
            assetId,
            assetOwner,
            nftAddress,
            priceInWei,
            expiresAt
        );
    }

    /**
      * @dev Cancel an already published order
      *  can only be canceled by seller or the contract owner
      * @param nftAddress - Address of the NFT registry
      * @param assetId - ID of the published NFT
      */
    function _cancelOrder(address nftAddress, uint256 assetId) internal returns (Order memory) {
        address sender = _msgSender();
        Order memory order = orderByAssetId[nftAddress][assetId];

        require(order.id != 0, "Asset not published");
        require(order.seller == sender || sender == owner(), "Unauthorized user");

        bytes32 orderId = order.id;
        address orderSeller = order.seller;
        address orderNftAddress = order.nftAddress;
        delete orderByAssetId[nftAddress][assetId];

        emit OrderCancelled(
            orderId,
            assetId,
            orderSeller,
            orderNftAddress
        );

        return order;
    }

    /**
      * @dev Executes the sale for a published NFT
      * @param nftAddress - Address of the NFT registry
      * @param assetId - ID of the published NFT
      * @param price - Order price
      */
    function _executeOrder(
        address nftAddress,
        uint256 assetId,
        uint256 price
    )
    internal returns (Order memory)
    {
        _requireERC721(nftAddress);

        address sender = _msgSender();

        IERC721Upgradeable nftRegistry = IERC721Upgradeable(nftAddress);

        Order memory order = orderByAssetId[nftAddress][assetId];

        require(order.id != 0, "Asset not published");

        address seller = order.seller;

        require(seller != address(0), "Invalid address");
        require(seller != sender, "Unauthorized user");
        require(order.price == price, "The price is not correct");
        require(block.timestamp < order.expiresAt, "The order expired");
        require(seller == nftRegistry.ownerOf(assetId), "The seller is no longer the owner");

        uint saleShareAmount = 0;

        bytes32 orderId = order.id;
        delete orderByAssetId[nftAddress][assetId];

        if (ownerCutPerMillion > 0) {
            // Calculate sale share
            saleShareAmount = price.mul(ownerCutPerMillion).div(1000000);

            // Transfer share amount for marketplace Owner
            require(
                acceptedToken.transferFrom(sender, owner(), saleShareAmount),
                "Transfering the cut to the Marketplace owner failed"
            );
        }

        // Transfer sale amount to seller
        require(
            acceptedToken.transferFrom(sender, seller, price.sub(saleShareAmount)),
            "Transfering the sale amount to the seller failed"
        );

        // Transfer asset owner
        nftRegistry.safeTransferFrom(
            seller,
            sender,
            assetId
        );

        emit OrderSuccessful(
            orderId,
            assetId,
            seller,
            nftAddress,
            price,
            sender
        );

        return order;
    }

    function _requireERC721(address nftAddress) internal view {
        require(nftAddress.isContract(), "The NFT Address should be a contract");

        IERC721Upgradeable nftRegistry = IERC721Upgradeable(nftAddress);
        require(
            nftRegistry.supportsInterface(ERC721_Interface),
            "The NFT contract has an invalid ERC721 implementation"
        );
    }
}