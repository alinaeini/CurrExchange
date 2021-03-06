import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { CompanyDto } from '../DTOs/Company/CompanyDto';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  private companyDto: BehaviorSubject<CompanyDto> = new BehaviorSubject<CompanyDto>(null);

  constructor(private http:HttpClient) { }

  // setCompanyObs(company: CompanyDto): void {
  //   this.companyDto.next(company);
  // }
  // getCompanyObs(): Observable<CompanyDto> {
  //   return this.companyDto;
  // }
  
    getCompany(): Observable<IResponseResult<CompanyDto>> {
       return this.http.get<IResponseResult<CompanyDto>>("/company/info");
     }
}
