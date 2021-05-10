// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IFactoryERC721.sol";
import "./SoulFragment.sol";
import "./StringUtils.sol";
import './SoulLootBox.sol';

contract SoulFragmentFactory is IFactoryERC721, Ownable {
    using Strings for string;

    // event Transfer(
    //     address indexed from,
    //     address indexed to,
    //     uint256 indexed tokenId
    // );

    address public proxyRegistryAddress;
    address public nftAddress;
    string public baseURI = "https://gateway.pinata.cloud/ipfs/";

    mapping (bytes32 => uint) public maxFragmentSupply; 
    mapping (bytes32 => uint) public currentFragmentCount; 

    // /*
    //  * Enforce the existence of only 100 OpenSea souls.
    //  */
    // uint256 SOUL_SUPPLY = 100;

    // /*
    //  * Three different options for minting Souls (basic, premium, and gold).
    //  */
    // uint256 NUM_OPTIONS = 3;
    // uint256 SINGLE_SOUL_OPTION = 0;
    // uint256 MULTIPLE_SOUL_OPTION = 1;
    // uint256 LOOTBOX_OPTION = 2;
    // uint256 NUM_SOULS_IN_MULTIPLE_SOUL_OPTION = 4;

    constructor(address _proxyRegistryAddress, address _nftAddress) public {
        proxyRegistryAddress = _proxyRegistryAddress;
        nftAddress = _nftAddress;
        // lootBoxNftAddress = address(
        //     new SoulLootBox(_proxyRegistryAddress, address(this))
        // );

     //   fireTransferEvents(address(0), owner());
    }

    function name() external override view returns (string memory) {
        return "Soul Fragment";
    }

    function symbol() external override view returns (string memory) {
        return "SOULS";
    }

    function supportsFactoryInterface() public override view returns (bool) {
        return true;
    }

    function numOptions() public override view returns (uint256) {
        //return NUM_OPTIONS;
        return 0;
    }

    function transferOwnership(address newOwner) public override onlyOwner {
        address _prevOwner = owner();
        super.transferOwnership(newOwner);
     //   fireTransferEvents(_prevOwner, newOwner);
    }

    // function fireTransferEvents(address _from, address _to) private {
    //     for (uint256 i = 0; i < NUM_OPTIONS; i++) {
    //         emit Transfer(_from, _to, i);
    //     }
    // }

    function mint(uint256 _optionId, address _toAddress) public override {
        // Must be sent from the owner proxy or owner.
        // ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        // assert(
        //     address(proxyRegistry.proxies(owner())) == msg.sender ||
        //         owner() == msg.sender ||
        //         msg.sender == lootBoxNftAddress
        // );
        // require(canMint(_optionId));

        // SoulFragment openSeaSoul = SoulFragment(nftAddress);
        // if (_optionId == SINGLE_SOUL_OPTION) {
        //     openSeaSoul.mintTo(_toAddress);
        // } else if (_optionId == MULTIPLE_SOUL_OPTION) {
        //     for (
        //         uint256 i = 0;
        //         i < NUM_SOULS_IN_MULTIPLE_SOUL_OPTION;
        //         i++
        //     ) {
        //         openSeaSoul.mintTo(_toAddress);
        //     }
        // } else if (_optionId == LOOTBOX_OPTION) {
        //     SoulLootBox openSeaSoulLootBox = SoulLootBox(
        //         lootBoxNftAddress
        //     );
        //     openSeaSoulLootBox.mintTo(_toAddress);
        // }
    }

    //Can only ever be set once
    function setMaxFragmentSupply(string memory soulName, uint total) public {
        bytes32 hashed = keccak256(abi.encode(soulName));
        maxFragmentSupply[hashed] = total;
    }

    function getMaxFragmentSupply(string memory soulName) public view returns (uint)  {
        bytes32 hashed = keccak256(abi.encode(soulName));
        return maxFragmentSupply[hashed];
    }

    function getCurrentFragmentCount(string memory soulName) public view returns (uint)  {
        bytes32 hashed = keccak256(abi.encode(soulName));
        return currentFragmentCount[hashed];
    }

    function mintTokenURI(string memory _tokenURI, address _toAddress, uint totalRequest, string memory soulName) public {
        bytes32 hashed = keccak256(abi.encode(soulName));
        require(_canMint(hashed), "request is higher than the max supply");
        SoulFragment openSeaSoul = SoulFragment(nftAddress);
        openSeaSoul.mintToken(_toAddress, _tokenURI);
        currentFragmentCount[hashed]++;
    }

    function _canMint(bytes32 hashedSoulName) public view returns (bool) {
        if(currentFragmentCount[hashedSoulName] < maxFragmentSupply[hashedSoulName]) {
            return true;
        }
        return false;
    }

    function canMint(uint256 _optionId) public override view returns (bool) {
        return false;
        // if (_optionId >= NUM_OPTIONS) {
        //     return false;
        // }

        // SoulFragment openSeaSoul = SoulFragment(nftAddress);
        // uint256 soulSupply = openSeaSoul.totalSupply(_optionId);

        // uint256 numItemsAllocated = 0;
        // if (_optionId == SINGLE_SOUL_OPTION) {
        //     numItemsAllocated = 1;
        // } else if (_optionId == MULTIPLE_SOUL_OPTION) {
        //     numItemsAllocated = NUM_SOULS_IN_MULTIPLE_SOUL_OPTION;
        // } else if (_optionId == LOOTBOX_OPTION) {
        //     SoulLootBox openSeaSoulLootBox = SoulLootBox(
        //         lootBoxNftAddress
        //     );
        //     numItemsAllocated = openSeaSoulLootBox.itemsPerLootbox();
        // }
        // return soulSupply < (SOUL_SUPPLY - numItemsAllocated);
    }

    function tokenURI(uint256 _optionId) external override view returns (string memory) {
        return StringUtils.strConcat(baseURI, StringUtils.uint2str(_optionId));
    }

    function tokenURI(string memory metadataURI) external view returns (string memory) {
        return StringUtils.strConcat(baseURI, metadataURI);
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

        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (
            owner() == _owner &&
            address(proxyRegistry.proxies(_owner)) == _operator
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