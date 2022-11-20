import * as inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import { ATM } from "./ATM.js";
const prompt = inquirer.createPromptModule();

// to generate random ID
let uniqueCardNum = (): string => {
  let numx = Date.now().toString().substring(6, 11);
  let num = parseInt(numx);
  return `ID${num}`;
};
const uniID: string = uniqueCardNum();
// to generate pin
let cardPin = (): number => {
  let numx = Date.now().toString().substring(9, 12);
  let num = parseInt(numx);
  return num;
};
const pass: number = cardPin();
const atm: ATM = new ATM(uniID, cardPin());
function getInfo(): void {
  prompt([
    {
      type: "input",
      name: "name",
      message: chalk.green("Enter Your name \n"),
    },
  ]).then((ans) => {
    if (ans["name"] != "") {
      ans["name"] = atm.Name = ans["name"];
      main();
    } else {
      console.log(chalk.redBright(`invalid operation\n` ));
      getInfo();
    }
  });
}
function main(): void {
  prompt([
    {
      type: "input",
      name: "cardNum",
      message: chalk.green("Enter your card number here \n"),
    },
    {
      type: "input",
      name: "pin",
      message: chalk.green("Enter your PIN here \n"),
    },
  ]).then((ans) => {
    if (ans["cardNum"] != "" && ans["pin"] != "") {
      if (ans["cardNum"] == uniID) {
        if (parseInt(ans["pin"]) == pass) {
          console.log(
            chalk.greenBright(`Welcome ${atm.Name}, you have successfully logged in \n`)
          );
          actions();
        } else {
          console.log(chalk.redBright(`> invalid pass \n`));
          main();
        }
      } else {
        console.log(chalk.redBright(`> invalid ID\n`));
        main();
      }
    } else {
      console.log(chalk.redBright(`> invalid operation\n`));
      main();
    }
  });
}
function actions(): void {
  prompt([
    {
      type: "list",
      name: "choice",
      message: chalk.green("What do you want to do?\n"),
      choices: [
        "Show Balance",
        "Deposit",
        "Withdraw",
        "Send Money",
        "Transactions",
        "Quit",
      ],
    },
  ]).then((ans) => {
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
        console.log(chalk.cyanBright(`Take your card, bye!!!\n`));
        break;
      default:
        break;
    }
  });
}

function deposit(): void {
  prompt([
    {
      type: "input",
      name: "dpt",
      message: chalk.green("How many amount you want to deposit? \n"),
    },
  ]).then((ans) => {
    if (ans["dpt"] != "") {
      let number: boolean = isNum(ans["dpt"]);
      if (number) {
        let amount: number = parseFloat(ans["dpt"]);
        atm.deposit(amount);
        actions();
      } else {
        console.log(chalk.redBright(`> invalid input\n`));
        actions();
      }
    } else {
      console.log(chalk.redBright(`> invalid operation!\n`));
      actions();
    }
  });
}

function withDraw(): void {
  prompt([
    {
      type: "input",
      name: "wth",
      message: chalk.green("How much amount you want to withdraw? \n"),
    },
  ]).then((ans) => {
    if (ans["wth"] != "") {
      let number: boolean = isNum(ans["wth"]);
      if (number) {
        let amount: number = parseFloat(ans["wth"]);
        atm.withDraw(amount);
        actions();
      } else {
        console.log(chalk.redBright(`> invalid input\n`));
        actions();
      }
    } else {
      console.log(chalk.redBright(`> invalid operation!\n`));
      actions();
    }
  });
}

function sendMoney(): void {
  prompt([
    {
      type: "input",
      name: "accID",
      message: chalk.green("Enter account ID of receiver (5 digits) \n"),
    },
    {
      type: "input",
      name: "amount",
      message: chalk.green("Enter amount"),
    },
  ]).then((ans) => {
    if (ans["accID"] != "" && ans["amount"] != "") {
      if (ans["accID"].length == 5) {
        let number: boolean = isNum(ans["accID"]);
        let acc: number = parseInt(ans["accID"]);
        if (number) {
          let amnt: boolean = isNum(ans["amount"]);
          let amnot: number = parseInt(ans["amount"]);
          if (amnt) {
            prompt([
              {
                type: "input",
                name: "pinagn",
                message: "Enter Your PIN to confirm\n",
              },
            ]).then((ans) => {
              if (ans["pinagn"] == pass) {
                atm.sendMoney(amnot, acc);
                actions();
              } else {
                console.log(chalk.redBright(`> invalid pin\n`));
              }
            });
          } else {
            console.log(chalk.redBright(`> amount can only be a number\n`));
            sendMoney();
          }
        } else {
          console.log(chalk.redBright(`> invalid input\n`));
          sendMoney();
        }
      } else {
        console.log(chalk.redBright(`> invalid ID\n`));
        sendMoney();
      }
    } else {
      console.log(chalk.redBright(`> invalid operation\n`));
      actions();
    }
  });
}

function transactions(): void {
  atm.transactions();
  actions();
}

function isNum(str: string): boolean {
  const num1: number = parseInt(str);
  const num2: boolean = !isNaN(num1);
  return num2;
}
console.log( 
  chalk.cyan(
    figlet.textSync("\t\t ATMachine", {
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  )
);
console.log(chalk.bgYellow(chalk.bold(`> Enter Your credentials to use ATM\n`)));
console.log(
  chalk.green(`Your CardNumber is ${uniID} and its password is ${pass}`)
);
getInfo();
