var  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi = [{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"string"}],"payable":false,
"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAge","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newName","type":"string"}],"name":"setName","outputs":[],
"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAge",
"type":"uint256"}],"name":"setAge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];

var Contract = web3.eth.contract(abi);
var contractInstance = Contract.at('0xeed6a83b3f33a7772e3196e351f5fc86c8ee3018');

var account = web3.eth.accounts;
console.log(account);
