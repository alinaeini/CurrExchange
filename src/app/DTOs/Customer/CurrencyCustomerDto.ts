

export class CurrencyCustomerDto {
    constructor(
        public id: number,
        public name: string,
        public title: string,
        public phone: string,
        public address: string,
        public soldAmount: number
    ) {
    }
}
