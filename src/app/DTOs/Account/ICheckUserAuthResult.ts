import { UserRolePermissionDto } from './Permissions/UserRolePermissionDto';
export interface ICheckUserAuthResult {
  status: string;
  data: {
    userId: number,
    firstName: string,
    lastName: string,
    userName: string,
    userRole:string,
    userPermissions:UserRolePermissionDto[],
    financialPeriodId:string
  };
}
