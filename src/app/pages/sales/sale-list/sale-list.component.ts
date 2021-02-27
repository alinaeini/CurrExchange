import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencySalesService } from 'src/app/Services/currency-sales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from 'src/app/Services/customer.service';
import { BrokerService } from 'src/app/Services/broker.service';
import { BrokerDto } from '../../../DTOs/Broker/BrokerDto';
import { CustomerDto } from 'src/app/DTOs/Customer/customerDto';
import { CurrencySaleFilter } from 'src/app/DTOs/Sale/CurrencySaleFilter';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import moment from 'jalali-moment';
import { TableExporter } from '../../../shared/Export/TableExporter';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})

export class SaleListComponent implements OnInit {
  @ViewChild("sweetAlert") private sweetAlert: SwalComponent;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'row',
    'currSaleDate',
    'brokerName',
    'price',
    'customerName',
    'profitLossAmount',
    'salePricePerUnit',
    'transferType',
    'transferPrice',
    'operation'
  ];
  dataSource = new MatTableDataSource(null);
  filterCurrSales: CurrencySaleFilter = new CurrencySaleFilter(
    1,
    0,
    0,
    0,
    10,
    0,
    1,
    '',
    [],
  );
  pages: number[] = [];
  searchText: string = '';
  Id: string = '';
  isLoadingData = false;
  showFiller = false;
  checkToggle =false;
  customers: CustomerDto[]=[];
  brokers: BrokerDto[]=[];
  dateFrom: string = "";
  dateTo: string = "";
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private entitiessService:CurrencySalesService,
    private customerService: CustomerService,
    private brokerService: BrokerService,
  ) {}

  ngOnInit(): void {
    this.isLoadingData = true;
    this.clearFilters();
    this.activatedRoute.queryParams.subscribe((res) => {
      this.Id= res.id ;
      if (res.pageId !== undefined) {
        if (this.filterCurrSales.pageCount >= parseInt(res.pageId, 0))
          this.filterCurrSales.pageId = parseInt(res.pageId, 0);
        else this.filterCurrSales.pageId = 1;
        //console.log(this.filterExDec.pageId ,this.filterExDec.pageCount);
      }
      this.getCurrSaleList();
      this.getBroker();
      this.getCustomers();
     this.setNavigate('pageId', this.filterCurrSales.pageId);
    });
    
    
  }
clearFilters(){
  this.filterCurrSales.brokerId=0;
  this.filterCurrSales.customerId=0;
  this.filterCurrSales.isAccount=false;
  this.filterCurrSales.isCashed=false;
  // this.filterCurrSales.isLossAmount=false;
  // this.filterCurrSales.isProfitAmount=false;
  this.filterCurrSales.fromDateSale="";
  this.filterCurrSales.toDateSale="";
  this.filterCurrSales.fromSaleBasePrice = 0;
  this.filterCurrSales.toSaleBasePrice = 0;
  this.dateFrom ="";
  this.dateTo="";
  this.getCurrSaleList();
  this.setNavigate('pageId', this.filterCurrSales.pageId);
}



