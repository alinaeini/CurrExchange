import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userAuthGuard } from '../Utilities/userAuthGuard';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/registerComponent';
import { AccountPermissionsComponent } from './account-permissions/account-permissions.component';
import { UsersRoleComponent } from './users-role/users-role.component';


const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'user-permissions', component: AccountPermissionsComponent , canActivate: [userAuthGuard] },
  { path: 'activate-account/:activeCode', component: ActivateAccountComponent},
  { path: 'user-roles', component: UsersRoleComponent, canActivate: [userAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
