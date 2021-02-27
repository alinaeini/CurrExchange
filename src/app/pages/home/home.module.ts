import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MenuItemsComponent } from 'src/app/shared/menu-items/menu-items.component';



@NgModule({
  declarations: [
    HomeComponent,
    //MenuItemsComponent,
    // SidebarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    // MaterialModule,
    // PersianModule,
  ]
})
export class HomeModule { }
