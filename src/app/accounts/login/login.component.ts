import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AuthorizationService } from 'src/app/Services/authorization.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { LoginUserDto } from 'src/app/DTOs/Account/LoginUserDto';
import { CookieService } from 'ngx-cookie-service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { CurrentUserDto } from 'src/app/DTOs/Account/CurrentUserDto';
import { CompanyInfoService } from '../../Services/company-info.service';
import { DomainName } from 'src/app/Utilities/pathTools';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() public childData = new EventEmitter();
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  isLoading = false;
  public loginForm: FormGroup;
  user: CurrentUserDto = null;
  public domain: string = DomainName;
  ErrorCaractersisMoreThanMax: string =
    ' تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد';
  @ViewChild('sweetAlert')
  private sweetAlert: SwalComponent;
  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((res) => {
      this.user = res;
      // console.log(res);
    });
    this.authService.checkUserAuth().subscribe((res) => {
      if (res.status === 'Success') {
        this.router.navigate(['/']);
      }
    });

    this.loginForm = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }
  logOutUser() {
    this.cookieService.delete('exchange-curr-cookie');
    this.authService.setCurrentUser(null);
    this.router.navigate(['login']);
  }
  callEvent(loginUser: CurrentUserDto) {
    this.childData.emit(loginUser);
  }

  submitloginForm() {
    var loginForm = new LoginUserDto(
      this.loginForm.controls.userName.value,
      this.loginForm.controls.password.value
    );
    this.isLoading = true;
    this.authService.loginUserService(loginForm).subscribe((res) => {
      // console.log(res);
      if (res.status === 'Success') {
        const currentUser = new CurrentUserDto(
          res.data.userId,
          res.data.firstName,
          res.data.lastName,
          res.data.userRole,
          res.data.userPermissions
        );
        this.cookieService.set(
          'exchange-curr-cookie',
          res.data.token,
          res.data.expireTime *60
        );
        this.authService.setCurrentUser(currentUser);
        // console.log(currentUser);

        // this.callEvent(currentUser);
        // console.log(res , currentUser);
        // this.loginForm.reset();
        // this.sweetAlert.title = "اطلاعات" ;
        // this.sweetAlert.icon= 'success';
        // this.sweetAlert.confirmButtonText ="ورود";
        // this.sweetAlert.text = res.data.firstName + ' '+res.data.lastName + ' عزیز , ' + 'به سیستم خوش آمدید';
        // this.sweetAlert.fire().then((result)=>{
        //   if(result.isConfirmed){

          this.router.navigate(['']);
        
        //   }
        // });
      }
      this.isLoading = false;
      if (res.status === 'Error') {
        this.sweetAlert.icon = 'error';
        this.sweetAlert.text = res.data.info;
        this.sweetAlert.fire();
      }
    });
  }

 
}
