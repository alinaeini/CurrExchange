import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { ExDeclarationsDto } from 'src/app/DTOs/ExchangeDeclarations/ExDeclarationsDto';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { CreateExDeclarationsDto } from 'src/app/DTOs/ExchangeDeclarations/CreateExDeclarationsDto';
import { BrokerService } from '../../Services/broker.service';
import { BrokerDto } from 'src/app/DTOs/Broker/BrokerDto';
import { CustomerService } from '../../Services/customer.service';
import { CustomerDto } from '../../DTOs/Customer/CustomerDto';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ExDeclarationService } from '../../Services/ex-declaration.service';
import { ExDecRemaindDto } from '../../DTOs/ExchangeDeclarations/ExDecRemaindDto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ExDecExport } from '../../DTOs/Sale/ExDecExport';
import { CreateSaleDto } from '../../DTOs/Sale/CreateSaleDto';
import * as moment from 'jalali-moment';
import { CurrencySalesService } from '../../Services/currency-sales.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { DomainName } from 'src/app/Utilities/pathTools';
import { CurrencyType } from 'src/app/DTOs/Sale/CurrencyType';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
// @Injectable({
//   providedIn: 'root',
// })
export class SalesComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  isLoading = false;
  isLoadingSuccess = false;
  brokers: BrokerDto[] = [];
  customers: CustomerDto[] = [];
  exDecs: ExDecRemaindDto[] = [];
  exDecsExport: ExDecExport[] = [];
  brokerId: string = '0';
  customerId: string = '0';
  TransferType: string = '0';
  timeLeft: number = 4;
  interval;
  panelOpenState = false;
  hiddenMatAccordion = true;
  ErrorCaractersisMoreThanMax: string =
    ' تعداد کاراکترها نمیتواند بیشتر از حد مجاز باشد';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  @ViewChild('sweetAlert_Success') private sweetAlert_Success: SwalComponent;
  @ViewChild('sweetAlert_Warning') private sweetAlert_Warning: SwalComponent;
  exprireDate: string = 'تاریخ فروش ';
  filteredOptions: Observable<CustomerDto[]>;
  filteredOptionsExdec: Observable<ExDecRemaindDto[]>;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource(null);
  exdecId: number = 0;
  exdecCode: string = '';
  exdecPrice: number = 0;
  balancePercent: number = 0;
  myControl = new FormControl();
  exDecControl = new FormControl('', Validators.required);

  public exDecForm: FormGroup;
  public salesForm: FormGroup;

  transferPrice: number = 0;
  constructor(
    private customerService: CustomerService,
    private brokerService: BrokerService,
    private exdecService: ExDeclarationService,
    private saleService: CurrencySalesService
  ) {}

  ngOnInit(): void {
    this.salesForm = new FormGroup({
      saleDate: new FormControl(null, [Validators.required]),
      salePrice: new FormControl(null, [Validators.required]),
      salePricePerUnit: new FormControl(null, [Validators.required]),
      brokerId: new FormControl(null, [Validators.required]),
      transferType: new FormControl(null, [Validators.required]),
      transferPrice: new FormControl(null),
      description: new FormControl('ندارد', [Validators.required]),
    });

    this.exDecForm = new FormGroup({
      price: new FormControl(null, [Validators.required]),
    });

    // this.brokers=[];
    // this.brokerService.getBrokerList().subscribe((brokerListResult) => {
    //   if (brokerListResult != null) {
    //     this.brokers = brokerListResult;
    //   } else {
    //     this.brokerService.getBrokerListService().subscribe((res) => {
    //       if (res.status === 'Success') {
    //         this.brokerService.setBrokerList(res.data);
    //         this.brokerService.getBrokerList().subscribe((brokerList) => {
    //           this.brokers = brokerList;
    //         });
    //       }
    //     });
    //   }
    // });
    this.getBroker();

    this.getCustomers();
    // this.exdecService.getExDecList().subscribe((exDecListResult) => {
    //   if (exDecListResult != null) {
    //     this.exDecs = exDecListResult;
    //   } else {
    this.getExDecIsNotSoldwithObservable();
    // }
    // });

    this.filteredOptionsExdec = this.exDecControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterExdec(value))
    );

    this.filteredOptions = this.myControl.valueChanges.pipe( startWith(''),   map((value) => this._filter(value))   );
  }
  getBroker() {
    this.brokers = [];
    this.brokerService.getBrokerListService().subscribe((res) => {
      // console.log(res);

      if (res.status === 'Success') {
        this.brokerService.setBrokerList(res.data);
        this.brokerService.getBrokerList().subscribe((brokerList) => {
          this.brokers = brokerList;
        });
      }
    });
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

  private _filter(value: string): CustomerDto[] {
    const filterValue = value.length > 0 ? value.trim() : '';
    return this.customers.filter(
      (option) =>
        option.title.trim().includes(filterValue) ||
        option.name.trim().includes(filterValue)
    );
  }

  private _filterExdec(value: string): ExDecRemaindDto[] {
    const filterValue = value !== null && value.length > 0 ? value.trim() : '';
    return this.exDecs.filter((option) => option.exCode.includes(filterValue));
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
    if (event.value === '2') {
      this.hiddenMatAccordion = false;
    } else this.hiddenMatAccordion = true;
  }

  selectedValuesFromPickupDate(
    shamsiDate: string,
    gregorianDate: string,
    timestamp: number
  ) {
    this.exprireDate = gregorianDate;
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

  getExdecCode(id: string) {
    var result = '';
    if (id !== null && id !== undefined && id.toString().length > 0)
      if (this.exDecs !== undefined && this.exDecs !== null) {
        this.exdecId = parseInt(id);
        this.exdecCode = this.exDecs.find((exDecs) => exDecs.id === parseInt(id)).exCode;
        this.exdecPrice = this.exDecs.find((exDecs) => exDecs.id === parseInt(id)).remaindPrice;
        result = this.exDecs.find((exDecs) => exDecs.id === parseInt(id)).exCode;

        var salePrice = this.ex_normalNum( this.salesForm.controls.salePrice.value);
        var totalSelectedExdec = this.getTotalPrice() === NaN || this.getTotalPrice() === null ? 0 : this.getTotalPrice();
        // console.log(
        //   this.salesForm.controls.salePrice.value,
        //   totalSelectedExdec,
        //   this.exdecPrice
        // );

        var priceToRemaind = parseInt(salePrice) - totalSelectedExdec;
        if (priceToRemaind > this.exdecPrice) priceToRemaind = this.exdecPrice;
        this.exDecForm.controls.price.setValue(
          priceToRemaind.toLocaleString('en-GB')
        );
        // this.exdecId = this.exDecs.find((exDecs) => exDecs.id === parseInt(id)).id ;
      }
    return result;
  }

  getTotalPrice() {
    return this.exDecsExport.map((t) => t.price).reduce((acc, value) => acc + value, 0);
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
    else{
      this.transferPrice = 0;
      this.sweetAlert.text = ' مشخص کردن کارگزار و نحوه پرداخت  قبل از محاسبه کارمزد الزامی است';
      this.sweetAlert.fire();
    }
    this.salesForm.controls.transferPrice.setValue(this.transferPrice.toLocaleString('en-GB'));
  }
  
  submitSaleForm() {
    var validation = true;
    //#region  Validations
    if (parseInt(this.TransferType) === 0) {
      validation = false;
      this.sweetAlert.text = 'لطفا نوع پرداخت ارز را مشخص بفرمایید';
      this.sweetAlert.fire();
    }
    var brokerSelected = this.brokers.filter(
      (x) => x.id == parseInt(this.brokerId)
    )[0];
    if (this.salesForm.controls.salePrice.value !== null)
      var salePrice = this.ex_normalNum(
        this.salesForm.controls.salePrice.value
      );
    else var salePrice = '0';

    if (this.salesForm.controls.salePricePerUnit.value !== null)
      var salePricePerUnit = this.ex_normalNum(
        this.salesForm.controls.salePricePerUnit.value
      );
    else var salePricePerUnit = '0';

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


    if ( parseInt(salePrice) + this.transferPrice > brokerSelected.accountBalance) 
    {
      validation = false;
      this.sweetAlert.text = 'مقدار وارد شده بهمراه کارمزد از کل موجودی بیشتر میباشد';
      this.sweetAlert.fire();
    }

    if (!this.hiddenMatAccordion && this.exDecsExport.length === 0) {
      validation = false;
      this.sweetAlert.text = 'مقادیر اظهارنامه بصورت دستی وارد نشده است';
      this.sweetAlert.fire();
    }

    if (!this.hiddenMatAccordion) {
      if (this.exDecsExport.length === 0) {
        validation = false;
        this.sweetAlert.text = 'مقادیر اظهارنامه بصورت دستی وارد نشده است';
        this.sweetAlert.fire();
      } else {
        if (parseInt(salePrice) !== this.getTotalPrice()) {
          validation = false;
          this.sweetAlert.text =
            'مقادیر اظهارنامه با مقدار درهم فروش برابر نیست . ';
          this.sweetAlert.fire();
        }
      }
    }

    if (parseInt(this.customerId) === 0) {
      validation = false;
      this.sweetAlert.text = 'مشتری هنوز مشخص نشده است ';
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
            parseInt(salePricePerUnit),
            parseInt(this.TransferType),
            Math.round(this.transferPrice),
            this.salesForm.controls.description.value,
            parseInt(this.brokerId),
            parseInt(this.customerId),
            CurrencyType.CarrencySales,
            this.exDecsExport
          );

          // console.log(JSON.stringify(salesDto));

          this.saleService
            .createCurrencySalesService(salesDto)
            .subscribe((res) => {
              this.isLoading = false;
              if (res.status === 'Success') {
                this.clearForm();
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
clearForm(){
  this.getBroker();
  this.getExDecIsNotSoldwithObservable();
  this.LoadingSuccess();
  this.exDecsExport = [];
  this.dataSource = new MatTableDataSource(this.exDecsExport);
  this.exdecCode = '';
  this.exDecControl.reset();
  this.exDecForm.reset();
  this.salesForm.reset();
  this.transferPrice = 0;
  this.brokerId="0";
  this.TransferType="0" ;
  this.customerId = '0';
  this.getTitle(this.customerId);
  this.salesForm.controls.description.setValue("ندارد");
}
  submitExForm() {
    this.isLoading = true;
    if (this.exDecForm.controls.price.value !== null) {
      var price = this.ex_normalNum(this.exDecForm.controls.price.value);
    } else var price = '0';
    // console.log("price => ", this.exDecForm.controls.price.value);

    // if (parseInt(price) > this.exdecPrice) {
    //   this.sweetAlert.text =
    //     'مقدار وارد شده از مانده مبلغ اظهارنامه بیشتر میباشد';
    //   this.sweetAlert.fire();
    // }

    var exDeclaration = new ExDecExport(
      this.exdecId,
      this.exdecCode,
      parseInt(price)
    );

    if (
      this.exdecCode !== '' &&
      this.exdecId > 0 &&
      parseInt(price) > 0 &&
      parseInt(price) !== NaN
    )
      this.exDecsExport.push(exDeclaration);
    this.dataSource = new MatTableDataSource(this.exDecsExport);
    this.dataSource.sort = this.sort;
    //this.isLoading = false;
    if (this.dataSource.data.length > 0)
      this.displayedColumns = ['row', 'exCode', 'price', 'operation'];
    else this.displayedColumns = [];

    this.exdecCode = '';
    this.exDecControl.reset();
    this.exDecForm.reset();
    this.isLoading = false;
  }

  deleteFromList(id: string) {
    this.isLoading = true;
    this.exDecsExport = this.exDecsExport.filter((x) => x.id != parseInt(id));
    this.dataSource = new MatTableDataSource(this.exDecsExport);
    this.dataSource.sort = this.sort;
    this.isLoading = false;
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

  getExDecIsNotSoldwithObservable() {
    this.exDecs = [];
    this.exdecService.getExDecListService().subscribe((res) => {
      if (res.status === 'Success') {
        this.exdecService.setExDecList(res.data);
        this.exdecService.getExDecList().subscribe((exDecList) => {
          this.exDecs = exDecList;
        });
      }
    });
  }
}
