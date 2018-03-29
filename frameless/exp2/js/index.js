var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi = [{"constant":true,"inputs":[],"name":"minter","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":
"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,
"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount",
"type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],
"name":"playField","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":
"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"send","outputs":[],"payable":false,"stateMutability":"nonpayable",
"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to"
,"type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Sent","type":"event"}];

var PlayField = web3.eth.contract(abi);
var contractInstance = PlayField.at('0xf532122d47bbe7de91db6bcbc320f54a8739d950')

var btnSet = document.getElementById('set'),
    btnDouble = document.getElementById('double'),
    btnGet = document.getElementById('get'),
    inputField = document.getElementById('setVal'),
    outputBox = document.getElementsByClassName('box2')[0],
    h3 = document.createElement('H3'),
    br = document.createElement('BR');

var value = undefined;
var txt = undefined;
var outNum = undefined;

var account = web3.eth.accounts;
console.log(account[0]);

  btnSet.addEventListener('click', function () {
    value = parseInt(inputField.value, 10);
    contractInstance.set(value, {from: account[0]}, function(){
      console.log('value set: ' + value);
    })
  });

  btnDouble.addEventListener('click', function () {
    contractInstance.double({from: web3.eth.accounts[0]}, function (){
      console.log('value doubled');
    })
  });

  btnGet.addEventListener('click', function () {
    outNum = contractInstance.get().toNumber();
    owner = contractInstance.retsOwner();
    console.log(outNum);
    console.log(owner);
  })
