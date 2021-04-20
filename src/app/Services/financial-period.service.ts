import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FinancialPeriodDto } from '../DTOs/Account/FinancialPeriodDto';
import { IResponseResult } from '../DTOs/Common/IResponseResult';

@Injectable({
  providedIn: 'root'
})
export class FinancialPeriodService {

  private financialList: BehaviorSubject<FinancialPeriodDto[]> = new BehaviorSubject<FinancialPeriodDto[]>(null);
  private currentFinancial: BehaviorSubject<FinancialPeriodDto> = new BehaviorSubject<FinancialPeriodDto>(null);
  constructor(private http:HttpClient) { }

  setFinancialListBehaviorSubject(financials: FinancialPeriodDto[]): void {
    this.financialList.next(financials);
  }
  getFinancialListBehaviorSubject(): Observable<FinancialPeriodDto[]> {
    return this.financialList;
  }


  setFinancialByIdBehaviorSubject(financial: FinancialPeriodDto): void {
    this.currentFinancial.next(financial);
  }
  getFinancialByIdBehaviorSubject(): Observable<FinancialPeriodDto> {
    return this.currentFinancial;
  }

  public getFinancialList(): Observable<IResponseResult<FinancialPeriodDto[]>> {

    return this.http.get<IResponseResult<FinancialPeriodDto[]>>("/Financial/list/" );
  }

  public getFinancialById(id:string) :Observable<IResponseResult<FinancialPeriodDto>> {
    return this.http.get<IResponseResult<FinancialPeriodDto>>("/Financial/get-by-Id/" + id);
  }

}
