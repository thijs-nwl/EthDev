web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var btnSet = document.getElementById('set'),
    btnDouble = document.getElementById('double'),
    btnGet = document.getElementById('get'),
    inputField = document.getElementById('setVal'),
    outputBox = document.getElementsByClassName('box2')[0],
    h3 = document.createElement('H3'),
    br = document.createElement('BR');

var value = undefined;
var txt = undefined;

console.log(web3.version);

var log = function(func, out) {
  txt = document.createTextNode(func)
  h3.appendChild(txt);
  h3.appendChild(br);
  outputBox.appendChild(h3);
}

  btnSet.addEventListener('click', function () {
    value = parseInt(inputField.value, 10);
    if (EmbarkJS.isNewWeb3()) {
      PlayField.methods.set(value).send({from: 'web3.eth.defaultAccount'});
      console.log(value);
      log('PlayField.set()')
    } else {
      PlayField.set(value);
      log('PlayField.set()');
    }
  });

  btnDouble.addEventListener('click', function () {
    if(EmbarkJS.isNewWeb3()){
      PlayField.methods.double().send({from: '0x752db87ebbe1314c9d66948acf3d26b92bdc31f7'})
      log('PlayField.double()')
    }
  });

  btnGet.addEventListener('click', function () {
    if(EmbarkJS.isNewWeb3()){
      PlayField.methods.get().call(function (err, x){
        console.log(x);
      });
      PlayField.methods.retsOwner().call(function (err, y){
        console.log(y);
      })
    } else {
      PlayField.get().then(function (retVal){
        console.log(retVal);
        log('PlayField.get()', retVal)
    });
  };
})
