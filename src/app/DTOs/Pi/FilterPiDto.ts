import {  PiRemaindDto } from './PiRemaindDto';


export class FilterPiDto {
  constructor(
    public pageId: number,
    public pageCount: number,
    public startPage: number,
    public endPage: number,
    public takeEntity: number,
    public skipEntity: number,
    public activePage: number,
    public searchText: string = '',
    public piRemaind: PiRemaindDto[]

  ) { }
}
