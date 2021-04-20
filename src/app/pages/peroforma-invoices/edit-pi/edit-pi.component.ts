import { Component, OnInit, ViewChild } from '@angular/core';
import { PiDto } from 'src/app/DTOs/Pi/PiDto';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { PiService } from 'src/app/Services/pi.Service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { CustomerDto } from 'src/app/DTOs/Customer/customerDto';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CommodityCustomerService } from '../../../Services/commodity-customer.service';
declare function  ex_normalNum(num):string ;
@Component({
  selector: 'app-edit-pi',
  templateUrl: './edit-pi.component.html',
  styleUrls: ['./edit-pi.component.scss']
})
export class EditPiComponent implements OnInit {


  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public piForm: FormGroup;
  isLoading =false;
  isLoadingSuccess =false ;
  timeLeft: number = 4;
  piId:number =0 ;
  interval;
 
  customers: CustomerDto[] = [];
  customerId: string = '0';
  filteredOptions: Observable<CustomerDto[]>;

  myControl = new FormControl();

  ErrorCaractersisMoreThanMax: string = " تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد";

  @ViewChild("sweetAlert") private sweetAlert: SwalComponent;
  piDate: string = "تاریخ اعتبار اظهارنامه";

  constructor(
    private piService: PiService,
    private activatedRoute: ActivatedRoute ,
    private router: Router,
    private customerService :CommodityCustomerService
    ) { }

  ngOnInit(): void {
    this.piForm = new FormGroup({
      piCode: new FormControl(null, [
        Validators.required,
      ]),
      piDate: new FormControl(null, [
        Validators.required,
      ]),
      basePrice: new FormControl(null, [
       Validators.required,
      ]),
      totalPrice: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.required,
      ]),
    });

    this.getCustomers();
    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''), map((value) => this._filter(value)) );

    this.activatedRoute.queryParams.subscribe((param) => {
      this.piService.getPiById(param.id).subscribe(res=>{
          this.piId = res.data.id ;
         this.customerId= res.data.customerId.toString();
          this.piForm.controls.piCode.setValue(res.data.piCode);
          this.piForm.controls.piDate.setValue(res.data.piDate.toLocaleString('en-GB'));
          this.piForm.controls.basePrice.setValue(res.data.basePrice.toLocaleString('en-GB'));
          this.piForm.controls.totalPrice.setValue(res.data.totalPrice.toLocaleString('en-GB'));
          this.piForm.controls.description.setValue(res.data.description);
      });
    });
    

    //console.log(this.filteredOptions);
    
  }

  
  private _filter(value: string): CustomerDto[] {
    const filterValue = value.length > 0 ? value.trim() : '';
    return this.customers.filter(
      (option) =>
        option.title.trim().includes(filterValue) ||
        option.name.trim().includes(filterValue)
    );
  }



  getCustomers() {
    this.customerService.getCustomerList().subscribe((customerListResult) => {
      if (customerListResult != null) {
        this.customers = customerListResult;
      } else {
        this.customerService.getCustomerListService().subscribe((res) => {
          if (res.status === 'Success') {
            this.customerService.setCustomerList(res.data);
            this.customerService.getCustomerList().subscribe((customerList) => {
              this.customers = customerList;
            });
          }
        });
      }
    });
  }

  
  getTitle(id: string) {
    var result = '';
    if (id !== null && id !== undefined )
      if(parseInt(id)> 0)
        if (this.customers !== undefined && this.customers !== null) {
          this.customerId = id;
          result = this.customers.find((customer) => customer.id === parseInt(id))
            .name;
        }
        //console.log(result);
        
    return result;
  }

  submitpiForm(): void {
    if (parseInt(this.customerId) === 0) {
      this.sweetAlert.text = 'مشتری هنوز مشخص نشده است ';
      this.sweetAlert.fire();
    }else{
      if(this.piForm.controls.basePrice.value !== null)
      var basePrice =ex_normalNum(this.piForm.controls.basePrice.value);
      else
      var basePrice ="0";
  
      if(this.piForm.controls.totalPrice.value !== null)
      var totalPrice =ex_normalNum(this.piForm.controls.totalPrice.value);
      else
      var totalPrice ="0";
      this.isLoading=true ;
      var pi = new PiDto(
        this.piId,
        this.piForm.controls.piCode.value,
        new Date(this.piForm.controls.piDate.value),
        parseInt( basePrice),
        parseInt(totalPrice),
        this.piForm.controls.description.value,
        parseInt(this.customerId)
      );
      // this.piForm.controls.piDate.value
      // console.log(new Date().toISOString());
      // console.log(JSON.stringify(pi));
      
      this.piService.editPi(pi).subscribe((res) => {
        this.isLoading=false ;
        if (res.status === "Success")
          this.LoadingSuccess() ;
          this.router.navigate(["pies"]);
        if (res.status === "Error") {
          this.sweetAlert.text= res.data.info;
          this.sweetAlert.fire();
        }
     });
    }

      
     
  }
  selectedValuesFromPickupDate(shamsiDate: string, gregorianDate: string, timestamp: number){
    this.piDate = gregorianDate ;
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
