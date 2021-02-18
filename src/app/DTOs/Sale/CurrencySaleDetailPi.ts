

export class CurrencySaleDetailPi {
    constructor(
        public id: number,
        public price: number,
        public profitLossAmount: number,
        public currSaleDate: Date,
        public piCode: string,
        public brokerName: string,
        public customerName: string,
        public piDetailPrice:number
    ) { }
}



