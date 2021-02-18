export interface ICurrencySaleFilter {
    brokerId: number;
    customerId: number;
    isCashed: boolean;
    isAccount: boolean;
    // isProfitAmount: boolean;
    // isLossAmount: boolean;
    fromDateSale: string;
    toDateSale: string;
    fromSaleBasePrice: number;
    toSaleBasePrice: number;
}
