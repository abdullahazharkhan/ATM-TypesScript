import chalk from "chalk";
export class ATM {
    private cardNumber: string;
    private PIN: number;
    private name: string;
    public transactionArr: {
        type: string;
        amount: number;
        receiver?: number;
    }[] = [];
    public balance: number = 1000;

    constructor(cardNumber: string, PIN: number){
        this.cardNumber = cardNumber;
        this.PIN = PIN;
    }

    set Name(name: string) {
        this.name = name;
    }

    get Name(): string {
        return this.name;
    }
    public deposit(amount: number): void {
        this.balance += amount;
        const data: {type: string; amount: number;} = {
            type: "deposit",
            amount: amount
        }
        this.transactionArr.push(data);
        console.log(chalk.green(`> Transaction has been done and now you have Rs.${this.balance}`));
    }

    public withDraw(amount: number): void {
        if(amount > this.balance){
            console.log(chalk.redBright(`> You dont have sufficient balance`));
        } else {
            this.balance -= amount;
            const data: {type: string; amount: number;} = {
                type: "withdraw",
                amount: amount
            }
            this.transactionArr.push(data);
            console.log(chalk.green(`> Transaction has been done and now you have Rs.${this.balance}`));
        }
    }
    
    public showBalance(): void {
        console.log(chalk.green(`> Currently you have ${this.balance}`))
    }

    public sendMoney(amnt: number, acc: number): void {
        if(amnt <= this.balance) {
            {
                this.balance -= amnt;
                const data: {type: string; amount: number; receiver: number;} = {
                    type: "Sent Money",
                    amount: amnt,
                    receiver: acc
                }
                this.transactionArr.push(data);
                console.log(chalk.green(`${amnt} has been sent to account ID${acc}`));
                console.log(chalk.green(`Now your balance is ${this.balance}`));
            }
        } else {
            console.log(chalk.redBright(`> You dont have sufficient balance.`));
        }
    }

    public transactions(): void {
        if(this.transactionArr.length >= 1) {
            this.transactionArr.forEach(e => {
                if(this.transactionArr.length == 0) {
                    console.log(chalk.red(`> No data to display`));
                } else {
                    console.log(`--------------------`)
                console.log(chalk.green(`Type of Transaction: ${e.type}`));
                console.log(chalk.green(`Amount: ${e.amount}`));
                if(e.receiver){
                    console.log(chalk.green(`Receiver: ID${e.receiver}`));
                }
                }
            });
        } else {
            console.log(chalk.red(`> No data to display.`));
        }
    }
}