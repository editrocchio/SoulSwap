// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import './ERC721Tradable.sol';
import './SoulFragment.sol';
import './IFactoryERC721.sol';
import './SoulFragmentFactory.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * @title SoulLootBox
 *
 * SoulLootBox - a tradeable loot box of Souls.
 */
contract SoulLootBox is ERC721Tradable {
    uint256 NUM_SOULS_PER_BOX = 3;
    uint256 OPTION_ID = 0;
    address factoryAddress;

    constructor(address _proxyRegistryAddress, address _factoryAddress)
        public
        ERC721Tradable("SoulLootBox", "LOOTBOX", _proxyRegistryAddress)
    {
        factoryAddress = _factoryAddress;
    }

    function unpack(uint256 _tokenId) public {
        require(ownerOf(_tokenId) == msg.sender);

        // Insert custom logic for configuring the item here.
        for (uint256 i = 0; i < NUM_SOULS_PER_BOX; i++) {
            // Mint the ERC721 item(s).
            SoulFragmentFactory factory = SoulFragmentFactory(factoryAddress);
            factory.mint(OPTION_ID, msg.sender);
        }

        //TODO: Advanced item sale structure
        // Burn the presale item.
       // _burn(msg.sender, _tokenId);
    }

    function baseTokenURI() public pure returns (string memory) {
        return "https://souls-api.opensea.io/api/box/";
    }

    function itemsPerLootbox() public view returns (uint256) {
        return NUM_SOULS_PER_BOX;
    }
}