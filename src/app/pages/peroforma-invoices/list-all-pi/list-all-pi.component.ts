import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PiService } from 'src/app/Services/pi.Service';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterPiDto } from 'src/app/DTOs/Pi/FilterPiDto';

@Component({
  selector: 'app-list-all-pi',
  templateUrl: './list-all-pi.component.html',
  styleUrls: ['./list-all-pi.component.scss']
})
export class ListAllPiComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'piCode',
    'piDate',
    'basePrice',
    'totalPrice',
    'soldPrice',
    'remaindPrice',
    'operation'
  ];

  dataSource = new MatTableDataSource(null);
   filterPi: FilterPiDto = new FilterPiDto(
    1,
    0,
    0,
    0,
    10,
    0,
    1,
    '',
    '1',
    []
  );
  pages: number[] = [];
  searchText: string = '';
  Id: string = '';
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
      this.dataSource = new MatTableDataSource(this.filterPi.piRemaind.filter(x=>x.remaindPrice !== 0));
      break;
    case "2":
      this.dataSource = new MatTableDataSource(this.filterPi.piRemaind);
        break;
      }
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

  getAvrageOfBasePrice() {
    return this.filterPi.piRemaind.filter(x=>x.basePrice > 0).map(t => t.basePrice).reduce((acc, value)=>
       acc + value, 0 ) / this.filterPi.piRemaind.length ;
  }



  getPiList() {
    this.isLoadingData = true;
    this.piService.getAllPi(this.filterPi).subscribe((result) => {
      if (result.status == 'Success') {
        this.filterPi = result.data;
        // console.log(this.filterPi);
        
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
    this.filterPi.searchText = this.searchText;
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

  showDetailExDec(id: string): void {
    this.Id = id;
    this.setNavigate('id', this.Id);
    this.router.navigate(['sales/sale-pi-list'], { queryParams: { id: this.Id } });
  }


  setNavigate(filterParam: string = null, value: any = null) {
    let pageid: number = this.filterPi.pageId;
    let searchText: string = '';
    let idStr: string = this.Id;
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
        case 'id': {
          idStr = value;
          break;
        }
        case 'takeEntity': {
          takeEntity = value;
          break;
        }
      }

    this.router.navigate(['pies/pi-list-all'], {
       queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity
      },
    });
  }


}
