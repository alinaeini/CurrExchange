import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ExDeclarationsDto } from 'src/app/DTOs/ExchangeDeclarations/ExDeclarationsDto';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { CreateExDeclarationsDto } from 'src/app/DTOs/ExchangeDeclarations/CreateExDeclarationsDto';
import { BrokerService } from '../../../Services/broker.service';
import { BrokerDto } from 'src/app/DTOs/Broker/BrokerDto';
import { CustomerService } from '../../../Services/customer.service';
import { CustomerDto } from '../../../DTOs/Customer/CustomerDto';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExDeclarationService } from '../../../Services/ex-declaration.service';
import { ExDecRemaindDto } from '../../../DTOs/ExchangeDeclarations/ExDecRemaindDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ExDecExport } from '../../../DTOs/Sale/ExDecExport';
import { CreateSaleDto } from '../../../DTOs/Sale/CreateSaleDto';
import * as moment from 'jalali-moment';
import { CurrencySalesService } from '../../../Services/currency-sales.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MiscellaneousCustomerService } from '../../../Services/miscellaneous-customer.service';
import { CurrencyType } from 'src/app/DTOs/Sale/CurrencyType';
import { Console } from 'console';
import { CommodityCustomerService } from '../../../Services/commodity-customer.service';

@Component({
  selector: 'app-moving-currency',
  templateUrl: './moving-currency.component.html',
  styleUrls: ['./moving-currency.component.scss'],
})
export class MovingCurrencyComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  isLoading = false;
  isLoadingSuccess = false;
  brokers: BrokerDto[] = [];
  customers: CustomerDto[] = [];
  commoditycustomers: CustomerDto[] = [];
  // exDecs: ExDecRemaindDto[] = [];
  // exDecsExport: ExDecExport[] = [];
  brokerId: string = '0';
  MisCustomerOrBrokerOrCommCustomer_Id: string = '0';
  TransferType: string = '0';
  timeLeft: number = 4;
  interval;
  panelOpenState = false;
  currencyMovingType : string ='2';
  currencyType: CurrencyType = CurrencyType.CurrencyTransferFromTheBroker;
  ErrorCaractersisMoreThanMax: string =
    ' تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  @ViewChild('sweetAlert_Success') private sweetAlert_Success: SwalComponent;
  @ViewChild('sweetAlert_Warning') private sweetAlert_Warning: SwalComponent;
  exprireDate: string = 'تاریخ انتقال ارز';
  filteredOptions: Observable<CustomerDto[]>;
  filteredOptionsExdec: Observable<ExDecRemaindDto[]>;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource(null);
  // exdecId: number = 0;
  // exdecCode: string = '';
  // exdecPrice: number = 0;
  balancePercent: number = 0;
  myControl = new FormControl();
  // exDecControl = new FormControl('', Validators.required);

  // public exDecForm: FormGroup;
  public salesForm: FormGroup;

  transferPrice: number = 0;
  constructor(
    private miscellaneousCustomerService: MiscellaneousCustomerService,
    private commodityCustomerService: CommodityCustomerService,
    private brokerService: BrokerService,
    private saleService: CurrencySalesService
  ) {}

  ngOnInit(): void {
    this.salesForm = new FormGroup({
      saleDate: new FormControl(null, [Validators.required]),
      salePrice: new FormControl(null, [Validators.required]),
      // salePricePerUnit: new FormControl(null, [Validators.required]),
      brokerId: new FormControl(null, [Validators.required]),
      customerId: new FormControl(null, [Validators.required]),
      transferType: new FormControl(null, [Validators.required]),
      transferPrice: new FormControl(null),
      description: new FormControl('ندارد', [Validators.required]),
    });

    this.getBroker();

    this.getCustomers();
    this.getCommodityCustomers();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  getBroker() {
    this.brokers = [];
    this.brokerService.getBrokerListService().subscribe((res) => {
      if (res.status === 'Success') {
        this.brokerService.setBrokerList(res.data);
        this.brokerService.getBrokerList().subscribe((brokerList) => {
          this.brokers = brokerList;
        });
      }
    });
  }
  getCustomers() {
          this.miscellaneousCustomerService .getCustomerListService() .subscribe((res) => {
              if (res.status === 'Success') {
                this.miscellaneousCustomerService.setCustomerList(res.data);
                this.miscellaneousCustomerService
                  .getCustomerList()
                  .subscribe((customerList) => {
                    this.customers = customerList;
                  });
              }
            });
  }

  getCommodityCustomers() {
    this.commodityCustomerService .getCustomerListService() .subscribe((res) => {
        if (res.status === 'Success') {
          this.commodityCustomerService.setCustomerList(res.data);
          this.commodityCustomerService.getCustomerList().subscribe((customerList) => {
              this.commoditycustomers = customerList;
            });
        }
      });
}


  private _filter(value: string): CustomerDto[] {
    const filterValue = value.length > 0 ? value.trim() : '';
    return this.customers.filter(
      (option) =>
        option.title.trim().includes(filterValue) ||
        option.name.trim().includes(filterValue)
    );
  }

  sumBrokers() {
    return this.brokers
      .map((t) => t.accountBalance)
      .reduce((acc, value) => acc + value, 0);
  }
  getPercent(id): number {
    var amountBalanceBroker = this.brokers.filter((x) => x.id == id)[0]
      .accountBalance;
    return Math.round((amountBalanceBroker * 100) / this.sumBrokers());
  }
  radioChange(event) {
    switch (event.value ) {
      case CurrencyType.CurrencyTransferFromTheBroker.toString():
        this.currencyMovingType = CurrencyType.CurrencyTransferFromTheBroker.toString();
        this.currencyType =CurrencyType.CurrencyTransferFromTheBroker;
        break;
      case CurrencyType.CurrencyTransferFromTheCommodityCustomer.toString():
        this.currencyMovingType = CurrencyType.CurrencyTransferFromTheCommodityCustomer.toString();
        this.currencyType =CurrencyType.CurrencyTransferFromTheCommodityCustomer;
        break;   
      case CurrencyType.CurrencyTransferFromTheMiscellaneousCustomer.toString():
        this.currencyMovingType = CurrencyType.CurrencyTransferFromTheMiscellaneousCustomer.toString();
        this.currencyType =CurrencyType.CurrencyTransferFromTheMiscellaneousCustomer;
        break;  

    }

    // console.log(event.value , this.currencyMovingType ,this.currencyType );
    
  }

  selectedValuesFromPickupDate(
    shamsiDate: string,
    gregorianDate: string,
    timestamp: number
  ) {
    this.exprireDate = gregorianDate;
  }

  fillTransferPrice() {
    
    if (parseInt(this.brokerId) > 0  && parseInt(this.TransferType) > 0  &&  this.salesForm.controls.salePrice.value !== null &&  this.brokers !== undefined  ) {
      var salePrice = this.ex_normalNum( this.salesForm.controls.salePrice.value );
      // console.log(salePrice);
      var brokerSelected = this.brokers.filter(    (x) => x.id == parseInt(this.brokerId) )[0];
      if (parseInt(this.TransferType) !== 0) {
        switch (this.TransferType) {
          case '1':
            this.transferPrice =
              parseInt(salePrice) * brokerSelected.serviceChargeCash;
            break;

          case '2':
            this.transferPrice =
              parseInt(salePrice) * brokerSelected.serviceChargeAccount;
            break;
        }
      }
      
    }
    else
    {
      this.transferPrice = 0;
      this.sweetAlert.text = ' مشخص کردن کارگزار و نحوه پرداخت  قبل از محاسبه کارمزد الزامی است';
      this.sweetAlert.fire();
    }
    this.salesForm.controls.transferPrice.setValue(this.transferPrice.toLocaleString('en-GB'));
  }

  submitSaleForm() {
    // console.log(this.MisCustomerOrBroker_Id , this.brokerId, this.currencyType);

    var validation = true;
    //#region  Validations
    if (parseInt(this.MisCustomerOrBrokerOrCommCustomer_Id) === 0) {
      validation = false;
      this.sweetAlert.text = 'مبدا انتقال ارز هنوز مشخص نشده است ';
      this.sweetAlert.fire();
    }

    if ( this.currencyType === CurrencyType.CurrencyTransferFromTheBroker &&
                      parseInt(this.MisCustomerOrBrokerOrCommCustomer_Id) === parseInt(this.brokerId)) {
      validation = false;
      this.sweetAlert.text = 'کارگزار مبدا و مقصد یکسان انتخاب شده است';
      this.sweetAlert.fire();
    }
    if (parseInt(this.TransferType) === 0) {
      validation = false;
      this.sweetAlert.text = 'لطفا نوع پرداخت ارز را مشخص بفرمایید';
      this.sweetAlert.fire();
    }
    var brokerSelected = this.brokers.filter(  (x) => x.id == parseInt(this.brokerId) )[0];

    if (this.salesForm.controls.salePrice.value !== null)
    {
      var salePrice = this.ex_normalNum(this.salesForm.controls.salePrice.value );
    }
    else 
      var salePrice = '0';

      if (this.salesForm.controls.transferPrice.value !== null)
      {
        var transferPrice = this.ex_normalNum(this.salesForm.controls.transferPrice.value );
        this.transferPrice = parseInt(transferPrice) ;
      }
      else 
      this.transferPrice = 0;


     
  
      if (Math.round(this.transferPrice) === 0 ) 
      {
        validation = false;
        this.sweetAlert.text = 'مقدار کارمزد انتخاب نشده است';
        this.sweetAlert.fire();
      }
    // if (this.salesForm.controls.salePricePerUnit.value !== null)
    //   var salePricePerUnit = this.ex_normalNum(this.salesForm.controls.salePricePerUnit.value);
    // else
    //   var salePricePerUnit = '0';

    //this.fillTransferPrice();
   
    if ( parseInt(salePrice) + this.transferPrice > brokerSelected.accountBalance ) {
      validation = false;
      this.sweetAlert.text =
        'مقدار وارد شده بهمراه کارمزد از کل موجودی بیشتر میباشد';
      this.sweetAlert.fire();
    }



    //#endregion
    if (validation) {
      this.sweetAlert_Warning.fire().then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          var m = moment(this.exprireDate, 'jYYYY/jMM/jDD');
          var gregorianDate = m.locale('en').format('YYYY-MM-DD');

          var salesDto = new CreateSaleDto(
            new Date(gregorianDate),
            parseInt(salePrice),
            0,
            parseInt(this.TransferType),
            Math.round(this.transferPrice),
            this.salesForm.controls.description.value,
            parseInt(this.brokerId),
            parseInt(this.MisCustomerOrBrokerOrCommCustomer_Id),
            this.currencyType,
            null
          );

          
          this.saleService .createCurrencySalesService(salesDto)
            .subscribe((res) => {
              this.isLoading = false;
              if (res.status === 'Success') {
                this.getBroker();
                this.LoadingSuccess();
                this.salesForm.reset();
                this.transferPrice = 0;
                this.TransferType = '0';
                this.brokerId = '0';
                this.MisCustomerOrBrokerOrCommCustomer_Id = '0';
                this.sweetAlert_Success.text = 'عملیات با موفقیت انجام شد';
                this.sweetAlert_Success.fire();
              }
              if (res.status === 'Error') {
                this.sweetAlert.text = res.data.info;
                this.sweetAlert.fire();
              }
            });
        }
      });
    }
  }

  ex_normalNum(numStr): string {
    var num = numStr.replace(/,\s?/g, '');
    return num;
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  LoadingSuccess() {
    this.isLoadingSuccess = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 4;
        this.isLoadingSuccess = false;
      }
    }, 1000);
  }
}
