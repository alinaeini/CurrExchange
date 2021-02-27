import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userAuthGuard } from 'src/app/Utilities/userAuthGuard';
import { HomeComponent } from './home.component';


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [userAuthGuard]},
    // { path: 'brokers', loadChildren: () => import('../../pages/brokers/brokers.module').then(m => m.BrokersModule) },
    // { path: 'customers', loadChildren: () => import('../../pages/customers/customers.module').then(m => m.CustomersModule) },
    // { path: 'pies', loadChildren: () => import('../../pages/peroforma-invoices/peroforma-invoices.module').then(m => m.PeroformaInvoicesModule) },
    // { path: 'sales', loadChildren: () => import('../../pages/sales/sales.module').then(m => m.SalesModule) },
    // { path: 'exdec-list', loadChildren: () => import('../../pages/ex-declarations/ex-declarations.module').then(m => m.ExDeclarationsModule) },
    
    // { path: 'login', loadChildren: () => import('../../accounts/accounts.module').then(m => m.AccountsModule) },
    // { path: 'login', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
    // { path: 'brokers', loadChildren: () => import('./pages/brokers/brokers.module').then(m => m.BrokersModule) },
    // { path: 'customers', loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule) },
    // { path: 'pies', loadChildren: () => import('./pages/peroforma-invoices/peroforma-invoices.module').then(m => m.PeroformaInvoicesModule) },
    // { path: 'sales', loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesModule) },
    // { path: 'ex-declarations', loadChildren: () => import('./pages/ex-declarations/ex-declarations.module').then(m => m.ExDeclarationsModule) },
  //{ path: '', component: SidebarComponent, canActivate: [userAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
