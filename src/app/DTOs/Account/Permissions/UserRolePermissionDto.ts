import { PermissionsDto } from "./PermissionsDto";


export class UserRolePermissionDto {
    constructor(
        public parentName: string,
        public detaiList: PermissionsDto[]
    ) { }


}


