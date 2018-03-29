pragma solidity ^0.4.0;

contract PlayField {
    address public owner;
    mapping (address => uint) public balances;

    function playField() public {
        owner = msg.sender;
    }

    function get() public constant returns (address){
      return owner;
    }
}


//werkt allemaal niet mier
