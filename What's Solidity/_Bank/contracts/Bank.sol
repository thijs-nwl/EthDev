pragma solidity ^0.4.0;
contract Bank{
  struct holder {
    string nName;
    uint bal;
  }

  mapping(address => holder) holders;
  address[] public holdersAccts;

  function setHolder(address _address, string _nNames) public {
    holders[_address] = holder(_nNames, 1000);
    holdersAccts.push(_address) - 1;
  }

  function getHolderArr() public view returns (address[]){
    return holdersAccts;
  }

  function getHolder(address _address) public view returns(string, uint){
    return  (holders[_address].nName, holders[_address].bal);
  }

  function countHolders() public view returns (uint){
    return holdersAccts.length;
  }
}
