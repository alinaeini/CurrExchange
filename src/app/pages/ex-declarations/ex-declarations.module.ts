import { NgModule } from '@angular/core';

import { ExDeclarationsRoutingModule } from './ex-declarations-routing.module';
import { ListExdecAllComponent } from './list-exdec-all/list-exdec-all.component';
import { EditExDeclarationsComponent } from './edit-ex-declarations/edit-ex-declarations.component';
import { ExDeclarationsComponent } from './create-ex-declations/ex-declarations.component';
import { ListExDeclarationComponent } from './list-ex-declaration/list-ex-declaration.component';

import { MaterialModule } from 'src/app/shared/modules/material.module';
import { PersianModule } from 'src/app/shared/modules/persian.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { JalalipipeModule } from '../../shared/modules/jalalipipe.module';

@NgModule({
  declarations: [
    ListExdecAllComponent,
    ExDeclarationsComponent,
    EditExDeclarationsComponent,
    ListExDeclarationComponent,
    // JalaliPipe
  ],
  imports: [
    CommonModule,
    ExDeclarationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PersianModule,
    SweetAlert2Module,
    NgxLoadingModule,
    JalalipipeModule
    
  ]
})
export class ExDeclarationsModule { }
