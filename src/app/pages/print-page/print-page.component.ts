import { Component, Directive, Input, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencySaleDto } from 'src/app/DTOs/Sale/CurrencySaleDto';
import { CurrencySaleFilter } from 'src/app/DTOs/Sale/CurrencySaleFilter';
import { ReportService } from 'src/app/Services/report.service';
import { DomainName } from 'src/app/Utilities/pathTools';



@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.scss']
})

// @Directive({selector: 'printPage'})صض

export class PrintPageComponent implements OnInit {

  public domain: string = DomainName;
   properties : IProperties ;
  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    var dataJson=JSON.stringify(this.reportService.getData());
    this.properties = { data: unescape(encodeURIComponent(dataJson))  ,reportName: this.reportService.getReportName() }
    this.reportService.clearData();
  }

}

export interface IProperties{
   data : any;
   reportName :string ;
}


