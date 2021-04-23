// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract GravestoneFactory {
    uint graveIdDigits = 16;
    uint graveIdModulus = 10 ** graveIdModulus;
    uint counter = 0;
    GraveStone[] public gravestones;

    mapping (uint => address) public gravestoneToOwner;
    mapping (address => uint) ownerGravestoneCount;

    event NewGraveStone(string fullName, uint counter, uint id);

    struct GraveStone {
        string firstName;
        string middleName;
        string lastName;
        string birthDate;
        string deathDate;
        string obituary;
        uint id;
        //TODO: image encoded to base64
    }

    function addToGraveStones(string memory _firstName, string memory _middleName, 
        string memory _lastName, string memory _birthDate, string memory _deathDate, 
        string memory _obituary, uint id) private {
            gravestones.push(GraveStone(_firstName, _middleName, _lastName, _birthDate,
            _deathDate, _obituary, id));
    }

    function generateId(string memory _firstName, string memory _lastName, uint count)
        private view returns (uint){
            string memory concat = (string(abi.encodePacked(_firstName, _lastName, count)));
            //TODO: test if this is concatinating the uint properly
            uint rand = uint(keccak256(abi.encodePacked(concat)));
            return rand % graveIdModulus;
    }

    function buildGraveStones(string memory _firstName, string memory _middleName, 
        string memory _lastName, uint256 deathDate, string memory _gender, 
        string memory _obituary, bool isHuman, string memory _species) private {
            uint id = generateId(_firstName, _lastName, ++counter);
            addToGraveStones(_firstName, _middleName, _lastName, deathDate, _gender,
             _obituary, isHuman, _species, id);

             emit NewGraveStone(string(abi.encodePacked(_firstName, _middleName, 
                _lastName)), counter, id);
            
            gravestoneToOwner[id] = msg.sender;
            ownerGravestoneCount[msg.sender]++;
    }

    function getGravestonesByOwner(address _owner) external view returns(uint[] memory) {
        uint[] memory result = new uint[](ownerGravestoneCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < gravestones.length; i++) {
            if (gravestoneToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }


}