import { UserRolePermissionDto } from './Permissions/UserRolePermissionDto';
export class CurrentUserDto{
    constructor(
        public userId:number,
        public firstName:string,
        public lastName:String,
        public userRole: string,
        public userPermissions:UserRolePermissionDto[],
        public financialPeriodId:string,
    ){

    }
}



