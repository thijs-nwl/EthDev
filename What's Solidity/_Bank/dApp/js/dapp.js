//vars and references
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")),
    Contract = web3.eth.contract(abi),
    contractInstance = Contract.at(contractAddress);

var account = web3.eth.accounts,
    select = document.getElementById('addrContrainer'),
    pSelectAddr = document.getElementById('pSelectAddr'),
    getOutputField = document.getElementById('outputField'),
    nName = document.getElementById('nName'),
    br = document.createElement('br');

var value,
    out,
    option,
    txt,
    selectedOption;

var btn1 = document.getElementById('_1'),
    btn2 = document.getElementById('_2'),
    btn3 = document.getElementById('_3'),
    inputField1 = document.getElementById('input_1'),
    inputField2 = document.getElementById('input_2'),
    inputField3 = document.getElementById('input_3');

    var holdersArr
    var firstHolderCounter = 0;

//solidity Events


//prototypes

Array.prototype.checkUnique = function () {
  this.sort();
  if (this.length >= 2) {
    for (var i = 1; i < this.length; i++) {
      if (this[i - 1] === this[i]) {
        return false;
      } else{
        return true;
      }
    }
  } else {
    return true;
  }
};

//Pre funcs
var outputField = function(input){
  var txt = document.createTextNode(input);
  var p = document.createElement('p');
  p.appendChild(txt);
  getOutputField.appendChild(p);
}

for (var i = 0; i < account.length; i++) {
  txt = document.createTextNode(account[i]);
  option = document.createElement('option')
  option.appendChild(txt);
  option.setAttribute("value", i);
  select.appendChild(option);
}

var selectedOption;
var nNameVal;

document.getElementById('setUser').addEventListener('click', function(){
  selectedOption = select.options[select.selectedIndex].value;  //selected vals
  nNameVal = nName.value;
  console.log('click');
  if (!(web3.eth.defaultAccount === account[selectedOption])) {
    holdersArr = contractInstance.getHolderArr();          //all adresses
    holdersArr.push(account[selectedOption]);
    console.log(holdersArr);
      if(holdersArr.checkUnique()){                      //check on uniqueness of address
        holdersArr.pop();
          console.log(holdersArr);
            //make a string[] in contract en return deze en doe het zelfde als met holdersAddr;
            web3.eth.defaultAccount = account[selectedOption];
            contractInstance.setHolder(web3.eth.defaultAccount, nNameVal)
            pSelectAddr.innerHTML = "current address: " + account[selectedOption];
            pnName.innerHTML = "nickname: " + nNameVal;
            pbalance.innerHTML = "balance: " + web3.eth.getBalance(account[selectedOption]) + ' wei';
            btn1.disabled = false;
            btn2.disabled = false;
            btn3.disabled = false;
          } else {
        holdersAddr.pop();
        pSelectAddr.innerHTML = "this address is already in use";
        pnName.innerHTML = "";
        pbalance.innerHTML = "";
      }
    } else {
      console.log('same');
      return
    }
  }
);

//solidity events
// var LogSender = contractInstance.LogSender();
// LogSender.watch(function(err, res){
//   if(!err){
//     outputField(res.args._from);
//   }
// })



//btn Events

btn1.addEventListener('click', function(){


  // value = parseInt(inputField1.value, 10);
  // contractInstance.deposit(value, {from: web3.eth.defaultAccount}, function(){
  //   console.log('deposit: ' + value);
  //   console.log('connect');
  // });
});

btn2.addEventListener('click', function(){


  // value = parseInt(inputField2.value, 10)
  // contractInstance.withdraw(value, {from: web3.eth.defaultAccount}, function(){
  //   console.log('withdraw: ' + inputField2.value);
  // });
});

btn3.addEventListener('click', function(){


  // contractInstance.retSender()
});


//Test Functions

// function getBalance (address){
//   return web3.eth.getBalance(address, function(err,result){
//     if(!err){
//       console.log('balance: '+ address + ' ' + result);
//     } else {
//       console.log(err);
//     }
//   })
// }
