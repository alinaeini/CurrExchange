import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { FilterCustomerDto } from 'src/app/DTOs/Customer/FilterCustomerDto';
import { MiscellaneousCustomerService } from '../../../../Services/miscellaneous-customer.service';

@Component({
  selector: 'app-list-mis-customer',
  templateUrl: './list-mis-customer.component.html',
  styleUrls: ['./list-mis-customer.component.scss']
})
export class ListMisCustomerComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'name',
    'title',
    'phone',
    'address',
    'operation',
  ];
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  dataSource = new MatTableDataSource(null);
  filterCustomer: FilterCustomerDto = new FilterCustomerDto(
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
    private miscellaneousCustomerService: MiscellaneousCustomerService,
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
  selectedValue(event){
    this.filterCustomer.takeEntity = event;
    this.setNavigate();
  }
  getCustomerList() {
    this.isLoadingData=true;
    this.miscellaneousCustomerService
      .getFilteredCustomer(this.filterCustomer)
      .subscribe((result) => {
        this.filterCustomer = result.data;
        //data
        this.dataSource = new MatTableDataSource(
          this.filterCustomer.customerDtos
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

  editFromList(id: string) {
    this.Id = id;
    this.setNavigate('id', this.Id);
    this.router.navigate(["customers/edit-mis-customer"], 
    {queryParams: 
            { id: this.Id } 
    }); 
  }

  deleteFromList(id: string) {
    this.sweetAlert.fire().then((result)=>{
      if(result.isConfirmed){
        this.isLoadingData =true;
        this.miscellaneousCustomerService.deleteCustomerById(id).subscribe(res =>{
          console.log(res);
          
          if (res.status ==="Success"){
              this.filterCustomer.customerDtos = this.filterCustomer.customerDtos.filter(x=>x.id != parseInt(id));
              this.dataSource = new MatTableDataSource( this.filterCustomer.customerDtos );
              this.dataSource.sort = this.sort;
              this.isLoadingData =false;
           }
        });
      }
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

    this.router.navigate(['customers/list-mis-customer'], {
      queryParams: {
        pageId: pageid,
        searchText: searchText,
        id: idStr,
        takeEntity:takeEntity
      },
    });
  }

}
