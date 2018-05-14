import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { JwtService, AuthService } from '.';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf } from 'rxjs/observable/of';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.jwtService.getToken()) {
      return Observable.of(true);
    }
    //extract the token
    const token = route.queryParamMap.get('token');
    debugger;
    if (token) {
      return this.authService.isAuthenticated(token).pipe(
        map(authenticated => {
          if (authenticated === true) {
            this.jwtService.seToken(token);
            this.router.navigate(['/dashboard', 'invoices']);
            return true;
          }
          this.router.navigate(['/login']);
          return false;
        }),
        catchError((err: any) => {
          this.router.navigate(['/login']);
          return ObservableOf(false);
        })
      );
    }
    //authenticati
    else {
      this.router.navigate(['/login']);
      return Observable.of(false);
    }
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
