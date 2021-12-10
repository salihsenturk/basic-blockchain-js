const Block = require('./block');

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
		this.difficulty = 5;
	}

	createGenesisBlock = () => {
		return new Block(0, '08/12/2021', 'Genesis Block', '0');
	};

	getLatestBlock = () => {
		return this.chain[this.chain.length - 1];
	};

	addBlock = (newBlock) => {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
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
}

module.exports = Blockchain;
