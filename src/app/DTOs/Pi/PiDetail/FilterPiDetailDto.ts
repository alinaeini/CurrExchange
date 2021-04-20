import { PiDetailDto } from './PiDetailDto';


export class FilterPiDetailDto {
  constructor(
    public pageId: number,
    public pageCount: number,
    public startPage: number,
    public endPage: number,
    public takeEntity: number,
    public skipEntity: number,
    public activePage: number,
    public piId:number,
    public searchText: string = '',
    public piDetailDtos: PiDetailDto[]
  ) { }
}


