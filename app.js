var Web3 = require('web3')
var EthereumTransaction = require("ethereumjs-tx").Transaction
//const EthereumTx = require('ethereumjs-tx').Transaction
var url = 'HTTP://127.0.0.1:9545' // 8545 if using ganache-cli
var web3 = new Web3(url)
var sendingAddress = '0x5f0f037b77Ee98c9563Cb881fD91618E98Feefa2';
var receivingAddress = '0xA0f0640474C8b2019E3E1F7C126096ac95738DDe';
web3.eth.getBalance(sendingAddress).then(console.log) ;
web3.eth.getBalance(receivingAddress).then(console.log);
//web3.eth.getAccounts().then(accounts => console.log(accounts));
/*##########################
CREATE A TRANSACTION
##########################*/
// -- Step 4: Set up the transaction using the transaction variables as shown var rawTransaction = { nonce: 0, to: receivingAddress, gasPrice: 20000000, gasLimit: 30000, value: 1, data: "" }
// -- Step 5: View the raw transaction rawTransaction
// -- Step 6: Check the new account balances (they should be the same) web3.eth.getBalance(sendingAddress).then(console.log) web3.eth.getBalance(receivingAddress).then(console.log)
// Note: They haven't changed because they need to be signed...
var rawTransaction = { nonce: '0x0342', to: receivingAddress, gasPrice: '0x20000000', gasLimit: '0x30000', value: '0x01', data: "0x000" }

//Sign the transaction
var privateKeySender ='ea1cc6f3eba8fdb5a551462cb3ba64e7f496df932c508e406ea66e45a476113e';
var privateKeySenderHex = Buffer.from(privateKeySender, 'hex');
var transaction = new EthereumTransaction(rawTransaction) ;
transaction.sign(privateKeySenderHex);
//Sign the transactions
var serializedTransaction = transaction.serialize();
web3.eth.sendSignedTransaction(serializedTransaction);