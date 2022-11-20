export declare class ATM {
    private cardNumber;
    private PIN;
    private name;
    transactionArr: {
        type: string;
        amount: number;
        receiver?: number;
    }[];
    balance: number;
    constructor(cardNumber: string, PIN: number);
    set Name(name: string);
    get Name(): string;
    deposit(amount: number): void;
    withDraw(amount: number): void;
    showBalance(): void;
    sendMoney(amnt: number, acc: number): void;
    transactions(): void;
}
