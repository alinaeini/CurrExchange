import { IResponseResult } from './../DTOs/Common/IResponseResult';
import { ExDeclarationsDto } from './../DTOs/ExchangeDeclarations/ExDeclarationsDto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreateExDeclarationsDto } from '../DTOs/ExchangeDeclarations/CreateExDeclarationsDto';
import { FilterExDecDto } from '../DTOs/ExchangeDeclarations/FilterExDecDto';
import { ExDecRemaindDto } from '../DTOs/ExchangeDeclarations/ExDecRemaindDto';

@Injectable({
  providedIn: 'root'
})
export class ExDeclarationService {
  private exDecList: BehaviorSubject<ExDecRemaindDto[]> = new BehaviorSubject<ExDecRemaindDto[]>(null);
  constructor(private http:HttpClient) { }

  setExDecList(exdecs: ExDecRemaindDto[]): void {
    this.exDecList.next(exdecs);
  }
  getExDecList(): Observable<ExDecRemaindDto[]> {
    return this.exDecList;
  }

  getExDecListService(): Observable<IResponseResult<ExDecRemaindDto[]>> {
    return this.http.get<IResponseResult<ExDecRemaindDto[]>>("/exdeclaration/exDecs");
  } 

  createExDecService(exDec: CreateExDeclarationsDto): Observable<any> {
    console.log(JSON.stringify(exDec) );
    return this.http.post<any>("/exdeclaration/create", exDec);
  }

  public getFilteredExDec(filter: FilterExDecDto): Observable<IResponseResult<FilterExDecDto>> {
    let requestParams;
    if (filter !== null) {
      // filter.title=filter.title===null ? '':filter.title;
      requestParams = new HttpParams()
        .set("pageId", filter.pageId.toString())
        .set("searchText", filter.searchText)
        .set("takeEntity", filter.takeEntity.toString())
      }
      //console.log('requestParams',requestParams);
    //console.log(JSON.stringify(filter) );
    return this.http.get<IResponseResult<FilterExDecDto>>("/exdeclaration/filter-exdec-sold",{ params: requestParams }
    );
  }

  public getFilteredExDecAll(filter: FilterExDecDto): Observable<IResponseResult<FilterExDecDto>> {
    let requestParams;
    if (filter !== null) {
      // filter.title=filter.title===null ? '':filter.title;
      requestParams = new HttpParams()
        .set("pageId", filter.pageId.toString())
        .set("searchText", filter.searchText)
        .set("takeEntity", filter.takeEntity.toString())
      }
      //console.log('requestParams',requestParams);
    //console.log(JSON.stringify(filter) );
    return this.http.get<IResponseResult<FilterExDecDto>>("/exdeclaration/filter-exdec-all",{ params: requestParams }
    );
  }
  
  getExDecById(id: string): Observable<IResponseResult<ExDeclarationsDto>> {
     return this.http.get<IResponseResult<ExDeclarationsDto>>("/Exdeclaration/edit-exdec-get/"+ id);
   } 

   editExDec(ExDec: ExDeclarationsDto): Observable<IResponseResult<any>> {
    return this.http.post<IResponseResult<any>>("/Exdeclaration/edit-exdec",ExDec);
  } 
  
  deleteExDecById(id: string): Observable<IResponseResult<ExDeclarationsDto>> {
    return this.http.get<IResponseResult<ExDeclarationsDto>>("/Exdeclaration/delete-exdec/"+ id);
  } 
}


