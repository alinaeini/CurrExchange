import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SaleExdecListByCurrencysaleIdComponent } from './sale-exdec-list-by-currencysale-id/sale-exdec-list-by-currencysale-id.component';
import { SalePiListByCurrencysaleIdComponent } from './sale-pi-list-by-currencysale-id/sale-pi-list-by-currencysale-id.component';
import { SaleExdecListComponent } from './sale-exdec-list-by-exdecId/sale-exdec-list.component';
import { SalePiListComponent } from './sale-pi-list-by-piId/sale-pi-list.component';
import { SalesRoutingModule } from './sales-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { PersianModule } from '../../shared/modules/persian.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';
import { JalalipipeModule } from 'src/app/shared/modules/jalalipipe.module';
import { SaleCustomerTotalComponent } from './sale-customer-total/sale-customer-total.component';
import { SaleListByCustomerComponent } from './sale-list/sale-list-by-customer/sale-list-by-customer.component';



@NgModule({
  declarations: [
    SalesComponent,
    SaleExdecListComponent,
    SalePiListComponent,
    SaleListComponent,
    SaleExdecListByCurrencysaleIdComponent,
    SalePiListByCurrencysaleIdComponent,
    SaleCustomerTotalComponent,
    SaleListByCustomerComponent,
    // JalaliPipe
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PersianModule,
    SweetAlert2Module,
    NgxLoadingModule,
    JalalipipeModule
  ],
  exports : []
})
export class SalesModule { }
