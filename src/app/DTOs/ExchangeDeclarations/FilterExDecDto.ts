import { ExDeclarationsDto } from './ExDeclarationsDto';
import { ExDecRemaindDto } from './ExDecRemaindDto';


export class FilterExDecDto {
  constructor(
    public pageId: number,
    public pageCount: number,
    public startPage: number,
    public endPage: number,
    public takeEntity: number,
    public skipEntity: number,
    public activePage: number,
    public searchText: string = '',
    public fromDateSale : string= '', 
    public toDateSale : string = '',
    public isRemaindPriceZero : string= '', 
    public exDecRemaind: ExDecRemaindDto[]
  ) { }
}
