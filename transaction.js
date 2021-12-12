class Transaction {
	constructor(timestamp, payerAddress, payeeAddress, amount) {
		this.timestamp = timestamp;
		this.payerAddress = payerAddress;
		this.payeeAddress = payeeAddress;
		this.amount = amount;
	}
}

module.exports = Transaction;
