
      export class PiDetailCompleteDto {
        constructor (
          public id: number,
          public depositPrice :number,
          public depositDate:Date, 
          public piId:number ,
          public brokerId:number ,
          public isSold:boolean,
          public piCode:string,
          public brokerName:string,
          public totalPrice:number ,
          public customerName:string

          //public brokerTitle:string,
      
            )
            {
      
            }
      
      }