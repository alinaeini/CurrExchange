import { UserNotRoleDto } from "./UserNotRoleDto";

export interface RolePermissionItem {
    displayTitle: string;
    level: number;
    id: number;
    parentId?: number;
    selected: boolean;
}


export class RolePermissionListItems {
    constructor(
      public userId: number,
      public permissionFlatNode: RolePermissionItem[]
    ){ }
  
   }

   export class UserAccountPermissions{
    constructor(
      public userNotRoleList: UserNotRoleDto[],
      public rolePermissionListItems: RolePermissionListItems[]
    ){ }
   }