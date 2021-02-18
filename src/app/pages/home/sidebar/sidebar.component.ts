import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUserDto } from 'src/app/DTOs/Account/CurrentUserDto';
import { AuthorizationService } from 'src/app/Services/authorization.service';
import { log } from 'console';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentUser: CurrentUserDto;
  constructor(
    private authService: AuthorizationService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.checkUserAuth().subscribe((res) => {
      //console.log("From Sidebar => ", res);
      
      // if (res.status === 'Error') {
      //   this.router.navigate(['login']);
      // }
      if (res.status === 'Success') {
        
        this.authService.getCurrentUser().subscribe((res) => {
          this.currentUser = res;
         // console.log(this.currentUser);
          
        });
      }
    });
  }
  logOutUser() {
    this.cookieService.delete('exchange-curr-cookie');
    this.authService.setCurrentUser(null);
    this.router.navigate(['login']);
  }
}
