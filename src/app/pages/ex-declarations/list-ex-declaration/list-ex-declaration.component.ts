import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ExDeclarationService } from '../../../Services/ex-declaration.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { FilterExDecDto } from 'src/app/DTOs/ExchangeDeclarations/FilterExDecDto';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MatSort } from '@angular/material/sort';
import { TableExporter } from 'src/app/shared/Export/TableExporter';
import moment from 'moment';

@Component({
  selector: 'app-list-ex-declaration',
  templateUrl: './list-ex-declaration.component.html',
  styleUrls: ['./list-ex-declaration.component.scss'],
})
export class ListExDeclarationComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  isRemaindPriceZero :string ="1";
  displayedColumns: string[] = [
    'exCode',
    'expireDate',
    'price',
    'soldPrice',
    'remaindPrice',
    'description',
    'operation',
  ];
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  dataSource = new MatTableDataSource(null);
  dateFrom: string = "";
  dateTo: string = "";
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
    private router: Router
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

  clickOption(event){
    switch (event.value) {
      case "1":
        this.isRemaindPriceZero ="1";
        //this.dataSource = new MatTableDataSource(this.filterPi.piRemaind.filter(x=>x.remaindPrice !== 0));
        break;
      case "2":
        this.isRemaindPriceZero ="2";
        //this.dataSource = new MatTableDataSource(this.filterPi.piRemaind);
          break;
        }
       // console.log(this.isRemaindPriceZero , event.value);
    }

    clearFilters(){
      this.filterExDec.fromDateSale="";
      this.filterExDec.toDateSale="";
      this.filterExDec.isRemaindPriceZero="";
      this.filterExDec.searchText="";
      this.dateFrom ="";
      this.dateTo="";
      this.searchText ="" ;
      this.isRemaindPriceZero="";
      this.getExDecList();
      this.setNavigate('pageId', this.filterExDec.pageId);
    }

  exportNormalTable() {
    TableExporter.exportToExcel("ExampleMaterialTable");
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

  filterGenerate(){
    var from =moment(this.dateFrom, 'jYYYY/jMM/jDD') ;
    var to =moment(this.dateTo, 'jYYYY/jMM/jDD') ;
    if (new Date(from.locale('en').format('YYYY-MM-DD')).toString() === 'Invalid Date' || 
        new Date(to.locale('en').format('YYYY-MM-DD')).toString() === 'Invalid Date' ) {
          this.filterExDec.fromDateSale = "" ;
          this.filterExDec.toDateSale = "" ;
    }else{
      this.filterExDec.fromDateSale = moment(from.clone(), 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD') ;
      this.filterExDec.toDateSale = moment(to.clone(), 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
    }
    // console.log(this.filterCurrSales.toDateSale  < this.filterCurrSales.fromDateSale);
    if(this.filterExDec.toDateSale  < this.filterExDec.fromDateSale)
    {
      this.sweetAlert.text= "لطفا تاریخ اظهارنامه را به درستی وارد کنید";
      this.sweetAlert.fire();
    }
    else{
      //console.log(this.filterCurrSales);
     this.setNavigate('pageId', this.filterExDec.pageId);
    }
  }

  
  getExDecList() {
    this.isLoadingData = true;
    this.filterGenerate()
    this.exdecService.getFilteredExDec(this.filterExDec).subscribe((result) => {
      if (result.status == 'Success') {
        this.filterExDec = result.data;
        //console.log(result.data);
        
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
    this.setNavigate('isRemaindPriceZero', this.isRemaindPriceZero);
    this.filterExDec.isRemaindPriceZero = this.isRemaindPriceZero;
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

  editFromList(id: string) {
    this.Id = id;
    this.setNavigate('id', this.Id);
    this.router.navigate(['ex-declarations/exdec-edit'], { queryParams: { id: this.Id } });
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
    let fromDateSale: string=this.filterExDec.fromDateSale;
    let toDateSale: string=this.filterExDec.toDateSale;
    let isRemaindPriceZero = this.isRemaindPriceZero;
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
        case 'fromDateSale': {
          fromDateSale = value;
          break;
        }
        case 'toDateSale': {
          toDateSale = value;
          break;
        }
        case 'isRemaindPriceZero': {
          isRemaindPriceZero = value;
          break;
        }
      }

    this.router.navigate(['ex-declarations'], {
      queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity,
        fromDateSale:fromDateSale,
        toDateSale:toDateSale,
        isRemaindPriceZero:isRemaindPriceZero
      },
    });
  }
}
