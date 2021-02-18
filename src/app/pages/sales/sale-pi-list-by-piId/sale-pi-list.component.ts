import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencySalesService } from '../../../Services/currency-sales.service';
import { FilterCurrSalePiDto } from '../../../DTOs/Sale/FilterCurrSalePiDto';
import { OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sale-pi-list',
  templateUrl: './sale-pi-list.component.html',
  styleUrls: ['./sale-pi-list.component.scss']
})
export class SalePiListComponent implements OnInit {
  
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'piCode',
    'currSaleDate',
    'brokerName',
    'price',
    'customerName',
    'profitLossAmount'
  ];
  dataSource = new MatTableDataSource(null);
  filterPiSales: FilterCurrSalePiDto = new FilterCurrSalePiDto(
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
  isLoadingData = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private currencySalesService:CurrencySalesService
  ) {}



  ngOnInit(): void {
    this.isLoadingData = true;
    this.activatedRoute.queryParams.subscribe((res) => {
      this.filterPiSales.id = res.id ;
      this.Id= res.id ;
      if (res.pageId !== undefined) {
        if (this.filterPiSales.pageCount >= parseInt(res.pageId, 0))
          this.filterPiSales.pageId = parseInt(res.pageId, 0);
        else this.filterPiSales.pageId = 1;
        //console.log(this.filterExDec.pageId ,this.filterExDec.pageCount);
      }
      this.getCurrSaleExDecList();

      this.setNavigate('pageId', this.filterPiSales.pageId);
    });
  }


  selectedValue(event){
    this.filterPiSales.takeEntity = event;
    this.setNavigate();
  }
  /** Gets the total cost of all transactions. */
  // getTotalRemaind() {
  //   return this.filterExDecSales.exDecRemaind.map(t => t.remaindPrice).reduce((acc, value) => acc + value, 0);
  // }

  getTotalPrice() {
    return this.filterPiSales.currencySaleDetailPi.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  // getTotalSoldPrice() {
  //   return this.filterExDecSales.exDecRemaind.map(t => t.soldPrice).reduce((acc, value) => acc + value, 0);
  // }
  getCurrSaleExDecList() {
    this.isLoadingData = true;
    this.currencySalesService.getFilteredCurrPiByPiId(this.filterPiSales).subscribe((result) => {
      if (result.status == 'Success') {
        this.filterPiSales = result.data;

        // console.log(this.filterExDecSales.currencySaleExDecs);
        
        //data
        this.dataSource = new MatTableDataSource(this.filterPiSales.currencySaleDetailPi);
        
        this.dataSource.sort = this.sort;
        //end data
        if (result.data.searchText === null) {
          this.filterPiSales.searchText = '';
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
    this.filterPiSales.searchText = this.searchText;
    this.getCurrSaleExDecList();
  }

  //
  // dataSource = new MatTableDataSource(dt);
  setPage(currentpage: number) {
    this.filterPiSales.pageId = currentpage;
    this.setNavigate();
  }

  setLastPage() {
    if (this.filterPiSales.pageId < this.filterPiSales.pageCount)
      this.filterPiSales.pageId++;
    this.setNavigate();
  }
  setFirstPage() {
    if (this.filterPiSales.pageId > 1) this.filterPiSales.pageId--;
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
    let pageid: number = this.filterPiSales.pageId;
    let searchText: string = '';
    let idStr: string = this.Id;
    let takeEntity =this.filterPiSales.takeEntity;
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
      
    this.router.navigate(['sales/sale-pi-list'], {
      queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity
      },
    });
  }

  }
