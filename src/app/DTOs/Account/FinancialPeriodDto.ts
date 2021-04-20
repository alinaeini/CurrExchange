export class FinancialPeriodDto{
    constructor(
        public financialPeriodId:number,
        public fromDate:Date,
        public toDate:Date,
        public priodName: string,
    ){

    }
}