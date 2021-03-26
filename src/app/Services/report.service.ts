import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  Entities = [];
  reportName :string;
  constructor() { }



  addDataAndReportName(data:any[] ,reportName:string) {
    this.Entities = data;
    this.reportName =reportName ;
  }

  clearData() {
    this.Entities = [];
    this.reportName =""
    return this.Entities;
  }

  getData():any[] {
    return this.Entities;
  }

  getReportName():string {
    return this.reportName;
  }
}
