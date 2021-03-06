import { AuthorizationService } from './Services/authorization.service';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EShopInterceptor } from './Utilities/EShopInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from 'ngx-loading';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MaterialModule } from './shared/modules/material.module';
import { PersianModule } from 'src/app/shared/modules/persian.module';
import { MenuItemsComponent } from './shared/menu-items/menu-items.component';
import { JalalipipeModule } from './shared/modules/jalalipipe.module';
import { PrintPageComponent } from './pages/print-page/print-page.component';

@NgModule({
  declarations: [
    AppComponent,
    // SidebarComponent,
    MenuItemsComponent,
    // StimulsoftViewerModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    JalalipipeModule,
    SweetAlert2Module.forRoot(),
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true,
      backdropBackgroundColour: '#1233',
    }),
    MaterialModule,
    PersianModule,
  ],
  providers: [
   AuthorizationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EShopInterceptor,
      multi: true,
    },
    CookieService,
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
