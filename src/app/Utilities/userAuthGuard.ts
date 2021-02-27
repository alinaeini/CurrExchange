import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthorizationService } from "../Services/authorization.service";
import { log } from 'console';
@Injectable({
  providedIn: "root",
})
export class userAuthGuard implements CanActivate {
  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated().then((res) => {
      // console.log(res);
      if (res) return true;
      else this.router.navigate(["/login"]);
      return false;
    });
// var result =true ;
//     this.authService._getAutehnticated().subscribe((res) => {
//       console.log(res);

//       if (!res){
//          this.router.navigate(["login"]);
//          result =false ;
//       }
//        });
//    return result ;

  }
}
