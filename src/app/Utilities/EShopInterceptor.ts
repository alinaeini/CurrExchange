import { CookieService } from 'ngx-cookie-service';

import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { constants } from 'buffer';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DomainName } from './pathTools';

@Injectable({
  providedIn: "root",
})
export class EShopInterceptor implements HttpInterceptor{
    constructor(private CookieService:CookieService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.CookieService.get('exchange-curr-cookie');
        // console.log(token);

        // let myrequest : HttpRequest<any>= req;
        const myrequest = req.clone({
            url :DomainName + req.url,
            headers:req.headers.append('Authorization' ,'Bearer ' + token),
            //withCredentials: true,
        })
        // console.log(myrequest);
        
        return next.handle(myrequest);
    }

}
