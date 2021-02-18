import { NgModule } from '@angular/core';
import { JalaliPipe } from 'src/app/publics/Pipes/jalali.pipe';



@NgModule({
  declarations: [
     JalaliPipe
  ],
  imports: [
    
  ],
  exports:[
     JalaliPipe
  ]
})
export class JalalipipeModule { }
