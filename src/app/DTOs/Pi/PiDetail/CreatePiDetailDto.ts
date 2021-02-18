export class CreatePiDetailDto{
    constructor(
        public depositPrice :number,
        public depositDate:Date, 
        public piId:number ,
        public brokerId:number
    ){

    }
}