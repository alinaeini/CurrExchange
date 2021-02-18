import { NgModule } from '@angular/core';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
const persianModules = [
  NgPersianDatepickerModule,
]
@NgModule({
  imports: [
    ...persianModules
  ],
  exports:[
    ...persianModules ,
  ]
})
export class PersianModule { }
