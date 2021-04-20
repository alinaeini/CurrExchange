import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { FilterExDecDto } from 'src/app/DTOs/ExchangeDeclarations/FilterExDecDto';
import { ExDeclarationService } from 'src/app/Services/ex-declaration.service';
import { CurrencySalesService } from '../../../Services/currency-sales.service';

@Component({
  selector: 'app-list-exdec-all',
  templateUrl: './list-exdec-all.component.html',
  styleUrls: ['./list-exdec-all.component.scss']
})
export class ListExdecAllComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'exCode',
    'expireDate',
    'price',
    'soldPrice',
    'remaindPrice',
    'operation',
  ];
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  dataSource = new MatTableDataSource(null);
  filterExDec: FilterExDecDto = new FilterExDecDto(
    1,
    0,
    0,
    0,
    10,
    0,
    1,
    '',
    '',
    '',
    '',
    []
  );
  pages: number[] = [];
  searchText: string = '';
  Id: string = '';
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  isLoadingData = false;
  constructor(
    private exdecService: ExDeclarationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private currencySalesService:CurrencySalesService
  ) {}



  ngOnInit(): void {
    this.isLoadingData = true;
    this.activatedRoute.queryParams.subscribe((res) => {
      // console.log(res);
      if (res.pageId !== undefined) {
        if (this.filterExDec.pageCount >= parseInt(res.pageId, 0))
          this.filterExDec.pageId = parseInt(res.pageId, 0);
        else this.filterExDec.pageId = 1;
        //console.log(this.filterExDec.pageId ,this.filterExDec.pageCount);
      }
      this.getExDecList();

      this.setNavigate('pageId', this.filterExDec.pageId);
    });
  }


  selectedValue(event){
    this.filterExDec.takeEntity = event;
    this.setNavigate();
  }
  /** Gets the total cost of all transactions. */
  getTotalRemaind() {
    return this.filterExDec.exDecRemaind.map(t => t.remaindPrice).reduce((acc, value) => acc + value, 0);
  }

  getTotalPrice() {
    return this.filterExDec.exDecRemaind.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  getTotalSoldPrice() {
    return this.filterExDec.exDecRemaind.map(t => t.soldPrice).reduce((acc, value) => acc + value, 0);
  }
  getExDecList() {
    this.isLoadingData = true;
    this.exdecService.getFilteredExDecAll(this.filterExDec).subscribe((result) => {
      if (result.status == 'Success') {
       // console.log(result.data);
        
        this.filterExDec = result.data;
        //data
        this.dataSource = new MatTableDataSource(this.filterExDec.exDecRemaind);
        
        this.dataSource.sort = this.sort;
        //end data
        if (result.data.searchText === null) {
          this.filterExDec.searchText = '';
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
    this.filterExDec.searchText = this.searchText;
    this.getExDecList();
  }

  //
  // dataSource = new MatTableDataSource(dt);
  setPage(currentpage: number) {
    this.filterExDec.pageId = currentpage;
    this.setNavigate();
  }

  setLastPage() {
    if (this.filterExDec.pageId < this.filterExDec.pageCount)
      this.filterExDec.pageId++;
    this.setNavigate();
  }
  setFirstPage() {
    if (this.filterExDec.pageId > 1) this.filterExDec.pageId--;
    this.setNavigate();
  }


  showDetailExDec(id: string) {
    this.Id = id;
    this.setNavigate('id',id);
    this.router.navigate(['sales/sale-exdec-list'], { queryParams: { id: this.Id } });
  }
  deleteFromList(id: string) {
    this.sweetAlert.fire().then((result) => {
      if (result.isConfirmed) {
        this.isLoadingData = true;
        this.exdecService.deleteExDecById(id).subscribe((res) => {
          if (res.status === 'Success') {
            this.filterExDec.exDecRemaind = this.filterExDec.exDecRemaind.filter(
              (x) => x.id != parseInt(id)
            );
            this.dataSource = new MatTableDataSource(
              this.filterExDec.exDecRemaind
            );
            this.dataSource.sort = this.sort;
            this.isLoadingData = false;
          }
        });
      }
    });
  }
  setNavigate(filterParam: string = null, value: any = null) {
    let pageid: number = this.filterExDec.pageId;
    let searchText: string = '';
    let idStr: string = this.Id;
    let takeEntity =this.filterExDec.takeEntity;
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

    this.router.navigate(['ex-declarations/exdec-list-all'], {
      queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity
      },
    });
  }
}
