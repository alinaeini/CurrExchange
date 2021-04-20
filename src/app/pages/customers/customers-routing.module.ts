import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userAuthGuard } from 'src/app/Utilities/userAuthGuard';
import { CustomersComponent } from './CurrencyCustomer/create-customer/customers.component';
import { EditCustomerComponent } from './CurrencyCustomer/edit-customer/edit-customer.component';
import { ListMisCustomerComponent } from './MiscellaneousCustomer/list-mis-customer/list-mis-customer.component';
import { CreateMisCustomerComponent } from './MiscellaneousCustomer/create-mis-customer/create-mis-customer.component';
import { EditMisCustomerComponent } from './MiscellaneousCustomer/edit-mis-customer/edit-mis-customer.component';
import { CustomerListComponent } from './CurrencyCustomer/list/customer-list/customer-list.component';
import { CreateCommCustomerComponent } from './CommodityCustomer/create-comm-customer/create-comm-customer.component';
import { EditCommCustomerComponent } from './CommodityCustomer/edit-comm-customer/edit-comm-customer.component';
import { ListtCommCustomerComponent } from './CommodityCustomer/listt-comm-customer/listt-comm-customer.component';


const routes: Routes = [
  { path: '', component: CustomerListComponent, canActivate: [userAuthGuard]},
  { path: 'customer-create', component: CustomersComponent, canActivate: [userAuthGuard]},
  { path: 'customer-edit', component: EditCustomerComponent, canActivate: [userAuthGuard]},


  { path: 'create-mis-customer', component: CreateMisCustomerComponent, canActivate: [userAuthGuard]},
  { path: 'edit-mis-customer', component: EditMisCustomerComponent, canActivate: [userAuthGuard]},
  { path: 'list-mis-customer', component: ListMisCustomerComponent, canActivate: [userAuthGuard]},

  { path: 'create-customer-comm', component: CreateCommCustomerComponent, canActivate: [userAuthGuard]},
  { path: 'edit-customer-comm', component: EditCommCustomerComponent, canActivate: [userAuthGuard]},
  { path: 'list-customer-comm', component: ListtCommCustomerComponent, canActivate: [userAuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
