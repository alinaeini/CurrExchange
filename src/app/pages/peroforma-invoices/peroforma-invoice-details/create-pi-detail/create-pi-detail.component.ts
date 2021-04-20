import { Component, OnInit, ViewChild } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { PiService } from 'src/app/Services/pi.Service';
import { CreatePiDetailDto } from 'src/app/DTOs/Pi/PiDetail/CreatePiDetailDto';
import { BrokerService } from '../../../../Services/broker.service';
import { log } from 'console';
import { BrokerDto } from '../../../../DTOs/Broker/BrokerDto';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPiComponent } from '../../list-pi/list-pi.component';
import { MatTableDataSource } from '@angular/material/table';
import { FilterPiDetailDto } from '../../../../DTOs/Pi/PiDetail/FilterPiDetailDto';
import { MatSort } from '@angular/material/sort';
import { PiRemaindDto } from 'src/app/DTOs/Pi/PiRemaindDto';
import { PiDetailDto } from '../../../../DTOs/Pi/PiDetail/PiDetailDto';

export class PiDetailView{
  constructor(  
    public id: number,
    public depositPrice :number,
    public depositDate:Date, 
    public brokerTitle:string,
    public isSold:boolean
    ){}
}

@Component({
  selector: 'app-create-pi-detail',
  templateUrl: './create-pi-detail.component.html',
  styleUrls: ['./create-pi-detail.component.scss'],
})


export class CreatePiDetailComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource(null);
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  isLoading = false;
  public piDetailForm: FormGroup;
  brokers: BrokerDto[] = [];
  currentPi: PiRemaindDto = null;
 
  isLoadingSuccess = false;
  timeLeft: number = 4;
  interval;
  pages: number[] = [];
  searchText: string = '';
  piId: number = 0;
  brokerId: string = '0';
  isLoadingData = false;
  viewList:PiDetailView[]=[];
  @ViewChild('sweetAlert') private sweetAlert: SwalComponent;
  filterPiDetail: FilterPiDetailDto = new FilterPiDetailDto(
    1,
    0,
    0,
    0,
    10,
    0,
    1,
    10,
    '',
    []
  );
  displayedColumns: string[] = [
    "row",
    'brokerTitle',
    'depositDate',
    'depositPrice',
    'operation',
  ];
  constructor(
    private piService: PiService,
    private brokerService: BrokerService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.filterPiDetail.piId = parseInt(param.id);
      this.piId = parseInt(param.id);
    });
    this.brokerService.getBrokerList().subscribe((brokerListResult) => {
      if(brokerListResult != null)
      {
        this.brokers = brokerListResult;
      }
      else
      {
          this.brokerService.getBrokerListService().subscribe((res) => {
            if (res.status === "Success") 
            {
                this.brokerService.setBrokerList(res.data);
                this.brokerService.getBrokerList().subscribe((brokerList)=>{
                  this.brokers = brokerList;
                });
            }
          });
      }
    });
   
    this.piService.getCurrentRow().subscribe((pi) => {
      this.currentPi = pi;
    });
    this.piDetailForm = new FormGroup({
      depositPrice: new FormControl(null, [Validators.required]),
      depositDate: new FormControl(null, [Validators.required]),
      brokerId: new FormControl(null, [Validators.required]),
    });
    this.getPiDetailList();
  }

  editFromList(id: string): void {
    const res= this.filterPiDetail.piDetailDtos.filter(x=>x.id == parseInt(id));
    this.piService.setCurrentRowDetail(res[0]);
    this.router.navigate(['/pies/pi-detail-edit'], { queryParams: { piDetailId: id } });
  }



  getPiDetailList() {
    this.isLoadingData = true;
     this.piService.getFilteredPiDetail(this.filterPiDetail).subscribe((result): void => {
        if (result.status == 'Success') {
          this.filterPiDetail = result.data;
          
           
          //data
          this.viewList =[];
          // console.log(this.filterPiDetail)
          if(this.filterPiDetail.piDetailDtos.length >0 )
          {
              this.filterPiDetail.piDetailDtos.forEach(element => {
                var title = (this.brokers && this.brokers.length >0 ) ? this.brokers.filter(x=>x.id == element.brokerId)[0].title :"ندارد" ;
                this.viewList.push(new PiDetailView(element.id,element.depositPrice,element.depositDate,title,element.isSold)) ;
              });
          }
          
          this.dataSource = new MatTableDataSource(this.viewList);
          this.dataSource.sort = this.sort;
          //end data
          if (result.data.searchText === null) {
            this.filterPiDetail.searchText = '';
          }
          this.pages = [];
          for (let i = result.data.startPage; i <= result.data.endPage; i++) {
            this.pages.push(i);
          }
        }
      });
    this.isLoadingData = false;
  }
  getTotalPrice() {
    return this.filterPiDetail.piDetailDtos.map(t => t.depositPrice).reduce((acc, value) => acc + value, 0);
  }

  submitPiForm() {
    if (this.piDetailForm.controls.depositPrice.value !== null)
      var depositPrice = this.ex_normalNum(
        this.piDetailForm.controls.depositPrice.value
      );
    else var depositPrice = '0';
    // if ((parseInt(depositPrice) > this.currentPi.totalPrice) || 
    //     (parseInt(depositPrice) > (this.currentPi.totalPrice - this.getTotalPrice()))) 
    // {
    //   this.sweetAlert.text =
    //     'مبلغ وارد شده بیشتراز مبلغ کل PI میباشد';
    //   this.sweetAlert.fire();
    // } 
    // else 
    {
      this.isLoading = true;
      var bId = parseInt(this.brokerId);
      var piDetail = new CreatePiDetailDto(
        parseInt(depositPrice),
        new Date(this.piDetailForm.controls.depositDate.value),
        this.piId,
        bId
      );
            
      this.piService.createPiDetailService(piDetail).subscribe((res) => {
        this.isLoading = false;
        if (res.status === 'Success') this.LoadingSuccess();
        {
          this.piDetailForm.reset();
          this.getPiDetailList();
        }
        if (res.status === 'Error') {
          this.sweetAlert.text = res.data.info;
          this.sweetAlert.fire();
        }
      });
    }
  }

  ex_normalNum(numStr): string {
    var num = numStr.replace(/,\s?/g, '');
    return num;
  }
  pauseTimer() {
    clearInterval(this.interval);
  }

  LoadingSuccess() {
    this.isLoadingSuccess = true;
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 4;
        this.isLoadingSuccess = false;
      }
    }, 1000);
  }
}
