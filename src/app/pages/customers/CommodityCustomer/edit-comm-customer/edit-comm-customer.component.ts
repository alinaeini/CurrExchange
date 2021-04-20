import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ngxLoadingAnimationTypes } from "ngx-loading";
import { CustomerDto } from 'src/app/DTOs/Customer/customerDto';
import { CustomerService } from 'src/app/Services/customer.service';
import { CommodityCustomerService } from '../../../../Services/commodity-customer.service';

@Component({
  selector: 'app-edit-comm-customer',
  templateUrl: './edit-comm-customer.component.html',
  styleUrls: ['./edit-comm-customer.component.scss']
})
export class EditCommCustomerComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  isLoading =false;
  public customerFrom: FormGroup;
  isLoadingSuccess =false ;
  timeLeft: number = 4;
  customerId:number =0 ;
  interval;
  ErrorCaractersisMoreThanMax: string = " تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد";

  @ViewChild("sweetAlert") private sweetAlert: SwalComponent;

  constructor(
    private customerService: CommodityCustomerService,
    private activatedRoute: ActivatedRoute ,
    private router: Router
    ) { }

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
    this.activatedRoute.queryParams.subscribe((param) => {
      this.customerService.getCustomerById(param.id).subscribe(res=>{
        this.customerId = res.data.id ;
        this.customerFrom.controls.name.setValue(res.data.name);
        this.customerFrom.controls.title.setValue(res.data.title);
        this.customerFrom.controls.phone.setValue(res.data.phone);
        this.customerFrom.controls.address.setValue(res.data.address);
        this.customerFrom.controls.description.setValue(res.data.description);
      
      });

    });
    
  }


  submitCustomerForm() {
    this.isLoading = true ;
    var customer =  new CustomerDto(
      this.customerId,
      this.customerFrom.controls.name.value,
      this.customerFrom.controls.title.value,
      this.customerFrom.controls.phone.value,
      this.customerFrom.controls.address.value,
      this.customerFrom.controls.description.value
    );

    this.customerService.editCustomer(customer).subscribe((res) => {
      this.isLoading = false ;
      if (res.status === "Success"){
        this.LoadingSuccess() ;
        this.router.navigate(["customers/list-customer-comm"]);
      }
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
