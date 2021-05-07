// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title SoulFragment
 * SoulFragment - a contract for my non-fungible soul-fragments.
 */
contract SoulFragment is ERC721Tradable {
    constructor(address _proxyRegistryAddress) public
        ERC721Tradable("Soul Fragment", "SOULS", _proxyRegistryAddress)
    {}

    // function baseTokenURI() public override pure returns (string memory) {
    //     return "https://gateway.pinata.cloud/ipfs/";
    // }

    // function contractURI() public pure returns (string memory) {
    //     return "https://soul-fragments-api.opensea.io/contract/opensea-soul-fragments";
    // }
}