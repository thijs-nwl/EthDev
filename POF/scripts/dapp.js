if(typeof web3 !== 'undefined'){
  web3 = new Web3(web3.currentProvider)
}else{
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}
web3.eth.defaultAccount = web3.eth.accounts[0];

var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destory",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "transferCoins",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "updateUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
var ClientReceipt = web3.eth.contract(abi);
var Project = ClientReceipt.at("0x5f5df82c0c159c3129f2a3f4f14037b1ab3b77b7")


var Me = document.getElementById('Me');
    user = document.getElementById('user'),
    coins = document.getElementById('coins'),
    ethAddr = document.getElementById('ethAddr');
    currDefAcc = document.getElementById('currDefAcc');


currDefAcc.innerHTML = "current defaultAccount: " + web3.eth.defaultAccount;
function updateInfo(input0, input1){
  user.innerHTML = "Username: " + input0;
  coins.innerHTML = "Coins: " + input1;
  ethAddr.innerHTML = "Address: " + web3.eth.defaultAccount;
  currDefAcc.innerHTML = "current defaultAccount: " + web3.eth.defaultAccount;
}

document.getElementById("selectDefBtn").addEventListener('click', ()=>{
  var index = document.getElementById('selectDefVal').value;
  web3.eth.defaultAccount = web3.eth.accounts[index];
  currDefAcc.innerHTML = "current defaultAccount: " + web3.eth.defaultAccount;
})

document.getElementById("c_1").addEventListener('click', () => {
  var name = document.getElementById("cinput_1").value;
  console.log('click' + name);
  Project.createUser(web3.eth.defaultAccount, name);
  var res = Project.getUser(web3.eth.defaultAccount);
  updateInfo(res[0], res[1].c.toString())
  document.getElementById("createMe").style.display = "none";
  document.getElementById("app").style.display = 'block'
})

document.getElementById("tBtn").addEventListener('click', () =>{
  var tRec = document.getElementById("tRec").value;
  var tAm = document.getElementById("tAmount").value;
  Project.transferCoins(tRec, tAm);
  var data = Project.getUser(web3.eth.defaultAccount);
  updateInfo(data[0], data[1].c.toString())
})

var event = Project.Deposit(function(error, result) {
    if (!error)
        console.log(result);
        if(result.args._to = web3.eth.defaultAccount){
          var res = Project.getUser(web3.eth.defaultAccount);
          updateInfo(res[0], res[1].c.toString())
        }
});





/*
//-----------------------Check if user exists -----------------------//
var createMe = document.getElementById('createMe'),
    app = document.getElementById('app'),
    sub = document.getElementById('sub');

Project.getUser(web3.eth.defaultAccount, (err, res) => {
  console.log(res);
  if (!err && res[2] === true) {
    createMe.style.display = "none";
    app.style.display = "block";
     //cat data out of ipfs and display; if err -> create user; if !err cb();
     updateInfo(res[0], res[1])
  }
});

//---------------------Change user-----------------------//
document.getElementById('selectDefBtn').addEventListener('click', () => {
  web3.eth.defaultAccount = web3.eth.accounts[document.getElementById('selectDefVal').value];
  Project.getUser(web3.eth.defaultAccount, (err, res) => {
    if (!err && res[2] === true) {
      //cat data out of ipfs and display; if err -> create user; if !err cb();
      app.style.display = "block";
      Me.style.display = "block";
      createMe.style.display = "none";
      updateInfo(res[0], res[1])
    } else{
      app.style.display = "none";
      Me.style.display = "none";
      createMe.style.display = "block";
    }
  });
})

//--------------Create user--------------------//
var cbtn1 = document.getElementById('c_1'),
    ccoutput = document.getElementById('coutput'),
    cobj,
    cjson,
    chash;

cbtn1.addEventListener('click', () => {
    cobj = {
      fName: document.getElementById('cinput_1').value,
      Nationallity: document.getElementById('cinput_3').value
    }
    cjson = JSON.stringify(cobj);

    node.files.add(new node.types.Buffer(cjson), function (err, res){
      if(err || !res) {return console.log('ipfs add() error', err, res)}else{console.log('succes '+ res[0])};
      Project.createUser(web3.eth.defaultAccount, ""+res[0].path+"", function(err){
        if(!err){
					console.log("create "+ res[0].path);
          Project.getUser(web3.eth.defaultAccount, (err, res) => {
            if (!err && res[2] === true) {

              createMe.style.display = "none";
              app.style.display = "block";
              //cat data out of ipfs and display; if err -> create user; if !err cb();
              updateInfo(res[0], res[1])
            } else {
              sub.innerHTML = "Something went wrong, please try again";
            }
          });
        }
      });
    })
});


//-----------------Actual app--------------//
//-----------Bank------------//
var tBtn = document.getElementById('tBtn'),
    tRec,
    tAmount;

    var LogTx = Project.transfer();
    LogTx.watch(function(err, res){
      if(!err){
        coins.innerHTML = "Coins: "
      }
    })

    tBtn.addEventListener('click', function(){
      tRec = document.getElementById('tRec').value;
      tAmount = document.getElementById('tAmount').value;
      Project.transferCoins(tRec, tAmount)
    })

*/
