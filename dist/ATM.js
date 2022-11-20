import chalk from "chalk";
export class ATM {
    cardNumber;
    PIN;
    name;
    transactionArr = [];
    balance = 1000;
    constructor(cardNumber, PIN) {
        this.cardNumber = cardNumber;
        this.PIN = PIN;
    }
    set Name(name) {
        this.name = name;
    }
    get Name() {
        return this.name;
    }
    deposit(amount) {
        this.balance += amount;
        const data = {
            type: "deposit",
            amount: amount
        };
        this.transactionArr.push(data);
        console.log(chalk.green(`> Transaction has been done and now you have Rs.${this.balance}`));
    }
    withDraw(amount) {
        if (amount > this.balance) {
            console.log(chalk.redBright(`> You dont have sufficient balance`));
        }
        else {
            this.balance -= amount;
            const data = {
                type: "withdraw",
                amount: amount
            };
            this.transactionArr.push(data);
            console.log(chalk.green(`> Transaction has been done and now you have Rs.${this.balance}`));
        }
    }
    showBalance() {
        console.log(chalk.green(`> Currently you have ${this.balance}`));
    }
    sendMoney(amnt, acc) {
        if (amnt <= this.balance) {
            {
                this.balance -= amnt;
                const data = {
                    type: "Sent Money",
                    amount: amnt,
                    receiver: acc
                };
                this.transactionArr.push(data);
                console.log(chalk.green(`${amnt} has been sent to account ID${acc}`));
                console.log(chalk.green(`Now your balance is ${this.balance}`));
            }
        }
        else {
            console.log(chalk.redBright(`> You dont have sufficient balance.`));
        }
    }
    transactions() {
        if (this.transactionArr.length >= 1) {
            this.transactionArr.forEach(e => {
                if (this.transactionArr.length == 0) {
                    console.log(chalk.red(`> No data to display`));
                }
                else {
                    console.log(`--------------------`);
                    console.log(chalk.green(`Type of Transaction: ${e.type}`));
                    console.log(chalk.green(`Amount: ${e.amount}`));
                    if (e.receiver) {
                        console.log(chalk.green(`Receiver: ID${e.receiver}`));
                    }
                }
            });
        }
        else {
            console.log(chalk.red(`> No data to display.`));
        }
    }
}
//# sourceMappingURL=ATM.js.map