import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthorizationService } from 'src/app/Services/authorization.service';
import { Router } from '@angular/router';
import { CurrentUserDto } from 'src/app/DTOs/Account/CurrentUserDto';
import { FinancialPeriodService } from 'src/app/Services/financial-period.service';
import { FinancialPeriodDto } from 'src/app/DTOs/Account/FinancialPeriodDto';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss']
})
export class MenuItemsComponent implements OnInit {
  @Input('currentUser') public currentUser: CurrentUserDto = null;
@Input ('currentFinancial') public currentFinancial: FinancialPeriodDto = null;
  constructor( ) {}

  ngOnInit() {
 
    // alert('menu');
    // this.authService.checkUserAuth().subscribe((res): void => {
    //   if (res.status === "Error") 
    //       this.router.navigate(['login']);
    //   if (res.status === 'Success') 
    //   {
    //     const user = new CurrentUserDto(
    //       res.data.userId,
    //       res.data.firstName,
    //       res.data.lastName,
    //       res.data.userRole,
    //       res.data.userPermissions
    //     );
    //     this.authService.setCurrentUser(user);
    //     this.authService.getCurrentUser().subscribe((res) => {
    //       this.currentUser = res;

    //     });
    //     console.log(res);
    //     this.router.navigate([""]);
    //   }
    // });
  }
  }

