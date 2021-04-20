import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { CreateCustomerDto } from '../DTOs/Customer/CreateCustomerDto';
import { FilterCustomerDto } from '../DTOs/Customer/FilterCustomerDto';
import { CustomerDto } from 'src/app/DTOs/Customer/customerDto';

@Injectable({
  providedIn: 'root'
})
export class MiscellaneousCustomerService {

  private customerList: BehaviorSubject<CustomerDto[]> = new BehaviorSubject<CustomerDto[]>(null);

  constructor(private http:HttpClient) { }

  setCustomerList(customers: CustomerDto[]): void {
    this.customerList.next(customers);
  }
  getCustomerList(): Observable<CustomerDto[]> {
    return this.customerList;
  }
  
    getCustomerListService(): Observable<IResponseResult<CustomerDto[]>> {
       return this.http.get<IResponseResult<CustomerDto[]>>("/MiscellaneousCustomer/customers");
     }
  createCustomerService(customer: CreateCustomerDto): Observable<any> {
   // console.log(JSON.stringify(exDec) );
    return this.http.post<any>("/MiscellaneousCustomer/create", customer);
  } 

  public getFilteredCustomer(filter: FilterCustomerDto): Observable<IResponseResult<FilterCustomerDto>> {
    let requestParams;
    if (filter !== null) {
      // filter.title=filter.title===null ? '':filter.title;
      requestParams = new HttpParams()
        .set("pageId", filter.pageId.toString())
        .set("searchText", filter.searchText)
        .set("takeEntity", filter.takeEntity.toString())
      }
      //console.log('requestParams',requestParams);
    
    return this.http.get<IResponseResult<FilterCustomerDto>>(
      "/MiscellaneousCustomer/filter-customers",
      { params: requestParams }
    );
  }

  getCustomerById(id: string): Observable<IResponseResult<CustomerDto>> {
     return this.http.get<IResponseResult<CustomerDto>>("/MiscellaneousCustomer/edit-customer-get/"+ id);
   } 

   editCustomer(customer: CustomerDto): Observable<IResponseResult<any>> {
    return this.http.post<IResponseResult<any>>("/MiscellaneousCustomer/edit-customer",customer);
  } 
  
  deleteCustomerById(id: string): Observable<IResponseResult<CustomerDto>> {
    return this.http.get<IResponseResult<CustomerDto>>("/MiscellaneousCustomer/delete-customer/"+ id);
  } 
}


