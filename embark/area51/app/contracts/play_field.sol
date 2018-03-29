pragma solidity ^0.4.7;
contract PlayField {
  mapping(address => uint) private balances;

  uint public storedData;
  address public owner;

  function playField(uint initialValue) public {
    storedData = initialValue;
    owner = msg.sender;
  }

  function set(uint x) public {
    storedData = x;
    log0( bytes32(storedData));
  }

  function get() public view returns (uint retVal) {
    return storedData;
  }

  function double() public {
    storedData *= 2;
  }

  function retsOwner() public constant returns (uint){
    return balances[msg.sender];
  }
}
