import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerListComponent } from './list/customer-list/customer-list.component';
import { CustomersComponent } from './create-customer/customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

import { MaterialModule } from 'src/app/shared/modules/material.module';
import { PersianModule } from 'src/app/shared/modules/persian.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [CustomerListComponent,CustomersComponent,EditCustomerComponent],
  imports: [
    CustomersRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PersianModule,
    SweetAlert2Module,
    NgxLoadingModule
  ]
})
export class CustomersModule { }
