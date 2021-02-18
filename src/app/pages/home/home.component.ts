import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CurrentUserDto } from 'src/app/DTOs/Account/CurrentUserDto';
import { AuthorizationService } from 'src/app/Services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: CurrentUserDto;
  constructor(
    private authService: AuthorizationService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.authService.checkUserAuth().subscribe((res) => {
      // console.log("From Home => ", res);
      
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
