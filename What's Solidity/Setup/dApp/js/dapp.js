var  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi = ;

var Contract = web3.eth.contract(abi);
var contractInstance = Contract.at('');

var account = web3.eth.accounts;

var btn1 = document.getElementById('_1'),
    btn2 = document.getElementById('_2'),
    btn3 = document.getElementById('_3'),
    inputField1 = document.getElementById('set_1'),
    inputField2 = document.getElementById('set_2'),
    inputField3 = document.getElementById('set_3');

btn1.addEventListener('click', function(){
  console.log('web3.eth.accounts[0]: ' + account[0]);
});

btn2.addEventListener('click', function(){
  console.log('web3.eth.accounts[1]: ' + account[1]);
});

btn3.addEventListener('click', function(){
  console.log('web3.eth.accounts[2]: ' + account[2]);
});
