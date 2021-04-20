import { PiDetailCompleteDto } from './PiDetailCompleteDto';
export class FilterPiDetailCompleteDto {
    constructor(
      public pageId: number,
      public pageCount: number,
      public startPage: number,
      public endPage: number,
      public takeEntity: number,
      public skipEntity: number,
      public activePage: number,
      public searchText: string = '',
      public fromDateSale:string,
      public toDateSale:string ,
      public piDetailDtos: PiDetailCompleteDto[]
    ) { }
  }