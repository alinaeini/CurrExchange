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

@Component({
  selector: 'app-list-pi',
  templateUrl: './list-pi.component.html',
  styleUrls: ['./list-pi.component.scss']
})
export class ListPiComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'piCode',
    'piDate',
    'customerName',
    'basePrice',
    'totalPrice',
    'soldPrice',
    'remaindPrice',
    'operation'
  ];
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  dataSource = new MatTableDataSource(null);
   filterPi: FilterPiDto = new FilterPiDto(
    1,
    0,
    0,
    0,
    25,
    0,
    1,
    '',
    '1',
    []
  );
  pages: number[] = [];
  searchText: string = '';
  Id: string = '';
  isRemaindPriceZero:string="1";
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
        if (this.filterPi.pageCount >= parseInt(res.pageId, 0))
          this.filterPi.pageId = parseInt(res.pageId, 0);
        else this.filterPi.pageId = 1;
        //console.log(this.filterPi.pageId ,this.filterPi.pageCount);
      }
      this.getPiList();

      this.setNavigate('pageId', this.filterPi.pageId);
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

  selectedValue(event){
    this.filterPi.takeEntity = event;
    this.setNavigate();
  }
  /** Gets the total cost of all transactions. */
  getTotalRemaind() {
    return this.filterPi.piRemaind.map(t => t.remaindPrice).reduce((acc, value) => acc + value, 0);
  }

  getTotalPrice() {
    return this.filterPi.piRemaind.map(t => t.totalPrice).reduce((acc, value) => acc + value, 0);
  }

  getTotalSoldPrice() {
    return this.filterPi.piRemaind.map(t => t.soldPrice).reduce((acc, value) => acc + value, 0);
  }
  getPiList() {
    this.isLoadingData = true;
    this.piService.getFilteredPi(this.filterPi).subscribe((result) => {
      if (result.status == 'Success') {
       
        // console.log(result.data);

        this.filterPi = result.data;

        //data
        this.dataSource = new MatTableDataSource(this.filterPi.piRemaind);
        this.dataSource.sort = this.sort;
        //end data
        if (result.data.searchText === null) {
          this.filterPi.searchText = '';
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
    this.filterPi.searchText = this.searchText;
    this.filterPi.isRemaindPriceZero = this.isRemaindPriceZero;
    this.getPiList();
  }

  //
  // dataSource = new MatTableDataSource(dt);
  setPage(currentpage: number) {
    this.filterPi.pageId = currentpage;
    this.setNavigate();
  }

  setLastPage() {
    if (this.filterPi.pageId < this.filterPi.pageCount)
      this.filterPi.pageId++;
    this.setNavigate();
  }
  setFirstPage() {
    if (this.filterPi.pageId > 1) this.filterPi.pageId--;
    this.setNavigate();
  }

  editFromList(id: string): void {
    this.Id = id;
    this.setNavigate('piId', this.Id);
    this.router.navigate(['pies/pi-edit'], { queryParams: { id: this.Id } });
  }
  createPiDetail(id: string) {
    this.Id = id;
    this.setNavigate('piId', this.Id);
    const res= this.filterPi.piRemaind.filter(x=>x.id == parseInt(this.Id));
    this.piService.setCurrentRow(res[0]);
    this.router.navigate(['pies/pi-detail-create'], { queryParams: { id: this.Id } });
  }
  deleteFromList(id: string) {
    this.sweetAlert.fire().then((result) => {
      if (result.isConfirmed) {
        this.isLoadingData = true;
        this.piService.deletePiById(id).subscribe((res) => {
          if (res.status === 'Success') {
            this.filterPi.piRemaind = this.filterPi.piRemaind.filter(
              (x) => x.id != parseInt(id)
            );
            this.dataSource = new MatTableDataSource(
              this.filterPi.piRemaind
            );
            this.dataSource.sort = this.sort;
            this.isLoadingData = false;
          }
        });
      }
    });
  }
  setNavigate(filterParam: string = null, value: any = null) {
    let pageid: number = this.filterPi.pageId;
    let searchText: string = '';
    let idStr: string = this.Id;
    let isRemaindPriceZero:String=this.isRemaindPriceZero;
    let takeEntity =this.filterPi.takeEntity;
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
        case 'piId': {
          idStr = value;
          break;
        }
        case 'takeEntity': {
          takeEntity = value;
          break;
        }
        case 'takeEntity': {
          takeEntity = value;
          break;
        }
        case 'isRemaindPriceZero': {
          isRemaindPriceZero = value;
          break;
        }
      }

    this.router.navigate(['pies'], {
       queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity,
        isRemaindPriceZero:isRemaindPriceZero
      },
    });
  }


}
