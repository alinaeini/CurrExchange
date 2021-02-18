
import { BrokerDto } from './BrokerDto';
export class FilterBrokerDto{
    constructor(
        public pageId: number,
        public pageCount: number,
        public startPage: number,
        public endPage: number,
        public takeEntity: number,
        public skipEntity: number,
        public activePage: number,
        public searchText: string = '',
        public brokerDtos: BrokerDto[]
    
      ){}
} 