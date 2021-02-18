import { HttpClient, HttpParams } from '@angular/common/http';
import {  CreateBrokerDto } from '../DTOs/Broker/CreateBrokerDto';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { FilterBrokerDto } from '../DTOs/Broker/FilterBrokerDto';
import { BrokerDto } from '../DTOs/Broker/BrokerDto';
@Injectable({
    providedIn: 'root'
  })
  export class BrokerService {
    private brokerList: BehaviorSubject<BrokerDto[]> = new BehaviorSubject<BrokerDto[]>(null);
    constructor(private http:HttpClient) { }
  
    setBrokerList(brokers: BrokerDto[]): void {
      this.brokerList.next(brokers);
    }
    getBrokerList(): Observable<BrokerDto[]> {
      return this.brokerList;
    }
  
    getBrokerListService(): Observable<IResponseResult<BrokerDto[]>> {
       return this.http.get<IResponseResult<BrokerDto[]>>("/broker/brokers");
     } 

    createBrokerService(broker: CreateBrokerDto): Observable<any> {
     // console.log(JSON.stringify(broker) );
      return this.http.post<any>("/broker/create", broker);
    } 

    public getFilteredBroker(filter: FilterBrokerDto): Observable<IResponseResult<FilterBrokerDto>> {
      let requestParams;
      if (filter !== null) {
        // filter.title=filter.title===null ? '':filter.title;
        requestParams = new HttpParams()
          .set("pageId", filter.pageId.toString())
          .set("searchText", filter.searchText)
          .set("takeEntity", filter.takeEntity.toString())
        }
        // console.log(filter);
      
      return this.http.get<IResponseResult<FilterBrokerDto>>(
        "/broker/filter-broker",
        { params: requestParams }
      );
    }
  
    
    getBrokerById(id: string): Observable<IResponseResult<BrokerDto>> {
       return this.http.get<IResponseResult<BrokerDto>>("/broker/edit-broker-get/"+ id);
     } 
  
     editBroker(broker: BrokerDto): Observable<IResponseResult<any>> {
      return this.http.post<IResponseResult<any>>("/broker/edit-broker",broker);
    } 
    
    deleteBrokerById(id: string): Observable<IResponseResult<BrokerDto>> {
      return this.http.get<IResponseResult<BrokerDto>>("/broker/delete-broker/"+ id);
    } 
  }