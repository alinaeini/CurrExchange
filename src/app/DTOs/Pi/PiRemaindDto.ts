
export class PiRemaindDto {
  constructor(
    public  id: number,
    public  piCode :string,
    public  piDate :Date,
    public  basePrice :number,
    public  totalPrice :number,
    public  soldPrice: number,
    public  remaindPrice: number,
    
  ) {
  }

}
