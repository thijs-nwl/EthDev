module.exports = function (ContractFile, ContractName) {
  var Web3 = require('web3'),
      fs = require('fs'),
      solc = require('solc');

  var code,
      compiledCode,
      byteCode,
      contract,
      deployedContract;

  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

  var contractFile = ContractFile;
  var contractName = ContractName;

  function compile(cb) {
    code = fs.readFileSync('contracts/' + contractFile + '.sol').toString();
    compiledCode = solc.compile(code);
    abiDefinition = JSON.parse(compiledCode.contracts[':' + contractName + ''].interface);
    byteCode = compiledCode.contracts[':'+ contractName +''].bytecode;
    cb();
  }

  function build(cb){
    contract = web3.eth.contract(abiDefinition);
    cb();
  }

  function deploy(cb){
    deployedContract = contract.new(web3.eth.accounts[0], {data:byteCode, from: web3.eth.accounts[0], gas:4700000})
    cb()
  }

  compile(function(){
    console.log('compiled');
    build(function(){
      console.log('build');
      deploy(function(){
        console.log('deployed');
        console.log(compiledCode.contracts[':' + contractName + ''].interface);
      })
    })
  })
}
require('make-runnable/custom')({
    printOutputFrame: false
});
