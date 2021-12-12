const Blockchain = require('./blockchain');
const Transaction = require('./transaction');

let demoCoin = new Blockchain();

demoCoin.createTransaction(new Transaction(Date.now(), 'salix-wallet', 'salih-wallet', 150));
demoCoin.createTransaction(new Transaction(Date.now(), 'salih-wallet', 'salix-wallet', 20));

console.log('\nmining a block...');
demoCoin.mineCurrentBlock('miner-wallet');

console.log('salix balance: ' + demoCoin.getAddressBalance('salix-wallet'));
console.log('salih balance: ' + demoCoin.getAddressBalance('salih-wallet'));
console.log('miner balance: ' + demoCoin.getAddressBalance('miner-wallet'));

demoCoin.createTransaction(new Transaction(Date.now(), 'salix-wallet', 'salih-wallet', 50));
demoCoin.createTransaction(new Transaction(Date.now(), 'salih-wallet', 'salix-wallet', 20));

console.log('\nmining a block...');
demoCoin.mineCurrentBlock('miner-wallet');

console.log('salix balance: ' + demoCoin.getAddressBalance('salix-wallet'));
console.log('salih balance: ' + demoCoin.getAddressBalance('salih-wallet'));
console.log('miner balance: ' + demoCoin.getAddressBalance('miner-wallet'));
