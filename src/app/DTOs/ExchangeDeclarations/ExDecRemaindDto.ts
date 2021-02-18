
export class ExDecRemaindDto {
  constructor(
    public id: number,
    public exCode: string,
    public price: number,
    public qty: number,
    public expireDate: Date,
    public soldPrice: number,
    public remaindPrice: number
  ) {
  }

}
