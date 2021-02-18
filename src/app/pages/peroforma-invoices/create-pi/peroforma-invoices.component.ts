import { Component, Injectable, OnInit,  ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { __values } from 'tslib';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { PiService } from '../../../Services/pi.Service';
import { CreatePiDto } from '../../../DTOs/Pi/CreatePiDto';



@Component({
  selector: 'app-pi',
  templateUrl: './peroforma-invoices.component.html',
  styleUrls: ['./peroforma-invoices.component.scss']
})
@Injectable({
  providedIn: "root",
})
export class PeroformaInvoicesComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public piForm: FormGroup;
  isLoading =false;
  isLoadingSuccess =false ;
  timeLeft: number = 4;
  interval;

  @ViewChild("sweetAlert") private sweetAlert: SwalComponent;
  performaInvoiceDate: string = "تاریخ PI";

  constructor(private piService: PiService ) { }

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

    });
  }
  selectedValuesFromPickupDate(shamsiDate: string, gregorianDate: string, timestamp: number){
    this.performaInvoiceDate = gregorianDate ;
  }

  submitPiForm() {
    this.isLoading=true ;
    if(this.piForm.controls.basePrice.value !== null)
    var basePrice =this.ex_normalNum(this.piForm.controls.basePrice.value);
    else
    var basePrice ="0";

    if(this.piForm.controls.totalPrice.value !== null)
    var totalPrice =this.ex_normalNum(this.piForm.controls.totalPrice.value);
    else
    var totalPrice ="0";

    var performaInvoice = new CreatePiDto(
      this.piForm.controls.piCode.value,
      new Date(this.piForm.controls.piDate.value),
      parseInt( basePrice),
      parseInt(totalPrice),
    );
    this.piService.createPiService(performaInvoice).subscribe((res) => {
      this.isLoading=false ;
      if (res.status === "Success")
        this.LoadingSuccess() ;
        this.piForm.reset();
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

