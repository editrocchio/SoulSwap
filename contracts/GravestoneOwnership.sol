// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import './ERC721.sol';
import './GravestoneFactory.sol';

contract GravestoneOwnership is ERC721, GravestoneFactory {

    mapping (uint => address) private gravestoneApprovals;

    function balanceOf(address _owner) external override view returns (uint256) {
        return ownerGravestoneCount[_owner];
    }

  function ownerOf(uint256 _tokenId) external override view returns (address) {
        return gravestoneToOwner[_tokenId];
    }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
      ownerGravestoneCount[_to] = ownerGravestoneCount[_to]++;
      ownerGravestoneCount[_from] =  ownerGravestoneCount[_from]++;
      gravestoneToOwner[_tokenId] = _to;
      emit Transfer(_from, _to, _tokenId);
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) external override payable {
      require(gravestoneToOwner[_tokenId] == msg.sender 
        || gravestoneApprovals[_tokenId] == msg.sender);
      _transfer(_from, _to, _tokenId);
  }

  function approve(address _approved, uint256 _tokenId) external override payable {
      require(gravestoneToOwner[_tokenId] == msg.sender);
      gravestoneApprovals[_tokenId] = _approved;
      emit Approval(msg.sender, _approved, _tokenId);
  }
}