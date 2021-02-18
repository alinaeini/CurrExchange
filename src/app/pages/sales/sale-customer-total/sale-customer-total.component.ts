import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { FilterCurrencyCustomerDto } from '../../../DTOs/Customer/FilterCurrencyCustomerDto';
import { CurrencySalesService } from '../../../Services/currency-sales.service';

@Component({
  selector: 'app-sale-customer-total',
  templateUrl: './sale-customer-total.component.html',
  styleUrls: ['./sale-customer-total.component.scss']
})
export class SaleCustomerTotalComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'name',
    'title',
    'phone',
    'address',
    'soldAmount',
    'operation',
  ];
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  dataSource = new MatTableDataSource(null);
  filterCustomer: FilterCurrencyCustomerDto = new FilterCurrencyCustomerDto(
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
  Id :string='';
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  isLoadingData =false;
  constructor(
    private currencyService: CurrencySalesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.isLoadingData=true;
    this.activatedRoute.queryParams.subscribe((res) => {
      // console.log(res);
      if (res.pageId !== undefined) {
        if (this.filterCustomer.pageCount >= parseInt(res.pageId, 0))
          this.filterCustomer.pageId = parseInt(res.pageId, 0);
        else this.filterCustomer.pageId = 1;
        //console.log(this.filterCustomer.pageId ,this.filterCustomer.pageCount);
      }
      this.getCustomerList();

      this.setNavigate('pageId', this.filterCustomer.pageId);
    });
  }

  totalSoldAmount(){
    return  this.filterCustomer.entities
     .map((t) => t.soldAmount)
     .reduce((acc, value) => acc + value, 0);
   }
  selectedValue(event){
    this.filterCustomer.takeEntity = event;
    this.setNavigate();
  }
  getCustomerList() {
    this.isLoadingData=true;
    this.currencyService
      .getFilteredCurrSCustomer(this.filterCustomer)
      .subscribe((result) => {
        // console.log(result.data);
        
        this.filterCustomer = result.data;
        //data
        this.dataSource = new MatTableDataSource(
          this.filterCustomer.entities
        );
        this.dataSource.sort = this.sort;
        //end data
        if (result.data.searchText === null) {
          this.filterCustomer.searchText = '';
        }
        this.pages = [];
        for (let i = result.data.startPage; i <= result.data.endPage; i++) {
          this.pages.push(i);
        }
      });
      this.isLoadingData=false;
  }

  onKey(event: any) {
    // without type info
    this.searchText = event.target.value;
  }

  searchButton() {
    this.setNavigate('searchText', this.searchText);
    this.filterCustomer.searchText = this.searchText;
    this.getCustomerList();
  }

  //
  // dataSource = new MatTableDataSource(dt);
  setPage(currentpage: number) {
    this.filterCustomer.pageId = currentpage;
    this.setNavigate();
  }

  setLastPage() {
    if (this.filterCustomer.pageId < this.filterCustomer.pageCount)
      this.filterCustomer.pageId++;
    this.setNavigate();
  }
  setFirstPage() {
    if (this.filterCustomer.pageId > 1) this.filterCustomer.pageId--;
    this.setNavigate();
  }

  detailOfCustomerCurrency(id: string) {

    this.Id = id;
    this.setNavigate('id', this.Id);
    this.router.navigate(["sales/sale-list-by-customer"], 
    {queryParams: 
            { id: this.Id } 
    }); 
  }




  setNavigate(filterParam: string = null, value: any = null) {
    let pageid: number = this.filterCustomer.pageId;
    let searchText: string = '';
    let idStr: string = this.Id;
    let takeEntity =this.filterCustomer.takeEntity;
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

    this.router.navigate(['sales/sale-customer-total'], {
      queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity
      },
    });
  }

}
