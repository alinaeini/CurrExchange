import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userAuthGuard } from 'src/app/Utilities/userAuthGuard';
import { PeroformaInvoicesComponent } from './create-pi/peroforma-invoices.component';
import { EditPiComponent } from './edit-pi/edit-pi.component';
import { ListAllPiComponent } from './list-all-pi/list-all-pi.component';
import { ListPiComponent } from './list-pi/list-pi.component';
import { CreatePiDetailComponent } from './peroforma-invoice-details/create-pi-detail/create-pi-detail.component';
import { EditPiDetailComponent } from './peroforma-invoice-details/edit-pi-detail/edit-pi-detail.component';
import { ListPiDetailComponent } from './peroforma-invoice-details/list-pi-detail/list-pi-detail.component';


const routes: Routes = [
  { path: '', component: ListPiComponent, canActivate: [userAuthGuard]},
  { path: 'pi-create', component: PeroformaInvoicesComponent, canActivate: [userAuthGuard]},
  { path: 'pi-edit', component: EditPiComponent, canActivate: [userAuthGuard]},
  
  { path: 'pi-list-all', component: ListAllPiComponent, canActivate: [userAuthGuard]},

  { path: 'pi-detail-create', component: CreatePiDetailComponent, canActivate: [userAuthGuard]},
  { path: 'pi-detail-edit', component: EditPiDetailComponent, canActivate: [userAuthGuard]},
  { path: 'pi-detail-list ', component: ListPiDetailComponent, canActivate: [userAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeroformaInvoicesRoutingModule { }
