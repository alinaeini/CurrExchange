import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { userAuthGuard } from 'src/app/Utilities/userAuthGuard';
import { ExDeclarationsComponent } from './create-ex-declations/ex-declarations.component';
import { EditExDeclarationsComponent } from './edit-ex-declarations/edit-ex-declarations.component';
import { ListExDeclarationComponent } from './list-ex-declaration/list-ex-declaration.component';
import { ListExdecAllComponent } from './list-exdec-all/list-exdec-all.component';


const routes: Routes = [
  
  
  { path: '', component: ListExDeclarationComponent, canActivate: [userAuthGuard]},
  // { path: 'exdec-list', component: ListExDeclarationComponent, canActivate: [userAuthGuard]},
  { path: 'exdec-list-all', component: ListExdecAllComponent, canActivate: [userAuthGuard]},
  { path: 'exdec-create', component: ExDeclarationsComponent, canActivate: [userAuthGuard]},
  { path: 'exdec-edit', component: EditExDeclarationsComponent, canActivate: [userAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExDeclarationsRoutingModule { }
