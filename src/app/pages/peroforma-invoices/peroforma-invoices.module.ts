import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeroformaInvoicesRoutingModule } from './peroforma-invoices-routing.module';
import { ListPiComponent } from './list-pi/list-pi.component';
import { EditPiComponent } from './edit-pi/edit-pi.component';
import { CreatePiDetailComponent } from './peroforma-invoice-details/create-pi-detail/create-pi-detail.component';
import { EditPiDetailComponent } from './peroforma-invoice-details/edit-pi-detail/edit-pi-detail.component';
import { ListPiDetailComponent } from './peroforma-invoice-details/list-pi-detail/list-pi-detail.component';
import { ListAllPiComponent } from './list-all-pi/list-all-pi.component';
import { PeroformaInvoicesComponent } from './create-pi/peroforma-invoices.component';


import { MaterialModule } from 'src/app/shared/modules/material.module';
import { PersianModule } from 'src/app/shared/modules/persian.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';
import { JalalipipeModule } from 'src/app/shared/modules/jalalipipe.module';

@NgModule({
  declarations: [
    PeroformaInvoicesComponent,
    ListPiComponent,
    EditPiComponent,
    CreatePiDetailComponent,
    EditPiDetailComponent,
    ListPiDetailComponent,
    ListAllPiComponent,
  ],
  imports: [
    PeroformaInvoicesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PersianModule,
    SweetAlert2Module,
    NgxLoadingModule,
    JalalipipeModule
    
  ]
})
export class PeroformaInvoicesModule { }
