import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { CreateBrokerDto } from 'src/app/DTOs/Broker/CreateBrokerDto';
import { BrokerService } from '../../../Services/broker.service';

@Component({
  selector: 'app-brokers',
  templateUrl: './brokers.component.html',
  styleUrls: ['./brokers.component.scss']
})
export class BrokersComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public brokerForm: FormGroup;
  isLoading =false;
  isLoadingSuccess =false ;
  timeLeft: number = 4;
  interval;
  ErrorCaractersisMoreThanMax: string = " تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد";

  @ViewChild("sweetAlert") private sweetAlert: SwalComponent;


  constructor(private brokerService: BrokerService ) { }

  ngOnInit(): void {
    this.brokerForm = new FormGroup({
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
      serviceChargeAccount: new FormControl(null, [
        Validators.required,
      ]),
      serviceChargeCash: new FormControl(null, [
        Validators.required,
      ]),
    });
  }


  submitCustomerForm() {
    this.isLoading = true ;
    var broker = new CreateBrokerDto(
      this.brokerForm.controls.name.value,
      this.brokerForm.controls.title.value,
      this.brokerForm.controls.description.value,
      this.brokerForm.controls.phone.value,
      this.brokerForm.controls.address.value,
      parseFloat(this.brokerForm.controls.serviceChargeAccount.value),
      parseFloat(this.brokerForm.controls.serviceChargeAccount.value)
    );
    this.brokerService.createBrokerService(broker).subscribe((res) => {
      this.isLoading = false ;
      if (res.status === "Success")
        this.LoadingSuccess() ;
        this.brokerForm.reset();
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
