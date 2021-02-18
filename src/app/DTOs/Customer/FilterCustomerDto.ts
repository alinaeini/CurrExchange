import { CustomerDto } from './customerDto';

export class FilterCustomerDto {
    constructor(
        public pageId: number,
        public pageCount: number,
        public startPage: number,
        public endPage: number,
        public takeEntity: number,
        public skipEntity: number,
        public activePage: number,
        public searchText:string='',
        public customerDtos: CustomerDto[]

    ){    }
}



