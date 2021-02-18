import { RouterModule, Routes } from "@angular/router";
import { SaleExdecListComponent } from "./sale-exdec-list-by-exdecId/sale-exdec-list.component";
import { userAuthGuard } from 'src/app/Utilities/userAuthGuard';
import { SalePiListComponent } from "./sale-pi-list-by-piId/sale-pi-list.component";
import { SalesComponent } from "./sales.component";
import { SaleListComponent } from "./sale-list/sale-list.component";
import { NgModule } from "@angular/core";
import { SaleExdecListByCurrencysaleIdComponent } from './sale-exdec-list-by-currencysale-id/sale-exdec-list-by-currencysale-id.component';
import { SalePiListByCurrencysaleIdComponent } from './sale-pi-list-by-currencysale-id/sale-pi-list-by-currencysale-id.component';
import { SaleCustomerTotalComponent } from './sale-customer-total/sale-customer-total.component';
import { SaleListByCustomerComponent } from './sale-list/sale-list-by-customer/sale-list-by-customer.component';

const routes: Routes = [
  { path: '', component: SalesComponent, canActivate: [userAuthGuard]},

  { path: 'sale-exdec-list', component: SaleExdecListComponent, canActivate: [userAuthGuard]},
  { path: 'sale-exdec-list-currSaleId', component: SaleExdecListByCurrencysaleIdComponent, canActivate: [userAuthGuard]},

  { path: 'sale-pi-list', component: SalePiListComponent, canActivate: [userAuthGuard]},
  { path: 'sale-pi-list-currSaleId', component: SalePiListByCurrencysaleIdComponent, canActivate: [userAuthGuard]},

  { path: 'sale-list', component: SaleListComponent, canActivate: [userAuthGuard]},
  { path: 'sale-list-by-customer', component: SaleListByCustomerComponent, canActivate: [userAuthGuard]},

  { path: 'sale-customer-total', component: SaleCustomerTotalComponent, canActivate: [userAuthGuard]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {
}


