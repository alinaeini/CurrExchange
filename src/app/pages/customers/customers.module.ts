import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './CurrencyCustomer/create-customer/customers.component';
import { EditCustomerComponent } from './CurrencyCustomer/edit-customer/edit-customer.component';

import { MaterialModule } from 'src/app/shared/modules/material.module';
import { PersianModule } from 'src/app/shared/modules/persian.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';

import { CreateMisCustomerComponent } from './MiscellaneousCustomer/create-mis-customer/create-mis-customer.component';
import { EditMisCustomerComponent } from './MiscellaneousCustomer/edit-mis-customer/edit-mis-customer.component';
import { ListMisCustomerComponent } from './MiscellaneousCustomer/list-mis-customer/list-mis-customer.component';
import { CreateCommCustomerComponent } from './CommodityCustomer/create-comm-customer/create-comm-customer.component';
import { EditCommCustomerComponent } from './CommodityCustomer/edit-comm-customer/edit-comm-customer.component';
import { ListtCommCustomerComponent } from './CommodityCustomer/listt-comm-customer/listt-comm-customer.component';
import { CustomerListComponent } from './CurrencyCustomer/list/customer-list/customer-list.component';



@NgModule({
  declarations: [

    CustomersComponent,
    EditCustomerComponent, 
    CustomerListComponent,
    
    CreateMisCustomerComponent, 
    EditMisCustomerComponent, 
    ListMisCustomerComponent, 
    
    CreateCommCustomerComponent,
    EditCommCustomerComponent, 
    ListtCommCustomerComponent
  ],
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
