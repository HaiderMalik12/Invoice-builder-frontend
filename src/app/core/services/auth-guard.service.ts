import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { JwtService } from '.';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.jwtService.getToken()) {
      return true;
    }
    //extract the token
    const token = route.queryParamMap.get('token');
    debugger;
    if (token) {
      //if token then authenticated the user
      //if authenticated return ture
      //otherwise return false
    }
    //authenticati
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(route, state);
  }
}
