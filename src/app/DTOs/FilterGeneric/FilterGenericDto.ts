
export class FilterGenericDto<TEntityDto> {
    constructor(
        public pageId: number,
        public pageCount: number,
        public startPage: number,
        public endPage: number,
        public takeEntity: number,
        public skipEntity: number,
        public activePage: number,
        public searchText: string = '',
        public entities: TEntityDto[]

    ) { }
}
