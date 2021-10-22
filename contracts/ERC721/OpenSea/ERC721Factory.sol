// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "../IERC721Factory.sol";
import "../IERC721Tradable.sol";
import "../LootBox/LootBox.sol";
import "./utils/ProxyRegistry.sol";

contract LociFactory is IERC721Factory, AccessControlEnumerable {
    using Strings for string;
    using Address for address;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    string public baseURI;

    ProxyRegistry _proxyRegistry;
    IERC721Tradable _tradable;
    LootBox _lootBox;

    uint256 NUM_OPTIONS;

    constructor(
        string memory _baseURI
    ) {
        baseURI = _baseURI;
        NUM_OPTIONS = 4; // common, rare, epic, legendary
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        fireTransferEvents(address(0), owner());
    }

    function setProxyRegistry(address proxyRegistry_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(proxyRegistry_.isContract(), "LociFactory: The ProxyRegistry must be a deployed contract");
        _proxyRegistry = ProxyRegistry(proxyRegistry_);
    }

    function setTradable(address tradableAddress_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(tradableAddress_.isContract(), "LociFactory: The Tradable must be a deployed contract");
        _tradable = IERC721Tradable(tradableAddress_);
    }

    function setLootBox(address lootBox_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(lootBox_.isContract(), "LociFactory: The LootBox must be a deployed contract");
        _lootBox = LootBox(lootBox_);
    }

    function owner() public view virtual returns (address) {
        return getRoleMember(DEFAULT_ADMIN_ROLE, 0);
    }

    function name() override external pure returns (string memory) {
        return "OpenSeaLoci Item Sale";
    }

    function symbol() override external pure returns (string memory) {
        return "CPF";
    }

    function supportsFactoryInterface() override public pure returns (bool) {
        return true;
    }

    function numOptions() override public view returns (uint256) {
        return NUM_OPTIONS;
    }

    function fireTransferEvents(address _from, address _to) private {
        for (uint256 i = 0; i < NUM_OPTIONS; i++) {
            emit Transfer(_from, _to, i);
        }
    }

    function mint(uint256 _optionId, address _toAddress) override public {
        // Must be sent from the owner proxy or owner.
        assert(
            address(_proxyRegistry.proxies(owner())) == _msgSender() ||
            owner() == _msgSender() ||
            address(_lootBox) == _msgSender()
        );
        require(canMint(_optionId));

        _tradable.mint(_toAddress);
    }

    function canMint(uint256 _optionId) override public view returns (bool) {
        if (_optionId >= NUM_OPTIONS) {
            return false;
        }

        return _tradable.totalSupply() < _tradable.cap();
    }

    function tokenURI(uint256 _optionId) override external view returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(_optionId)));
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use transferFrom so the frontend doesn't have to worry about different method names.
     */
    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public {
        mint(_tokenId, _to);
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function isApprovedForAll(address _owner, address _operator)
    public
    view
    returns (bool)
    {
        if (owner() == _owner && _owner == _operator) {
            return true;
        }

        if (
            owner() == _owner &&
            address(_proxyRegistry.proxies(_owner)) == _operator
        ) {
            return true;
        }

        return false;
    }

    /**
     * Hack to get things to work automatically on OpenSea.
     * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
     */
    function ownerOf(uint256 _tokenId) public view returns (address _owner) {
        return owner();
    }
}
