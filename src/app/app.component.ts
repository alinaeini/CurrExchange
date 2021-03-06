import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserDto } from './DTOs/Account/CurrentUserDto';
import { AuthorizationService } from './Services/authorization.service';
import { CookieService } from 'ngx-cookie-service';
import { UserRolePermissionDto } from './DTOs/Account/Permissions/UserRolePermissionDto';
import { DomainName } from './Utilities/pathTools';
import { CompanyInfoService } from './Services/company-info.service';
import { CompanyDto } from './DTOs/Company/CompanyDto';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  @Output() public childData = new EventEmitter();
  currentUser: CurrentUserDto = null;
  currentCompany: CompanyDto = null;
  title = 'سیستم مدیریت فروش ارز';
  userPermissions:UserRolePermissionDto[]=[];
  public domain: string = DomainName;
  constructor(
    private authService: AuthorizationService,
    private cookieService: CookieService,
    private router: Router,
    private company : CompanyInfoService
  ) {}


  callEvent(currentUser:CurrentUserDto)
  {
    this.childData.emit(currentUser);
  }
  ngOnInit(): void {
          this.getCompany();

          this.authService.checkUserAuth().subscribe((res): void => {
            // console.log(res );
            
          if (res.status === "Error") 
              this.router.navigate(['/login']);
          if (res.status === 'Success') 
          {
            const user = new CurrentUserDto(
              res.data.userId,
              res.data.firstName,
              res.data.lastName,
              res.data.userRole,
              res.data.userPermissions
            );
            this.authService.setCurrentUser(user);
            // this.authService.getCurrentUser().subscribe((res) => {
            //   this.currentUser = res;

            // });
            this.router.navigate([""]);
          }
        });
      }
  logOutUser() {
    this.cookieService.delete('exchange-curr-cookie');
    this.authService.setCurrentUser(null);
    this.router.navigate(['login']);
  }

  getCompany(){
    this.company.getCompany().subscribe((res): void => {
      // console.log(res);
    if (res.status === "Error") 
        console.log(res);
        
    if (res.status === 'Success') 
    {
      this.currentCompany = res.data ; 
    }
  });
}
  onActivate(event){
    // this.company.getCompanyObs().subscribe(res =>{
    //   this.currentCompany = res ;
    // });
    this.authService.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
    });
  }
}
