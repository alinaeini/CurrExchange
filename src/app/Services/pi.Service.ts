import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreatePiDto } from '../DTOs/Pi/CreatePiDto';
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { FilterPiDto } from '../DTOs/Pi/FilterPiDto';
import { PiDto } from '../DTOs/Pi/PiDto';
import { FilterPiDetailDto } from '../DTOs/Pi/PiDetail/FilterPiDetailDto';
import { PiDetailDto } from '../DTOs/Pi/PiDetail/PiDetailDto';
import { CreatePiDetailDto } from '../DTOs/Pi/PiDetail/CreatePiDetailDto';
import { PiRemaindDto } from '../DTOs/Pi/PiRemaindDto';
import { log } from 'console';
@Injectable({
  providedIn: 'root',
})
export class PiService {
  private selectedPiRow: BehaviorSubject<PiRemaindDto> = new BehaviorSubject<PiRemaindDto>(null);
  private selectedPiDetailRow: BehaviorSubject<PiDetailDto> = new BehaviorSubject<PiDetailDto>(null);
  constructor(private http: HttpClient) {}
  
  setCurrentRow(pi: PiRemaindDto): void {
    this.selectedPiRow.next(pi);
  }

  getCurrentRow(): Observable<PiRemaindDto> {
    return this.selectedPiRow;
  }

  setCurrentRowDetail(piDetail: PiDetailDto): void {
    this.selectedPiDetailRow.next(piDetail);
  }

  getCurrentRowDetail(): Observable<PiDetailDto> {
    return this.selectedPiDetailRow;
  }
  //#region Pi
  createPiService(pi: CreatePiDto): Observable<any> {
    // console.log(JSON.stringify(pi))
    return this.http.post<any>('/pi/create', pi);
  }

  public getFilteredPi(filter: FilterPiDto): Observable<IResponseResult<FilterPiDto>> {
    let requestParams;
    if (filter !== null) {
      // filter.title=filter.title===null ? '':filter.title;
      requestParams = new HttpParams()
        .set('pageId', filter.pageId.toString())
        .set('searchText', filter.searchText)
        .set('takeEntity', filter.takeEntity.toString());
    }
    //console.log('requestParams',requestParams);
    //console.log(JSON.stringify(filter) );
    return this.http.get<IResponseResult<FilterPiDto>>('/pi/filter-pi', {
      params: requestParams
    });
  }

  
  public getAllPi(filter: FilterPiDto): Observable<IResponseResult<FilterPiDto>> {
    let requestParams;
    if (filter !== null) {
      requestParams = new HttpParams()
        .set('pageId', filter.pageId.toString())
        .set('searchText', filter.searchText)
        .set('takeEntity', filter.takeEntity.toString());
    }
    //console.log('requestParams',requestParams);
    // console.log(JSON.stringify(filter) );
    return this.http.get<IResponseResult<FilterPiDto>>('/pi/filter-pi-all', {params: requestParams});
  }


  getPiById(id: string): Observable<IResponseResult<PiDto>> {
    return this.http.get<IResponseResult<PiDto>>('/pi/edit-pi-get/' + id);
  }

  editPi(Pi: PiDto): Observable<IResponseResult<any>> {
    return this.http.post<IResponseResult<any>>('/pi/edit-pi', Pi);
  }

  deletePiById(id: string): Observable<IResponseResult<PiDto>> {
    return this.http.get<IResponseResult<PiDto>>('/pi/delete-pi/' + id);
  }
  //#endregion Pi

  // #region Pi Detail

  createPiDetailService(pi: CreatePiDetailDto): Observable<any> {
    // console.log(JSON.stringify(pi))
    return this.http.post<any>('/pi/create-pi-detail', pi);
  }

  public getFilteredPiDetail(filter: FilterPiDetailDto): Observable<IResponseResult<FilterPiDetailDto>> {
    let requestParams;
    if (filter !== null) {
      requestParams = new HttpParams()
        .set('pageId', filter.pageId.toString())
        .set('searchText', filter.searchText)
        .set('takeEntity', filter.takeEntity.toString())
        .set('piId',filter.piId.toString())
        // console.log('requestParams => ',requestParams);
        // console.log('filter => ',filter);
        
    }
    return this.http.get<IResponseResult<FilterPiDetailDto>>(
      '/pi/filter-pi-detail',
      { params: requestParams }
    );
  }

  getPiDetailById(id: string): Observable<IResponseResult<PiDetailDto>> {
    return this.http.get<IResponseResult<PiDetailDto>>(
      '/pi/edit-pi-detail-get/' + id
    );
  }

  editPiDetail(piDetail: PiDetailDto): Observable<IResponseResult<any>> {
    // console.log(JSON.stringify(piDetail))
    return this.http.post<IResponseResult<any>>('/pi/edit-pi-detail', piDetail);
  }

  deletePiDetailById(id: string): Observable<IResponseResult<PiDetailDto>> {
    return this.http.get<IResponseResult<PiDetailDto>>(
      '/pi/delete-pi-detail/' + id
    );
  }
  //#endregion Pi Detail
}
