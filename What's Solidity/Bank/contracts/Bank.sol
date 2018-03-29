pragma solidity ^0.4.0;
contract Bank{
  struct holder {
    bytes10 nName;
    uint bal;
  }

  mapping(address => holder) holders;
  address[] public holdersAccts;
  bytes10[10] public holdersnNames;

  uint8 private i;
  i=0;

  function setHolder(address _address, bytes10 _nName) public {
    holders[_address] = holder(_nName, 1000);
    holdersAccts.push(_address) -1;
    holdersnNames[i] = _nName;
    i = i + 1;
  }

  function getHolderArr() public view returns (address[],bytes10[]){
    return (holdersAccts, holdersnNames);
  }

  function getHolder(address _address) public view returns(bytes10, uint){
    return  (holders[_address].nName, holders[_address].bal);
  }

  function countHolders() public view returns (uint){
    return holdersAccts.length;
  }
}
