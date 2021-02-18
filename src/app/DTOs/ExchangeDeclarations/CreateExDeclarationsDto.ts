export class CreateExDeclarationsDto {
  constructor(
    public exCode: string,
    public price: number,
    public qty: number,
    public expireDate: Date
  ) {
  }

}


