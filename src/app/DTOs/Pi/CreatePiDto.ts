export class CreatePiDto{
    constructor(
        public  piCode :string,
        public  piDate :Date,
        public  basePrice :number,
        public  totalPrice :number,
        public  description:string,
        public  customerId:number
    ){

    }
}