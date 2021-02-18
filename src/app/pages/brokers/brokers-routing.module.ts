import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userAuthGuard } from 'src/app/Utilities/userAuthGuard';
import { BrokersComponent } from './create-broker/brokers.component';

import { EditBrokerComponent } from './edit-broker/edit-broker.component';
import { ListBrokerComponent } from './list-broker/list-broker.component';

const routes: Routes = [
{ path: '', component: ListBrokerComponent, canActivate: [userAuthGuard]},
{ path: 'broker-create', component: BrokersComponent, canActivate: [userAuthGuard]},
{ path: 'broker-edit', component: EditBrokerComponent, canActivate: [userAuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokersRoutingModule { }
