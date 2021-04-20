import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../../Services/customer.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ngxLoadingAnimationTypes } from "ngx-loading";
import { CreateCustomerDto } from '../../../../DTOs/Customer/CreateCustomerDto';
import { CommodityCustomerService } from '../../../../Services/commodity-customer.service';

@Component({
  selector: 'app-create-comm-customer',
  templateUrl: './create-comm-customer.component.html',
  styleUrls: ['./create-comm-customer.component.scss']
})
export class CreateCommCustomerComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public customerFrom: FormGroup;
  isLoading =false;
  isLoadingSuccess =false ;
  timeLeft: number = 4;
  interval;
  ErrorCaractersisMoreThanMax: string = " تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد";

  @ViewChild("sweetAlert") private sweetAlert: SwalComponent;
  //exprireDate: string = "تاریخ اعتبار اظهارنامه";

  constructor(private customerService: CommodityCustomerService ) { }

  ngOnInit(): void {
    this.customerFrom = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      phone: new FormControl(null, [
       Validators.required,
       Validators.maxLength(100),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1000),
      ]),
    });
  }


  submitCustomerForm() {
    this.isLoading = true ;
    var customer = new CreateCustomerDto(
      this.customerFrom.controls.name.value,
      this.customerFrom.controls.title.value,
      this.customerFrom.controls.phone.value,
      this.customerFrom.controls.address.value,
      this.customerFrom.controls.description.value
    );
    this.customerService.createCustomerService(customer).subscribe((res) => {
      this.isLoading = false ;
      if (res.status === "Success")
        this.LoadingSuccess() ;
        this.customerFrom.reset();
      if (res.status === "Error") {
        this.sweetAlert.text= res.data.info;
        this.sweetAlert.fire();
      }
   });
  }

  ex_normalNum(numStr):string {
    var num = numStr.replace(/,\s?/g, "");
    return num ;
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  LoadingSuccess() {
   this.isLoadingSuccess =true;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 4;
        this.isLoadingSuccess =false;
      }
    },1000)
  }



}

