import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/Services/authorization.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  @ViewChild("sweetAlert")
  private sweetAlert: SwalComponent;
  click : boolean = false;
  constructor(
    private activatedRoute:ActivatedRoute,
    private authService:AuthorizationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  submitActiveUser(){
    this.click  = true;
    this.authService.activateUser(this.activatedRoute.snapshot.params.activeCode).subscribe(res=>{
      // console.log(res);
      if (res.status === "Success") {
         this.sweetAlert.position= 'center';
         this.sweetAlert.icon= 'success';
         this.sweetAlert. title= 'حساب کاربری شما در سیستم ثبت گردید';
         this.sweetAlert.fire().then((result)=>{
           if(result.isConfirmed){
            this.router.navigate(['login']);
           }
         });
     }
   });


  }
}
