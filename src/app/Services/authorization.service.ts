import { CurrentUserDto } from "./../DTOs/Account/CurrentUserDto";
import { ILoginUserAccount } from "./../DTOs/Account/ILoginUserAccount";
import { LoginUserDto } from "./../DTOs/Account/LoginUserDto";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { RegisterUserDTO } from "./../DTOs/Account/RegisterUserDTO";
import { Injectable } from "@angular/core";
import { IUserAuthResult } from "../DTOs/Account/IUserAuthResult";
import { promise } from "protractor";
import { resolve } from "dns";
import { rejects } from "assert";
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { ICheckUserAuthResult } from '../DTOs/Account/ICheckUserAuthResult';
import { UserNotRoleDto } from "../DTOs/Account/Permissions/UserNotRoleDto";
import { PermissionsTreeDto } from "../DTOs/Account/Permissions/PermissionsTreeDto";
import { UserAccountPermissions } from '../DTOs/Account/Permissions/RolePermissionItem';

@Injectable({
  providedIn: "root",
})
export class AuthorizationService {

  private currentUser: BehaviorSubject<CurrentUserDto> = new BehaviorSubject<CurrentUserDto>(null);
  private loggedIn = false;
  constructor(private http: HttpClient) {}

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return promise;
  }
  
  registerUserService(userData: RegisterUserDTO): Observable<any> {
       return this.http.post<any>("/account/register", userData);
  }

  loginUserService(loginData: LoginUserDto): Observable<ILoginUserAccount> {
    return this.http.post<ILoginUserAccount>("/account/login", loginData);
  }

getUserListNotRoles(): Observable<IResponseResult<UserNotRoleDto[]>> {
    return this.http.post<IResponseResult<UserNotRoleDto[]>>("/account/users-any-roles",null);
  }
  getAllPermissions(): Observable<IResponseResult<PermissionsTreeDto[]>> {
    return this.http.post<IResponseResult<PermissionsTreeDto[]>>("/account/users-permissions",null);
  }

  setCurrentUser(user: CurrentUserDto): void {
    this.currentUser.next(user);
    this.loggedIn = user !== null;
  }
  getCurrentUser(): Observable<CurrentUserDto> {
    return this.currentUser;
  }


  checkUserAuth(): Observable<ICheckUserAuthResult> {
      return this.http.post<ICheckUserAuthResult>('/account/check-auth', null);
  }

  setAllUsersAccountPermissions(userAccountPermissions: UserAccountPermissions): Observable<any> {
    //console.log(JSON.stringify(userAccountPermissions));
    
    return this.http.post<any>('/account/user-account-permission', userAccountPermissions);
}

  logOutUser(): Observable<any> {
    return this.http.get("/account/signout");
  }
  activateUser(emailActiveCode: string): Observable<any> {
    return this.http.get("/account/activate-account/" + emailActiveCode);
  }
  editUserAccount(edituser: CurrentUserDto): Observable<IResponseResult<any>> {
    return this.http.post<IResponseResult<any>>("/account/edit-user",edituser);
  }


}
