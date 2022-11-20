#! /usr/bin/env node
import * as inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import { ATM } from "./ATM.js";
const prompt = inquirer.createPromptModule();
// to generate random ID
let uniqueCardNum = () => {
    let numx = Date.now().toString().substring(6, 11);
    let num = parseInt(numx);
    return `ID${num}`;
};
const uniID = uniqueCardNum();
// to generate pin
let cardPin = () => {
    let numx = Date.now().toString().substring(9, 12);
    let num = parseInt(numx);
    return num;
};
const pass = cardPin();
const atm = new ATM(uniID, cardPin());
function getInfo() {
    prompt([
        {
            type: "input",
            name: 'name',
            message: chalk.green("Enter Your name \n")
        }
    ]).then(ans => {
        if (ans["name"] != "") {
            ans["name"] = atm.Name = ans["name"];
            main();
        }
        else {
            console.log(chalk.redBright(`invalid operation`));
            getInfo();
        }
    });
}
function main() {
    prompt([
        {
            type: "input",
            name: "cardNum",
            message: chalk.green("Enter your card number here \n")
        },
        {
            type: "input",
            name: "pin",
            message: chalk.green("Enter your PIN here \n")
        }
    ]).then(ans => {
        if (ans["cardNum"] != "" && ans["pin"] != "") {
            if (ans["cardNum"] == uniID) {
                if (parseInt(ans["pin"]) == pass) {
                    console.log(chalk.greenBright(`Hi! ${atm.Name} successfully logged in`));
                    actions();
                }
                else {
                    console.log(chalk.redBright(`> invalid pass`));
                    main();
                }
            }
            else {
                console.log(chalk.redBright(`> invalid ID`));
                main();
            }
        }
        else {
            console.log(chalk.redBright(`> invalid operation`));
            main();
        }
    });
}
function actions() {
    prompt([
        {
            type: "list",
            name: "choice",
            message: chalk.green("What do you want to do?"),
            choices: ["Show Balance", "Deposit", "Withdraw", "Send Money", "Transactions", "Quit"]
        }
    ]).then(ans => {
        switch (ans["choice"]) {
            case "Show Balance":
                atm.showBalance();
                actions();
                break;
            case "Deposit":
                deposit();
                break;
            case "Withdraw":
                withDraw();
                break;
            case "Send Money":
                sendMoney();
                break;
            case "Transactions":
                transactions();
                break;
            case "Quit":
                console.log(chalk.cyanBright(`Take your card, bye!!!`));
                break;
            default:
                break;
        }
    });
}
function deposit() {
    prompt([
        {
            type: "input",
            name: "dpt",
            message: chalk.green("How many amount you want to deposit? \n")
        }
    ]).then(ans => {
        if (ans["dpt"] != "") {
            let number = isNum(ans["dpt"]);
            if (number) {
                let amount = parseInt(ans["dpt"]);
                atm.deposit(amount);
                actions();
            }
            else {
                console.log(chalk.redBright(`> invalid input`));
                actions();
            }
        }
        else {
            console.log(chalk.redBright(`> invalid operation!`));
            actions();
        }
    });
}
function withDraw() {
    prompt([
        {
            type: "input",
            name: "wth",
            message: chalk.green("How much amount you want to withdraw? \n")
        }
    ]).then(ans => {
        if (ans["wth"] != "") {
            let number = isNum(ans["wth"]);
            if (number) {
                let amount = parseInt(ans["wth"]);
                atm.withDraw(amount);
                actions();
            }
            else {
                console.log(chalk.redBright(`> invalid input`));
                actions();
            }
        }
        else {
            console.log(chalk.redBright(`> invalid operation!`));
            actions();
        }
    });
}
function sendMoney() {
    prompt([{
            type: "input",
            name: "accID",
            message: chalk.green("Enter account ID of receiver (5 digits) \n")
        }, {
            type: "input",
            name: "amount",
            message: chalk.green("Enter amount")
        }]).then(ans => {
        if (ans["accID"] != "" && ans["amount"] != "") {
            if (ans["accID"].length == 5) {
                let number = isNum(ans["accID"]);
                let acc = parseInt(ans["accID"]);
                if (number) {
                    let amnt = isNum(ans["amount"]);
                    let amnot = parseInt(ans["amount"]);
                    if (amnt) {
                        prompt([{ type: "input", name: "pinagn", message: "Enter Your PIN to confirm" }]).then(ans => {
                            if (ans["pinagn"] == pass) {
                                atm.sendMoney(amnot, acc);
                                actions();
                            }
                            else {
                                console.log(chalk.redBright(`> invalid pin`));
                            }
                        });
                    }
                    else {
                        console.log(chalk.redBright(`> amount can only be a number`));
                        sendMoney();
                    }
                }
                else {
                    console.log(chalk.redBright(`> invalid input`));
                    sendMoney();
                }
            }
            else {
                console.log(chalk.redBright(`> invalid ID`));
                sendMoney();
            }
        }
        else {
            console.log(chalk.redBright(`> invalid operation`));
            actions();
        }
    });
}
function transactions() {
    atm.transactions();
    actions();
}
function isNum(str) {
    const num1 = parseInt(str);
    const num2 = !isNaN(num1);
    return num2;
}
console.log(chalk.cyan(figlet.textSync('ATMachine', {
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
})));
console.log(chalk.bgYellow(chalk.bold(`> Enter Your credentials to use ATM`)));
console.log(chalk.green(`Your CardNumber is ${uniID} and its password is ${pass}`));
getInfo();
//# sourceMappingURL=index.js.map