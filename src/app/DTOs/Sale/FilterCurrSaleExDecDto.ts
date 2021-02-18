import { CurrencySaleExDecs } from "./CurrencySaleExDecs";

export class FilterCurrSaleExDecDto {
    constructor(
        public pageId: number,
        public pageCount: number,
        public startPage: number,
        public endPage: number,
        public takeEntity: number,
        public skipEntity: number,
        public activePage: number,
        public searchText: string = '',
        public id: number,
        public currencySaleExDecs: CurrencySaleExDecs[]
      ) { }
}



