import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FilterCurrSaleExDecDto } from '../../../DTOs/Sale/FilterCurrSaleExDecDto';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencySalesService } from '../../../Services/currency-sales.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sale-exdec-list',
  templateUrl: './sale-exdec-list.component.html',
  styleUrls: ['./sale-exdec-list.component.scss']
})
export class SaleExdecListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'exDecCode',
    'currSaleDate',
    'brokerName',
    'price',
    'customerName'
  ];
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  dataSource = new MatTableDataSource(null);
  filterExDecSales: FilterCurrSaleExDecDto = new FilterCurrSaleExDecDto(
    1,
    0,
    0,
    0,
    10,
    0,
    1,
    '',
    0,
    []
  );
  pages: number[] = [];
  searchText: string = '';
  Id: string = '';
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  isLoadingData = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private currencySalesService:CurrencySalesService
  ) {}



  ngOnInit(): void {
    this.isLoadingData = true;
    this.activatedRoute.queryParams.subscribe((res) => {
      this.filterExDecSales.id = res.id ;
      this.Id= res.id ;
      if (res.pageId !== undefined) {
        if (this.filterExDecSales.pageCount >= parseInt(res.pageId, 0))
          this.filterExDecSales.pageId = parseInt(res.pageId, 0);
        else this.filterExDecSales.pageId = 1;
        //console.log(this.filterExDec.pageId ,this.filterExDec.pageCount);
      }
      this.getCurrSaleExDecList();

      this.setNavigate('pageId', this.filterExDecSales.pageId);
    });
  }


  selectedValue(event){
    this.filterExDecSales.takeEntity = event;
    this.setNavigate();
  }
  /** Gets the total cost of all transactions. */
  // getTotalRemaind() {
  //   return this.filterExDecSales.exDecRemaind.map(t => t.remaindPrice).reduce((acc, value) => acc + value, 0);
  // }

  getTotalPrice() {
    return this.filterExDecSales.currencySaleExDecs.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  // getTotalSoldPrice() {
  //   return this.filterExDecSales.exDecRemaind.map(t => t.soldPrice).reduce((acc, value) => acc + value, 0);
  // }
  getCurrSaleExDecList() {
    this.isLoadingData = true;
    this.currencySalesService.getFilteredCurrExdecByExdecId(this.filterExDecSales).subscribe((result) => {
      if (result.status == 'Success') {
        this.filterExDecSales = result.data;

        //console.log(this.filterExDecSales.currencySaleExDecs);
        
        //data
        this.dataSource = new MatTableDataSource(this.filterExDecSales.currencySaleExDecs);
        
        this.dataSource.sort = this.sort;
        //end data
        if (result.data.searchText === null) {
          this.filterExDecSales.searchText = '';
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
    this.filterExDecSales.searchText = this.searchText;
    this.getCurrSaleExDecList();
  }

  //
  // dataSource = new MatTableDataSource(dt);
  setPage(currentpage: number) {
    this.filterExDecSales.pageId = currentpage;
    this.setNavigate();
  }

  setLastPage() {
    if (this.filterExDecSales.pageId < this.filterExDecSales.pageCount)
      this.filterExDecSales.pageId++;
    this.setNavigate();
  }
  setFirstPage() {
    if (this.filterExDecSales.pageId > 1) this.filterExDecSales.pageId--;
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
    let pageid: number = this.filterExDecSales.pageId;
    let searchText: string = '';
    let idStr: string = this.Id;
    let takeEntity =this.filterExDecSales.takeEntity;
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
        case 'id': {
          idStr = value;
          break;
        }
        case 'takeEntity': {
          takeEntity = value;
          break;
        }
      }

    this.router.navigate(['sales/sale-exdec-list'], {
      queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity
      },
    });
  }

}
