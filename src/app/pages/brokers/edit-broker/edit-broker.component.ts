import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { BrokerService } from 'src/app/Services/broker.service';
import { BrokerDto } from '../../../DTOs/Broker/BrokerDto';

@Component({
  selector: 'app-edit-broker',
  templateUrl: './edit-broker.component.html',
  styleUrls: ['./edit-broker.component.scss']
})
export class EditBrokerComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public brokerFrom: FormGroup;
  isLoading =false;
  isLoadingSuccess =false ;
  timeLeft: number = 4;
  brokerId:number =0 ;
  interval;
  ErrorCaractersisMoreThanMax: string = " تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد";

  @ViewChild("sweetAlert") private sweetAlert: SwalComponent;

  constructor(
    private brokerService: BrokerService,
    private activatedRoute: ActivatedRoute ,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.brokerFrom = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      title: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      tel: new FormControl(null, [
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
      serviceChargeAccount: new FormControl(null, [
        Validators.required,
      ]),
      serviceChargeCash: new FormControl(null, [
        Validators.required,
      ]),
    });
    this.activatedRoute.queryParams.subscribe((param) => {
      this.brokerService.getBrokerById(param.id).subscribe(res=>{
        this.brokerId = res.data.id ;
        this.brokerFrom.controls.name.setValue(res.data.name);
        this.brokerFrom.controls.title.setValue(res.data.title);
        this.brokerFrom.controls.tel.setValue(res.data.tel);
        this.brokerFrom.controls.address.setValue(res.data.address),
        this.brokerFrom.controls.description.setValue(res.data.description),
        this.brokerFrom.controls.serviceChargeAccount.setValue(res.data.serviceChargeAccount);
        this.brokerFrom.controls.serviceChargeCash.setValue(res.data.serviceChargeCash);
      
      });

    });
    
  }


  submitBrokerForm() {
    this.isLoading = true ;
    var broker =  new BrokerDto(
      this.brokerId,
      this.brokerFrom.controls.name.value,
      this.brokerFrom.controls.title.value,
      this.brokerFrom.controls.description.value,
      this.brokerFrom.controls.tel.value,
      this.brokerFrom.controls.address.value,
      this.brokerFrom.controls.serviceChargeAccount.value,
      this.brokerFrom.controls.serviceChargeCash.value,
      0
    );

    this.brokerService.editBroker(broker).subscribe((res) => {
      this.isLoading = false ;
      if (res.status === "Success"){
        this.LoadingSuccess() ;
        this.router.navigate(["brokers"]);
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
