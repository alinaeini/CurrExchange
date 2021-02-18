import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './list/customer-list/customer-list.component';
import { userAuthGuard } from 'src/app/Utilities/userAuthGuard';
import { CustomersComponent } from './create-customer/customers.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';


const routes: Routes = [
  { path: '', component: CustomerListComponent, canActivate: [userAuthGuard]},
  { path: 'customer-create', component: CustomersComponent, canActivate: [userAuthGuard]},
  { path: 'customer-edit', component: EditCustomerComponent, canActivate: [userAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
