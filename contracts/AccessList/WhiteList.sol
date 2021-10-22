// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";


abstract contract WhiteList is AccessControl {
    error WhiteListError(address account);

    mapping(address => bool) whiteList;

    event Whitelisted(address indexed addr);
    event UnWhitelisted(address indexed addr);

    function whitelist(address addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
        whiteList[addr] = true;
        emit Whitelisted(addr);
    }

    function unWhitelist(address addr) public onlyRole(DEFAULT_ADMIN_ROLE) {
        whiteList[addr] = false;
        emit UnWhitelisted(addr);
    }

    function isWhitelisted(address addr) public view returns (bool) {
        return whiteList[addr];
    }

    function _whitelist(address account) internal view {
        if (!isWhitelisted(account)) {
            revert WhiteListError(account);
        }
    }

    modifier onlyWhiteListed() {
        _whitelist(_msgSender());
        _;
    }
}
