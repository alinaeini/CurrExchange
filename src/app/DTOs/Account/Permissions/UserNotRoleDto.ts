import { RolePermissionItem } from "./RolePermissionItem";


export class UserNotRoleDto {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: String,
        public userName: string,
        public roleName:string=''
    ) {
    }
}


