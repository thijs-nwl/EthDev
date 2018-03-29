var Web3 = require('web3');
var fs = require('fs');
var solc = require('solc');

var code;
var compiledCode;
var byteCode;
var PlayFieldContract;
var deployedContract;

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var account = web3.eth.accounts;
console.log(account);

function compile(cb) {
  code = fs.readFileSync('contracts/PlayField.sol').toString();
  console.log(code);
  compiledCode = solc.compile(code);
  abiDefinition = JSON.parse(compiledCode.contracts[':PlayField'].interface);
  console.log(abiDefinition);
  byteCode = compiledCode.contracts[':PlayField'].bytecode;
  console.log(byteCode);
  cb();
}

function build(cb){
  PlayFieldContract = web3.eth.contract(abiDefinition);
  console.log('build');
  cb();
}

function deploy(cb){
  deployedContract = PlayFieldContract.new(account[0], {data:byteCode, from: account[0], gas:4700000})
  console.log('deploy');
  cb()
}

compile(function(){
  build(function(){
    deploy(function(){
      console.log(deployedContract.address);        //genesisBlock copy
      console.log(compiledCode.contracts[':PlayField'].interface);  //copy
    })
  })
})
