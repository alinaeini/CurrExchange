import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './publics/page-not-found/page-not-found.component';
import { LoginComponent } from './accounts/login/login.component';
import { CalanderComponent } from './publics/calander/calander.component';
import { userAuthGuard } from './Utilities/userAuthGuard';


const routes: Routes = [

  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'brokers', loadChildren: () => import('./pages/brokers/brokers.module').then(m => m.BrokersModule) },
  { path: 'customers', loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersModule) },
  { path: 'pies', loadChildren: () => import('./pages/peroforma-invoices/peroforma-invoices.module').then(m => m.PeroformaInvoicesModule) },
  { path: 'sales', loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesModule) },
  { path: 'ex-declarations', loadChildren: () => import('./pages/ex-declarations/ex-declarations.module').then(m => m.ExDeclarationsModule) },
  { path: 'login', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  // { path: 'login', component: LoginComponent},
  // { path: 'profile', component: ProfileComponent, canActivate: [userAuthGuard]},
  { path: 'calander', component: CalanderComponent, canActivate: [userAuthGuard]},
  // { path: '404', component: PageNotFoundComponent},
  // { path: '**',  redirectTo: '/404'},
]
@NgModule({
  imports: [
            RouterModule.forRoot(routes,
              {
                preloadingStrategy: PreloadAllModules
              })
          ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
