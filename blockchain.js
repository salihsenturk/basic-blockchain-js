const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain {
	constructor() {
		this.chain = [];
		this.difficulty = 3;
		this.unminedTransactions = [];
		this.miningReward = 50;
		this.registeredAddresses = ['salix-wallet', 'salih-wallet', 'miner-wallet'];
		this.createGenesisBlock();
		this.airdropCoins(100);
	}

	airdropCoins = (coins) => {
		this.registeredAddresses.forEach((address) => {
			let transaction = new Transaction(Date.now(), 'mint', address, coins);
			this.unminedTransactions.push(transaction);
		});
		this.mineCurrentBlock('miner-wallet');
	};

	createGenesisBlock = () => {
		let transaction = new Transaction(Date.now(), 'mint', 'genesis', 0);
		this.chain.push(new Block(Date.now(), [transaction], '0'));
	};

	getLatestBlock = () => {
		return this.chain[this.chain.length - 1];
	};

	mineCurrentBlock = (minerAddress) => {
		let validatedTransactions = [];
		this.unminedTransactions.forEach((transaction) => {
			if (transaction.payerAddress === 'mint' || this.validateTransaction(transaction)) {
				validatedTransactions.push(transaction);
			}
		});

		console.log('Total transactions: ' + this.unminedTransactions.length);
		console.log('Transactions validated: ' + validatedTransactions.length);

		let newBlock = new Block(Date.now(), validatedTransactions, this.getLatestBlock().hash);
		newBlock.mineBlock(this.difficulty);
		console.log('Current block successfully mined...');

		this.chain.push(newBlock);
		this.unminedTransactions = [new Transaction(Date.now(), 'mint', minerAddress, this.miningReward)];
	};

	validateTransaction = (transaction) => {
		let payersBalance = this.getAddressBalance(transaction.payerAddress);
		if (payersBalance >= transaction.amount) {
			return true;
		}
		return false;
	};

	isChainValid = () => {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const prevBlock = this.chain[i - 1];

			// validate data integrity
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			// validate hash chain link
			if (currentBlock.previousHash !== prevBlock.hash) {
				return false;
			}
		}
		return true;
	};

	createTransaction = (transaction) => {
		this.unminedTransactions.push(transaction);
	};

	getAddressBalance = (address) => {
		let balance = 0;
		this.chain.forEach((block) => {
			block.transactions.forEach((transaction) => {
				if (transaction.payerAddress === address) {
					balance -= transaction.amount;
				} else if (transaction.payeeAddress === address) {
					balance += transaction.amount;
				}
			});
		});
		return balance;
	};
}

module.exports = Blockchain;
