export class CurrencySaleDto {
    constructor(
        public id: number,
        public price: number,
        public profitLossAmount: number,
        public currSaleDate: Date,
        public piCode: string,
        public brokerName: string,
        public customerName: string,
        public salePricePerUnit:number,
        public transferPrice:number,
        public transferType:number
         
    ) { }
}


export enum CurrencyTransferType{
    Cash,
    Accounting
}