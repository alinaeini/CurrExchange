export class CreatePiDto{
    constructor(
        public  piCode :string,
        public  piDate :Date,
        public  basePrice :number,
        public  totalPrice :number,

    ){

    }
}