import { RegisterUserDTO } from "./../../DTOs/Account/RegisterUserDTO";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { AuthorizationService } from "src/app/Services/authorization.service";
import { Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from "ngx-loading";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  isLoading =false ;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  @ViewChild("sweetAlert") private sweetAlert!: SwalComponent;

  constructor(private authService: AuthorizationService ,private router:Router) { }
  ErrorCaractersisMoreThanMax: string = " تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد";
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required,
        Validators.maxLength(100),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      userName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
  }
  handleRefusalToSetEmail(data: any) {
    console.log(data);
  }

  saveEmail(data: any) {
    console.log(data);
  }
  submitRegisterForm() {
    var registerUser = new RegisterUserDTO(
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.confirmPassword.value,
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.registerForm.controls.userName.value
    );
    // console.log(this.registerForm.controls);
    this.isLoading =true;
    this.authService.registerUserService(registerUser).subscribe((res) => {
      this.isLoading =false;
      if (res.status === "Success"){
          this.sweetAlert.title = "ایمیل فعالسازی ارسال شد" ;
          this.sweetAlert.icon= 'success';
          this.sweetAlert.confirmButtonText ="قبول";
          this.sweetAlert.text = "شما با موفقیت در سیستم ثبت نام شده اید , لطفا جهت فعالسازی سیستم , به ایمیل خود مراجعه بفرمایید";
          this.sweetAlert.fire().then((result)=>{
            if(result.isConfirmed){
              this.router.navigate(['login']);
              }
            });
        this.registerForm.reset();

      }
      if (res.status === "Error") {
        this.sweetAlert.text= res.data.info;
        this.sweetAlert.fire();
      }
    });
  }
}
