import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { MatSort } from '@angular/material/sort';
import { BrokerService } from '../../../Services/broker.service';
import { FilterBrokerDto } from 'src/app/DTOs/Broker/FilterBrokerDto';


@Component({
  selector: 'app-list-broker',
  templateUrl: './list-broker.component.html',
  styleUrls: ['./list-broker.component.scss']
})

export class ListBrokerComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'name',
    'title',
    'tel',
    'serviceChargeAccount',
    'serviceChargeCash',
    'operation',
  ];
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  dataSource = new MatTableDataSource(null);
  filterBroker: FilterBrokerDto = new FilterBrokerDto(
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
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  isLoadingData = false;
  constructor(
    private brokerService: BrokerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}



  ngOnInit(): void {
    this.isLoadingData = true;
    this.activatedRoute.queryParams.subscribe((res) => {
      // console.log(res);
      if (res.pageId !== undefined) {
        if (this.filterBroker.pageCount >= parseInt(res.pageId, 0))
          this.filterBroker.pageId = parseInt(res.pageId, 0);
        else this.filterBroker.pageId = 1;
        //console.log(this.filterBroker.pageId ,this.filterBroker.pageCount);
      }
      this.getBrokerList();

      this.setNavigate('pageId', this.filterBroker.pageId);
    });
  }


  selectedValue(event){
    this.filterBroker.takeEntity = event;
    this.setNavigate();
  }

  getBrokerList() {
    this.isLoadingData = true;
    //console.log(JSON.stringify(this.filterBroker));
    
    this.brokerService.getFilteredBroker(this.filterBroker).subscribe((result) => {
      if (result.status == 'Success') {
        this.filterBroker = result.data;
        //data
        this.dataSource = new MatTableDataSource(this.filterBroker.brokerDtos);
        this.dataSource.sort = this.sort;
        //end data
        if (result.data.searchText === null) {
          this.filterBroker.searchText = '';
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
    this.filterBroker.searchText = this.searchText;
    this.getBrokerList();
  }

  //
  // dataSource = new MatTableDataSource(dt);
  setPage(currentpage: number) {
    this.filterBroker.pageId = currentpage;
    this.setNavigate();
  }

  setLastPage() {
    if (this.filterBroker.pageId < this.filterBroker.pageCount)
      this.filterBroker.pageId++;
    this.setNavigate();
  }
  setFirstPage() {
    if (this.filterBroker.pageId > 1) this.filterBroker.pageId--;
    this.setNavigate();
  }

  editFromList(id: string) {
    this.Id = id;
    this.setNavigate('id', this.Id);
    this.router.navigate(['brokers/broker-edit'], { queryParams: { id: this.Id } });
  }

  deleteFromList(id: string) {
    this.sweetAlert.fire().then((result) => {
      if (result.isConfirmed) {
        this.isLoadingData = true;
        this.brokerService.deleteBrokerById(id).subscribe((res) => {
          if (res.status === 'Success') {
            this.filterBroker.brokerDtos = this.filterBroker.brokerDtos.filter(
              (x) => x.id != parseInt(id)
            );
            this.dataSource = new MatTableDataSource(
              this.filterBroker.brokerDtos
            );
            this.dataSource.sort = this.sort;
            this.isLoadingData = false;
          }
        });
      }
    });
  }
  setNavigate(filterParam: string = null, value: any = null) {
    let pageid: number = this.filterBroker.pageId;
    let searchText: string = '';
    let idStr: string = this.Id;
    let takeEntity =this.filterBroker.takeEntity;
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

    this.router.navigate(['brokers'], {
      queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity
      },
    });
  }
}
