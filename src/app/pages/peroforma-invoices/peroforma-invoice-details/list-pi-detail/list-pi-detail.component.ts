import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { FilterPiDto } from 'src/app/DTOs/Pi/FilterPiDto';
import { PiService } from 'src/app/Services/pi.Service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PiRemaindDto } from 'src/app/DTOs/Pi/PiRemaindDto';
import * as moment from 'jalali-moment';
import { FilterPiDetailCompleteDto } from '../../../../DTOs/Pi/PiDetail/FilterPiDetailCompleteDto';
import { TableExporter } from 'src/app/shared/Export/TableExporter';

@Component({
  selector: 'app-list-pi-detail',
  templateUrl: './list-pi-detail.component.html',
  styleUrls: ['./list-pi-detail.component.scss']
})
export class ListPiDetailComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'customerName',
    'piCode',
    'depositDate',
    'brokerName',
    'totalPrice',
    'depositPrice',
    'isSold',
    //'operation'
  ];
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  dataSource = new MatTableDataSource(null);
   filterPiPayList: FilterPiDetailCompleteDto = new FilterPiDetailCompleteDto(
    1,
    0,
    0,
    0,
    25,
    0,
    1,
    '',
    '',
    '',
    []
  );
  pages: number[] = [];
  searchText: string = '';
  Id: string = '';
  dateFrom: string = "";
  dateTo: string = "";
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  isLoadingData = false;
  constructor(
    private piService: PiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}




  ngOnInit(): void {
    this.isLoadingData = true;
    this.activatedRoute.queryParams.subscribe((res) => {
      // console.log(res);
      if (res.pageId !== undefined) {
        if (this.filterPiPayList.pageCount >= parseInt(res.pageId, 0))
          this.filterPiPayList.pageId = parseInt(res.pageId, 0);
        else this.filterPiPayList.pageId = 1;
        //console.log(this.filterPi.pageId ,this.filterPi.pageCount);
      }
      this.getPiPayList();

      this.setNavigate('pageId', this.filterPiPayList.pageId);
    });
  }
  exportNormalTable() {
    TableExporter.exportToExcel("ExampleMaterialTable");
  }
  clearFilters(){
    this.filterPiPayList.fromDateSale="";
    this.filterPiPayList.toDateSale="";
    this.filterPiPayList.searchText="";
    this.dateFrom ="";
    this.dateTo="";
    this.searchText ="" ;
    this.getPiPayList();
    this.setNavigate('pageId', this.filterPiPayList.pageId);
  }
  
  //  console.log(this.filterCurrSales);
  
   // 
  


  selectedValue(event){
    this.filterPiPayList.takeEntity = event;
    this.setNavigate();
  }


  getTotalPrice() {
    return this.filterPiPayList.piDetailDtos.map(t => t.totalPrice).reduce((acc, value) => acc + value, 0);
  }

  getTotalDepositPrice() {
    return this.filterPiPayList.piDetailDtos.map(t => t.depositPrice).reduce((acc, value) => acc + value, 0);
  }
  getPiPayList() {
    this.isLoadingData = true;
    this.piService.getPiDetailPayList(this.filterPiPayList).subscribe((result) => {
      //console.log(result);
      
      if (result.status == 'Success') {
         this.filterPiPayList = result.data;

        //data
        this.dataSource = new MatTableDataSource(this.filterPiPayList.piDetailDtos);
        this.dataSource.sort = this.sort;
        //end data
        if (result.data.searchText === null) {
          this.filterPiPayList.searchText = '';
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
    this.filterGenerate();
    this.setNavigate('searchText', this.searchText);
    // this.setNavigate('isRemaindPriceZero', this.isRemaindPriceZero);
    this.filterPiPayList.searchText = this.searchText;
    // this.filterPi.isRemaindPriceZero = this.isRemaindPriceZero;
    this.getPiPayList();
  }

  //
  // dataSource = new MatTableDataSource(dt);
  setPage(currentpage: number) {
    this.filterPiPayList.pageId = currentpage;
    this.setNavigate();
  }

  setLastPage() {
    if (this.filterPiPayList.pageId < this.filterPiPayList.pageCount)
      this.filterPiPayList.pageId++;
    this.setNavigate();
  }
  setFirstPage() {
    if (this.filterPiPayList.pageId > 1) this.filterPiPayList.pageId--;
    this.setNavigate();
  }

 
  filterGenerate(){
    var from =moment(this.dateFrom, 'jYYYY/jMM/jDD') ;
    var to =moment(this.dateTo, 'jYYYY/jMM/jDD') ;
    if (new Date(from.locale('en').format('YYYY-MM-DD')).toString() === 'Invalid Date' || 
        new Date(to.locale('en').format('YYYY-MM-DD')).toString() === 'Invalid Date' ) {
          this.filterPiPayList.fromDateSale = "" ;
          this.filterPiPayList.toDateSale = "" ;
    }else{
      this.filterPiPayList.fromDateSale = moment(from.clone(), 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD') ;
      this.filterPiPayList.toDateSale = moment(to.clone(), 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
    }
    // console.log(this.filterCurrSales.toDateSale  < this.filterCurrSales.fromDateSale);
    if(this.filterPiPayList.toDateSale  < this.filterPiPayList.fromDateSale)
    {
      this.sweetAlert.text= "لطفا تاریخ واریز را به درستی وارد کنید";
      this.sweetAlert.fire();
    }
    else{
      //console.log(this.filterCurrSales);
     this.setNavigate('pageId', this.filterPiPayList.pageId);
    }
  }
  setNavigate(filterParam: string = null, value: any = null) {
    let pageid: number = this.filterPiPayList.pageId;
    let searchText: string = '';
    let idStr: string = this.Id;
    let fromDateSale: string=this.filterPiPayList.fromDateSale;
    let toDateSale: string=this.filterPiPayList.toDateSale;
    //let isRemaindPriceZero:String=this.isRemaindPriceZero;
    let takeEntity =this.filterPiPayList.takeEntity;
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
        case 'fromDateSale': {
          fromDateSale = value;
          break;
        }
        case 'toDateSale': {
          toDateSale = value;
          break;
        }
      }

    this.router.navigate(['pies/pi-detail-list'], {
       queryParams: {
        pageId: pageid,
        searchText: searchText,
        takeEntity:takeEntity,
        fromDateSale:fromDateSale,
        toDateSale:toDateSale,
        // isRemaindPriceZero:isRemaindPriceZero
      },
    });
  }


}