filterGenerate(){
  
  var from =moment(this.dateFrom, 'jYYYY/jMM/jDD') ;
  var to =moment(this.dateTo, 'jYYYY/jMM/jDD') ;
  if (new Date(from.locale('en').format('YYYY-MM-DD')).toString() === 'Invalid Date' || 
      new Date(to.locale('en').format('YYYY-MM-DD')).toString() === 'Invalid Date' ) {
        this.filterCurrSales.fromDateSale = "" ;
        this.filterCurrSales.toDateSale = "" ;
  }else{
    this.filterCurrSales.fromDateSale = moment(from.clone(), 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD') ;
    this.filterCurrSales.toDateSale = moment(to.clone(), 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
  }
  // console.log(this.filterCurrSales.toDateSale  < this.filterCurrSales.fromDateSale);
  if(this.filterCurrSales.toDateSale  < this.filterCurrSales.fromDateSale)
  {
    this.sweetAlert.text= "لطفا تاریخ فروش را به درستی وارد کنید";
    this.sweetAlert.fire();
  }
  else{
    console.log(this.filterCurrSales);
   this.getCurrSaleList();
   this.setNavigate('pageId', this.filterCurrSales.pageId);
  }
//  console.log(this.filterCurrSales);

 // 
}
  getBroker() {
    this.brokers=[];
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
 
  exportNormalTable() {
    TableExporter.exportToExcel("ExampleMaterialTable");
  }
  checkFilterToggle(){
    // console.log(this.checkToggle );
    this.checkToggle = !this.checkToggle;
  }
  exCodeDetailByCurrId(id:string){
      this.Id= id;
      this.router.navigate(['sales/sale-exdec-list-currSaleId'], { queryParams: { id: this.Id } });
  }

piDetailByCurrId(id:string){
      this.Id= id;
      this.router.navigate(['sales/sale-pi-list-currSaleId'], { queryParams: { id: this.Id } });
}

  selectedValue(event){
    this.filterCurrSales.takeEntity = event;
    this.setNavigate();
  }
  /** Gets the total cost of all transactions. */
  // getTotalRemaind() {
  //   return this.filterExDecSales.exDecRemaind.map(t => t.remaindPrice).reduce((acc, value) => acc + value, 0);
  // }

  sumProfitLossAmount() {
    return this.filterCurrSales.entities.map(t => t.profitLossAmount).reduce((acc, value) => acc + value, 0);
  }

  sumTransferPrice() {
    return this.filterCurrSales.entities.map(t => t.transferPrice).reduce((acc, value) => acc + value, 0);
  }


  // getTotalSoldPrice() {
  //   return this.filterExDecSales.exDecRemaind.map(t => t.soldPrice).reduce((acc, value) => acc + value, 0);
  // }
  getCurrSaleList() {
    this.isLoadingData = true;
    this.entitiessService.getFilteredCurrSales(this.filterCurrSales).subscribe((result) => {
      if (result.status == 'Success') {
        this.filterCurrSales = result.data;

        // console.log(this.filterCurrSales);
        
        //data
        this.dataSource = new MatTableDataSource(this.filterCurrSales.entities);
        
        this.dataSource.sort = this.sort;
        //end data
        if (result.data.searchText === null) {
          this.filterCurrSales.searchText = '';
        }
        this.pages = [];
        for (let i = result.data.startPage; i <= result.data.endPage; i++) {
          this.pages.push(i);
        }
      }
    });
    this.isLoadingData = false;
  }

  onKey(event: any) {
    // without type info
    this.searchText = event.target.value;
  }

  searchButton() {
    this.setNavigate('searchText', this.searchText);
    this.filterCurrSales.searchText = this.searchText;
    this.getCurrSaleList();
  }

  //
  // dataSource = new MatTableDataSource(dt);
  setPage(currentpage: number) {
    this.filterCurrSales.pageId = currentpage;
    this.setNavigate();
  }

  setLastPage() {
    if (this.filterCurrSales.pageId < this.filterCurrSales.pageCount)
      this.filterCurrSales.pageId++;
    this.setNavigate();
  }
  setFirstPage() {
    if (this.filterCurrSales.pageId > 1) this.filterCurrSales.pageId--;
    this.setNavigate();
  }



  deleteFromList(id: string) {
    // this.sweetAlert.fire().then((result) => {
    //   if (result.isConfirmed) {
    //     this.isLoadingData = true;
    //     this.exdecService.deleteExDecById(id).subscribe((res) => {
    //       if (res.status === 'Success') {
    //         this.filterExDecSales.exDecRemaind = this.filterExDecSales.exDecRemaind.filter(
    //           (x) => x.id != parseInt(id)
    //         );
    //         this.dataSource = new MatTableDataSource(
    //           this.filterExDecSales.exDecRemaind
    //         );
    //         this.dataSource.sort = this.sort;
    //         this.isLoadingData = false;
    //       }
    //     });
    //   }
    // });
  }
  setNavigate(filterParam: string = null, value: any = null) {
    value = (value ===undefined) || (value ===null)  ? '' : value ;  
    let pageid: number = this.filterCurrSales.pageId;
    let searchText: string = '';
    let idStr: string = this.Id;
    let brokerId: number = this.filterCurrSales.brokerId;
    let customerId: number=this.filterCurrSales.customerId;
    let isCashed: boolean=this.filterCurrSales.isCashed;
    let isAccount: boolean=this.filterCurrSales.isAccount;
    let fromDateSale: string=this.filterCurrSales.fromDateSale;
    let toDateSale: string=this.filterCurrSales.toDateSale;
    let fromSaleBasePrice: number=this.filterCurrSales.fromSaleBasePrice;
    let toSaleBasePrice: number=this.filterCurrSales.toSaleBasePrice;
    let takeEntity =this.filterCurrSales.takeEntity;
    if (filterParam !== null)
      switch (filterParam) {
        case 'pageId': {
          pageid = parseInt(value, 0);
          break;
        }
        case 'searchText': {
          searchText = value;
          break;
        }
        case 'takeEntity': {
          takeEntity = value;
          break;
        }
        case 'brokerId': {
          brokerId = value;
          break;
        }
        case 'customerId': {
          customerId = value;
          break;
        }
        case 'isCashed': {
          isCashed = value;
          break;
        }
        case 'isAccount': {
          isAccount = value;
          break;
        }
        case 'fromDateSale': {
          fromDateSale = value;
          break;
        }
        case 'toDateSale': {
          toDateSale = value;
          break;
        }
        case 'fromSaleBasePrice': {
          fromSaleBasePrice = value;
          break;
        }
        case 'toSaleBasePrice': {
          toSaleBasePrice = value;
          break;
        }
      }

    this.router.navigate(['sales/sale-list'], {
      queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity,
         brokerId: brokerId,
         customerId: customerId,
         isCashed: isCashed,
         isAccount:isAccount,
         fromDateSale:fromDateSale,
         toDateSale:toDateSale,
         fromSaleBasePrice: fromSaleBasePrice,
         toSaleBasePrice: toSaleBasePrice
      },
    });
  }



}
