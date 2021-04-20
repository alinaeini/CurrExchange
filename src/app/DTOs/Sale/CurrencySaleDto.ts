import { CurrencyType } from './CurrencyType';
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
        public transferType:number,
        public currencyType :CurrencyType
         
    ) { }
}


export class CurrencySaleToReportDto {
    constructor(
        public id: number,
        public price: number,
        public profitLossAmount: number,
        public currSaleDate: string,
        public piCode: string,
        public brokerName: string,
        public customerName: string,
        public salePricePerUnit:number,
        public transferPrice:number,
        public transferType:number,
        public currencyType :number
         
    ) { }
}


export enum CurrencyTransferType{
    Cash,
    Accounting
}