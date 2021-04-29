// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./ERC721Tradable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SoulFragment
 * SoulFragment - a contract for my non-fungible soul-fragments.
 */
contract SoulFragment is ERC721Tradable {
    constructor(address _proxyRegistryAddress) public
        ERC721Tradable("SoulFragment", "SOUL", _proxyRegistryAddress)
    {}

    function baseTokenURI() public override pure returns (string memory) {
        return "https://soul-fragments-api.opensea.io/api/soul-fragment/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://soul-fragments-api.opensea.io/contract/opensea-soul-fragments";
    }
}