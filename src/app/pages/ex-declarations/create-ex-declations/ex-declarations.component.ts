import { ExDeclarationService } from '../../../Services/ex-declaration.service';
import { Component, Injectable, OnInit,  ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { __values } from 'tslib';
import { ExDeclarationsDto } from 'src/app/DTOs/ExchangeDeclarations/ExDeclarationsDto';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { CreateExDeclarationsDto } from 'src/app/DTOs/ExchangeDeclarations/CreateExDeclarationsDto';
import * as moment from 'jalali-moment';


@Component({
  selector: 'app-ex-declarations',
  templateUrl: './ex-declarations.component.html',
  styleUrls: ['./ex-declarations.component.scss']
})
@Injectable({
  providedIn: "root",
})
export class ExDeclarationsComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public exDecForm: FormGroup;
  isLoading =false;
  isLoadingSuccess =false ;
  timeLeft: number = 4;
  interval;
  ErrorCaractersisMoreThanMax: string = " تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد";

  @ViewChild("sweetAlert") private sweetAlert: SwalComponent;
  exprireDate: string = "تاریخ اظهارنامه";
  gregorianDate:string="";
  constructor(private exService: ExDeclarationService ) { }

  ngOnInit(): void {
    this.exDecForm = new FormGroup({
      exchangeDeclarationCode: new FormControl(null, [
        Validators.required,
      ]),
      price: new FormControl(null, [
        Validators.required,
      ]),
      priceAED: new FormControl(null),
      qty: new FormControl(null, [
       Validators.required,
      ]),
      exprireDate: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.required,
      ]),
    });
  }
  selectedValuesFromPickupDate(shamsiDate: string, gregorianDate: string, timestamp: number){
    this.exprireDate = gregorianDate ;
  }
  calcAED(){

    // console.log(this.exDecForm.controls.price.value);
    
    if(this.exDecForm.controls.price.value !== null && this.exDecForm.controls.price.value !== "")
    var price = Math.round((parseInt(this.ex_normalNum(this.exDecForm.controls.price.value))*3.67));
    else
    var price =0;

    this.exDecForm.controls.priceAED.setValue(price.toLocaleString('en-GB'));
    
  }
  submitExForm() {
    this.isLoading=true ;
    if(this.exDecForm.controls.priceAED.value !== null)
    var price =this.ex_normalNum(this.exDecForm.controls.priceAED.value);
    else
    var price ="0";



    var m =moment(this.exprireDate, 'jYYYY/jMM/jDD') ;
    var gregorianDate = m.locale('en').format('YYYY-MM-DD');
    var exDeclaration = new CreateExDeclarationsDto(
      this.exDecForm.controls.exchangeDeclarationCode.value,
      parseInt( price),
      parseInt(this.exDecForm.controls.qty.value),
      new Date(gregorianDate),
      this.exDecForm.controls.description.value
    );
 
    // console.log(JSON.stringify(exDeclaration));

    this.exService.createExDecService(exDeclaration).subscribe((res) => {
      this.isLoading=false ;
      if (res.status === "Success")
        this.LoadingSuccess() ;
        this.exDecForm.reset();
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

