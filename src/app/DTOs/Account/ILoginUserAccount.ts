import { UserRolePermissionDto } from './Permissions/UserRolePermissionDto';
export interface ILoginUserAccount{
    status:string;
    data:{
        token:string,
        expireTime:number,
        firstName:string,
        lastName:string,
        userId:number,
        userRole:string,
        userPermissions:UserRolePermissionDto[]
        info:string
    }
}

