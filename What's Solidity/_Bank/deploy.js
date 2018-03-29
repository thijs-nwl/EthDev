console.log('Initializing variables...');

var Web3 = require('web3'),
    fs = require('fs'),
    solc = require('solc'),
    web3,
    contractDir_Name,
    isRunning,
    code,
    compiledCode,
    byteCode,
    contract,
    deployedContract,
    abiLink,
    addressLink;

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')),
    contractDir_Name = process.argv[2],
    isRunning = false;

    function compile(cb) {
      console.log('\n Start deploying Process...');
      isRunning = true;
      code = fs.readFileSync('contracts/' + contractDir_Name + '.sol').toString();
      compiledCode = solc.compile(code);
      abiDefinition = JSON.parse(compiledCode.contracts[':' + contractDir_Name + ''].interface);
      byteCode = compiledCode.contracts[':'+ contractDir_Name +''].bytecode;
      cb();
    }

    function build(cb){
      contract = web3.eth.contract(abiDefinition);
      cb();
    }

    function deploy(cb){
      deployedContract = contract.new(web3.eth.accounts[0], {data:byteCode, from: web3.eth.accounts[0], gas:47000000})
      cb()
    }

    function write(cb){
      console.log('waiting for block');
      setTimeout(function(){
        abiLink = compiledCode.contracts[':' + contractDir_Name + ''].interface;
        addressLink = web3.eth.getTransactionReceipt(deployedContract.transactionHash).contractAddress;
        addressLink = addressLink.toString();

        fs.writeFile('dApp/js/config.js', 'var abi=\n' + abiLink +';\nvar contractAddress = ' + "'" + addressLink + "'"+ ';', function(err){
          if(err) throw err;
        })
      }, 100)
      cb();
    }

(function (){
  if (isRunning) {
    console.log(' Already started deploying');
  } else {
    compile(function(){
      build(function(){
        deploy(function(){
          write(function(){
            isRunning = false;
            console.log(' Deployed');
          })
        })
      })
    })
  }
}())


fs.watchFile('./contracts/' + contractDir_Name + '.sol', (curr, prev) => {
  if (isRunning) {
    console.log(' Already started deploying');
  } else {
    compile(function(){
      build(function(){
        deploy(function(){
          write(function(){
            isRunning = false;
            console.log(' Redeployed');
          })
        })
      })
    })
  }
})
