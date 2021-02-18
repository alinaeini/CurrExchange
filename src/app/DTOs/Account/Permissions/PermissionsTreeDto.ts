

export class PermissionsTreeDto {
    constructor(
        public displayTitle: string,
        public parentId: number,
        public id: number,
        public selected:boolean,
        public userId : number
    ) { }
}
