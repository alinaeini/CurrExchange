import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseResult } from '../DTOs/Common/IResponseResult';
import { CreateSaleDto } from '../DTOs/Sale/CreateSaleDto';
import { FilterCurrSaleExDecDto } from '../DTOs/Sale/FilterCurrSaleExDecDto';
import { FilterCurrSalePiDto } from '../DTOs/Sale/FilterCurrSalePiDto';
import { FilterCurrSaleDto } from '../DTOs/Sale/FilterCurrSaleDto';
import { FilterCurrencyCustomerDto } from '../DTOs/Customer/FilterCurrencyCustomerDto';

@Injectable({
  providedIn: 'root'
})
export class CurrencySalesService {

  constructor(private http:HttpClient) { }

  createCurrencySalesService(currSales: CreateSaleDto): Observable<any> {
    // console.log(JSON.stringify(currSales) );
     return this.http.post<any>("/currency/create", currSales);
   } 

   public getFilteredCurrExdecByExdecId(filter: FilterCurrSaleExDecDto): Observable<IResponseResult<FilterCurrSaleExDecDto>> {
    let requestParams;
    if (filter !== null) {
      requestParams = new HttpParams()
        .set("pageId", filter.pageId.toString())
        .set("searchText", filter.searchText)
        .set("takeEntity", filter.takeEntity.toString())
        .set("id", filter.id.toString())
      }
    //console.log(JSON.stringify(filter) );
    return this.http.get<IResponseResult<FilterCurrSaleExDecDto>>("/currency/sale-filter-exdec",{ params: requestParams }
    );
  }

  public getFilteredCurrExdecByCurrSaleId(filter: FilterCurrSaleExDecDto): Observable<IResponseResult<FilterCurrSaleExDecDto>> {
    let requestParams;
    if (filter !== null) {
      requestParams = new HttpParams()
        .set("pageId", filter.pageId.toString())
        .set("searchText", filter.searchText)
        .set("takeEntity", filter.takeEntity.toString())
        .set("id", filter.id.toString())
      }
    //console.log(JSON.stringify(filter) );
    return this.http.get<IResponseResult<FilterCurrSaleExDecDto>>("/currency/sale-filter-exdec-currSale",{ params: requestParams }
    );
  }

  public getFilteredCurrPiByPiId(filter: FilterCurrSalePiDto): Observable<IResponseResult<FilterCurrSalePiDto>> {
    let requestParams;
    if (filter !== null) {
      requestParams = new HttpParams()
        .set("pageId", filter.pageId.toString())
        .set("searchText", filter.searchText)
        .set("takeEntity", filter.takeEntity.toString())
        .set("id", filter.id.toString())
      }
    //console.log(JSON.stringify(filter) );
    return this.http.get<IResponseResult<FilterCurrSalePiDto>>("/currency/sale-filter-pi",{ params: requestParams }
    );
  }

  public getFilteredCurrPiByCurrSaleId(filter: FilterCurrSalePiDto): Observable<IResponseResult<FilterCurrSalePiDto>> {
    let requestParams;
    if (filter !== null) {
      requestParams = new HttpParams()
        .set("pageId", filter.pageId.toString())
        .set("searchText", filter.searchText)
        .set("takeEntity", filter.takeEntity.toString())
        .set("id", filter.id.toString())
      }
    //console.log(JSON.stringify(filter) );
    return this.http.get<IResponseResult<FilterCurrSalePiDto>>("/currency/sale-filter-pi-currSale",{ params: requestParams }
    );
  }


  public getFilteredCurrSales(filter: FilterCurrSaleDto): Observable<IResponseResult<FilterCurrSaleDto>> {
    let requestParams;
    if (filter !== null) {
      requestParams = new HttpParams()
        .set("pageId", filter.pageId.toString())
        .set("searchText", filter.searchText)
        .set("takeEntity", filter.takeEntity.toString())
      }
    //console.log(JSON.stringify(filter) );
    return this.http.get<IResponseResult<FilterCurrSaleDto>>("/currency/sale-filter-currSale",{ params: requestParams }
    );
  }
  

  public getFilteredCurrSCustomer(filter: FilterCurrencyCustomerDto): Observable<IResponseResult<FilterCurrencyCustomerDto>> {
    let requestParams;
    if (filter !== null) {
      requestParams = new HttpParams()
        .set("pageId", filter.pageId.toString())
        .set("searchText", filter.searchText)
        .set("takeEntity", filter.takeEntity.toString())
      }
    //console.log(JSON.stringify(filter) );
    return this.http.get<IResponseResult<FilterCurrencyCustomerDto>>("/currency/currency-by-customer",{ params: requestParams }
    );
  }


  public getCurrSCustomerDetails(customerId: number): Observable<IResponseResult<FilterCurrSaleDto>> {

    return this.http.get<IResponseResult<FilterCurrSaleDto>>("/currency/get-currSale-detail-by-customerId/"+ customerId );
  }
}
