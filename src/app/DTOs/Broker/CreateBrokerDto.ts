export class CreateBrokerDto{
    constructor(
        public  name :string,
        public  title :string,
        public  description :string,
        public  tel :string,
        public  address :string,
        public  serviceChargeAccount : number,
        public serviceChargeCash :number

    ){

    }
}

