import { Component, OnInit, ViewChild, AfterViewInit, PipeTransform } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ExDeclarationsDto } from '../../../DTOs/ExchangeDeclarations/ExDeclarationsDto';
import { ExDeclarationService } from '../../../Services/ex-declaration.service';
import * as moment from 'jalali-moment';

declare function  ex_normalNum(num):string ;
declare function numberWithCommas(num):string;

@Component({
  selector: 'app-edit-ex-declarations',
  templateUrl: './edit-ex-declarations.component.html',
  styleUrls: ['./edit-ex-declarations.component.scss']
})

export class EditExDeclarationsComponent implements OnInit  {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public exdecFrom: FormGroup;
  isLoading =false;
  isLoadingSuccess =false ;
  timeLeft: number = 4;
  exdecId:number =0 ;
  interval;
 
  ErrorCaractersisMoreThanMax: string = " تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد";

  @ViewChild("sweetAlert") private sweetAlert: SwalComponent;
  exprireDate: string = "تاریخ اظهارنامه";

  constructor(
    private exdecService: ExDeclarationService,
    private activatedRoute: ActivatedRoute ,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.exdecFrom = new FormGroup({
      exchangeDeclarationCode: new FormControl(null, [
        Validators.required,
      ]),
      price: new FormControl(null, [
        Validators.required,
      ]),
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



    this.activatedRoute.queryParams.subscribe((param) => {
      this.exdecService.getExDecById(param.id).subscribe(res=>{


        // moment('1989/01/24', 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'); 
        this.exprireDate =  moment(res.data.expireDate, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD'); 
          this.exdecId = res.data.id ;
          this.exdecFrom.controls.exchangeDeclarationCode.setValue(res.data.exCode);
          this.exdecFrom.controls.price.setValue(res.data.price.toLocaleString('en-GB'));
          this.exdecFrom.controls.qty.setValue(res.data.qty);
          //this.exdecFrom.controls.exprireDate.setValue(res.data.expireDate);
          this.exdecFrom.controls.description.setValue(res.data.description);
      });
    });
    
  }

  submitExdecForm() {
    
      this.isLoading=true ;
      if(this.exdecFrom.controls.price.value !== null)
      var price = ex_normalNum(this.exdecFrom.controls.price.value);
      else
      var price ="0";

      var m =moment(this.exprireDate, 'jYYYY/jMM/jDD') ;
      var gregorianDate = m.locale('en').format('YYYY-MM-DD');
      var exDeclaration = new ExDeclarationsDto(
        this.exdecId,
        this.exdecFrom.controls.exchangeDeclarationCode.value,
        parseInt( price),
        parseInt(this.exdecFrom.controls.qty.value),
        new Date(gregorianDate),
        this.exdecFrom.controls.description.value
      );
      this.exdecService.editExDec(exDeclaration).subscribe((res) => {
        this.isLoading=false ;
        if (res.status === "Success")
          this.LoadingSuccess() ;
          this.router.navigate(["ex-declarations"]);
        if (res.status === "Error") {
          this.sweetAlert.text= res.data.info;
          this.sweetAlert.fire();
        }
     });
  }
  selectedValuesFromPickupDate(shamsiDate: string, gregorianDate: string, timestamp: number){
    this.exprireDate = gregorianDate ;
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
