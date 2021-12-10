const Blockchain = require('./blockchain');
const Block = require('./block');

let demoChain = new Blockchain();

console.log('Starting mining...');
demoChain.addBlock(new Block(1, '09/12/2021', { amount: 10 }));
console.log('Starting mining...');
demoChain.addBlock(new Block(2, '10/12/2021', { amount: 25 }));
console.log('Starting mining...');
demoChain.addBlock(new Block(3, '11/12/2021', { amount: 15 }));

console.log('Is chain valid? ' + demoChain.isChainValid());
