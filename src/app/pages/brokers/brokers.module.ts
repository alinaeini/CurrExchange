import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrokersRoutingModule } from './brokers-routing.module';
import { EditBrokerComponent } from './edit-broker/edit-broker.component';
import { ListBrokerComponent } from './list-broker/list-broker.component';
import { BrokersComponent } from './create-broker/brokers.component';

import { MaterialModule } from 'src/app/shared/modules/material.module';
import { PersianModule } from '../../shared/modules/persian.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [BrokersComponent ,EditBrokerComponent,ListBrokerComponent],
  imports: [
    BrokersRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PersianModule,
    SweetAlert2Module,
    NgxLoadingModule
  ],
})
export class BrokersModule { }
