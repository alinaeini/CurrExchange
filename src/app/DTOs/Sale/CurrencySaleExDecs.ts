export class CurrencySaleExDecs {
    constructor(
        public id: number,
        public currSaleDate: Date,
        public price: number,
        public exDecCode: string,
        public brokerName: string  ,
        public customerName: string    ,
        public exDecPrice:number
    ) { }
}



