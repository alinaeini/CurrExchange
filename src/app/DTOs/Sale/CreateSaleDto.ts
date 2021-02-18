import { ExDecExport } from "./ExDecExport";
export class CreateSaleDto{
    constructor(
        public saleDate:Date,
        public salePrice:number,
        public salePricePerUnit:number,
        public transferType: number,
        public transferPrice: number,
        public description: string,
        public brokerId: number,
        public customerId: number,
        public exDecExport:ExDecExport[]
    ){

    }
}