import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencySalesService } from 'src/app/Services/currency-sales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterCurrSaleDto } from '../../../DTOs/Sale/FilterCurrSaleDto';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.scss']
})

export class SaleListComponent implements OnInit {
 
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'row',
    'currSaleDate',
    'brokerName',
    'price',
    'customerName',
    'profitLossAmount',
    'salePricePerUnit',
    'transferPrice',
    'operation'
  ];
  dataSource = new MatTableDataSource(null);
  filterCurrSales: FilterCurrSaleDto = new FilterCurrSaleDto(
    1,
    0,
    0,
    0,
    10,
    0,
    1,
    '',
    []
  );
  pages: number[] = [];
  searchText: string = '';
  Id: string = '';
  isLoadingData = false;
  showFiller = false;
  checkToggle =false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private currencySalesService:CurrencySalesService
  ) {}



  ngOnInit(): void {
    
    this.isLoadingData = true;
    this.activatedRoute.queryParams.subscribe((res) => {
      this.Id= res.id ;
      if (res.pageId !== undefined) {
        if (this.filterCurrSales.pageCount >= parseInt(res.pageId, 0))
          this.filterCurrSales.pageId = parseInt(res.pageId, 0);
        else this.filterCurrSales.pageId = 1;
        //console.log(this.filterExDec.pageId ,this.filterExDec.pageCount);
      }
      this.getCurrSaleExDecList();

     this.setNavigate('pageId', this.filterCurrSales.pageId);
    });
  }

  checkFilterToggle(){
    console.log(this.checkToggle );
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
    return this.filterCurrSales.currencySale.map(t => t.profitLossAmount).reduce((acc, value) => acc + value, 0);
  }

  sumTransferPrice() {
    return this.filterCurrSales.currencySale.map(t => t.transferPrice).reduce((acc, value) => acc + value, 0);
  }


  // getTotalSoldPrice() {
  //   return this.filterExDecSales.exDecRemaind.map(t => t.soldPrice).reduce((acc, value) => acc + value, 0);
  // }
  getCurrSaleExDecList() {
    this.isLoadingData = true;
    this.currencySalesService.getFilteredCurrSales(this.filterCurrSales).subscribe((result) => {
      if (result.status == 'Success') {
        this.filterCurrSales = result.data;

        // console.log(this.filterCurrSales.currencySale);
        
        //data
        this.dataSource = new MatTableDataSource(this.filterCurrSales.currencySale);
        
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
  setStartPrice(event:any){
    console.log(parseInt(event.value, 0));
    
  }
  onKey(event: any) {
    // without type info
    this.searchText = event.target.value;
  }

  searchButton() {
    this.setNavigate('searchText', this.searchText);
    this.filterCurrSales.searchText = this.searchText;
    this.getCurrSaleExDecList();
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
    let pageid: number = this.filterCurrSales.pageId;
    let searchText: string = '';
    let idStr: string = this.Id;
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
      }

    this.router.navigate(['sales/sale-list'], {
      queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity
      },
    });
  }



}
