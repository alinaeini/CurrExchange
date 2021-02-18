import { NgModule } from '@angular/core';

import { AccountsRoutingModule } from './accounts-routing.module';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/registerComponent';

import { MaterialModule } from 'src/app/shared/modules/material.module';
import { PersianModule } from 'src/app/shared/modules/persian.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLoadingModule } from 'ngx-loading';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AccountPermissionsComponent } from './account-permissions/account-permissions.component';
import { UsersRoleComponent } from './users-role/users-role.component';


@NgModule({
  declarations: [
    ActivateAccountComponent,
    LoginComponent,
    RegisterComponent,
    AccountPermissionsComponent,
    UsersRoleComponent,
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PersianModule,
    SweetAlert2Module,
    NgxLoadingModule
  ]
})
export class AccountsModule { }
